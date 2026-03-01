import { z } from 'zod'
import { Resend } from 'resend'
import { rateLimit } from '../utils/rateLimit'
import { escapeHtml } from '../utils/escapeHtml'

const ContactSchema = z.object({
  name: z.string().min(2).max(100).trim(),
  email: z.string().email().max(254),
  subject: z.string().min(2).max(200).trim(),
  message: z.string().min(10).max(2000).trim(),
})

export default defineEventHandler(async (event) => {
  rateLimit(event, 3, 60_000)

  const config = useRuntimeConfig()
  const body = await readBody(event)

  const result = ContactSchema.safeParse(body)
  if (!result.success) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Invalid request',
      message: result.error.issues.map(i => i.message).join('; '),
    })
  }

  const { name, email, subject, message } = result.data

  const emailHtml = `
    <div style="font-family:sans-serif;max-width:600px;margin:0 auto;color:#2d1a0e;">
      <h1 style="color:#8B4513;border-bottom:3px solid #ff6b35;padding-bottom:12px;">
        Contact Form Message
      </h1>
      <p>
        <strong>From:</strong> ${escapeHtml(name)} (${escapeHtml(email)})<br>
        <strong>Subject:</strong> ${escapeHtml(subject)}
      </p>
      <hr style="border:1px solid #d9cfc4;">
      <p style="white-space:pre-wrap;line-height:1.6;">${escapeHtml(message)}</p>
    </div>
  `

  if (config.resendApiKey) {
    const resend = new Resend(config.resendApiKey)
    const { error } = await resend.emails.send({
      from: 'The Nut Barn Website <orders@nutbarn.com>',
      to: config.contactEmail || 'thenutbarnllc@gmail.com',
      replyTo: email,
      subject: `Website Contact: ${subject}`,
      html: emailHtml,
    })

    if (error) {
      console.error('[contact] Resend error:', error)
      throw createError({ statusCode: 500, message: 'Failed to send message. Please try again.' })
    }
  } else {
    console.info('[contact] RESEND_API_KEY not configured — message logged:', { name, email, subject })
  }

  return { success: true, message: "Your message has been sent! We'll reply within 24 hours." }
})
