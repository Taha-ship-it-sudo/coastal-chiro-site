import Link from "next/link";
import { ReviewAssistantForm } from "@/components/ReviewAssistantForm";

export const metadata = {
  title: "Review reply assistant | Coastal Chiropractic SLO",
  description: "Draft professional responses to patient reviews using AI.",
};

export default function ReviewAssistantPage() {
  return (
    <div className="bg-slate-50">
      <main className="mx-auto max-w-3xl px-4 py-10 sm:px-6">
        <div className="mb-6 flex flex-wrap items-center justify-between gap-2">
          <Link href="/" className="text-sm font-medium text-teal-800 hover:underline">
            ← Home
          </Link>
          <span className="text-xs text-slate-500">Staff tool - drafts only</span>
        </div>
        <h1 className="font-display text-2xl font-semibold text-slate-900 sm:text-3xl">
          AI review reply assistant
        </h1>
        <p className="mt-3 text-sm leading-relaxed text-slate-600">
          Paste a review from Google, Yelp, or elsewhere. The model drafts a warm, professional
          public reply. You still copy and post it yourself because direct auto-posting requires
          official platform APIs and approved automation policies.
        </p>
        <div className="mt-8 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <ReviewAssistantForm />
        </div>
      </main>
    </div>
  );
}
