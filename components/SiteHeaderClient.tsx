"use client";

import Link from "next/link";
import { useState } from "react";

const nav = [
  { href: "#office", label: "Office" },
  { href: "#services", label: "Services" },
  { href: "#why-us", label: "Why Us" },
  { href: "#reviews", label: "Reviews" },
  { href: "#first-visit", label: "New Patients" },
  { href: "#faq", label: "FAQ" },
];

function openFullscriptPopup() {
  if (typeof window !== "undefined") {
    window.dispatchEvent(new Event("open-fullscript-popup"));
  }
}

export function SiteHeaderClient() {
  const [menu, setMenu] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-slate-200/80 bg-white/90 backdrop-blur-md">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-3 sm:px-6 lg:px-8">
        <Link
          href="/"
          className="group flex flex-col leading-tight"
          onClick={() => setMenu(false)}
        >
          <span className="font-display text-lg font-semibold tracking-tight text-slate-900 sm:text-xl">
            Coastal Chiropractic SLO
          </span>
          <span className="text-xs text-slate-500 sm:text-sm">San Luis Obispo</span>
        </Link>

        <nav className="hidden items-center gap-6 md:flex" aria-label="Main">
          {nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-sm font-medium text-slate-600 transition hover:text-teal-700"
            >
              {item.label}
            </Link>
          ))}
          <button
            type="button"
            onClick={openFullscriptPopup}
            className="text-sm font-medium text-teal-700 transition hover:text-teal-800"
          >
            Fullscript discount
          </button>
        </nav>

        <div className="flex items-center gap-2">
          <a
            href="https://www.tebra.com/care/provider/scott-kolofer-dc-1508361098"
            target="_blank"
            rel="noreferrer"
            className="rounded-full bg-teal-700 px-3 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-teal-800 sm:px-4"
          >
            <span className="hidden sm:inline">Make Appointment</span>
            <span className="sm:hidden">Book</span>
          </a>
          <button
            type="button"
            className="rounded-lg border border-slate-200 p-2 text-slate-700 md:hidden"
            aria-expanded={menu}
            aria-label="Open menu"
            onClick={() => setMenu((m) => !m)}
          >
            <span className="sr-only">Menu</span>
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden>
              {menu ? (
                <path
                  d="M6 6l12 12M18 6L6 18"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
              ) : (
                <path
                  d="M4 7h16M4 12h16M4 17h16"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
              )}
            </svg>
          </button>
        </div>
      </div>

      {menu ? (
        <div className="border-t border-slate-100 bg-white px-4 py-3 md:hidden">
          <nav className="flex flex-col gap-2" aria-label="Mobile">
            {nav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="rounded-lg px-2 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50"
                onClick={() => setMenu(false)}
              >
                {item.label}
              </Link>
            ))}
            <button
              type="button"
              onClick={() => {
                setMenu(false);
                openFullscriptPopup();
              }}
              className="rounded-lg px-2 py-2 text-left text-sm font-medium text-teal-700 hover:bg-slate-50"
            >
              Fullscript discount
            </button>
          </nav>
        </div>
      ) : null}
    </header>
  );
}
