"use client";

import { useCallback, useEffect, useRef, useState } from "react";

type Msg = { role: "user" | "assistant"; content: string };

export function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<Msg[]>([
    {
      role: "assistant",
      content:
        "Hi, I am the after-hours assistant for Coastal Chiropractic SLO. Ask about services, new patient visits, or scheduling. For emergencies, call 911.",
    },
  ]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const endRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, open]);

  const send = useCallback(async () => {
    const text = input.trim();
    if (!text || loading) return;
    setError(null);
    setInput("");
    const next: Msg[] = [...messages, { role: "user", content: text }];
    setMessages(next);
    setLoading(true);
    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: next.map((m) => ({ role: m.role, content: m.content })),
        }),
      });
      const data = (await res.json()) as { reply?: string; error?: string };
      if (!res.ok) {
        setError(data.error ?? "Chat unavailable.");
        setMessages(next);
        return;
      }
      setMessages([...next, { role: "assistant", content: data.reply ?? "" }]);
    } catch {
      setError("Network error.");
      setMessages(next);
    } finally {
      setLoading(false);
    }
  }, [input, loading, messages]);

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        className="fixed bottom-5 right-5 z-[60] flex h-14 w-14 items-center justify-center rounded-full bg-teal-700 text-white shadow-lg transition hover:bg-teal-800 md:bottom-8 md:right-8"
        aria-expanded={open}
        aria-label={open ? "Close chat" : "Open chat"}
      >
        {open ? (
          <span className="text-2xl leading-none">x</span>
        ) : (
          <svg
            aria-hidden
            viewBox="0 0 24 24"
            className="h-7 w-7"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M21 12c0 4.4-4 8-9 8a9.8 9.8 0 0 1-4-.8L3 21l1.5-4A7.8 7.8 0 0 1 3 12c0-4.4 4-8 9-8s9 3.6 9 8Z" />
            <path d="M8 11h8" />
            <path d="M8 15h5" />
          </svg>
        )}
      </button>

      {open ? (
        <div
          className="fixed bottom-24 right-5 z-[60] flex w-[min(100vw-2.5rem,22rem)] flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-2xl md:bottom-28 md:right-8"
          role="dialog"
          aria-label="Clinic chat assistant"
        >
          <div className="border-b border-slate-100 bg-slate-50 px-4 py-3">
            <p className="text-sm font-semibold text-slate-900">Coastal Chiropractic SLO</p>
            <p className="text-xs text-slate-500">AI assistant - not medical advice</p>
          </div>
          <div className="max-h-72 space-y-3 overflow-y-auto px-3 py-3 text-sm">
            {messages.map((m, i) => (
              <div
                key={i}
                className={`rounded-xl px-3 py-2 ${
                  m.role === "user" ? "ml-6 bg-teal-700 text-white" : "mr-4 bg-slate-100 text-slate-800"
                }`}
              >
                {m.content}
              </div>
            ))}
            {loading ? <p className="text-xs text-slate-500 px-1">Thinking...</p> : null}
            {error ? <p className="text-xs text-red-600 px-1">{error}</p> : null}
            <div ref={endRef} />
          </div>
          <div className="flex gap-2 border-t border-slate-100 p-2">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && send()}
              placeholder="Type a question..."
              className="min-w-0 flex-1 rounded-lg border border-slate-200 px-2 py-2 text-sm outline-none focus:ring-2 focus:ring-teal-600"
              disabled={loading}
            />
            <button
              type="button"
              onClick={send}
              disabled={loading}
              className="rounded-lg bg-slate-900 px-3 py-2 text-sm font-medium text-white disabled:opacity-50"
            >
              Send
            </button>
          </div>
        </div>
      ) : null}
    </>
  );
}
