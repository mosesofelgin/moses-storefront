import { COOKIE_NAME } from "@shared/const";
import { getSessionCookieOptions } from "./_core/cookies";
import { systemRouter } from "./_core/systemRouter";
import { publicProcedure, router } from "./_core/trpc";
import { ENV } from "./_core/env";
import { z } from "zod";
import Stripe from "stripe";
import { createOrder, getOrdersByEmail } from "./orders";
import { generateDownloadToken, verifyDownloadToken } from "./downloads";
import { subscribeEmail, getSubscriberCount } from "./subscribers";
import { verifyStripeSession } from "./session-verification";
import { sendPurchaseConfirmationEmail } from "./email";

export const appRouter = router({
  system: systemRouter,
  auth: router({
    me: publicProcedure.query(opts => opts.ctx.user),
    logout: publicProcedure.mutation(({ ctx }) => {
      const cookieOptions = getSessionCookieOptions(ctx.req);
      ctx.res.clearCookie(COOKIE_NAME, { ...cookieOptions, maxAge: -1 });
      return {
        success: true,
      } as const;
    }),
  }),

  checkout: router({
    createSession: publicProcedure
      .input(
        z.object({
          customerEmail: z.string().email(),
          customerName: z.string().min(1),
          amountInCents: z.number().int().min(0).optional(),
          productId: z.string().optional(),
        })
      )
      .mutation(async ({ input, ctx }) => {
        const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || "");
        const origin = ctx.req.headers.origin || "https://mosessog.com";

        // Determine product details based on productId
        let productName = "CLARITY by Moses";
        let productDescription = "Full digital album — 12 tracks + 5 photos (instant download)";
        let unitAmount = 1200; // Default to $12 for CLARITY

        if (input.productId === "brand-images") {
          productName = "Brand Images + Lyric PDF";
          productDescription = "4 high-res brand images + CLARITY lyric book PDF";
          unitAmount = input.amountInCents || 0;
        } else if (input.productId === "new-genesis") {
          productName = "New Genesis by Moses";
          productDescription = "Full project — 15 tracks (instant download)";
          unitAmount = input.amountInCents || 1200;
        } else if (input.amountInCents) {
          unitAmount = input.amountInCents;
        }

        try {
          const session = await stripe.checkout.sessions.create({
            payment_method_types: ["card"],
            line_items: [
              {
                price_data: {
                  currency: "usd",
                  product_data: {
                    name: productName,
                    description: productDescription,
                  },
                  unit_amount: unitAmount,
                },
                quantity: 1,
              },
            ],
            mode: "payment",
            customer_email: input.customerEmail,
            success_url: `${origin}/success?session_id={CHECKOUT_SESSION_ID}`,
            cancel_url: `${origin}/store`,
            metadata: {
              customer_email: input.customerEmail,
              customer_name: input.customerName,
              product_id: input.productId || "clarity",
            },
          });

          return {
            sessionId: session.id,
            url: session.url,
          };
        } catch (error) {
          console.error("Stripe session creation error:", error);
          throw new Error("Failed to create checkout session");
        }
      }),

    createFreeOrder: publicProcedure
      .input(
        z.object({
          customerEmail: z.string().email(),
          customerName: z.string().min(1),
          productId: z.string(),
        })
      )
      .mutation(async ({ input, ctx }) => {
        try {
          // Create order record for free transaction
          const stripePaymentIntentId = `free-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
          await createOrder({
            stripePaymentIntentId,
            customerEmail: input.customerEmail,
            customerName: input.customerName,
            amount: 0,
            currency: "usd",
            status: "succeeded",
          });

          // Query the order to get its ID
          const orders = await getOrdersByEmail(input.customerEmail);
          const order = orders.find(o => o.stripePaymentIntentId === stripePaymentIntentId);
          if (!order || !order.id) {
            throw new Error("Failed to retrieve created order");
          }
          const orderId = order.id;

          // Generate download token
          const token = await generateDownloadToken(orderId, input.customerEmail);
          const downloadUrl = `${ENV.publicSiteUrl}/downloads?token=${token}`;

          // Send confirmation email
          await sendPurchaseConfirmationEmail(
            input.customerEmail,
            input.customerName,
            token,
            downloadUrl
          );

          return {
            success: true,
            orderId,
            token,
          };
        } catch (error) {
          console.error("Free order creation error:", error);
          throw new Error("Failed to create free order");
        }
      }),
  }),

  downloads: router({
    verifyToken: publicProcedure
      .input(z.object({ token: z.string() }))
      .query(async ({ input }) => {
        const result = await verifyDownloadToken(input.token);
        return result ? { valid: true, email: result.customerEmail } : { valid: false };
      }),
  }),

  session: router({
    verify: publicProcedure
      .input(z.object({ sessionId: z.string() }))
      .query(async ({ input }) => {
        const result = await verifyStripeSession(input.sessionId);
        return result;
      }),
  }),

  subscribe: router({
    addEmail: publicProcedure
      .input(z.object({ email: z.string().email() }))
      .mutation(async ({ input }) => {
        const result = await subscribeEmail(input.email);
        return result;
      }),

    getCount: publicProcedure.query(async () => {
      const count = await getSubscriberCount();
      return { count };
    }),
  }),
});

export type AppRouter = typeof appRouter;
