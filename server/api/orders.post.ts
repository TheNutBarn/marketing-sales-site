import { Resend } from "resend";

interface OrderItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
}

interface OrderPayload {
  customerName: string;
  customerEmail: string;
  items: OrderItem[];
  total: number;
  notes?: string;
}

export default defineEventHandler(async (event) => {
  let body: OrderPayload;
  try {
    body = await readBody<OrderPayload>(event);
  } catch {
    throw createError({ statusCode: 400, statusMessage: "Invalid JSON body" });
  }

  const { customerName, customerEmail, items, total, notes } = body;

  if (!customerName || !customerEmail || !items?.length) {
    throw createError({
      statusCode: 400,
      statusMessage:
        "Missing required fields: customerName, customerEmail, items",
    });
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(customerEmail)) {
    throw createError({
      statusCode: 400,
      statusMessage: "Invalid email address",
    });
  }

  const config = useRuntimeConfig(event);
  const contactEmail = (config.contactEmail as string) || "";
  const resendKey = (config.resendApiKey as string) || "";

  if (!contactEmail) {
    console.error("[orders] NUXT_CONTACT_EMAIL env var is not set");
    throw createError({
      statusCode: 500,
      statusMessage: "Server configuration error",
    });
  }

  if (!resendKey) {
    console.error("[orders] NUXT_RESEND_API_KEY env var is not set");
    throw createError({
      statusCode: 500,
      statusMessage: "Server configuration error",
    });
  }

  const orderLines = items
    .map(
      (item) =>
        `  • ${item.name} × ${item.quantity} — $${(item.price * item.quantity).toFixed(2)}`,
    )
    .join("\n");

  const orderEmailText = `
New order from The Nut Barn website!

Customer: ${customerName}
Email: ${customerEmail}

Order:
${orderLines}

Total: $${total.toFixed(2)}
${notes ? `\nCustomer notes: ${notes}` : ""}

---
Reply to this email to confirm the order and arrange payment/pickup with ${customerName}.
`.trim();

  const confirmationText = `
Hi ${customerName},

Thanks for your order from The Nut Barn! We've received it and will be in touch shortly to confirm payment and pickup/shipping details.

Your order:
${orderLines}

Total: $${total.toFixed(2)}
${notes ? `\nYour notes: ${notes}` : ""}

Questions? Reply to this email or call us at (517) 410-9029.

— The Nut Barn Team
`.trim();

  try {
    const resend = new Resend(resendKey);

    // NOTE: onboarding@resend.dev can only send to your Resend account email.
    // Update 'from' to 'noreply@thenutbarn.com' once domain is verified in Resend.
    const [bizResult, customerResult] = await Promise.all([
      // Notify the business
      resend.emails.send({
        from: "The Nut Barn <onboarding@resend.dev>",
        to: [contactEmail],
        replyTo: customerEmail,
        subject: `[New Order] ${customerName} — $${total.toFixed(2)}`,
        text: orderEmailText,
      }),
      // Confirm with the customer
      resend.emails.send({
        from: "The Nut Barn <onboarding@resend.dev>",
        to: [customerEmail],
        replyTo: contactEmail,
        subject: "Your Nut Barn order was received!",
        text: confirmationText,
      }),
    ]);

    if (bizResult.error || customerResult.error) {
      const err = bizResult.error ?? customerResult.error;
      console.error("[orders] Resend returned error:", err);
      throw new Error(err?.message ?? "Resend error");
    }

    console.log("[orders] Order emails sent for:", customerName, customerEmail);
  } catch (err) {
    console.error("[orders] Resend send failed:", err);
    throw createError({
      statusCode: 500,
      statusMessage: "Failed to send order. Please contact us directly.",
    });
  }

  return { success: true };
});
