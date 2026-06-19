import { Resend } from "resend";

type EmailInput = {
  name: string;
  email: string;
  project?: string;
  stack?: string;
  message: string;
};

// Sends a notification email to Victor. Returns true on success, false if the
// integration isn't configured or the send fails — the caller still saves the
// submission regardless, so a missing key never loses a lead.
export async function sendNotification(data: EmailInput): Promise<boolean> {
  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.CONTACT_TO_EMAIL || "victorv3925@gmail.com";
  const from = process.env.CONTACT_FROM_EMAIL || "onboarding@resend.dev";

  if (!apiKey) {
    console.warn("RESEND_API_KEY not set — skipping email, submission still saved.");
    return false;
  }

  try {
    const resend = new Resend(apiKey);
    const { error } = await resend.emails.send({
      from: `Portfolio <${from}>`,
      to,
      replyTo: data.email,
      subject: `New project inquiry — ${data.name}`,
      text: [
        `Name: ${data.name}`,
        `Email: ${data.email}`,
        `Project: ${data.project || "—"}`,
        `Stack: ${data.stack || "—"}`,
        "",
        "Message:",
        data.message,
      ].join("\n"),
    });

    if (error) {
      console.error("Resend error:", error);
      return false;
    }
    return true;
  } catch (err) {
    console.error("Email send failed:", err);
    return false;
  }
}
