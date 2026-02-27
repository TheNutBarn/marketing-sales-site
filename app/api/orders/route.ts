import { NextRequest, NextResponse } from 'next/server'
import { Resend } from 'resend'

interface OrderItem {
  id: string
  name: string
  price: number
  quantity: number
}

interface OrderPayload {
  customerName: string
  customerEmail: string
  items: OrderItem[]
  total: number
  notes?: string
}

export async function POST(req: NextRequest) {
  let body: OrderPayload

  try {
    body = await req.json()
  } catch {
    return NextResponse.json({ error: 'Invalid JSON body' }, { status: 400 })
  }

  const { customerName, customerEmail, items, total, notes } = body

  if (!customerName || !customerEmail || !items?.length) {
    return NextResponse.json(
      { error: 'Missing required fields: customerName, customerEmail, items' },
      { status: 400 }
    )
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(customerEmail)) {
    return NextResponse.json({ error: 'Invalid email address' }, { status: 400 })
  }

  const contactEmail = process.env.CONTACT_EMAIL
  if (!contactEmail) {
    console.error('[orders] CONTACT_EMAIL env var is not set')
    return NextResponse.json({ error: 'Server configuration error' }, { status: 500 })
  }

  const resendKey = process.env.RESEND_API_KEY
  if (!resendKey) {
    console.error('[orders] RESEND_API_KEY env var is not set')
    return NextResponse.json({ error: 'Server configuration error' }, { status: 500 })
  }

  const orderLines = items
    .map(item => `  • ${item.name} × ${item.quantity} — $${(item.price * item.quantity).toFixed(2)}`)
    .join('\n')

  const orderEmailText = `
New order from The Nut Barn website!

Customer: ${customerName}
Email: ${customerEmail}

Order:
${orderLines}

Total: $${total.toFixed(2)}
${notes ? `\nCustomer notes: ${notes}` : ''}

---
Reply to this email to confirm the order and arrange payment/pickup with ${customerName}.
`.trim()

  const confirmationText = `
Hi ${customerName},

Thanks for your order from The Nut Barn! We've received it and will be in touch shortly to confirm payment and pickup/shipping details.

Your order:
${orderLines}

Total: $${total.toFixed(2)}
${notes ? `\nYour notes: ${notes}` : ''}

Questions? Reply to this email or call us at (517) 410-9029.

— The Nut Barn Team
`.trim()

  try {
    const resend = new Resend(resendKey)

    await Promise.all([
      // Notify the business
      resend.emails.send({
        from: 'The Nut Barn <onboarding@resend.dev>',
        to: [contactEmail],
        replyTo: customerEmail,
        subject: `[New Order] ${customerName} — $${total.toFixed(2)}`,
        text: orderEmailText,
      }),
      // Confirm with the customer
      resend.emails.send({
        from: 'The Nut Barn <onboarding@resend.dev>',
        to: [customerEmail],
        replyTo: contactEmail,
        subject: 'Your Nut Barn order was received!',
        text: confirmationText,
      }),
    ])

    console.log('[orders] Order emails sent for:', customerName, customerEmail)
  } catch (err) {
    console.error('[orders] Resend send failed:', err)
    return NextResponse.json(
      { error: 'Failed to send order. Please contact us directly.' },
      { status: 500 }
    )
  }

  return NextResponse.json({ success: true }, { status: 200 })
}
