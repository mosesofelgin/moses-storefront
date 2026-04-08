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
    };
  } catch (error) {
    console.error("[Session Verification] Error verifying session:", error);
    return {
      valid: false,
      error: "Failed to verify session",
    };
  }
}
