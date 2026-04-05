import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export interface SendPurchaseEmailParams {
  customerEmail: string;
  customerName: string;
  downloadLink: string;
}

export async function sendPurchaseConfirmationEmail({
  customerEmail,
  customerName,
  downloadLink,
}: SendPurchaseEmailParams): Promise<{ success: boolean; error?: string }> {
  try {
    const result = await resend.emails.send({
      from: 'MOSES Storefront <noreply@resend.dev>',
      to: customerEmail,
      subject: '🎵 Your CLARITY Album is Ready to Download',
      html: `
        <!DOCTYPE html>
        <html>
          <head>
            <meta charset="utf-8">
            <style>
              body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; line-height: 1.6; color: #333; }
              .container { max-width: 600px; margin: 0 auto; padding: 20px; }
              .header { text-align: center; margin-bottom: 30px; }
              .header h1 { color: #dc2626; margin: 0; font-size: 28px; }
              .content { background: #f9fafb; padding: 30px; border-radius: 8px; margin-bottom: 30px; }
              .button { display: inline-block; background: #dc2626; color: white; padding: 12px 30px; border-radius: 6px; text-decoration: none; font-weight: bold; margin: 20px 0; }
              .button:hover { background: #b91c1c; }
              .footer { text-align: center; color: #666; font-size: 12px; border-top: 1px solid #e5e7eb; padding-top: 20px; }
              .track-list { background: white; padding: 20px; border-radius: 6px; margin: 20px 0; }
              .track-list h3 { color: #dc2626; margin-top: 0; }
              .track-item { padding: 8px 0; border-bottom: 1px solid #e5e7eb; }
              .track-item:last-child { border-bottom: none; }
            </style>
          </head>
          <body>
            <div class="container">
              <div class="header">
                <h1>🎵 CLARITY</h1>
                <p style="margin: 10px 0 0 0; color: #666;">Thank you for your purchase!</p>
              </div>

              <div class="content">
                <p>Hi ${customerName},</p>
                
                <p>Thank you for purchasing <strong>CLARITY</strong>! Your album is ready to download.</p>

                <p style="text-align: center;">
                  <a href="${downloadLink}" class="button">📥 Download Your Album</a>
                </p>

                <p>This link will always be available, so you can come back and download your files anytime.</p>

                <div class="track-list">
                  <h3>📀 What You're Getting:</h3>
                  <div class="track-item">✓ 12 Premium Tracks (MP3)</div>
                  <div class="track-item">✓ 4 Brand Images (High Resolution)</div>
                  <div class="track-item">✓ Complete Lyric Book (PDF)</div>
                </div>

                <p><strong>Stream Everywhere:</strong></p>
                <p>Listen to CLARITY on all major platforms:</p>
                <p style="text-align: center;">
                  <a href="https://distrokid.com/hyperfollow/mosesofelgin/clarity?ref=release" style="color: #dc2626; text-decoration: none; font-weight: bold;">🎧 Apple Music • Spotify • YouTube Music & More</a>
                </p>
              </div>

              <div class="footer">
                <p>© 2026 MOSES Storefront. All rights reserved.</p>
                <p>Questions? Reply to this email or visit our website.</p>
              </div>
            </div>
          </body>
        </html>
      `,
    });

    if (result.error) {
      console.error('[Email] Failed to send purchase confirmation:', result.error);
      return { success: false, error: result.error.message };
    }

    console.log('[Email] Purchase confirmation sent to', customerEmail);
    return { success: true };
  } catch (error) {
    console.error('[Email] Error sending purchase confirmation:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error',
    };
  }
}
