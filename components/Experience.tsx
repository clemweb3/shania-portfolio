"use client";

import { useEffect, useRef, useState } from "react";

const STATS = [
  { value: 100, suffix: "%", prefix: "", label: "client approval rate" },
  { value: 100, suffix: "", prefix: "~", label: "artifacts documented" },
  { value: 3, suffix: "", prefix: "", label: "AI deployments led" },
];

function useCountUp(target: number, triggered: boolean) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!triggered) return;
    let start = 0;
    const increment = target / (1400 / 16);
    const timer = setInterval(() => {
      start += increment;
      if (start >= target) { setCount(target); clearInterval(timer); }
      else setCount(Math.floor(start));
    }, 16);
    return () => clearInterval(timer);
  }, [triggered, target]);
  return count;
}

function StatCard({ value, prefix, suffix, label, triggered }: {
  value: number; prefix: string; suffix: string; label: string; triggered: boolean;
}) {
  const count = useCountUp(value, triggered);
  return (
    <div className="flex flex-col gap-1">
      <span className="text-[clamp(28px,4vw,42px)] font-normal text-white leading-none"
        style={{ fontFamily: "var(--font-serif)" }}>
        {prefix}{count}{suffix}
      </span>
      <span className="text-[10px] text-[#555] tracking-[1px] uppercase">{label}</span>
    </div>
  );
}

export default function Experience() {
  const ref = useRef<HTMLElement>(null);
  const [triggered, setTriggered] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setTriggered(true); },
      { threshold: 0.3 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={ref} id="experience" className="relative bg-[#0A0A0A] overflow-hidden">
      <div className="absolute inset-0 pointer-events-none" style={{
        backgroundImage: "linear-gradient(#111 1px, transparent 1px), linear-gradient(90deg, #111 1px, transparent 1px)",
        backgroundSize: "160px 80px",
      }}/>
      <div className="hidden md:block absolute top-0 bottom-0 left-[23%] w-px bg-[#111]"/>
      <div className="hidden md:block absolute top-0 bottom-0 left-[70%] w-px bg-[#111]"/>
      <div className="relative z-10 max-w-[1100px] mx-auto px-8 md:px-20 py-28 md:py-36">
        <div className="flex items-center gap-3 mb-12">
          <span className="w-5 h-px bg-[#8B7355]"/>
          <span className="text-[9px] text-[#8B7355] tracking-[3px] uppercase">002 / Experience</span>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-[1fr_220px] gap-12 md:gap-20">
          <div>
            <h2 className="text-[clamp(28px,4vw,42px)] font-normal text-white leading-[1.1] mb-12"
              style={{ fontFamily: "var(--font-serif)" }}>
              Where I've<br/>
              <span className="text-[#8B7355]">shipped work.</span>
            </h2>
            <div className="border-t border-[#1A1A1A] pt-8 pb-8">
              <div className="flex flex-col sm:flex-row sm:justify-between gap-1 mb-3">
                <h3 className="text-white text-sm font-medium tracking-wide">
                  Business Analyst · SOFI AI Tech Solution Inc.
                </h3>
                <span className="text-[#8B7355] text-[10px] tracking-[1px] uppercase shrink-0">
                  May 2025 - Aug 2025
                </span>
              </div>
              <ul className="flex flex-col gap-1.5">
                {[
                  "Led 2-3 enterprise AI deployments end-to-end — 100% client approval rate",
                  "Reduced revision loops 30-40% via workflow documentation and automation",
                  "Built Google Apps Script cutting manual asset update time by 70%",
                  "Commended by co-founder for independently leading client meetings",
                ].map((item, i) => (
                  <li key={i} className="text-[#555] text-sm flex gap-3">
                    <span className="text-[#8B7355] mt-0.5 shrink-0">-</span>{item}
                  </li>
                ))}
              </ul>
            </div>
            <div className="border-t border-[#1A1A1A] pt-8 pb-8">
              <div className="flex flex-col sm:flex-row sm:justify-between gap-1 mb-3">
                <h3 className="text-white text-sm font-medium tracking-wide">
                  Junior Technical Writer · Navitaire, an Amadeus Company
                </h3>
                <span className="text-[#8B7355] text-[10px] tracking-[1px] uppercase shrink-0">
                  Jun 2024 - Mar 2025
                </span>
              </div>
              <ul className="flex flex-col gap-1.5">
                {[
                  "Standardized 100 technical artifacts across 7 projects",
                  "Built the department's first centralized documentation library",
                  "Reduced documentation gaps 30% and improved retrieval time 40%",
                  "Recognized for translating user stories into actionable documentation",
                ].map((item, i) => (
                  <li key={i} className="text-[#555] text-sm flex gap-3">
                    <span className="text-[#8B7355] mt-0.5 shrink-0">-</span>{item}
                  </li>
                ))}
              </ul>
            </div>
            <div className="border-t border-[#1A1A1A] pt-8">
              <p className="text-[9px] text-[#555] tracking-[2px] uppercase mb-4">Stack</p>
              <div className="flex flex-wrap gap-2">
                {["Python", "SQL", "R", "Power BI", "Tableau", "Databricks",
                  "JIRA", "Azure DevOps", "Agile", "Scrum", "Process Mapping"].map((skill) => (
                  <span key={skill}
                    className="text-[10px] text-[#888] border border-[#1E1E1E] px-3 py-1 hover:border-[#8B7355] hover:text-[#8B7355] transition-colors duration-200 cursor-default">
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-8 md:pt-24">
            <p className="text-[9px] text-[#555] tracking-[2px] uppercase">By the Numbers</p>
            {STATS.map((s) => (
              <StatCard key={s.label} {...s} triggered={triggered}/>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}