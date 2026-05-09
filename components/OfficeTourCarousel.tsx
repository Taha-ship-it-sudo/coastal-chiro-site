"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";

export type OfficeSlide = {
  src: string;
  alt: string;
  caption: string;
};

const AUTO_MS = 6500;
const FADE_MS = 900;

type Props = {
  slides: readonly OfficeSlide[];
};

export function OfficeTourCarousel({ slides }: Props) {
  const [index, setIndex] = useState(0);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const clearTimer = useCallback(() => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
  }, []);

  const startTimer = useCallback(() => {
    clearTimer();
    timerRef.current = setInterval(() => {
      setIndex((i) => (i + 1) % slides.length);
    }, AUTO_MS);
  }, [clearTimer, slides.length]);

  useEffect(() => {
    startTimer();
    return clearTimer;
  }, [startTimer, clearTimer]);

  const go = useCallback(
    (delta: number) => {
      setIndex((i) => (i + delta + slides.length) % slides.length);
      startTimer();
    },
    [slides.length, startTimer]
  );

  const slide = slides[index];

  return (
    <div className="group relative mx-auto max-w-4xl">
      <figure className="overflow-hidden rounded-2xl border border-slate-200/90 bg-slate-100 shadow-md">
        <div className="relative aspect-[4/3] w-full sm:aspect-[16/10]">
          {slides.map((s, i) => (
            <Image
              key={s.src}
              src={s.src}
              alt={i === index ? s.alt : ""}
              fill
              sizes="(max-width: 1024px) 100vw, 896px"
              priority={i === 0}
              aria-hidden={i !== index}
              className={`object-cover object-[center_35%] sm:object-center transform-gpu transition-opacity ease-in-out ${
                i === index ? "z-[1] opacity-100" : "z-0 opacity-0 pointer-events-none"
              }`}
              style={{ transitionDuration: `${FADE_MS}ms` }}
            />
          ))}

          <button
            type="button"
            aria-label="Previous photo"
            onClick={() => go(-1)}
            className="absolute left-2 top-1/2 z-20 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 text-slate-800 shadow-md opacity-100 transition-opacity duration-200 hover:bg-white sm:opacity-0 sm:group-hover:opacity-100 focus-visible:opacity-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal-700"
          >
            <span className="sr-only">Previous</span>
            <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <path
                d="M14 6l-6 6 6 6"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
          <button
            type="button"
            aria-label="Next photo"
            onClick={() => go(1)}
            className="absolute right-2 top-1/2 z-20 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 text-slate-800 shadow-md opacity-100 transition-opacity duration-200 hover:bg-white sm:opacity-0 sm:group-hover:opacity-100 focus-visible:opacity-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal-700"
          >
            <span className="sr-only">Next</span>
            <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <path
                d="M10 6l6 6-6 6"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        </div>
        <figcaption className="border-t border-slate-100 bg-white px-4 py-3 text-sm text-slate-600">
          {slide.caption}
        </figcaption>
      </figure>

      <div
        className="mt-3 flex justify-center gap-1.5"
        role="tablist"
        aria-label="Photo position"
      >
        {slides.map((s, i) => (
          <button
            key={s.src}
            type="button"
            role="tab"
            aria-selected={i === index}
            aria-label={`Go to slide ${i + 1}`}
            onClick={() => {
              setIndex(i);
              startTimer();
            }}
            className={`h-1.5 rounded-full transition-all ${
              i === index ? "w-6 bg-teal-700" : "w-1.5 bg-slate-300 hover:bg-slate-400"
            }`}
          />
        ))}
      </div>
    </div>
  );
}
