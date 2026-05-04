import Stripe from "stripe";
import { createOrder, updateOrderStatus, getOrderByStripePaymentIntentId } from "../orders";
import { generateDownloadToken } from "../downloads";
import { sendPurchaseConfirmationEmail } from "../email";
import { ENV } from "./env";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || "");
const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET || "";

/**
 * Verify Stripe webhook signature
 */
export function verifyWebhookSignature(
  body: string,
  signature: string
): Stripe.Event | null {
  try {
    return stripe.webhooks.constructEvent(body, signature, webhookSecret) as Stripe.Event;
  } catch (error) {
    console.error("[Stripe Webhook] Signature verification failed:", error);
    return null;
  }
}

/**
 * Handle payment_intent.succeeded event
 */
async function handlePaymentIntentSucceeded(
  paymentIntent: Stripe.PaymentIntent
): Promise<void> {
  console.log(`[Stripe Webhook] Processing payment_intent.succeeded: ${paymentIntent.id}`);

  try {
    // Check if order already exists
    const existingOrder = await getOrderByStripePaymentIntentId(paymentIntent.id);

    if (existingOrder) {
      console.log(`[Stripe Webhook] Order already exists for payment intent ${paymentIntent.id}`);
      return;
    }

    // Extract customer info from payment intent metadata
    const customerEmail = paymentIntent.receipt_email || paymentIntent.metadata?.customer_email || "";
    const customerName = paymentIntent.metadata?.customer_name || "Customer";

    if (!customerEmail) {
      console.error("[Stripe Webhook] No customer email found in payment intent");
      return;
    }

    // Create order record
    const result = await createOrder({
      stripePaymentIntentId: paymentIntent.id,
      stripeCustomerId: paymentIntent.customer as string,
      customerEmail,
      customerName,
      amount: paymentIntent.amount,
      currency: (paymentIntent.currency || "usd").toLowerCase(),
      status: "succeeded",
    });

    console.log(`[Stripe Webhook] Created order for ${customerEmail}`);

    // Generate download token
    const orderId = (result as any).insertId || (result as any)[0]?.id;
    if (!orderId) {
      console.error("[Stripe Webhook] Failed to get order ID from insert result");
      return;
    }

    const downloadToken = await generateDownloadToken(orderId, customerEmail);
    const downloadUrl = `${ENV.publicSiteUrl}/downloads?token=${downloadToken}`;

    // Send confirmation email
    const emailSent = await sendPurchaseConfirmationEmail(
      customerEmail,
      customerName,
      downloadToken,
      downloadUrl
    );

    if (emailSent) {
      console.log(`[Stripe Webhook] Confirmation email sent to ${customerEmail}`);
    } else {
      console.warn(`[Stripe Webhook] Failed to send confirmation email to ${customerEmail}`);
    }
  } catch (error) {
    console.error("[Stripe Webhook] Error handling payment_intent.succeeded:", error);
  }
}

/**
 * Handle checkout.session.completed event
 */
async function handleCheckoutSessionCompleted(
  session: Stripe.Checkout.Session
): Promise<void> {
  console.log(`[Stripe Webhook] Processing checkout.session.completed: ${session.id}`);

  try {
    // Get payment intent from session
    if (!session.payment_intent) {
      console.error("[Stripe Webhook] No payment intent found in checkout session");
      return;
    }

    const paymentIntentId =
      typeof session.payment_intent === "string" ? session.payment_intent : session.payment_intent.id;

    // Retrieve full payment intent details
    const paymentIntent = await stripe.paymentIntents.retrieve(paymentIntentId);

    // Process as payment_intent.succeeded
    await handlePaymentIntentSucceeded(paymentIntent);
  } catch (error) {
    console.error("[Stripe Webhook] Error handling checkout.session.completed:", error);
  }
}

/**
 * Process Stripe webhook event
 */
export async function processWebhookEvent(event: Stripe.Event): Promise<void> {
  switch (event.type) {
    case "payment_intent.succeeded":
      await handlePaymentIntentSucceeded(event.data.object as Stripe.PaymentIntent);
      break;

    case "checkout.session.completed":
      await handleCheckoutSessionCompleted(event.data.object as Stripe.Checkout.Session);
      break;

    case "payment_intent.payment_failed":
      console.log(`[Stripe Webhook] Payment failed: ${(event.data.object as Stripe.PaymentIntent).id}`);
      await updateOrderStatus((event.data.object as Stripe.PaymentIntent).id, "failed");
      break;

    default:
      console.log(`[Stripe Webhook] Unhandled event type: ${event.type}`);
  }
}
