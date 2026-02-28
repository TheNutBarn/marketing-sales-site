import { Resend } from "resend";

interface ContactPayload {
  name: string;
  email: string;
  subject?: string;
  message: string;
}

export default defineEventHandler(async (event) => {
  let body: ContactPayload;
  try {
    body = await readBody<ContactPayload>(event);
  } catch {
    throw createError({ statusCode: 400, statusMessage: "Invalid JSON body" });
  }

  const { name, email, subject, message } = body;

  if (!name || !email || !message) {
    throw createError({
      statusCode: 400,
      statusMessage: "Missing required fields: name, email, message",
    });
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    throw createError({
      statusCode: 400,
      statusMessage: "Invalid email address",
    });
  }

  const config = useRuntimeConfig(event);
  const contactEmail = (config.contactEmail as string) || "";
  const resendKey = (config.resendApiKey as string) || "";

  if (!contactEmail) {
    console.error("[contact] NUXT_CONTACT_EMAIL env var is not set");
    throw createError({
      statusCode: 500,
      statusMessage: "Server configuration error",
    });
  }

  if (!resendKey) {
    console.error("[contact] NUXT_RESEND_API_KEY env var is not set");
    throw createError({
      statusCode: 500,
      statusMessage: "Server configuration error",
    });
  }

  const emailSubject = subject
    ? `[The Nut Barn] ${subject}`
    : `[The Nut Barn] New Contact Message from ${name}`;

  const emailText = `
New message from The Nut Barn contact form:

Name: ${name}
Email: ${email}
${subject ? `Subject: ${subject}\n` : ""}
Message:
${message}

---
Sent via thenutbarn.com contact form
Reply to this email to respond directly to ${name}.
`.trim();

  try {
    const resend = new Resend(resendKey);
    // NOTE: onboarding@resend.dev can only send to your Resend account email.
    // Update 'from' to 'noreply@thenutbarn.com' once domain is verified in Resend.
    const { error } = await resend.emails.send({
      from: "The Nut Barn <onboarding@resend.dev>",
      to: [contactEmail],
      replyTo: email,
      subject: emailSubject,
      text: emailText,
    });
    if (error) {
      console.error("[contact] Resend returned error:", error);
      throw new Error(error.message);
    }
    console.log("[contact] Email sent via Resend to:", contactEmail);
  } catch (err) {
    console.error("[contact] Resend send failed:", err);
    throw createError({
      statusCode: 500,
      statusMessage: "Failed to send email. Please contact us directly.",
    });
  }

  return { success: true };
});
