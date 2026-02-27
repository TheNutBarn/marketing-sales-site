import { NextRequest, NextResponse } from 'next/server'
import { Resend } from 'resend'

interface ContactPayload {
  name: string
  email: string
  subject?: string
  message: string
}

export async function POST(req: NextRequest) {
  let body: ContactPayload

  try {
    body = await req.json()
  } catch {
    return NextResponse.json({ error: 'Invalid JSON body' }, { status: 400 })
  }

  const { name, email, subject, message } = body

  if (!name || !email || !message) {
    return NextResponse.json(
      { error: 'Missing required fields: name, email, message' },
      { status: 400 }
    )
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return NextResponse.json({ error: 'Invalid email address' }, { status: 400 })
  }

  const contactEmail = process.env.CONTACT_EMAIL
  if (!contactEmail) {
    console.error('[contact] CONTACT_EMAIL env var is not set')
    return NextResponse.json({ error: 'Server configuration error' }, { status: 500 })
  }

  const resendKey = process.env.RESEND_API_KEY
  if (!resendKey) {
    console.error('[contact] RESEND_API_KEY env var is not set')
    return NextResponse.json({ error: 'Server configuration error' }, { status: 500 })
  }

  const emailSubject = subject
    ? `[The Nut Barn] ${subject}`
    : `[The Nut Barn] New Contact Message from ${name}`

  const emailText = `
New message from The Nut Barn contact form:

Name: ${name}
Email: ${email}
${subject ? `Subject: ${subject}\n` : ''}
Message:
${message}

---
Sent via thenutbarn.com contact form
Reply to this email to respond directly to ${name}.
`.trim()

  try {
    const resend = new Resend(resendKey)
    await resend.emails.send({
      // Update 'from' to a verified domain address once DNS is configured, e.g.:
      // from: 'The Nut Barn <noreply@thenutbarn.com>'
      from: 'The Nut Barn <onboarding@resend.dev>',
      to: [contactEmail],
      replyTo: email,
      subject: emailSubject,
      text: emailText,
    })
    console.log('[contact] Email sent via Resend to:', contactEmail)
  } catch (err) {
    console.error('[contact] Resend send failed:', err)
    return NextResponse.json(
      { error: 'Failed to send email. Please contact us directly.' },
      { status: 500 }
    )
  }

  return NextResponse.json({ success: true }, { status: 200 })
}
