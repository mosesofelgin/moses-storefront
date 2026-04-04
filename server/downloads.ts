import { nanoid } from "nanoid";
import { getDb } from "./db";
import { downloads, orders } from "../drizzle/schema";
import { eq } from "drizzle-orm";

/**
 * Generate a unique download token for a customer
 * Token is used to provide persistent access to downloads
 */
export async function generateDownloadToken(
  orderId: number,
  customerEmail: string
): Promise<string> {
  const db = await getDb();
  if (!db) {
    throw new Error("Database not available");
  }

  const token = nanoid(32);

  await db.insert(downloads).values({
    orderId,
    downloadToken: token,
    customerEmail,
  });

  return token;
}

/**
 * Verify a download token and return customer email if valid
 */
export async function verifyDownloadToken(
  token: string
): Promise<{ customerEmail: string; orderId: number } | null> {
  const db = await getDb();
  if (!db) {
    return null;
  }

  const result = await db
    .select()
    .from(downloads)
    .where(eq(downloads.downloadToken, token))
    .limit(1);

  if (result.length === 0) {
    return null;
  }

  const download = result[0];
  return {
    customerEmail: download.customerEmail,
    orderId: download.orderId,
  };
}

/**
 * Get all download tokens for a customer email
 */
export async function getCustomerDownloadTokens(
  customerEmail: string
): Promise<string[]> {
  const db = await getDb();
  if (!db) {
    return [];
  }

  const results = await db
    .select()
    .from(downloads)
    .where(eq(downloads.customerEmail, customerEmail));

  return results.map((d) => d.downloadToken);
}

/**
 * Get order by download token
 */
export async function getOrderByToken(token: string) {
  const db = await getDb();
  if (!db) {
    return null;
  }

  const result = await db
    .select()
    .from(downloads)
    .where(eq(downloads.downloadToken, token))
    .limit(1);

  if (result.length === 0) {
    return null;
  }

  const download = result[0];

  // Get the associated order
  const { orders: ordersTable } = await import("../drizzle/schema");
  const orderResult = await db
    .select()
    .from(ordersTable)
    .where(eq(ordersTable.id, download.orderId))
    .limit(1);

  return orderResult.length > 0 ? orderResult[0] : null;
}
