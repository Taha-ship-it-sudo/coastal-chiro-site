import { NextResponse } from "next/server";
import { z } from "zod";
import { chatSystemPrompt } from "@/lib/clinic-context";
import { fallbackChatReply } from "@/lib/chat-fallback";
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

  const userText = messages[messages.length - 1]?.content ?? "";
  const openai = getOpenAI();
  if (!openai) {
    return NextResponse.json({ reply: fallbackChatReply(userText), fallback: true });
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
      return NextResponse.json({ reply: fallbackChatReply(userText), fallback: true });
    }

    return NextResponse.json({ reply: text });
  } catch (e) {
    console.error("OpenAI chat error", e);
    return NextResponse.json({ reply: fallbackChatReply(userText), fallback: true });
  }
}
