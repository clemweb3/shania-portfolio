"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";

const CHARS = "!@#$%&*?ABCDEFGHIJabcdefghij0123456789";
const FINAL_WORD = "lead.";
const CYCLE_WORDS = ["decisions.", "clarity.", "action.", "impact."];

// FIX #3 — Scramble operates on a single element whose textContent is
// replaced atomically each tick. No child spans → no reflow cascade → no shake.
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

    // Preserve the final text; scramble resolves back to it.
    el.textContent = FINAL_WORD;

    // Use font-variant-numeric + ch unit via inline style so every
    // glyph occupies exactly the same horizontal space during animation.
    el.style.display = "inline-block";
    el.style.fontVariantNumeric = "tabular-nums";
    // minWidth locks the container so swapping chars never shifts siblings.
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
    // Initialise with widest word so the container never collapses
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
      {/* Background */}
      <div className="absolute inset-0 pointer-events-none">
        <svg className="absolute inset-0 w-full h-full opacity-20" xmlns="http://www.w3.org/2000/svg">
          <filter id="grain">
            <feTurbulence type="fractalNoise" baseFrequency="0.65" numOctaves="3" stitchTiles="stitch"/>
            <feColorMatrix type="saturate" values="0"/>
          </filter>
          <rect width="100%" height="100%" filter="url(#grain)" opacity="0.06"/>
        </svg>
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: "linear-gradient(#111 1px, transparent 1px), linear-gradient(90deg, #111 1px, transparent 1px)",
            backgroundSize: "160px 80px"
          }}
        />
      </div>

      {/* Content */}
      <div className="relative z-10 w-full max-w-[1440px] mx-auto px-6 md:px-16 pt-28 pb-24">

        {/* Decorative vertical rules — desktop only */}
        <div className="hidden md:block absolute top-[-50vh] bottom-[-50vh] left-[5%] w-px bg-[#131313] pointer-events-none"/>
        <div className="hidden md:block absolute top-[-50vh] bottom-[-50vh] left-[70%] w-px bg-[#131313] pointer-events-none"/>

        {/* FIX #1 — Grid: on mobile collapse cleanly to a single centred column.
            The sidebar is fully hidden on mobile and replaced by a proper
            bottom metadata strip that uses the available width intelligently. */}
        <div className="grid grid-cols-1 md:grid-cols-[0.4fr_1.3fr_0.8fr] gap-10 items-start">

          {/* Left spacer — desktop only */}
          <div className="hidden md:block" />

          {/* Hero copy */}
          <div className="flex flex-col items-center text-center md:items-start md:text-left">

            {/* Intro tag */}
            <div className="flex items-center gap-4 mb-8">
              <span className="w-7 h-px bg-[#8B7355]"/>
              <span className="text-[10px] text-[#8B7355] tracking-[4px] uppercase font-medium">001 / Introduction</span>
            </div>

            {/* Headlines */}
            <div className="mb-8">
              <h1
                className="text-[clamp(28px,4.5vw,64px)] leading-[1.1] font-normal text-white mb-2"
                style={{ fontFamily: "var(--font-serif)" }}
              >
                Technical enough to build it.
              </h1>
              <h1
                className="text-[clamp(28px,4.5vw,64px)] leading-[1.1] font-normal text-white"
                style={{ fontFamily: "var(--font-serif)" }}
              >
                {/* FIX #3 — leadRef is a single span; content is set via textContent only */}
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
              className="text-[clamp(15px,1.8vw,20px)] italic text-[#666] mb-8"
              style={{ fontFamily: "var(--font-serif)" }}
            >
              I turn complexity into{" "}
              <span ref={cycleRef} className="text-[#8B7355] not-italic font-medium">decisions.</span>
            </p>

            {/* Description */}
            <p className="text-[#555] text-[14px] md:text-[15px] leading-[1.9] max-w-[480px] mb-12 mx-auto md:mx-0">
              I close the gap between raw data and real decisions — through models, dashboards, and the people using them.
            </p>

            {/* FIX #2 — Buttons: refined serif lettering, deliberate spacing,
                clear visual hierarchy. Primary = white fill, secondary = gold.
                On mobile they stack vertically and span full width for thumb reach. */}
            <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">

              {/* Primary CTA */}
              <Link
                href="#featured-projects"
                className="group relative inline-flex items-center justify-center overflow-hidden
                           border border-white/20 hover:border-white/60
                           transition-all duration-500 ease-out
                           px-10 py-4"
                style={{ borderRadius: "2px" }}
              >
                {/* fill sweep */}
                <span
                  className="absolute inset-0 -translate-x-full group-hover:translate-x-0 bg-white transition-transform duration-500 ease-out"
                  aria-hidden
                />
                <span
                  className="relative text-white group-hover:text-[#080808] transition-colors duration-500
                             text-[10px] tracking-[3.5px] uppercase"
                  style={{ fontFamily: "var(--font-serif)", fontStyle: "normal", letterSpacing: "0.22em" }}
                >
                  View My Work
                </span>
              </Link>

              {/* Secondary CTA */}
              <Link
                href="#contact"
                className="group relative inline-flex items-center justify-center overflow-hidden
                           border border-[#8B7355]/40 hover:border-[#8B7355]
                           transition-all duration-500 ease-out
                           px-10 py-4"
                style={{ borderRadius: "2px" }}
              >
                <span
                  className="absolute inset-0 -translate-x-full group-hover:translate-x-0 bg-[#8B7355] transition-transform duration-500 ease-out"
                  aria-hidden
                />
                <span
                  className="relative text-[#8B7355] group-hover:text-white transition-colors duration-500
                             text-[10px] tracking-[3.5px] uppercase"
                  style={{ fontFamily: "var(--font-serif)", fontStyle: "normal", letterSpacing: "0.22em" }}
                >
                  Let&apos;s Talk
                </span>
              </Link>
            </div>
          </div>

          {/* Right sidebar — desktop only */}
          <div className="hidden md:flex flex-col gap-10 pt-16 border-l border-[#131313] pl-12">
            {[
              { label: "Discipline", lines: ["BI · Data Science", "Business Analysis"] },
              { label: "Currently", lines: ["BSDS · Mapua University", "Graduating 2026"] },
              { label: "Based In", lines: ["Manila, Philippines"] },
            ].map(({ label, lines }) => (
              <div key={label}>
                <p className="text-[9px] text-[#444] tracking-[3px] uppercase mb-2 font-semibold">{label}</p>
                {lines.map((v, i) => (
                  <p key={i} className="text-[#888] text-[13px] leading-relaxed">{v}</p>
                ))}
              </div>
            ))}
            <div>
              <p className="text-[9px] text-[#444] tracking-[3px] uppercase mb-2 font-semibold">Status</p>
              <div className="flex items-center gap-2.5">
                <span className="w-2 h-2 rounded-full bg-[#8B7355] animate-pulse"/>
                <p className="text-[#888] text-[13px]">Open to work</p>
              </div>
            </div>
          </div>
        </div>

        {/* FIX #1 — Mobile metadata: a 2×2 grid uses the full viewport width
            cleanly. Labels left-aligned, values right-aligned, with a proper
            separator. Replaces the janky flex justify-between row. */}
        <div className="flex md:hidden flex-col mt-14 pt-8 border-t border-[#1A1A1A] gap-0">
          {[
            { label: "Discipline", value: "BI · Data Science" },
            { label: "Education", value: "BSDS · Mapua University" },
            { label: "Location", value: "Manila, Philippines" },
            { label: "Status", value: "Open to work", dot: true },
          ].map(({ label, value, dot }, i, arr) => (
            <div
              key={label}
              className={`flex items-center justify-between py-4 ${i < arr.length - 1 ? "border-b border-[#1A1A1A]" : ""}`}
            >
              <span className="text-[9px] text-[#444] tracking-[3px] uppercase font-semibold">{label}</span>
              <span className="text-[#888] text-[12px] flex items-center gap-2">
                {dot && <span className="w-1.5 h-1.5 rounded-full bg-[#8B7355] animate-pulse"/>}
                {value}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 md:left-16 md:translate-x-0 flex flex-col items-center gap-4">
        <span className="text-[#2A2A2A] text-[9px] tracking-[5px] uppercase [writing-mode:vertical-lr] rotate-180">Scroll</span>
        <div className="w-px h-12 bg-gradient-to-b from-[#8B7355] to-transparent"/>
      </div>
    </section>
  );
}
