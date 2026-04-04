import { describe, it, expect, beforeAll, afterAll } from 'vitest';
import { generateDownloadToken, verifyDownloadToken, getOrderByToken } from './downloads';
import { createOrder } from './orders';
import { getDb } from './db';
import { orders, downloads } from '../drizzle/schema';
import { eq } from 'drizzle-orm';

describe('Download Token System', () => {
  let testOrderId: number;
  const testEmail = 'test@example.com';
  const testCustomerName = 'Test Customer';

  beforeAll(async () => {
    // Create a test order
    const db = await getDb();
    if (!db) {
      throw new Error('Database not available');
    }

    const result = await createOrder({
      stripePaymentIntentId: `test-payment-${Date.now()}`,
      stripeCustomerId: 'cus_test123',
      customerEmail: testEmail,
      customerName: testCustomerName,
      amount: 1000,
      currency: 'usd',
      status: 'succeeded',
    });

    testOrderId = (result as any).insertId || (result as any)[0]?.id;
  });

  afterAll(async () => {
    // Clean up test data
    const db = await getDb();
    if (!db) return;

    // Delete downloads first (foreign key constraint)
    await db.delete(downloads).where(eq(downloads.orderId, testOrderId));

    // Delete order
    await db.delete(orders).where(eq(orders.id, testOrderId));
  });

  it('should generate a valid download token', async () => {
    const token = await generateDownloadToken(testOrderId, testEmail);
    
    expect(token).toBeDefined();
    expect(typeof token).toBe('string');
    expect(token.length).toBeGreaterThan(0);
  });

  it('should verify a valid download token', async () => {
    const token = await generateDownloadToken(testOrderId, testEmail);
    const result = verifyDownloadToken(token);

    expect(result).toBeDefined();
    expect(result?.customerEmail).toBe(testEmail);
    expect(result?.orderId).toBe(testOrderId);
  });

  it('should reject an invalid token', () => {
    const result = verifyDownloadToken('invalid-token-xyz');
    expect(result).toBeNull();
  });

  it('should reject a tampered token', async () => {
    const token = await generateDownloadToken(testOrderId, testEmail);
    // Tamper with the token
    const tamperedToken = token.slice(0, -5) + 'XXXXX';
    const result = verifyDownloadToken(tamperedToken);
    expect(result).toBeNull();
  });

  it('should get order by token', async () => {
    const token = await generateDownloadToken(testOrderId, testEmail);
    const order = await getOrderByToken(token);

    expect(order).toBeDefined();
    expect(order?.id).toBe(testOrderId);
    expect(order?.customerEmail).toBe(testEmail);
    expect(order?.status).toBe('succeeded');
  });

  it('should return null for invalid token when getting order', async () => {
    const order = await getOrderByToken('invalid-token');
    expect(order).toBeNull();
  });
});
