"use client";

import { useState } from "react";

export function NewsletterForm() {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "ok" | "err">("idle");
  const [message, setMessage] = useState("");

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("loading");
    setMessage("");
    try {
      const res = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, name: name.trim() || undefined, source: "footer" }),
      });
      const data = (await res.json()) as {
        ok?: boolean;
        error?: string;
        devNote?: string;
        fullscriptPromoCode?: string | null;
      };
      if (!res.ok) {
        setStatus("err");
        setMessage(data.error ?? "Something went wrong.");
        return;
      }
      setStatus("ok");
      const promo =
        data.fullscriptPromoCode != null && data.fullscriptPromoCode !== ""
          ? ` Your Fullscript code: ${data.fullscriptPromoCode}`
          : "";
      setMessage(
        (data.devNote
          ? "You're on the list. (Dev mode: subscriber saved locally — see server notes.)"
          : "You're on the list. Check your inbox for a confirmation.") + promo,
      );
      setEmail("");
      setName("");
    } catch {
      setStatus("err");
      setMessage("Network error. Please try again.");
    }
  }

  return (
    <form onSubmit={onSubmit} className="mx-auto w-full max-w-lg space-y-3">
      <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:gap-3">
        <div className="min-w-0 flex-1 space-y-2">
          <label htmlFor="nl-name" className="sr-only">
            Name (optional)
          </label>
          <input
            id="nl-name"
            type="text"
            autoComplete="name"
            placeholder="Name (optional)"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2.5 text-sm outline-none transition focus:ring-2 focus:ring-teal-600"
          />
          <label htmlFor="nl-email" className="sr-only">
            Email
          </label>
          <input
            id="nl-email"
            type="email"
            required
            autoComplete="email"
            placeholder="Email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2.5 text-sm outline-none transition focus:ring-2 focus:ring-teal-600"
          />
        </div>
        <button
          type="submit"
          disabled={status === "loading"}
          className="shrink-0 rounded-lg bg-slate-900 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-slate-800 disabled:opacity-60"
        >
          {status === "loading" ? "Signing up…" : "Subscribe monthly"}
        </button>
      </div>
      {message ? (
        <p
          className={`text-sm ${status === "ok" ? "text-teal-800" : "text-red-700"}`}
          role="status"
        >
          {message}
        </p>
      ) : null}
    </form>
  );
}
