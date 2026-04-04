import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST || "smtp.gmail.com",
  port: parseInt(process.env.SMTP_PORT || "587"),
  secure: process.env.SMTP_SECURE === "true",
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASSWORD,
  },
});

export interface EmailOptions {
  to: string;
  subject: string;
  html: string;
  text?: string;
}

/**
 * Send an email using the configured SMTP server
 */
export async function sendEmail(options: EmailOptions): Promise<boolean> {
  try {
    // Check if SMTP is configured
    if (!process.env.SMTP_USER || !process.env.SMTP_PASSWORD) {
      console.warn("[Email] SMTP not configured, skipping email send");
      return false;
    }

    await transporter.sendMail({
      from: process.env.SMTP_FROM || process.env.SMTP_USER,
      to: options.to,
      subject: options.subject,
      html: options.html,
      text: options.text,
    });

    console.log(`[Email] Sent email to ${options.to}`);
    return true;
  } catch (error) {
    console.error("[Email] Failed to send email:", error);
    return false;
  }
}

/**
 * Send purchase confirmation email with download link
 */
export async function sendPurchaseConfirmationEmail(
  customerEmail: string,
  customerName: string,
  downloadToken: string,
  downloadUrl: string
): Promise<boolean> {
  const subject = "Your CLARITY Album - Download Now";
  const html = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
      <h1 style="color: #333;">Thank You for Your Purchase!</h1>
      
      <p>Hi ${escapeHtml(customerName)},</p>
      
      <p>Your purchase of <strong>CLARITY</strong> by MOSES has been confirmed. You can now download your album bundle.</p>
      
      <div style="background-color: #f5f5f5; padding: 20px; border-radius: 8px; margin: 20px 0;">
        <h2 style="margin-top: 0;">Your Download Link</h2>
        <p>
          <a href="${downloadUrl}" style="display: inline-block; background-color: #000; color: #fff; padding: 12px 24px; text-decoration: none; border-radius: 4px; font-weight: bold;">
            Download CLARITY Bundle
          </a>
        </p>
        <p style="font-size: 12px; color: #666;">This link will remain active for 365 days.</p>
      </div>
      
      <h3>What You're Getting:</h3>
      <ul>
        <li>12 tracks (MP3 format)</li>
        <li>4 brand images</li>
        <li>Lyric book (PDF)</li>
      </ul>
      
      <p>If you have any questions, feel free to reach out.</p>
      
      <p style="color: #666; font-size: 12px; margin-top: 40px;">
        This is an automated message. Please do not reply to this email.
      </p>
    </div>
  `;

  return sendEmail({
    to: customerEmail,
    subject,
    html,
  });
}

/**
 * Escape HTML special characters to prevent XSS
 */
function escapeHtml(text: string): string {
  const map: Record<string, string> = {
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#039;",
  };
  return text.replace(/[&<>"']/g, (char) => map[char]);
}
