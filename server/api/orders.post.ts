import { z } from 'zod'
import { Resend } from 'resend'
import { rateLimit } from '../utils/rateLimit'
import { escapeHtml } from '../utils/escapeHtml'

// Server-side price table — source of truth. Never trust client-submitted prices.
const PRICES: Record<string, number> = {
  'nuts-6oz': 1000,
  'nuts-8oz': 1500,
  'nuts-15oz': 2300,
  'gift-basket': 4000,
}

const PRODUCT_NAMES: Record<string, string> = {
  'nuts-6oz': '6 oz Cinnamon Roasted Nuts',
  'nuts-8oz': '8 oz Cinnamon Roasted Nuts',
  'nuts-15oz': '15 oz Cinnamon Roasted Nuts',
  'gift-basket': 'Holiday Gift Basket',
}

const OrderSchema = z.object({
  name: z.string().min(2).max(100).trim(),
  email: z.string().email().max(254),
  phone: z.string().regex(/^[\d\s\-\+\(\)]{7,20}$/, 'Invalid phone number'),
  fulfillment: z.enum(['pickup', 'delivery']),
  deliveryAddress: z.string().max(300).optional(),
  payment: z.enum(['call', 'on-pickup']),
  items: z.array(z.object({
    id: z.string().max(50),
    quantity: z.number().int().positive().max(99),
  })).min(1).max(20),
  notes: z.string().max(1000).optional(),
})

function generateOrderRef(): string {
  const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789'
  let ref = 'NB-'
  for (let i = 0; i < 6; i++) {
    ref += chars[Math.floor(Math.random() * chars.length)]
  }
  return ref
}

export default defineEventHandler(async (event) => {
  rateLimit(event, 3, 60_000)

  const config = useRuntimeConfig()
  const body = await readBody(event)

  const result = OrderSchema.safeParse(body)
  if (!result.success) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Invalid request',
      message: result.error.issues.map(i => i.message).join('; '),
    })
  }

  const { name, email, phone, fulfillment, deliveryAddress, payment, items, notes } = result.data

  // Recompute total server-side — never trust client-submitted prices
  let totalCents = 0
  const lineItems: Array<{ name: string; quantity: number; subtotal: number }> = []

  for (const item of items) {
    const price = PRICES[item.id]
    if (!price) {
      throw createError({ statusCode: 400, message: `Unknown product: ${item.id}` })
    }
    const subtotal = price * item.quantity
    totalCents += subtotal
    lineItems.push({
      name: PRODUCT_NAMES[item.id] ?? item.id,
      quantity: item.quantity,
      subtotal,
    })
  }

  const orderRef = generateOrderRef()
  const totalDollars = `$${(totalCents / 100).toFixed(2)}`

  const itemsHtml = lineItems
    .map(l => `
      <tr>
        <td style="padding:8px 12px;border-bottom:1px solid #d9cfc4;">${escapeHtml(l.name)}</td>
        <td style="padding:8px 12px;text-align:center;border-bottom:1px solid #d9cfc4;">${l.quantity}</td>
        <td style="padding:8px 12px;text-align:right;border-bottom:1px solid #d9cfc4;">$${(l.subtotal / 100).toFixed(2)}</td>
      </tr>`)
    .join('')

  const emailHtml = `
    <div style="font-family:sans-serif;max-width:600px;margin:0 auto;color:#2d1a0e;">
      <h1 style="color:#8B4513;border-bottom:3px solid #ff6b35;padding-bottom:12px;">
        New Order — ${escapeHtml(orderRef)}
      </h1>

      <h2 style="color:#654321;">Customer</h2>
      <p>
        <strong>Name:</strong> ${escapeHtml(name)}<br>
        <strong>Email:</strong> ${escapeHtml(email)}<br>
        <strong>Phone:</strong> ${escapeHtml(phone)}
      </p>

      <h2 style="color:#654321;">Fulfillment</h2>
      <p>
        <strong>Method:</strong> ${escapeHtml(fulfillment)}
        ${fulfillment === 'delivery' && deliveryAddress
          ? `<br><strong>Address:</strong> ${escapeHtml(deliveryAddress)}`
          : ''}
      </p>
      <p><strong>Payment:</strong> ${escapeHtml(payment === 'call' ? 'Will call to arrange payment' : 'Pay on pickup')}</p>

      <h2 style="color:#654321;">Items</h2>
      <table style="width:100%;border-collapse:collapse;border:1px solid #d9cfc4;">
        <thead>
          <tr style="background:#f4e4bc;">
            <th style="padding:8px 12px;text-align:left;">Item</th>
            <th style="padding:8px 12px;text-align:center;">Qty</th>
            <th style="padding:8px 12px;text-align:right;">Subtotal</th>
          </tr>
        </thead>
        <tbody>${itemsHtml}</tbody>
        <tfoot>
          <tr style="background:#ede9df;">
            <td colspan="2" style="padding:8px 12px;font-weight:bold;">Total</td>
            <td style="padding:8px 12px;text-align:right;font-weight:bold;">${totalDollars}</td>
          </tr>
        </tfoot>
      </table>

      ${notes ? `<h2 style="color:#654321;">Notes</h2><p style="white-space:pre-wrap;">${escapeHtml(notes)}</p>` : ''}

      <hr style="border:1px solid #d9cfc4;margin:24px 0;">
      <p style="color:#6b5a4e;font-size:12px;">Order reference: ${escapeHtml(orderRef)}</p>
    </div>
  `

  if (config.resendApiKey) {
    const resend = new Resend(config.resendApiKey)
    const { error } = await resend.emails.send({
      from: 'The Nut Barn Orders <orders@nutbarn.com>',
      to: config.contactEmail || 'thenutbarnllc@gmail.com',
      replyTo: email,
      subject: `New Order ${orderRef} — ${name}`,
      html: emailHtml,
    })

    if (error) {
      console.error('[orders] Resend error:', error)
      throw createError({ statusCode: 500, message: 'Failed to send order email. Please try again.' })
    }
  } else {
    // Dev mode — log instead of sending
    console.info('[orders] RESEND_API_KEY not configured — order logged:', {
      to: config.contactEmail,
      orderRef,
      totalDollars,
      name,
    })
  }

  return {
    success: true,
    orderRef,
    message: `Order ${orderRef} received! We'll be in touch within 24 hours.`,
  }
})
