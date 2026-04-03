import { eq } from "drizzle-orm";
import { InsertOrder, orders } from "../drizzle/schema";
import { getDb } from "./db";

export async function createOrder(order: InsertOrder) {
  const db = await getDb();
  if (!db) {
    throw new Error("Database not available");
  }

  const result = await db.insert(orders).values(order);
  return result;
}

export async function getOrderByStripePaymentIntentId(stripePaymentIntentId: string) {
  const db = await getDb();
  if (!db) {
    throw new Error("Database not available");
  }

  const result = await db
    .select()
    .from(orders)
    .where(eq(orders.stripePaymentIntentId, stripePaymentIntentId))
    .limit(1);

  return result.length > 0 ? result[0] : undefined;
}

export async function updateOrderStatus(
  stripePaymentIntentId: string,
  status: "pending" | "succeeded" | "failed" | "canceled"
) {
  const db = await getDb();
  if (!db) {
    throw new Error("Database not available");
  }

  await db
    .update(orders)
    .set({ status, updatedAt: new Date() })
    .where(eq(orders.stripePaymentIntentId, stripePaymentIntentId));
}

export async function getOrdersByEmail(customerEmail: string) {
  const db = await getDb();
  if (!db) {
    throw new Error("Database not available");
  }

  const result = await db
    .select()
    .from(orders)
    .where(eq(orders.customerEmail, customerEmail));

  return result;
}
