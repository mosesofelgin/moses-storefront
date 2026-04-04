import { describe, it, expect } from 'vitest';
import crypto from 'crypto';

// Test the token generation and verification logic directly
describe('Token Generation and Verification', () => {
  const JWT_SECRET = 'test-secret-key';

  interface TokenData {
    orderId: string;
    customerEmail: string;
    createdAt: number;
  }

  function generateToken(orderId: string, customerEmail: string): string {
    const data: TokenData = {
      orderId,
      customerEmail,
      createdAt: Date.now(),
    };

    const secret = JWT_SECRET;
    const payload = JSON.stringify(data);
    const signature = crypto
      .createHmac('sha256', secret)
      .update(payload)
      .digest('hex');

    const token = Buffer.from(`${payload}.${signature}`).toString('base64');
    return token;
  }

  function verifyToken(token: string): TokenData | null {
    try {
      const secret = JWT_SECRET;
      const decoded = Buffer.from(token, 'base64').toString('utf-8');
      const lastDotIndex = decoded.lastIndexOf('.');
      const payload = decoded.substring(0, lastDotIndex);
      const signature = decoded.substring(lastDotIndex + 1);

      const expectedSignature = crypto
        .createHmac('sha256', secret)
        .update(payload)
        .digest('hex');

      if (signature !== expectedSignature) {
        return null;
      }

      const data: TokenData = JSON.parse(payload);
      return data;
    } catch (error) {
      return null;
    }
  }

  it('should generate a valid token', () => {
    const token = generateToken('order-123', 'customer@example.com');
    
    expect(token).toBeDefined();
    expect(typeof token).toBe('string');
    expect(token.length).toBeGreaterThan(0);
  });

  it('should verify a valid token', () => {
    const orderId = 'order-456';
    const email = 'test@example.com';
    const token = generateToken(orderId, email);
    const result = verifyToken(token);

    expect(result).toBeDefined();
    expect(result?.orderId).toBe(orderId);
    expect(result?.customerEmail).toBe(email);
    expect(result?.createdAt).toBeGreaterThan(0);
  });

  it('should reject an invalid token', () => {
    const result = verifyToken('invalid-token-xyz');
    expect(result).toBeNull();
  });

  it('should reject a tampered token', () => {
    const token = generateToken('order-789', 'user@example.com');
    // Tamper with the token by modifying the last few characters
    const tamperedToken = token.slice(0, -5) + 'XXXXX';
    const result = verifyToken(tamperedToken);
    expect(result).toBeNull();
  });

  it('should reject a token with modified payload', () => {
    const token = generateToken('order-999', 'user@example.com');
    // Decode and modify the payload
    const decoded = Buffer.from(token, 'base64').toString('utf-8');
    const [payload, signature] = decoded.split('.');
    
    // Modify the payload (change email)
    const modifiedPayload = payload.replace('user@example.com', 'hacker@example.com');
    const tamperedToken = Buffer.from(`${modifiedPayload}.${signature}`).toString('base64');
    
    const result = verifyToken(tamperedToken);
    expect(result).toBeNull();
  });

  it('should preserve all data in token', () => {
    const orderId = 'order-12345';
    const email = 'preserve@test.com';
    const token = generateToken(orderId, email);
    const result = verifyToken(token);

    expect(result?.orderId).toBe(orderId);
    expect(result?.customerEmail).toBe(email);
  });

  it('should handle special characters in email', () => {
    const orderId = 'order-special';
    const email = 'user+tag@example.co.uk';
    const token = generateToken(orderId, email);
    const result = verifyToken(token);

    expect(result?.customerEmail).toBe(email);
  });
});
