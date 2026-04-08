"use server";

import nodemailer from "nodemailer";
import {
  getContactFormData,
  hasContactFormErrors,
  validateContactFormData,
} from "@/lib/contactForm";
import type { ContactFormState } from "@/types/contact";

const GMAIL_USER = process.env.GMAIL_USER;
const GMAIL_APP_PASSWORD = process.env.GMAIL_APP_PASSWORD;
const CONTACT_RECEIVER_EMAIL = process.env.CONTACT_RECEIVER_EMAIL ?? GMAIL_USER;
const CONTACT_EMAIL_SUBJECT_PREFIX =
  process.env.CONTACT_EMAIL_SUBJECT_PREFIX ?? "Portfolio contact";
const CONTACT_FROM_NAME =
  process.env.CONTACT_FROM_NAME ?? "Prasert Nuannim Portfolio";

type MailLocale = "th" | "en";

function getMailLocale(formData: FormData): MailLocale {
  const locale = formData.get("locale");

  return locale === "th" ? "th" : "en";
}

function escapeHtml(value: string): string {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

function nl2br(value: string): string {
  return escapeHtml(value).replaceAll("\n", "<br />");
}

function renderEmailLayout({
  eyebrow,
  title,
  body,
}: {
  eyebrow: string;
  title: string;
  body: string;
}): string {
  return `
    <!DOCTYPE html>
    <html lang="en">
      <body style="margin:0;padding:0;background:#f3f7f4;font-family:Arial,sans-serif;color:#0f172a;">
        <div style="padding:32px 20px;">
          <div style="max-width:720px;margin:0 auto;background:#ffffff;border:1px solid #d9e5dd;border-radius:24px;overflow:hidden;">
            <div style="background:linear-gradient(135deg,#166534,#10b981);padding:26px 32px;color:#ffffff;">
              <div style="font-size:12px;letter-spacing:0.12em;text-transform:uppercase;opacity:0.9;">${escapeHtml(eyebrow)}</div>
              <h1 style="margin:10px 0 0;font-size:28px;line-height:1.2;font-weight:700;">${escapeHtml(title)}</h1>
            </div>
            <div style="padding:32px;">${body}</div>
          </div>
        </div>
      </body>
    </html>
  `;
}

function buildOwnerEmail(data: {
  name: string;
  email: string;
  message: string;
  locale: MailLocale;
}) {
  const isThai = data.locale === "th";
  const subject = `${CONTACT_EMAIL_SUBJECT_PREFIX}: ${data.name}`;
  const text = [
    isThai ? "มีข้อความติดต่อใหม่จากหน้าเว็บไซต์" : "New contact message from the website",
    "",
    `${isThai ? "ชื่อ" : "Name"}: ${data.name}`,
    `${isThai ? "อีเมล" : "Email"}: ${data.email}`,
    "",
    `${isThai ? "ข้อความ" : "Message"}:`,
    data.message,
  ].join("\n");

  const body = `
    <p style="margin:0 0 20px;font-size:16px;line-height:1.7;color:#334155;">
      ${escapeHtml(
        isThai
          ? "มีผู้ติดต่อส่งข้อความเข้ามาจากฟอร์มบนเว็บไซต์ของคุณ"
          : "A new message has been submitted through your website contact form."
      )}
    </p>
    <div style="border:1px solid #dbe7df;border-radius:18px;background:#f8fbf9;padding:20px;">
      <div style="margin:0 0 14px;">
        <div style="font-size:12px;font-weight:700;letter-spacing:0.08em;text-transform:uppercase;color:#64748b;">${
          isThai ? "ชื่อ" : "Name"
        }</div>
        <div style="margin-top:6px;font-size:16px;color:#0f172a;">${escapeHtml(data.name)}</div>
      </div>
      <div style="margin:0 0 14px;">
        <div style="font-size:12px;font-weight:700;letter-spacing:0.08em;text-transform:uppercase;color:#64748b;">${
          isThai ? "อีเมล" : "Email"
        }</div>
        <div style="margin-top:6px;font-size:16px;color:#0f172a;">${escapeHtml(data.email)}</div>
      </div>
      <div>
        <div style="font-size:12px;font-weight:700;letter-spacing:0.08em;text-transform:uppercase;color:#64748b;">${
          isThai ? "ข้อความ" : "Message"
        }</div>
        <div style="margin-top:6px;font-size:16px;line-height:1.8;color:#0f172a;">${nl2br(data.message)}</div>
      </div>
    </div>
  `;

  return {
    subject,
    text,
    html: renderEmailLayout({
      eyebrow: isThai ? "ข้อความติดต่อใหม่" : "New Contact Message",
      title: isThai ? "มีข้อความใหม่จากเว็บไซต์" : "You received a new contact message",
      body,
    }),
  };
}

function buildAutoReplyEmail(data: {
  name: string;
  email: string;
  message: string;
  locale: MailLocale;
}) {
  const isThai = data.locale === "th";
  const subject = isThai
    ? "ได้รับข้อความของคุณแล้ว"
    : "I received your message";
  const text = [
    isThai
      ? `สวัสดี ${data.name},`
      : `Hi ${data.name},`,
    "",
    isThai
      ? "ขอบคุณที่ติดต่อเข้ามา ผมได้รับข้อความของคุณเรียบร้อยแล้ว และจะตอบกลับโดยเร็วที่สุด"
      : "Thanks for reaching out. I received your message and will get back to you as soon as possible.",
    "",
    isThai ? "สรุปข้อความที่ส่งมา:" : "Here is a summary of your message:",
    `${isThai ? "ชื่อ" : "Name"}: ${data.name}`,
    `${isThai ? "อีเมล" : "Email"}: ${data.email}`,
    `${isThai ? "ข้อความ" : "Message"}:`,
    data.message,
  ].join("\n");

  const body = `
    <p style="margin:0 0 16px;font-size:16px;line-height:1.7;color:#334155;">
      ${escapeHtml(
        isThai ? `สวัสดี ${data.name},` : `Hi ${data.name},`
      )}
    </p>
    <p style="margin:0 0 20px;font-size:16px;line-height:1.8;color:#334155;">
      ${escapeHtml(
        isThai
          ? "ขอบคุณที่ติดต่อเข้ามา ผมได้รับข้อความของคุณเรียบร้อยแล้ว และจะตอบกลับโดยเร็วที่สุด"
          : "Thanks for reaching out. I received your message and will get back to you as soon as possible."
      )}
    </p>
    <div style="border:1px solid #dbe7df;border-radius:18px;background:#f8fbf9;padding:20px;">
      <div style="margin:0 0 14px;">
        <div style="font-size:12px;font-weight:700;letter-spacing:0.08em;text-transform:uppercase;color:#64748b;">${
          isThai ? "ชื่อ" : "Name"
        }</div>
        <div style="margin-top:6px;font-size:16px;color:#0f172a;">${escapeHtml(data.name)}</div>
      </div>
      <div style="margin:0 0 14px;">
        <div style="font-size:12px;font-weight:700;letter-spacing:0.08em;text-transform:uppercase;color:#64748b;">${
          isThai ? "อีเมล" : "Email"
        }</div>
        <div style="margin-top:6px;font-size:16px;color:#0f172a;">${escapeHtml(data.email)}</div>
      </div>
      <div>
        <div style="font-size:12px;font-weight:700;letter-spacing:0.08em;text-transform:uppercase;color:#64748b;">${
          isThai ? "ข้อความ" : "Message"
        }</div>
        <div style="margin-top:6px;font-size:16px;line-height:1.8;color:#0f172a;">${nl2br(data.message)}</div>
      </div>
    </div>
    <p style="margin:20px 0 0;font-size:14px;line-height:1.7;color:#64748b;">
      ${escapeHtml(
        isThai
          ? "อีเมลฉบับนี้ถูกส่งอัตโนมัติเพื่อยืนยันว่าผมได้รับข้อความของคุณแล้ว"
          : "This message was sent automatically to confirm that your inquiry was received."
      )}
    </p>
  `;

  return {
    subject,
    text,
    html: renderEmailLayout({
      eyebrow: isThai ? "ยืนยันการติดต่อ" : "Contact Confirmation",
      title: isThai ? "ได้รับข้อความของคุณแล้ว" : "Your message has been received",
      body,
    }),
  };
}

export async function sendMail(
  _prevState: ContactFormState,
  formData: FormData
): Promise<ContactFormState> {
  const data = getContactFormData(formData);
  const locale = getMailLocale(formData);
  const fieldErrors = validateContactFormData(data);

  if (hasContactFormErrors(fieldErrors)) {
    return {
      status: "error",
      messageKey: "invalidFields",
      fieldErrors,
    };
  }

  if (!GMAIL_USER || !GMAIL_APP_PASSWORD || !CONTACT_RECEIVER_EMAIL) {
    return {
      status: "error",
      messageKey: "missingConfig",
    };
  }

  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: GMAIL_USER,
        pass: GMAIL_APP_PASSWORD,
      },
    });

    const ownerEmail = buildOwnerEmail({
      name: data.name.trim(),
      email: data.email.trim(),
      message: data.message.trim(),
      locale,
    });

    await transporter.sendMail({
      from: `"${CONTACT_FROM_NAME}" <${GMAIL_USER}>`,
      to: CONTACT_RECEIVER_EMAIL,
      replyTo: data.email.trim(),
      subject: ownerEmail.subject,
      text: ownerEmail.text,
      html: ownerEmail.html,
    });

    const autoReplyEmail = buildAutoReplyEmail({
      name: data.name.trim(),
      email: data.email.trim(),
      message: data.message.trim(),
      locale,
    });

    try {
      await transporter.sendMail({
        from: `"${CONTACT_FROM_NAME}" <${GMAIL_USER}>`,
        to: data.email.trim(),
        replyTo: CONTACT_RECEIVER_EMAIL,
        subject: autoReplyEmail.subject,
        text: autoReplyEmail.text,
        html: autoReplyEmail.html,
      });
    } catch (error) {
      console.error("Failed to send auto-reply email", error);
    }

    return {
      status: "success",
      messageKey: "sent",
    };
  } catch (error) {
    console.error("Failed to send contact email", error);

    return {
      status: "error",
      messageKey: "sendFailed",
    };
  }
}
