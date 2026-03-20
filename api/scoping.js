const { Resend } = require('resend');

const resend = new Resend(process.env.RESEND_API_KEY);

function scopingTemplate({ name, email }) {
  const date = new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
  return `
<!DOCTYPE html>
<html>
<head><meta charset="utf-8"></head>
<body style="margin:0;padding:0;background:#f4f3f1;font-family:Arial,Helvetica,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#f4f3f1;padding:40px 20px;">
    <tr><td align="center">
      <table width="600" cellpadding="0" cellspacing="0" style="background:#ffffff;border-radius:0;">
        <tr>
          <td style="background:#000000;padding:32px 40px;">
            <span style="color:#ffffff;font-size:20px;font-weight:700;letter-spacing:2px;text-transform:uppercase;">DeepSoCal</span>
          </td>
        </tr>
        <tr>
          <td style="padding:40px;">
            <p style="margin:0 0 8px;font-size:12px;color:#888;text-transform:uppercase;letter-spacing:1px;">Free Scoping Workshop Request</p>
            <h1 style="margin:0 0 32px;font-size:28px;font-weight:700;color:#000;line-height:1.2;">${name}</h1>
            <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:32px;">
              <tr>
                <td style="padding:16px 0;border-bottom:1px solid #e8e8e8;">
                  <span style="font-size:11px;text-transform:uppercase;letter-spacing:1px;color:#888;">Name</span><br>
                  <span style="font-size:16px;color:#000;margin-top:4px;display:inline-block;">${name}</span>
                </td>
              </tr>
              <tr>
                <td style="padding:16px 0;border-bottom:1px solid #e8e8e8;">
                  <span style="font-size:11px;text-transform:uppercase;letter-spacing:1px;color:#888;">Email</span><br>
                  <a href="mailto:${email}" style="font-size:16px;color:#000;text-decoration:none;margin-top:4px;display:inline-block;">${email}</a>
                </td>
              </tr>
              <tr>
                <td style="padding:16px 0;">
                  <span style="font-size:11px;text-transform:uppercase;letter-spacing:1px;color:#888;">Date</span><br>
                  <span style="font-size:16px;color:#000;margin-top:4px;display:inline-block;">${date}</span>
                </td>
              </tr>
            </table>
            <a href="mailto:${email}" style="display:inline-block;background:#000;color:#fff;padding:14px 28px;text-decoration:none;font-size:12px;text-transform:uppercase;letter-spacing:1px;font-weight:400;">Reply to ${name}</a>
          </td>
        </tr>
        <tr>
          <td style="background:#f4f3f1;padding:24px 40px;text-align:center;">
            <p style="margin:0;font-size:12px;color:#999;">DeepSoCal &mdash; Your Embedded Ally in Southern California</p>
          </td>
        </tr>
      </table>
    </td></tr>
  </table>
</body>
</html>`;
}

module.exports = async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { name, email } = req.body;

  if (!name || !email) {
    return res.status(400).json({ error: 'Name and email are required' });
  }

  try {
    await resend.emails.send({
      from: 'DeepSoCal <hello@deepsocal.com>',
      to: process.env.TO_EMAIL || 'deepsocalagency@gmail.com',
      replyTo: email,
      subject: `New Scoping Workshop Request: ${name}`,
      html: scopingTemplate({ name, email }),
    });

    return res.status(200).json({ success: true });
  } catch (error) {
    console.error('Resend error:', error);
    return res.status(500).json({ error: 'Failed to send email' });
  }
};
