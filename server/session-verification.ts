import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || "");

/**
 * Verify a Stripe checkout session
 * Returns session details if valid and payment succeeded
 */
export async function verifyStripeSession(
  sessionId: string
): Promise<{
  valid: boolean;
  email?: string;
  amount?: number;
  status?: string;
  paymentIntentId?: string;
  productId?: string;
  token?: string;
  pending?: boolean;
  product?: 'clarity' | 'new-genesis';
  error?: string;
}> {
  try {
    if (!sessionId || typeof sessionId !== "string") {
      return { valid: false, error: "Invalid session ID" };
    }

    // Retrieve the session from Stripe
    const session = await stripe.checkout.sessions.retrieve(sessionId);

    // Verify payment was successful
    if (session.payment_status !== "paid") {
      return {
        valid: false,
        error: `Payment status: ${session.payment_status}`,
      };
    }

    // Verify session is in success state
    if (session.status !== "complete") {
      return { valid: false, error: `Session status: ${session.status}` };
    }

    return {
      valid: true,
      email: session.customer_email || undefined,
      amount: session.amount_total || undefined,
      status: session.payment_status,
      paymentIntentId: typeof session.payment_intent === 'string' ? session.payment_intent : session.payment_intent?.id,
      productId: session.metadata?.product_id || (session.amount_total === 1000 ? 'new-genesis' : 'clarity'),
    };
  } catch (error) {
    console.error("[Session Verification] Error verifying session:", error);
    return {
      valid: false,
      error: "Failed to verify session",
    };
  }
}
