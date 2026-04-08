import { getDb } from "./db";
import { subscribers } from "../drizzle/schema";
import { eq } from "drizzle-orm";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

/**
 * Subscribe an email to the list
 * - Saves to database (owned audience)
 * - Sends welcome email via Resend
 * - Handles duplicates gracefully
 */
export async function subscribeEmail(email: string): Promise<{ success: boolean; message: string }> {
  try {
    const db = await getDb();
    if (!db) {
      return { success: false, message: "Database not available" };
    }

    // Check if already subscribed
    const existing = await db.select().from(subscribers).where(eq(subscribers.email, email)).limit(1);
    const existingRecord = existing.length > 0 ? existing[0] : null;

    if (existingRecord) {
      if (existingRecord.status === "active") {
        return { success: false, message: "Already subscribed" };
      } else {
        // Reactivate unsubscribed email
        await db
          .update(subscribers)
          .set({ status: "active", updatedAt: new Date() })
          .where(eq(subscribers.email, email));
      }
    } else {
      // Insert new subscriber
      await db.insert(subscribers).values({
        email,
        source: "connect_page",
        status: "active",
      });
    }

    // Verify database insert before sending email
    const verifyInsert = await db.select().from(subscribers).where(eq(subscribers.email, email)).limit(1);
    if (verifyInsert.length === 0) {
      return { success: false, message: "Failed to save email" };
    }

    // Send welcome email via Resend
    await resend.emails.send({
      from: "noreply@manus.space",
      to: email,
      subject: "Welcome to MOSES — Direct Access to Truth-Driven Music",
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2>Welcome to the MOSES Community</h2>
          <p>You're now connected to direct updates on:</p>
          <ul>
            <li>New music releases</li>
            <li>Weekly livestreams (Sundays 7 PM CDT)</li>
            <li>Exclusive offers and early access</li>
            <li>Truth-driven teaching and testimony</li>
          </ul>
          <p><strong>No algorithms. No middlemen. Just direct connection.</strong></p>
          <p>
            <a href="https://mosessog.manus.space" style="display: inline-block; padding: 12px 24px; background-color: #22c55e; color: white; text-decoration: none; border-radius: 6px; font-weight: bold;">
              Visit MOSES Store
            </a>
          </p>
          <hr style="margin: 30px 0; border: none; border-top: 1px solid #e5e7eb;" />
          <p style="font-size: 12px; color: #6b7280;">
            You received this because you subscribed to updates from MOSES.
            <a href="#" style="color: #3b82f6;">Unsubscribe</a>
          </p>
        </div>
      `,
    });

    return { success: true, message: "Successfully subscribed" };
  } catch (error) {
    console.error("Subscription error:", error);
    return { success: false, message: "Subscription failed" };
  }
}

/**
 * Get subscriber count (for dashboard/analytics)
 */
export async function getSubscriberCount(): Promise<number> {
  const db = await getDb();
  if (!db) return 0;
  const result = await db.select().from(subscribers).where(eq(subscribers.status, "active"));
  return result.length;
}
