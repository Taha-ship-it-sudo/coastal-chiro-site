import { NextResponse } from "next/server";
import { z } from "zod";
import { chatSystemPrompt } from "@/lib/clinic-context";
import { getOpenAI } from "@/lib/openai";

const bodySchema = z.object({
  messages: z
    .array(
      z.object({
        role: z.enum(["user", "assistant"]),
        content: z.string().max(4000),
      }),
    )
    .max(24),
});

export async function POST(req: Request) {
  const openai = getOpenAI();
  if (!openai) {
    return NextResponse.json(
      {
        error:
          "Chat is not configured. Add OPENAI_API_KEY on the server to enable the assistant.",
      },
      { status: 503 },
    );
  }

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

  const { messages } = parsed.data;
  if (messages.length === 0 || messages[messages.length - 1]?.role !== "user") {
    return NextResponse.json(
      { error: "Last message must be from the user" },
      { status: 400 },
    );
  }

  try {
    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      temperature: 0.5,
      max_tokens: 500,
      messages: [
        { role: "system", content: chatSystemPrompt() },
        ...messages.map((m) => ({ role: m.role, content: m.content })),
      ],
    });

    const text = completion.choices[0]?.message?.content?.trim();
    if (!text) {
      return NextResponse.json({ error: "Empty model response" }, { status: 502 });
    }

    return NextResponse.json({ reply: text });
  } catch (e) {
    console.error("OpenAI chat error", e);
    return NextResponse.json(
      { error: "The assistant is temporarily unavailable. Please call the office." },
      { status: 502 },
    );
  }
}
