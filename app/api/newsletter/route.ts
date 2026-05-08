import { NextResponse } from "next/server";
import { z } from "zod";
import { Resend } from "resend";
import { appendFile, mkdir } from "fs/promises";
import path from "path";

const bodySchema = z.object({
  email: z.string().email().max(320),
  name: z.string().max(120).optional(),
  source: z.enum(["welcome_popup", "footer", "other"]).optional(),
});

function promoPayload() {
  const code = process.env.FULLSCRIPT_PROMO_CODE?.trim();
  const note = process.env.FULLSCRIPT_PROMO_NOTE?.trim();
  return { code: code || null, note: note || null };
}

async function appendLocalSubscriber(email: string, name?: string, source?: string) {
  const dir = path.join(process.cwd(), "data");
  await mkdir(dir, { recursive: true });
  const file = path.join(dir, "subscribers.ndjson");
  const line = JSON.stringify({
    email,
    name: name ?? null,
    source: source ?? null,
    at: new Date().toISOString(),
  });
  await appendFile(file, line + "\n", "utf8");
}

function escapeHtml(s: string) {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function welcomeHtml(fullscriptCode: string | null, fullscriptNote: string | null) {
  const clinic = "Coastal Chiropractic SLO";
  const addr = "1025 Pacific Street, San Luis Obispo, CA 93401";
  const phone = "(805) 439-2513";

  const safeCode = fullscriptCode ? escapeHtml(fullscriptCode) : "";
  const safeNote = fullscriptNote ? escapeHtml(fullscriptNote) : "";

  const promoBlock =
    fullscriptCode || fullscriptNote
      ? `<p><strong>Your Fullscript offer</strong></p>
          ${
            fullscriptCode
              ? `<p>Use code <strong>${safeCode}</strong> at checkout on Fullscript for your supplement savings.</p>`
              : ""
          }
          ${fullscriptNote ? `<p>${safeNote}</p>` : ""}`
      : "";

  return `<p>Thank you for joining our newsletter.</p>
          <p>You&apos;ll hear from us with clinic updates, movement tips, and occasional announcements.</p>
          ${promoBlock}
          <p>${clinic}<br/>${addr}<br/>${phone}</p>`;
}

export async function POST(req: Request) {
  let json: unknown;
  try {
    json = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const parsed = bodySchema.safeParse(json);
  if (!parsed.success) {
    return NextResponse.json({ error: "Please enter a valid email." }, { status: 400 });
  }

  const { email, name, source } = parsed.data;
  const { code: fullscriptPromoCode, note: fullscriptNote } = promoPayload();

  const resendKey = process.env.RESEND_API_KEY;
  const audienceId = process.env.RESEND_AUDIENCE_ID;
  const from = process.env.RESEND_FROM_EMAIL;
  const notify = process.env.NEWSLETTER_NOTIFY_EMAIL;

  const jsonOk = {
    ok: true as const,
    fullscriptPromoCode,
  };

  if (resendKey && audienceId && from) {
    const resend = new Resend(resendKey);
    try {
      const contact = await resend.contacts.create({
        audienceId,
        email,
        firstName: name?.split(" ")[0],
        lastName: name?.includes(" ") ? name.split(" ").slice(1).join(" ") : undefined,
        unsubscribed: false,
      });
      if (contact.error) {
        console.error("Resend contact error", contact.error);
        return NextResponse.json(
          { error: "Could not complete signup right now. Please try again later." },
          { status: 502 },
        );
      }

      const welcome = await resend.emails.send({
        from,
        to: email,
        subject: "You're signed up — Coastal Chiropractic SLO",
        html: welcomeHtml(fullscriptPromoCode, fullscriptNote),
      });
      if (welcome.error) {
        console.error("Resend welcome email error", welcome.error);
      }

      if (notify) {
        const alert = await resend.emails.send({
          from,
          to: notify,
          subject: `Newsletter signup${source ? ` (${source})` : ""}: ${email}`,
          html: `<p>New subscriber: ${email}</p>${name ? `<p>Name: ${name}</p>` : ""}${source ? `<p>Source: ${source}</p>` : ""}`,
        });
        if (alert.error) console.error("Resend notify error", alert.error);
      }

      return NextResponse.json(jsonOk);
    } catch (e) {
      console.error("Newsletter Resend error", e);
      return NextResponse.json(
        { error: "Could not complete signup right now. Please try again later." },
        { status: 502 },
      );
    }
  }

  try {
    await appendLocalSubscriber(email, name, source);
    if (notify && resendKey && from) {
      const resend = new Resend(resendKey);
      await resend.emails.send({
        from,
        to: notify,
        subject: `Newsletter signup (local list)${source ? ` (${source})` : ""}: ${email}`,
        html: `<p>New subscriber (saved locally — configure RESEND_AUDIENCE_ID for full list sync): ${email}</p>${
          name ? `<p>Name: ${name}</p>` : ""
        }${source ? `<p>Source: ${source}</p>` : ""}`,
      });
    }
    return NextResponse.json({
      ...jsonOk,
      devNote:
        "Subscriber saved locally. Add RESEND_API_KEY, RESEND_AUDIENCE_ID, and RESEND_FROM_EMAIL for production email + audience sync.",
    });
  } catch (e) {
    console.error("Local newsletter save error", e);
    return NextResponse.json(
      { error: "Could not save subscription. Please try again later." },
      { status: 500 },
    );
  }
}
