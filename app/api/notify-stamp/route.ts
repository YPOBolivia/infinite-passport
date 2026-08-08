import { NextRequest, NextResponse } from 'next/server';
import nodemailer from 'nodemailer';
import { createClient } from '@supabase/supabase-js';
import { STAMP_DEFINITIONS } from '@/lib/stamps';

/**
 * Called by a Postgres trigger (see supabase/add_stamp_notifications.sql)
 * every time a new row lands in `stamp_instances` — whether it came from
 * the bulk-import script, the birthday/anniversary automation, or later
 * an admin panel. Sends the member a branded "you earned a stamp" card
 * by email, including their overall journey completion so far.
 *
 * Protected by a shared secret so random visitors can't trigger emails.
 */
export async function POST(request: NextRequest) {
  const secret = request.headers.get('x-notify-secret');
  if (!secret || secret !== process.env.NOTIFY_STAMP_SECRET) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const { email, fullName, memberId, stampName, stampDescription, stampCategory } = await request.json();

  if (!email || !stampName) {
    return NextResponse.json({ error: 'Missing email or stampName' }, { status: 400 });
  }

  // Work out overall completion % so far, so the email feels alive
  // and pulls people back in — not just "you got one thing".
  let completionPct = 0;
  let totalEarned = 0;
  const totalPossible = STAMP_DEFINITIONS.filter((d) => !d.secret).length;

  if (memberId && process.env.SUPABASE_SERVICE_ROLE_KEY) {
    const admin = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY);
    const { count, error: countError } = await admin
      .from('stamp_instances')
      .select('*', { count: 'exact', head: true })
      .eq('member_id', memberId);
    if (countError) {
      console.error('notify-stamp: failed to count stamps for', memberId, countError.message);
    }
    totalEarned = count ?? 0;
    completionPct = totalPossible ? Math.round((totalEarned / totalPossible) * 100) : 0;
  } else {
    console.error('notify-stamp: skipped completion calculation — memberId or SUPABASE_SERVICE_ROLE_KEY missing', {
      hasMemberId: Boolean(memberId),
      hasServiceRoleKey: Boolean(process.env.SUPABASE_SERVICE_ROLE_KEY),
    });
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
  const categoryLabel = stampCategory ? String(stampCategory).charAt(0).toUpperCase() + String(stampCategory).slice(1) + ' Visa' : '';

  const html = `
  <div style="background:#F7F3E9; padding:40px 16px; font-family: Georgia, 'Times New Roman', serif;">
    <table role="presentation" width="100%" style="max-width:480px; margin:0 auto; background:#041E42; border-radius:20px; overflow:hidden;" cellpadding="0" cellspacing="0">
      <tr>
        <td style="padding:36px 32px 28px; text-align:center;">
          <p style="font-family: Arial, sans-serif; font-size:10px; letter-spacing:3px; text-transform:uppercase; color:#C9A961; margin:0 0 6px;">YPO Bolivia Integrated</p>
          <p style="font-family: Arial, sans-serif; font-size:10px; letter-spacing:3px; text-transform:uppercase; color:rgba(201,169,97,0.55); margin:0 0 28px;">Infinite Passport</p>

          <div style="width:64px; height:64px; margin:0 auto 20px; border-radius:999px; border:2px solid #C9A961; display:flex; align-items:center; justify-content:center;">
            <table role="presentation" width="64" height="64"><tr><td align="center" valign="middle" style="color:#C9A961; font-size:26px;">✦</td></tr></table>
          </div>

          <p style="font-family: Arial, sans-serif; font-size:12px; letter-spacing:2px; text-transform:uppercase; color:rgba(247,243,233,0.5); margin:0 0 4px;">¡Felicidades${firstName ? `, ${firstName}` : ''}!</p>
          <h1 style="font-style:italic; font-weight:400; font-size:26px; color:#F7F3E9; margin:0 0 4px;">${stampName}</h1>
          ${categoryLabel ? `<p style="font-family: Arial, sans-serif; font-size:11px; letter-spacing:1px; color:#C9A961; margin:0 0 20px;">${categoryLabel}</p>` : ''}

          ${stampDescription ? `<p style="font-family: Arial, sans-serif; font-size:14px; line-height:1.6; color:rgba(247,243,233,0.75); margin:0 0 28px;">${stampDescription}</p>` : ''}

          <table role="presentation" width="100%" style="margin-bottom:8px;"><tr>
            <td style="font-family: Arial, sans-serif; font-size:11px; color:rgba(247,243,233,0.5);">Your journey</td>
            <td style="font-family: Arial, sans-serif; font-size:11px; color:#C9A961; text-align:right;">${completionPct}% complete</td>
          </tr></table>
          <table role="presentation" width="100%" style="height:6px; background:rgba(247,243,233,0.12); border-radius:99px; overflow:hidden;"><tr>
            <td width="${completionPct}%" style="background:#C9A961; height:6px;"></td>
            <td></td>
          </tr></table>

          <a href="${appUrl}/passport" style="display:inline-block; margin-top:32px; background:#C9A961; color:#041E42; text-decoration:none; padding:14px 32px; border-radius:999px; font-family: Arial, sans-serif; font-weight:bold; font-size:13px;">Ver mi pasaporte completo →</a>
        </td>
      </tr>
    </table>
    <p style="text-align:center; font-family: Arial, sans-serif; font-size:10px; color:#8B8578; margin-top:16px;">Infinite Passport · YPO Bolivia</p>
  </div>`;

  try {
    await transporter.sendMail({
      from: `"Infinite Passport" <${process.env.SMTP_USER}>`,
      to: email,
      subject: `🎉 Nuevo sello: ${stampName}`,
      html,
    });
    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error('notify-stamp: failed to send email', err);
    return NextResponse.json({ error: 'Failed to send email' }, { status: 500 });
  }
}
