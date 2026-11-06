import { NextRequest, NextResponse } from "next/server";
import { resend } from "@/lib/resend";
import { contactTemplate } from "@/lib/email-templates/contact";
import { parseFormBody } from "@/lib/form-validation";

const SEND_FAILED = "We couldn't send your message right now. Please try again later.";

export async function POST(request: NextRequest) {
  // JSON only. Another site can't send application/json cross-origin without
  // a CORS preflight (which fails), so this stops drive-by posts from other pages.
  if (!request.headers.get("content-type")?.toLowerCase().startsWith("application/json")) {
    return NextResponse.json({ error: "Invalid request" }, { status: 415 });
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }

  const parsed = parseFormBody(body);
  if (!parsed.ok) {
    return NextResponse.json({ error: parsed.error }, { status: 400 });
  }
  // Honeypot filled: almost certainly a bot. Report success so it moves on.
  if (parsed.isBot) {
    return NextResponse.json({ success: true });
  }
  const { name, email, message } = parsed.fields;

  try {
    // Resend reports failures (bad key, unverified domain, quota, 4xx/5xx) in
    // `error` instead of throwing.
    const { error } = await resend.emails.send({
      from: "DeepSoCal <hello@deepsocal.com>",
      to: process.env.TO_EMAIL || "deepsocalagency@gmail.com",
      replyTo: email,
      subject: `New Contact Form: ${name}`,
      html: contactTemplate({ name, email, message }),
    });
    if (error) {
      // Log the lead so it can be recovered from the pm2 logs.
      console.error("[contact] Resend send failed:", error, { name, email, message });
      return NextResponse.json({ error: SEND_FAILED }, { status: 502 });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("[contact] Resend error:", error, { name, email, message });
    return NextResponse.json({ error: SEND_FAILED }, { status: 500 });
  }
}
