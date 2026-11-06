// Server-side checks for the public contact + scoping forms. Both API routes
// are unauthenticated and send email from hello@deepsocal.com, so every field
// is type-checked and length-capped here, and HTML-escaped in the templates.
// Per-IP rate limiting lives in nginx (see .cursor/deploy-aws-plan.md).

// Hidden input that people never see or fill; bots usually do.
export const HONEYPOT_FIELD = "website";

const MAX_NAME = 100;
const MAX_EMAIL = 254;
const MAX_MESSAGE = 5000;
// Deliberately loose: something@something.tld, no whitespace/quotes/brackets.
const EMAIL_RE = /^[^\s@<>"']+@[^\s@<>"']+\.[^\s@<>"']+$/;

export type FormFields = { name: string; email: string; message: string };

export type ParsedForm =
  | { ok: true; fields: FormFields; isBot: boolean }
  | { ok: false; error: string };

const text = (value: unknown) => (typeof value === "string" ? value.trim() : "");

// Control characters (incl. CR/LF) → spaces.
const stripControl = (value: string) =>
  Array.from(value, (ch) => (ch < " " || ch === "\u007f" ? " " : ch)).join("");

export function parseFormBody(body: unknown): ParsedForm {
  if (!body || typeof body !== "object") {
    return { ok: false, error: "Invalid request" };
  }
  const raw = body as Record<string, unknown>;
  // The name also goes into the email subject, so no control characters.
  const name = stripControl(text(raw.name)).trim();
  const email = text(raw.email);
  const message = text(raw.message);

  if (!name || name.length > MAX_NAME) {
    return { ok: false, error: "Please enter your name." };
  }
  if (email.length > MAX_EMAIL || !EMAIL_RE.test(email)) {
    return { ok: false, error: "Please enter a valid email address." };
  }
  if (message.length > MAX_MESSAGE) {
    return { ok: false, error: "Your message is too long." };
  }
  return {
    ok: true,
    fields: { name, email, message },
    isBot: text(raw[HONEYPOT_FIELD]) !== "",
  };
}

export function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}
