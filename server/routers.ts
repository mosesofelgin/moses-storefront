import { COOKIE_NAME } from "@shared/const";
import { getSessionCookieOptions } from "./_core/cookies";
import { systemRouter } from "./_core/systemRouter";
import { publicProcedure, router } from "./_core/trpc";
import { z } from "zod";
import Stripe from "stripe";
import { createOrder } from "./orders";

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
        })
      )
      .mutation(async ({ input, ctx }) => {
        const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || "");
        const origin = ctx.req.headers.origin || "https://moses-storefront.manus.space";

        try {
          const session = await stripe.checkout.sessions.create({
            payment_method_types: ["card"],
            line_items: [
              {
                price_data: {
                  currency: "usd",
                  product_data: {
                    name: "CLARITY Album Bundle",
                    description: "12 tracks + 4 brand images + lyric book",
                  },
                  unit_amount: 1000,
                },
                quantity: 1,
              },
            ],
            mode: "payment",
            customer_email: input.customerEmail,
            success_url: `${origin}/success?session_id={CHECKOUT_SESSION_ID}`,
            cancel_url: `${origin}/clarity`,
            metadata: {
              customer_email: input.customerEmail,
              customer_name: input.customerName,
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
  }),
});

export type AppRouter = typeof appRouter;
