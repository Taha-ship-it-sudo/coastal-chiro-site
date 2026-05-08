"use client";

import { useState } from "react";

export function ReviewAssistantForm() {
  const [token, setToken] = useState("");
  const [reviewText, setReviewText] = useState("");
  const [rating, setRating] = useState<string>("");
  const [reviewerName, setReviewerName] = useState("");
  const [draft, setDraft] = useState("");
  const [note, setNote] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");
    setDraft("");
    setNote("");
    try {
      const res = await fetch("/api/reviews/respond", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          reviewText,
          rating: rating ? Number(rating) : undefined,
          reviewerName: reviewerName.trim() || undefined,
          accessToken: token.trim() || undefined,
        }),
      });
      const data = (await res.json()) as {
        draft?: string;
        note?: string;
        error?: string;
      };
      if (!res.ok) {
        setError(data.error ?? "Request failed.");
        return;
      }
      setDraft(data.draft ?? "");
      setNote(data.note ?? "");
    } catch {
      setError("Network error.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={onSubmit} className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-slate-700" htmlFor="token">
          Access token (if configured on server)
        </label>
        <input
          id="token"
          type="password"
          autoComplete="off"
          value={token}
          onChange={(e) => setToken(e.target.value)}
          placeholder="Leave blank if REVIEW_ASSISTANT_TOKEN is not set"
          className="mt-1 w-full rounded-lg border border-slate-200 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-teal-600"
        />
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label className="block text-sm font-medium text-slate-700" htmlFor="rating">
            Star rating (optional)
          </label>
          <select
            id="rating"
            value={rating}
            onChange={(e) => setRating(e.target.value)}
            className="mt-1 w-full rounded-lg border border-slate-200 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-teal-600"
          >
            <option value="">—</option>
            <option value="5">5</option>
            <option value="4">4</option>
            <option value="3">3</option>
            <option value="2">2</option>
            <option value="1">1</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-700" htmlFor="revname">
            Reviewer name (optional)
          </label>
          <input
            id="revname"
            value={reviewerName}
            onChange={(e) => setReviewerName(e.target.value)}
            className="mt-1 w-full rounded-lg border border-slate-200 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-teal-600"
          />
        </div>
      </div>
      <div>
        <label className="block text-sm font-medium text-slate-700" htmlFor="revtext">
          Review text
        </label>
        <textarea
          id="revtext"
          required
          rows={6}
          value={reviewText}
          onChange={(e) => setReviewText(e.target.value)}
          className="mt-1 w-full rounded-lg border border-slate-200 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-teal-600"
        />
      </div>
      <button
        type="submit"
        disabled={loading}
        className="rounded-lg bg-teal-700 px-4 py-2.5 text-sm font-semibold text-white hover:bg-teal-800 disabled:opacity-60"
      >
        {loading ? "Drafting…" : "Generate reply"}
      </button>
      {error ? <p className="text-sm text-red-600">{error}</p> : null}
      {draft ? (
        <div className="rounded-xl border border-slate-100 bg-slate-50 p-4">
          <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">Draft</p>
          <p className="mt-2 whitespace-pre-wrap text-sm text-slate-800">{draft}</p>
          <button
            type="button"
            className="mt-3 text-sm font-medium text-teal-800 hover:underline"
            onClick={() => navigator.clipboard.writeText(draft)}
          >
            Copy to clipboard
          </button>
        </div>
      ) : null}
      {note ? <p className="text-xs text-slate-500">{note}</p> : null}
    </form>
  );
}
