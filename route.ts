import { NextRequest, NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

/**
 * Called by a Postgres trigger (see supabase/add_stamp_notifications.sql)
 * every time a new row lands in `stamp_instances` — whether it came from
 * the bulk-import script, the birthday/anniversary automation, or later
 * an admin panel. Sends the member a short congratulations email.
 *
 * Protected by a shared secret so random visitors can't trigger emails.
 */
export async function POST(request: NextRequest) {
  const secret = request.headers.get('x-notify-secret');
  if (!secret || secret !== process.env.NOTIFY_STAMP_SECRET) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const { email, fullName, stampName } = await request.json();

  if (!email || !stampName) {
    return NextResponse.json({ error: 'Missing email or stampName' }, { status: 400 });
  }

  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT ?? 465),
    secure: true,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });

  const firstName = fullName ? String(fullName).split(' ')[0] : '';
  const appUrl = process.env.NEXT_PUBLIC_APP_URL ?? 'https://infinite-passport.vercel.app';

  try {
    await transporter.sendMail({
      from: `"Infinite Passport" <${process.env.SMTP_USER}>`,
      to: email,
      subject: '🎉 ¡Nuevo sello en tu Infinite Passport!',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 480px; margin: 0 auto; padding: 32px 24px; background:#F7F3E9;">
          <p style="font-size:11px; letter-spacing:2px; text-transform:uppercase; color:#C9A961; margin:0 0 16px;">YPO Bolivia · Infinite Passport</p>
          <h2 style="color:#041E42; font-size:22px; margin:0 0 12px;">¡Felicidades${firstName ? `, ${firstName}` : ''}!</h2>
          <p style="color:#333; font-size:15px; line-height:1.6;">Acabas de ganar un nuevo sello en tu YPO Journey:</p>
          <p style="font-size:20px; font-weight:bold; color:#041E42; margin:16px 0;">${stampName}</p>
          <a href="${appUrl}" style="display:inline-block; margin-top:12px; background:#041E42; color:#F7F3E9; text-decoration:none; padding:12px 24px; border-radius:999px; font-size:14px;">Ver mi pasaporte →</a>
        </div>
      `,
    });
    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error('notify-stamp: failed to send email', err);
    return NextResponse.json({ error: 'Failed to send email' }, { status: 500 });
  }
}
