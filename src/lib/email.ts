import { Resend } from "resend";

const apiKey = process.env.RESEND_API_KEY;
const from = process.env.EMAIL_FROM || "Visgrow <onboarding@resend.dev>";
const to = process.env.EMAIL_TO || "hello@visgrowinternships.com.au";
const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

const resend = apiKey ? new Resend(apiKey) : null;

export type EnquiryPayload = {
  id?: string | number;
  name: string;
  email: string;
  phone?: string;
  organisation?: string;
  audience?: string;
  enquiryType?: string;
  message?: string;
  source?: string;
};

const esc = (s: string) =>
  s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

const row = (label: string, value?: string) =>
  value
    ? `<tr>
         <td style="padding:6px 14px 6px 0;color:#5c5470;font:600 13px system-ui;white-space:nowrap;vertical-align:top">${esc(label)}</td>
         <td style="padding:6px 0;color:#241a33;font:400 14px system-ui">${esc(value)}</td>
       </tr>`
    : "";

/** Tells the Visgrow team a new lead came in. */
async function notifyTeam(e: EnquiryPayload) {
  if (!resend) return { skipped: true as const };

  const subject = `New enquiry — ${e.name}${e.enquiryType ? ` · ${e.enquiryType}` : ""}`;

  const html = `
    <div style="max-width:560px;margin:0 auto;font-family:system-ui,sans-serif">
      <div style="height:5px;background:linear-gradient(90deg,#6918dc,#b625b9,#e94b6c,#f6a83d);border-radius:4px"></div>
      <h2 style="margin:22px 0 4px;color:#241a33;font-size:20px">New enquiry from the website</h2>
      <p style="margin:0 0 20px;color:#5c5470;font-size:14px">Reply within one business day — that's what the site promises.</p>
      <table style="border-collapse:collapse;width:100%">
        ${row("Name", e.name)}
        ${row("Email", e.email)}
        ${row("Phone", e.phone)}
        ${row("Organisation", e.organisation)}
        ${row("Interested in", e.enquiryType)}
        ${row("Came from", e.source)}
      </table>
      ${
        e.message
          ? `<div style="margin-top:20px;padding:16px;background:#f8f5ff;border-radius:12px">
               <p style="margin:0 0 6px;color:#5c5470;font:600 12px system-ui;text-transform:uppercase;letter-spacing:.6px">In their words</p>
               <p style="margin:0;color:#241a33;font-size:14px;line-height:1.6;white-space:pre-wrap">${esc(e.message)}</p>
             </div>`
          : ""
      }
      <p style="margin-top:24px">
        <a href="${siteUrl}/admin/collections/enquiries${e.id ? `/${e.id}` : ""}"
           style="display:inline-block;padding:12px 22px;border-radius:999px;background:#6918dc;color:#fff;font:700 14px system-ui;text-decoration:none">
          Open in admin
        </a>
      </p>
    </div>`;

  return resend.emails.send({
    from,
    to,
    subject,
    html,
    replyTo: e.email,
  });
}

/** Confirms to the person that a human will actually get back to them. */
async function confirmToLead(e: EnquiryPayload) {
  if (!resend) return { skipped: true as const };

  const html = `
    <div style="max-width:540px;margin:0 auto;font-family:system-ui,sans-serif">
      <div style="height:5px;background:linear-gradient(90deg,#6918dc,#b625b9,#e94b6c,#f6a83d);border-radius:4px"></div>
      <h2 style="margin:22px 0 10px;color:#241a33;font-size:21px">Thanks ${esc(e.name.split(" ")[0])} — we've got it.</h2>
      <p style="margin:0 0 14px;color:#241a33;font-size:15px;line-height:1.65">
        Mustafa will come back to you within one business day. Not a sales sequence — an actual conversation about where you're stuck.
      </p>
      <p style="margin:0 0 14px;color:#5c5470;font-size:14px;line-height:1.65">
        If we're not the right fit for what you need, we'll tell you that instead of selling you something.
      </p>
      <p style="margin:22px 0 0;color:#5c5470;font-size:13px;line-height:1.6">
        In the meantime, the free masterclass covers the mistakes that get most applications filtered out before a human reads them.
      </p>
      <p style="margin:14px 0 0">
        <a href="${siteUrl}/masterclass"
           style="display:inline-block;padding:12px 24px;border-radius:999px;background:linear-gradient(90deg,#6918dc,#b625b9,#e94b6c,#f6a83d);color:#fff;font:700 14px system-ui;text-decoration:none">
          Watch the free masterclass
        </a>
      </p>
      <p style="margin:28px 0 0;color:#8c85a0;font-size:12px;line-height:1.6">
        Visgrow · Adelaide, South Australia<br>
        You're getting this because you filled in a form at ${esc(siteUrl.replace(/^https?:\/\//, ""))}.
      </p>
    </div>`;

  return resend.emails.send({
    from,
    to: e.email,
    subject: "We got your message — Visgrow",
    html,
  });
}

/**
 * The sign-in link for the 14-Day Accelerator.
 *
 * Throws on failure, unlike the enquiry emails — if this doesn't arrive the
 * student simply cannot get in, so we want to know about it.
 */
export async function sendSignInLink({
  name,
  email,
  token,
}: {
  name: string;
  email: string;
  token: string;
}) {
  if (!resend) {
    // In development without a mail key, print the link so it's still testable.
    console.warn(
      `[visgrow:lms] No RESEND_API_KEY. Sign-in link for ${email}:\n  ${siteUrl}/api/lms/verify?token=${token}`,
    );
    return;
  }

  const link = `${siteUrl}/api/lms/verify?token=${token}`;

  const html = `
    <div style="max-width:520px;margin:0 auto;font-family:system-ui,sans-serif">
      <div style="height:5px;background:linear-gradient(90deg,#6918dc,#b625b9,#e94b6c,#f6a83d);border-radius:4px"></div>
      <h2 style="margin:22px 0 10px;color:#241a33;font-size:21px">Here's your way in, ${esc(name.split(" ")[0])}.</h2>
      <p style="margin:0 0 20px;color:#241a33;font-size:15px;line-height:1.65">
        Click below to open your 14-Day Accelerator. No password needed.
      </p>
      <p style="margin:0 0 22px">
        <a href="${link}"
           style="display:inline-block;padding:14px 28px;border-radius:999px;background:linear-gradient(90deg,#6918dc,#b625b9,#e94b6c,#f6a83d);color:#fff;font:800 15px system-ui;text-decoration:none">
          Open my program
        </a>
      </p>
      <p style="margin:0 0 6px;color:#5c5470;font-size:13px;line-height:1.6">
        This link works once and expires in 30 minutes. If it's expired, just ask for a new one.
      </p>
      <p style="margin:0;color:#8c85a0;font-size:12px;line-height:1.6">
        If you didn't ask for this, you can ignore it — nobody can get into your program without this email.
      </p>
    </div>`;

  const result = await resend.emails.send({
    from,
    to: email,
    subject: "Your Visgrow sign-in link",
    html,
  });

  if (result.error) {
    console.error("[visgrow:lms] sign-in email failed:", result.error);
    throw new Error("Could not send the sign-in email.");
  }
}

/**
 * The daily digest: who Mustafa owes a call today.
 *
 * The point is that he never has to remember to open the admin. If there's
 * nothing to do, nothing is sent — a digest that arrives every day saying
 * "nothing today" trains you to ignore it.
 */
export async function sendDailyDigest({
  due,
  fresh,
  stalled,
}: {
  due: { id: string | number; name: string; phone?: string | null; enquiryType?: string | null; followUpDate?: string | null }[];
  fresh: { id: string | number; name: string; enquiryType?: string | null }[];
  stalled: { name: string; email: string; days: number }[];
}) {
  if (!resend) return { skipped: true as const };
  if (!due.length && !fresh.length && !stalled.length) return { skipped: true as const };

  const item = (label: string, sub: string, href: string) => `
    <li style="margin:0 0 10px;padding:12px 14px;background:#f8f5ff;border-radius:10px;list-style:none">
      <a href="${href}" style="color:#241a33;font:700 14.5px system-ui;text-decoration:none">${esc(label)}</a>
      <div style="color:#5c5470;font:400 13px system-ui;margin-top:2px">${esc(sub)}</div>
    </li>`;

  const section = (title: string, rows: string[]) =>
    rows.length
      ? `<h3 style="margin:26px 0 10px;color:#241a33;font-size:15px">${title}</h3>
         <ul style="margin:0;padding:0">${rows.join("")}</ul>`
      : "";

  const html = `
    <div style="max-width:560px;margin:0 auto;font-family:system-ui,sans-serif">
      <div style="height:5px;background:linear-gradient(90deg,#6918dc,#b625b9,#e94b6c,#f6a83d);border-radius:4px"></div>
      <h2 style="margin:22px 0 4px;color:#241a33;font-size:20px">Today's follow-ups</h2>
      <p style="margin:0;color:#5c5470;font-size:13.5px">
        ${due.length + fresh.length} ${due.length + fresh.length === 1 ? "person" : "people"} waiting on you.
      </p>

      ${section(
        "⏰ Follow up today",
        due.map((d) =>
          item(
            d.name,
            [d.enquiryType, d.phone].filter(Boolean).join(" · ") || "No details yet",
            `${siteUrl}/admin/collections/enquiries/${d.id}`,
          ),
        ),
      )}

      ${section(
        "🔵 New, not contacted yet",
        fresh.map((f) =>
          item(f.name, f.enquiryType || "No details yet", `${siteUrl}/admin/collections/enquiries/${f.id}`),
        ),
      )}

      ${section(
        "😴 Students who've gone quiet",
        stalled.map((s) =>
          item(s.name, `No sign-in for ${s.days} days · ${s.email}`, `${siteUrl}/admin/collections/students`),
        ),
      )}

      <p style="margin:28px 0 0;color:#8c85a0;font-size:12px;line-height:1.6">
        Sent because there was something to act on. Quiet days get no email.
      </p>
    </div>`;

  return resend.emails.send({
    from,
    to,
    subject: `Visgrow — ${due.length + fresh.length} to follow up today`,
    html,
  });
}

/**
 * A nudge to a student who has stopped.
 *
 * Deliberately warm and low-pressure. Someone who has stalled usually feels
 * bad about it already; a guilt-trip makes them avoid the program entirely.
 */
export async function sendStudentNudge({
  name,
  email,
  daysQuiet,
  nextDay,
}: {
  name: string;
  email: string;
  daysQuiet: number;
  nextDay: number | null;
}) {
  if (!resend) return { skipped: true as const };

  const html = `
    <div style="max-width:520px;margin:0 auto;font-family:system-ui,sans-serif">
      <div style="height:5px;background:linear-gradient(90deg,#6918dc,#b625b9,#e94b6c,#f6a83d);border-radius:4px"></div>
      <h2 style="margin:22px 0 10px;color:#241a33;font-size:21px">Still with us, ${esc(name.split(" ")[0])}?</h2>
      <p style="margin:0 0 14px;color:#241a33;font-size:15px;line-height:1.65">
        It's been ${daysQuiet} days. No judgement — life gets in the way, and
        the program waits for you.
      </p>
      ${
        nextDay
          ? `<p style="margin:0 0 18px;color:#5c5470;font-size:14.5px;line-height:1.65">
               Day ${nextDay} is sitting there ready whenever you are. Twenty
               minutes is enough to get moving again.
             </p>`
          : ""
      }
      <p style="margin:0 0 22px">
        <a href="${siteUrl}/sign-in"
           style="display:inline-block;padding:13px 26px;border-radius:999px;background:linear-gradient(90deg,#6918dc,#b625b9,#e94b6c,#f6a83d);color:#fff;font:800 14.5px system-ui;text-decoration:none">
          Pick up where I left off
        </a>
      </p>
      <p style="margin:0;color:#5c5470;font-size:13px;line-height:1.6">
        Stuck on something specific? Reply to this, or call 1300 891 365.
        That's what the coaching is for.
      </p>
    </div>`;

  return resend.emails.send({
    from,
    to: email,
    subject: `Your Accelerator is waiting, ${name.split(" ")[0]}`,
    html,
    replyTo: to,
  });
}

/**
 * Fire both emails. Never throws: a mail outage must not lose a lead,
 * because the enquiry is already safe in the database by this point.
 */
export async function sendEnquiryEmails(e: EnquiryPayload) {
  if (!resend) {
    console.warn("[visgrow:email] RESEND_API_KEY not set — skipping emails.");
    return;
  }
  const results = await Promise.allSettled([notifyTeam(e), confirmToLead(e)]);
  results.forEach((r, i) => {
    if (r.status === "rejected") {
      console.error(
        `[visgrow:email] ${i === 0 ? "team notification" : "lead confirmation"} failed:`,
        r.reason,
      );
    }
  });
}
