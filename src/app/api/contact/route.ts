import { NextRequest, NextResponse } from "next/server";
import { resend } from "@/lib/resend";
import { contactTemplate } from "@/lib/email-templates/contact";

export async function POST(request: NextRequest) {
  const { name, email, message } = await request.json();

  if (!name || !email) {
    return NextResponse.json(
      { error: "Name and email are required" },
      { status: 400 }
    );
  }

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
