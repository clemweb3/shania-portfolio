"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";

const CHARS = "!@#$%&*?ABCDEFGHIJabcdefghij0123456789";
const FINAL_WORD = "lead.";
const CYCLE_WORDS = ["decisions.", "clarity.", "action.", "impact."];

function scrambleWord(el: HTMLElement, final: string, duration: number): Promise<void> {
  return new Promise((res) => {
    let f = 0;
    const total = Math.floor(duration / 55);
    if ((el as any)._t) clearInterval((el as any)._t);
    (el as any)._t = setInterval(() => {
      const p = f / total;
      let out = "";
      for (let i = 0; i < final.length; i++) {
        if (final[i] === "." || final[i] === " ") { out += final[i]; continue; }
        out += p > 0.45 + (i / final.length) * 0.55
          ? final[i]
          : CHARS[Math.floor(Math.random() * CHARS.length)];
      }
      el.textContent = out;
      if (++f >= total) {
        clearInterval((el as any)._t);
        el.textContent = final;
        res();
      }
    }, 55);
  });
}

export default function Hero() {
  const leadRef = useRef<HTMLSpanElement>(null);
  const cycleRef = useRef<HTMLSpanElement>(null);
  const indexRef = useRef(0);

  useEffect(() => {
    const el = leadRef.current;
    if (!el) return;
    el.textContent = FINAL_WORD;
    el.style.display = "inline-block";
    el.style.fontVariantNumeric = "tabular-nums";
    el.style.minWidth = `${FINAL_WORD.length}ch`;

    let animating = false;
    const handleEnter = () => {
      if (animating) return;
      animating = true;
      scrambleWord(el, FINAL_WORD, 18 * 55 + 80 * (FINAL_WORD.length - 1)).then(() => {
        animating = false;
      });
    };
    el.addEventListener("mouseenter", handleEnter);
    return () => {
      el.removeEventListener("mouseenter", handleEnter);
      if ((el as any)._t) clearInterval((el as any)._t);
    };
  }, []);

  useEffect(() => {
    const el = cycleRef.current;
    if (!el) return;
    el.style.display = "inline-block";
    el.style.minWidth = "8ch";
    const interval = setInterval(async () => {
      indexRef.current = (indexRef.current + 1) % CYCLE_WORDS.length;
      await scrambleWord(el, CYCLE_WORDS[indexRef.current], 1100);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section
      id="home"
      className="relative min-h-screen flex flex-col justify-center overflow-hidden bg-[#080808]"
    >
      {/*
        ── Mobile override styles ──────────────────────────────────────────────
        Scoped BEM-style class names bypass Tailwind JIT purging entirely.
        All mobile changes live here; desktop classes on elements are untouched.
        Breakpoint: max-width 639px  = below Tailwind's `sm` (640px).
        ────────────────────────────────────────────────────────────────────── */}
      <style>{`
        @media (max-width: 639px) {

          /* Wrapper — less top padding on short phone screens */
          .h-wrap { padding-top: 88px !important; }

          /* Intro tag — tighter gap below */
          .h-tag  { margin-bottom: 20px !important; }

          /* Headlines — tighter gap below */
          .h-heads { margin-bottom: 14px !important; }

          /* Cycling subhead — tighter gap below */
          .h-sub  { margin-bottom: 16px !important; }

          /* Hairline divider between identity block and action block */
          .h-divider { display: block !important; }

          /* Body copy — smaller text, full width, tighter bottom margin */
          .h-body {
            font-size: 13px !important;
            max-width: 100% !important;
            margin-bottom: 24px !important;
          }

          /* Button container — full width column stack */
          .h-btns {
            flex-direction: column !important;
            width: 100% !important;
            align-items: stretch !important;
            margin-bottom: 0 !important;
          }

          /* Each button — thumb-friendly fixed height, no vertical padding */
          .h-btn {
            width: 100% !important;
            min-width: unset !important;
            height: 44px !important;
            padding-top: 0 !important;
            padding-bottom: 0 !important;
          }

          /* Button label — slightly smaller on mobile */
          .h-btn-label { font-size: 13px !important; }

          /* Metadata strip — remove the large top gap */
          .h-meta { margin-top: 0 !important; }

          /* Mobile scroll indicator — show */
          .h-scroll-mob { display: flex !important; }

          /* Desktop scroll indicator — hide */
          .h-scroll-desk { display: none !important; }
        }

        /* Above sm — make sure divider and mobile scroll are hidden */
        @media (min-width: 640px) {
          .h-divider     { display: none !important; }
          .h-scroll-mob  { display: none !important; }
        }
      `}</style>

      {/* ── Background ── */}
      <div className="absolute inset-0 pointer-events-none">
        <svg className="absolute inset-0 w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <filter id="grain">
            <feTurbulence type="fractalNoise" baseFrequency="0.65" numOctaves="3" stitchTiles="stitch"/>
            <feColorMatrix type="saturate" values="0"/>
          </filter>
          <rect width="100%" height="100%" filter="url(#grain)" opacity="0.04"/>
        </svg>
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: "linear-gradient(#111 1px, transparent 1px), linear-gradient(90deg, #111 1px, transparent 1px)",
            backgroundSize: "160px 80px",
          }}
        />
      </div>

      {/* ── Main content wrapper ── */}
      <div className="h-wrap relative z-10 w-full max-w-[1440px] mx-auto px-6 md:px-12 lg:px-16 pt-28 pb-20">

        {/* Decorative vertical rules — large desktop only */}
        <div className="hidden lg:block absolute top-[-50vh] bottom-[-50vh] left-[5%] w-px bg-[#131313] pointer-events-none"/>
        <div className="hidden lg:block absolute top-[-50vh] bottom-[-50vh] left-[70%] w-px bg-[#131313] pointer-events-none"/>

        {/* Grid: 1-col mobile + tablet → 3-col lg+ */}
        <div className="grid grid-cols-1 lg:grid-cols-[0.4fr_1.3fr_0.8fr] gap-10 items-start">

          {/* Left spacer — large desktop only */}
          <div className="hidden lg:block" />

          {/* ── Hero copy ── */}
          <div className="flex flex-col items-center text-center lg:items-start lg:text-left">

            {/* Intro tag */}
            <div className="h-tag flex items-center gap-4 mb-8">
              <span className="w-7 h-px bg-[#8B7355]" />
              <span className="text-[12px] text-[#8B7355] tracking-[4px] uppercase font-semibold">
                001 / Introduction
              </span>
            </div>

            {/* Headlines */}
            <div className="h-heads mb-8">
              <h1
                className="text-[clamp(22px,3.5vw,56px)] leading-[1.1] font-normal text-white mb-2"
                style={{ fontFamily: "var(--font-serif)" }}
              >
                Technical enough to build it.
              </h1>
              <h1
                className="text-[clamp(22px,3.5vw,56px)] leading-[1.1] font-normal text-white"
                style={{ fontFamily: "var(--font-serif)" }}
              >
                Clear enough to{" "}
                <span
                  ref={leadRef}
                  className="text-[#8B7355] italic cursor-default select-none"
                  style={{ fontFamily: "var(--font-serif)" }}
                />
              </h1>
            </div>

            {/* Cycling subheadline */}
            <p
              className="h-sub text-[clamp(14px,1.6vw,20px)] italic text-[#666] mb-8"
              style={{ fontFamily: "var(--font-serif)" }}
            >
              I turn complexity into{" "}
              <span ref={cycleRef} className="text-[#8B7355] not-italic font-medium">
                decisions.
              </span>
            </p>

            {/* Hairline divider — mobile only (hidden by default, shown via CSS above) */}
            <div
              className="h-divider w-full mb-5"
              style={{ display: "none", height: "1px", background: "#161616" }}
            />

            {/* Body */}
            <p className="h-body text-[#555] text-[14px] md:text-[15px] leading-[1.9] max-w-[520px] mb-12 mx-auto lg:mx-0">
              I close the gap between raw data and real decisions — through models, dashboards,
              and the people using them.
            </p>

            {/* ── Buttons ── */}
            <div className="h-btns flex flex-col sm:flex-row items-start gap-3 w-fit sm:w-auto lg:mx-0">

              {/* Primary */}
              <Link
                href="#featured-projects"
                className="h-btn group relative inline-flex items-center justify-center overflow-hidden
                           sm:min-w-[190px]
                           border-2 border-[#2E2E2E] hover:border-white/40
                           transition-colors duration-500
                           px-10 py-[30px]"
                style={{ borderRadius: "1px" }}
              >
                <span
                  className="absolute inset-0 -translate-x-full group-hover:translate-x-0
                             bg-white transition-transform duration-500 ease-[cubic-bezier(0.76,0,0.24,1)]"
                  aria-hidden
                />
                <span
                  className="h-btn-label relative text-[#BBBBBB] group-hover:text-[#080808]
                             transition-colors duration-500
                             text-[14px] tracking-[0.24em] uppercase font-normal whitespace-nowrap"
                  style={{ fontFamily: "var(--font-serif)" }}
                >
                  View My Work
                </span>
              </Link>

              {/* Secondary */}
              <Link
                href="#contact"
                className="h-btn group relative inline-flex items-center justify-center overflow-hidden
                           sm:min-w-[190px]
                           border-2 border-[#8B7355]/25 hover:border-[#8B7355]/70
                           transition-colors duration-500
                           px-10 py-[30px]"
                style={{ borderRadius: "1px" }}
              >
                <span
                  className="absolute inset-0 -translate-x-full group-hover:translate-x-0
                             bg-[#8B7355] transition-transform duration-500 ease-[cubic-bezier(0.76,0,0.24,1)]"
                  aria-hidden
                />
                <span
                  className="h-btn-label relative text-[#8B7355] group-hover:text-white
                             transition-colors duration-500
                             text-[14px] tracking-[0.24em] uppercase font-normal whitespace-nowrap"
                  style={{ fontFamily: "var(--font-serif)" }}
                >
                  Let&apos;s Talk
                </span>
              </Link>
            </div>
          </div>

          {/* Right sidebar — large desktop only (100% unchanged) */}
          <div className="hidden lg:flex flex-col gap-10 pt-16 border-l border-[#131313] pl-12">
            {[
              { label: "Discipline", lines: ["BI · Data Science", "Business Analysis"] },
              { label: "Currently", lines: ["BSDS · Mapua University", "Graduating 2026"] },
              { label: "Based In", lines: ["Manila, Philippines"] },
            ].map(({ label, lines }) => (
              <div key={label}>
                <p className="text-[12px] text-[#444] tracking-[3px] uppercase mb-2 font-semibold">
                  {label}
                </p>
                {lines.map((v, i) => (
                  <p key={i} className="text-[#888] text-[14px] leading-relaxed">{v}</p>
                ))}
              </div>
            ))}
            <div>
              <p className="text-[9px] text-[#444] tracking-[3px] uppercase mb-2 font-semibold">Status</p>
              <div className="flex items-center gap-2.5">
                <span className="w-2 h-2 rounded-full bg-[#8B7355] animate-pulse" />
                <p className="text-[#888] text-[14px]">Open to work</p>
              </div>
            </div>
          </div>
        </div>

        {/* ── Mobile metadata strip ──
            .h-meta overrides the mt-14 gap to 0 on mobile so it sits
            flush under the buttons without the large dead space. ── */}
        <div className="h-meta flex lg:hidden flex-col mt-14 max-w-[600px] mx-auto w-full">
          <div className="w-full h-px bg-[#1A1A1A]" />
          {[
            { label: "Discipline", value: "BI · Data Science" },
            { label: "Location",   value: "Manila, Philippines" },
            { label: "Status",     value: "Open to work", dot: true },
          ].map(({ label, value, dot }, i, arr) => (
            <div
              key={label}
              className={`flex items-center justify-between py-[13px] ${
                i < arr.length - 1 ? "border-b border-[#1A1A1A]" : ""
              }`}
            >
              <span className="text-[9px] text-[#3A3A3A] tracking-[3px] uppercase font-semibold">
                {label}
              </span>
              <span className="text-[#777] text-[12px] flex items-center gap-2 tracking-wide">
                {dot && <span className="w-1.5 h-1.5 rounded-full bg-[#8B7355] animate-pulse" />}
                {value}
              </span>
            </div>
          ))}

          {/* Mobile scroll indicator — shown via CSS, hidden by default */}
          <div
            className="h-scroll-mob items-center gap-4 pt-6 pb-2 justify-center"
            style={{ display: "none" }}
          >
            <div style={{ width: "24px", height: "1px", background: "linear-gradient(to right, #8B7355, transparent)" }} />
            <span style={{ color: "#2A2A2A", fontSize: "10px", letterSpacing: "5px", textTransform: "uppercase" }}>
              Scroll
            </span>
            <div style={{ width: "24px", height: "1px", background: "linear-gradient(to left, #8B7355, transparent)" }} />
          </div>
        </div>
      </div>

      {/* Scroll indicator — desktop (original, 100% unchanged) */}
      <div className="h-scroll-desk absolute bottom-10 left-1/2 -translate-x-1/2 lg:left-16 lg:translate-x-0 flex flex-col items-center gap-4">
        <span className="text-[#2A2A2A] text-[12px] tracking-[5px] uppercase [writing-mode:vertical-lr] rotate-180">
          Scroll
        </span>
        <div className="w-px h-12 bg-gradient-to-b from-[#8B7355] to-transparent" />
      </div>
    </section>
  );
}
