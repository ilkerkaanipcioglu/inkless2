import { components, internal } from "./_generated/api";
import { Resend } from "@convex-dev/resend";
import { internalMutation } from "./_generated/server";
import { v } from "convex/values";

export const resend: Resend = new Resend(components.resend, {
  testMode: false,
});

export const sendBookingConfirmation = internalMutation({
  args: {
    to: v.string(),
    name: v.string(),
    date: v.string(),
    time: v.string(),
    packageTitle: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const emailHtml = `
      <!DOCTYPE html>
      <html>
        <head>
          <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background: linear-gradient(135deg, #3b82f6 0%, #06b6d4 100%); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }
            .content { background: #f9fafb; padding: 30px; border-radius: 0 0 10px 10px; }
            .booking-details { background: white; padding: 20px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #3b82f6; }
            .detail-row { margin: 10px 0; }
            .label { font-weight: bold; color: #3b82f6; }
            .footer { text-align: center; margin-top: 30px; color: #6b7280; font-size: 14px; }
            .button { display: inline-block; background: #3b82f6; color: white; padding: 12px 30px; text-decoration: none; border-radius: 6px; margin: 20px 0; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>✓ Booking Confirmed!</h1>
              <p>Your appointment has been successfully scheduled</p>
            </div>
            <div class="content">
              <p>Dear ${args.name},</p>
              <p>Thank you for choosing Inkless Is More for your laser tattoo removal journey. We're excited to help you achieve clear, ink-free skin!</p>
              
              <div class="booking-details">
                <h2 style="margin-top: 0; color: #3b82f6;">Appointment Details</h2>
                <div class="detail-row">
                  <span class="label">📅 Date:</span> ${args.date}
                </div>
                <div class="detail-row">
                  <span class="label">⏰ Time:</span> ${args.time}
                </div>
                ${args.packageTitle ? `
                <div class="detail-row">
                  <span class="label">📦 Package:</span> ${args.packageTitle}
                </div>
                ` : ''}
                <div class="detail-row">
                  <span class="label">📍 Location:</span> Two Rivers Mall, 1st Floor, Nairobi, Kenya
                </div>
              </div>

              <h3>What to Expect:</h3>
              <ul>
                <li>Free consultation to assess your tattoo</li>
                <li>Personalized treatment plan discussion</li>
                <li>Advanced Picosecond laser technology</li>
                <li>Professional aftercare guidance</li>
              </ul>

              <h3>Before Your Appointment:</h3>
              <ul>
                <li>Avoid sun exposure on the tattooed area</li>
                <li>Stay hydrated</li>
                <li>Arrive 5-10 minutes early</li>
                <li>Bring any questions you may have</li>
              </ul>

              <div style="text-align: center;">
                <a href="tel:+254708901505" class="button">Call Us: +254 708 901 505</a>
              </div>

              <p>If you need to reschedule or have any questions, please don't hesitate to contact us.</p>

              <div class="footer">
                <p><strong>Inkless Is More</strong></p>
                <p>Two Rivers Mall, 1st Floor, Nairobi, Kenya</p>
                <p>📞 +254 708 901 505 | 📧 info@inklessismore.ke</p>
                <p style="margin-top: 20px; font-size: 12px;">
                  This is an automated confirmation email. Please do not reply directly to this message.
                </p>
              </div>
            </div>
          </div>
        </body>
      </html>
    `;

    await resend.sendEmail(ctx, {
      from: "Inkless Is More <bookings@inklessismore.ke>",
      to: args.to,
      subject: `Booking Confirmed - ${args.date} at ${args.time}`,
      html: emailHtml,
    });
  },
});