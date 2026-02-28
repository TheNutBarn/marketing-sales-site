/**
 * Stripe checkout stub — Phase 2 placeholder
 *
 * This route is intentionally not implemented. It returns 501 Not Implemented.
 * Stripe integration will be activated in Phase 2.
 *
 * When Stripe is ready:
 * 1. Install: pnpm add stripe @stripe/stripe-js
 * 2. Set STRIPE_SECRET_KEY and NUXT_PUBLIC_STRIPE_PUBLISHABLE_KEY env vars
 * 3. Replace this stub with a real Stripe Checkout Session creation
 *
 * @see https://stripe.com/docs/api/checkout/sessions/create
 */
export default defineEventHandler(() => {
  throw createError({
    statusCode: 501,
    data: {
      error: "Stripe integration pending Phase 2",
      message:
        "Online card payment is coming soon! For now, please place your order and we'll confirm payment via Square, PayPal, or Venmo.",
    },
  });
});
