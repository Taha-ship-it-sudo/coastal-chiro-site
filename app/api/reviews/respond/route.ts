import { NextResponse } from "next/server";
import { z } from "zod";
import {
  CLINIC_NAME,
  CLINIC_ADDRESS,
  CLINIC_PHONE,
} from "@/lib/clinic-context";
import { getOpenAI } from "@/lib/openai";

const bodySchema = z.object({
  reviewText: z.string().min(1).max(8000),
  rating: z.number().min(1).max(5).optional(),
  reviewerName: z.string().max(200).optional(),
  /** Required when REVIEW_ASSISTANT_TOKEN is set */
  accessToken: z.string().optional(),
});

export async function POST(req: Request) {
  const expected = process.env.REVIEW_ASSISTANT_TOKEN;
  let json: unknown;
  try {
    json = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const parsed = bodySchema.safeParse(json);
  if (!parsed.success) {
    return NextResponse.json({ error: "Invalid request body" }, { status: 400 });
  }

  if (expected && parsed.data.accessToken !== expected) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const openai = getOpenAI();
  if (!openai) {
    return NextResponse.json(
      { error: "Add OPENAI_API_KEY to generate replies." },
      { status: 503 },
    );
  }

  const { reviewText, rating, reviewerName } = parsed.data;

  const system = `You help ${CLINIC_NAME} (${CLINIC_ADDRESS}, ${CLINIC_PHONE}) draft public responses to online reviews.

Rules:
- Thank the reviewer by first name only if a clear first name is given; otherwise say "Thank you for your review."
- Sound genuine, warm, and professional — not salesy.
- Never disclose protected health information or discuss other patients.
- Do not argue with negative reviews; acknowledge, apologize briefly if warranted, and invite them to call the office to resolve concerns privately.
- Keep the reply suitable for Google/Yelp (under ~600 characters unless the review is long and needs a slightly longer reply — still stay under 900 characters).
- Sign off in a way that fits the platform (no fake signatures from providers unless generic "— The team at ${CLINIC_NAME}").
- Output ONLY the reply text, no quotes or preamble.`;

  const user = [
    rating != null ? `Star rating (if applicable): ${rating}/5` : null,
    reviewerName ? `Reviewer name as given: ${reviewerName}` : null,
    `Review text:\n${reviewText}`,
  ]
    .filter(Boolean)
    .join("\n\n");

  try {
    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      temperature: 0.6,
      max_tokens: 400,
      messages: [
        { role: "system", content: system },
        { role: "user", content: user },
      ],
    });

    const draft = completion.choices[0]?.message?.content?.trim();
    if (!draft) {
      return NextResponse.json({ error: "Empty model response" }, { status: 502 });
    }

    return NextResponse.json({
      draft,
      note: "Review platforms require manual posting; this endpoint only drafts text. For true automation, connect the Google Business Profile API with OAuth and approved automation policies.",
    });
  } catch (e) {
    console.error("Review draft error", e);
    return NextResponse.json(
      { error: "Could not generate a draft right now." },
      { status: 502 },
    );
  }
}
