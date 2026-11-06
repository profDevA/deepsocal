import { NextRequest, NextResponse } from "next/server";
import { resend } from "@/lib/resend";
import { contactTemplate } from "@/lib/email-templates/contact";
import { parseFormBody } from "@/lib/form-validation";

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
  const { name, email, message } = parsed.fields;

  try {
    await resend.emails.send({
      from: "DeepSoCal <hello@deepsocal.com>",
      to: process.env.TO_EMAIL || "deepsocalagency@gmail.com",
      replyTo: email,
      subject: `New Contact Form: ${name}`,
      html: contactTemplate({ name, email, message }),
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Resend error:", error);
    return NextResponse.json(
      { error: "Failed to send email" },
      { status: 500 }
    );
  }
}
