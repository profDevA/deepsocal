import { NextRequest, NextResponse } from "next/server";
import { resend } from "@/lib/resend";
import { scopingTemplate } from "@/lib/email-templates/scoping";
import { parseFormBody } from "@/lib/form-validation";

const SEND_FAILED = "We couldn't send your request right now. Please try again later.";

export async function POST(request: NextRequest) {
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
  const { name, email } = parsed.fields;

  try {
    // Resend reports failures (bad key, unverified domain, quota, 4xx/5xx) in
    // `error` instead of throwing.
    const { error } = await resend.emails.send({
      from: "DeepSoCal <hello@deepsocal.com>",
      to: process.env.TO_EMAIL || "deepsocalagency@gmail.com",
      replyTo: email,
      subject: `New Scoping Workshop Request: ${name}`,
      html: scopingTemplate({ name, email }),
    });
    if (error) {
      // Log the lead so it can be recovered from the pm2 logs.
      console.error("[scoping] Resend send failed:", error, { name, email });
      return NextResponse.json({ error: SEND_FAILED }, { status: 502 });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("[scoping] Resend error:", error, { name, email });
    return NextResponse.json({ error: SEND_FAILED }, { status: 500 });
  }
}
