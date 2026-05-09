"use client";

import { useCallback, useEffect, useId, useRef, useState } from "react";

const STORAGE_DISMISS = "cc_offer_popup_dismissed";
const FULLSCRIPT_URL = "https://us.fullscript.com/welcome/drkolofer1029/store-start";

export function WelcomeOfferPopup() {
  const titleId = useId();
  const closeBtnRef = useRef<HTMLButtonElement>(null);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    try {
      const dismissed = localStorage.getItem(STORAGE_DISMISS);
      if (!dismissed) {
        const t = window.setTimeout(() => setOpen(true), 900);
        return () => window.clearTimeout(t);
      }
    } catch {
      const t = window.setTimeout(() => setOpen(true), 900);
      return () => window.clearTimeout(t);
    }
  }, []);

  useEffect(() => {
    const onOpen = () => setOpen(true);
    window.addEventListener("open-fullscript-popup", onOpen);
    return () => window.removeEventListener("open-fullscript-popup", onOpen);
  }, []);

  useEffect(() => {
    if (!open) return;
    closeBtnRef.current?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") dismiss();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  const dismiss = useCallback(() => {
    setOpen(false);
    try {
      localStorage.setItem(STORAGE_DISMISS, "1");
    } catch {
      /* ignore */
    }
  }, []);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[70] flex items-end justify-center p-4 sm:items-center">
      <button
        type="button"
        className="absolute inset-0 bg-slate-900/50 backdrop-blur-[2px]"
        aria-label="Close offer dialog"
        onClick={dismiss}
      />
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        className="relative w-full max-w-md rounded-2xl border border-slate-200 bg-white p-6 shadow-2xl sm:p-8"
      >
        <button
          ref={closeBtnRef}
          type="button"
          onClick={dismiss}
          className="absolute right-3 top-3 rounded-lg p-2 text-slate-500 transition hover:bg-slate-100 hover:text-slate-800"
          aria-label="Close"
        >
          <span aria-hidden className="text-xl leading-none">
            ×
          </span>
        </button>

        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-teal-800">
          Welcome offer
        </p>
        <h2 id={titleId} className="font-display mt-2 text-2xl font-semibold text-slate-900">
          Get 10% off supplements
        </h2>
        <p className="mt-3 text-sm leading-relaxed text-slate-600">
          Click below to open our Fullscript store and claim your 10% discount on supplement
          orders.
        </p>
        <div className="mt-6 space-y-3">
          <a
            href={FULLSCRIPT_URL}
            target="_blank"
            rel="noreferrer"
            className="block w-full rounded-lg bg-teal-700 py-2.5 text-center text-sm font-semibold text-white transition hover:bg-teal-800"
          >
            Click this link for 10% discount
          </a>
        </div>
        <p className="mt-4 text-base font-semibold leading-relaxed text-slate-800">
          Be sure to also check out My{" "}
          <a
            href="https://my.lactigo.com/drkolofer"
            target="_blank"
            rel="noreferrer"
            className="font-bold text-teal-800 underline decoration-teal-800/40 underline-offset-2 hover:text-teal-950"
          >
            Lactigo
          </a>{" "}
          store.
        </p>
      </div>
    </div>
  );
}
