import { NextResponse } from 'next/server'

/**
 * Stripe checkout stub — Phase 2 placeholder
 *
 * This route is intentionally not implemented. It returns 501 Not Implemented
 * as specified in the project plan. Stripe integration will be activated in Phase 4.
 *
 * When Stripe is ready:
 * 1. Install: pnpm add stripe @stripe/stripe-js
 * 2. Set STRIPE_SECRET_KEY and NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY env vars
 * 3. Replace this stub with a real Stripe Checkout Session creation
 *
 * @see https://stripe.com/docs/api/checkout/sessions/create
 */
export async function POST() {
  return NextResponse.json(
    {
      error: 'Stripe integration pending Phase 2',
      message:
        'Online card payment is coming soon! For now, please use the "Order via Email" option and we\'ll confirm payment via Square, PayPal, or Venmo.',
    },
    { status: 501 }
  )
}
