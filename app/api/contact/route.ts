import { NextRequest, NextResponse } from 'next/server'

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

  // Basic email format validation
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return NextResponse.json({ error: 'Invalid email address' }, { status: 400 })
  }

  const contactEmail = process.env.CONTACT_EMAIL
  if (!contactEmail) {
    console.error('[contact] CONTACT_EMAIL env var is not set')
    return NextResponse.json({ error: 'Server configuration error' }, { status: 500 })
  }

  const emailSubject = subject
    ? `[The Nut Barn] ${subject}`
    : `[The Nut Barn] New Contact Form Message from ${name}`

  const emailBody = `
New message from The Nut Barn contact form:

Name: ${name}
Email: ${email}
${subject ? `Subject: ${subject}\n` : ''}
Message:
${message}

---
Sent via thenutbarn.com contact form
`.trim()

  // Log for server-side visibility in development / Vercel logs
  console.log('[contact] Received form submission:', { name, email, subject })

  // Check if SMTP is configured — if so, send email via nodemailer
  const smtpHost = process.env.SMTP_HOST
  if (smtpHost) {
    try {
      // Dynamic import to avoid nodemailer being bundled when not needed
      const nodemailer = await import('nodemailer')
      const transporter = nodemailer.default.createTransport({
        host: process.env.SMTP_HOST,
        port: parseInt(process.env.SMTP_PORT ?? '587'),
        secure: process.env.SMTP_PORT === '465',
        auth: {
          user: process.env.SMTP_USER,
          pass: process.env.SMTP_PASS,
        },
      })

      await transporter.sendMail({
        from: `"The Nut Barn Website" <${process.env.SMTP_USER}>`,
        to: contactEmail,
        replyTo: email,
        subject: emailSubject,
        text: emailBody,
      })

      console.log('[contact] Email sent via SMTP to:', contactEmail)
    } catch (err) {
      console.error('[contact] SMTP send failed:', err)
      return NextResponse.json(
        { error: 'Failed to send email. Please contact us directly.' },
        { status: 500 }
      )
    }
  } else {
    // No SMTP configured — log submission for Vercel function logs visibility
    // In production, configure SMTP or use a service like Resend / SendGrid
    console.log('[contact] No SMTP configured. Submission details:\n', emailBody)
  }

  return NextResponse.json({ success: true }, { status: 200 })
}
