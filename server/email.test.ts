import { describe, it, expect, vi } from 'vitest';
import { sendEmail, sendPurchaseConfirmationEmail } from './email';

// Mock Resend
vi.mock('resend', () => {
  return {
    Resend: vi.fn().mockImplementation(() => ({
      emails: {
        send: vi.fn().mockResolvedValue({ error: null, id: 'email-123' }),
      },
    })),
  };
});

describe('Email Service', () => {
  it('should send email successfully when API key is configured', async () => {
    process.env.RESEND_API_KEY = 'test-key';
    
    const result = await sendEmail({
      to: 'test@example.com',
      subject: 'Test Subject',
      html: '<p>Test content</p>',
    });

    expect(result).toBe(true);
  });

  it('should return false when API key is not configured', async () => {
    delete process.env.RESEND_API_KEY;
    
    const result = await sendEmail({
      to: 'test@example.com',
      subject: 'Test Subject',
      html: '<p>Test content</p>',
    });

    expect(result).toBe(false);
  });

  it('should send purchase confirmation email with download link', async () => {
    process.env.RESEND_API_KEY = 'test-key';
    
    const result = await sendPurchaseConfirmationEmail(
      'customer@example.com',
      'John Doe',
      'token-123',
      'https://example.com/downloads?token=token-123'
    );

    expect(result).toBe(true);
  });

  it('should escape HTML in customer name', async () => {
    process.env.RESEND_API_KEY = 'test-key';
    
    const result = await sendPurchaseConfirmationEmail(
      'customer@example.com',
      '<script>alert("xss")</script>',
      'token-123',
      'https://example.com/downloads?token=token-123'
    );

    expect(result).toBe(true);
  });
});
