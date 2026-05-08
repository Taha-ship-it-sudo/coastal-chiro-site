"use client";

import Link from "next/link";
import { useState } from "react";
import { APPOINTMENT_URL, services } from "@/lib/services";

export function ServicesSection() {
  const [openSlug, setOpenSlug] = useState<string | null>(services[0]?.slug ?? null);

  return (
    <section id="services" className="border-y border-slate-200 bg-white">
      <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
        <div className="max-w-2xl">
          <h2 className="font-display text-3xl font-semibold text-slate-900 sm:text-4xl">
            Services
          </h2>
          <p className="mt-3 text-slate-600">
            A complete conservative care approach for pain relief, mobility, and performance.
          </p>
        </div>
        <div className="mt-10 space-y-4">
          {services.map((service) => {
            const isOpen = openSlug === service.slug;
            return (
              <article
                key={service.slug}
                className="rounded-2xl border border-slate-200 bg-slate-50/80 transition hover:border-teal-200"
              >
                <button
                  type="button"
                  onClick={() => setOpenSlug(isOpen ? null : service.slug)}
                  className="flex w-full items-center justify-between gap-4 px-5 py-5 text-left sm:px-6"
                  aria-expanded={isOpen}
                  aria-controls={`service-${service.slug}`}
                >
                  <div>
                    <h3 className="font-display text-lg font-semibold text-slate-900">
                      {service.title}
                    </h3>
                    <p className="mt-1 text-sm leading-relaxed text-slate-600">{service.summary}</p>
                  </div>
                  <span
                    className={`mt-1 shrink-0 text-sm font-semibold text-teal-800 transition ${
                      isOpen ? "rotate-180" : ""
                    }`}
                  >
                    ▼
                  </span>
                </button>
                {isOpen ? (
                  <div
                    id={`service-${service.slug}`}
                    className="border-t border-slate-200 px-5 py-5 sm:px-6"
                  >
                    <div className="grid gap-5 sm:grid-cols-2">
                      <div>
                        <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                          What it helps with
                        </p>
                        <ul className="mt-2 space-y-1.5 text-sm text-slate-700">
                          {service.helpsWith.map((item) => (
                            <li key={item}>• {item}</li>
                          ))}
                        </ul>
                      </div>
                      <div>
                        <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                          Best for
                        </p>
                        <ul className="mt-2 space-y-1.5 text-sm text-slate-700">
                          {service.bestFor.map((item) => (
                            <li key={item}>• {item}</li>
                          ))}
                        </ul>
                      </div>
                    </div>

                    <div className="mt-5 grid gap-4 sm:grid-cols-2">
                      <div>
                        <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                          How it works
                        </p>
                        <p className="mt-1.5 text-sm leading-relaxed text-slate-700">
                          {service.howItWorks}
                        </p>
                      </div>
                      <div>
                        <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                          What a session feels like
                        </p>
                        <p className="mt-1.5 text-sm leading-relaxed text-slate-700">
                          {service.sessionFeel}
                        </p>
                      </div>
                    </div>

                    <div className="mt-5 grid gap-4 sm:grid-cols-2">
                      <div>
                        <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                          Typical plan
                        </p>
                        <p className="mt-1.5 text-sm leading-relaxed text-slate-700">
                          {service.typicalPlan}
                        </p>
                      </div>
                      <div>
                        <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                          Safety note
                        </p>
                        <p className="mt-1.5 text-sm leading-relaxed text-slate-700">
                          {service.safety}
                        </p>
                      </div>
                    </div>

                    <div className="mt-5">
                      <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                        Often paired with
                      </p>
                      <div className="mt-2 flex flex-wrap gap-2">
                        {service.pairings.map((item) => (
                          <span
                            key={item}
                            className="rounded-full border border-slate-200 bg-white px-3 py-1 text-xs text-slate-700"
                          >
                            {item}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="mt-6 flex flex-wrap gap-3">
                      <a
                        href={APPOINTMENT_URL}
                        target="_blank"
                        rel="noreferrer"
                        className="rounded-full bg-teal-700 px-4 py-2 text-sm font-semibold text-white hover:bg-teal-800"
                      >
                        Book this service
                      </a>
                      <Link
                        href={`/services/${service.slug}`}
                        className="rounded-full border border-slate-300 bg-white px-4 py-2 text-sm font-semibold text-slate-800 hover:border-slate-400"
                      >
                        Service details
                      </Link>
                    </div>
                  </div>
                ) : null}
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
