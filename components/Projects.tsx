"use client";

import { useState } from "react";

const PROJECTS = [
  {
    id: "01",
    title: "Cyber Physical System",
    tags: ["Python", "IoT", "Data Pipeline"],
    description: "Placeholder - project in progress. Final screenshots and case study coming soon.",
    demo: "",
    github: "https://github.com/clemweb3",
    status: "In Progress",
  },
  {
    id: "02",
    title: "BI Dashboard",
    tags: ["Power BI", "Tableau", "SQL"],
    description: "Placeholder - operational and strategic dashboards for data-driven decisions. Screenshots coming soon.",
    demo: "",
    github: "https://github.com/clemweb3",
    status: "Placeholder",
  },
  {
    id: "03",
    title: "Predictive Modeling",
    tags: ["Python", "scikit-learn", "Pandas"],
    description: "Placeholder - ML models uncovering patterns and providing quantitative insights. Coming soon.",
    demo: "",
    github: "https://github.com/clemweb3",
    status: "Placeholder",
  },
];

export default function Projects() {
  const [hovered, setHovered] = useState<string | null>(null);

  return (
    <section id="featured-projects" className="relative bg-[#080808] overflow-hidden">
      <div className="absolute inset-0 pointer-events-none" style={{
        backgroundImage: "linear-gradient(#111 1px, transparent 1px), linear-gradient(90deg, #111 1px, transparent 1px)",
        backgroundSize: "160px 80px",
      }}/>
      <div className="hidden md:block absolute top-0 bottom-0 left-[23%] w-px bg-[#111]"/>
      <div className="hidden md:block absolute top-0 bottom-0 left-[70%] w-px bg-[#111]"/>
      <div className="relative z-10 max-w-[1100px] mx-auto px-8 md:px-20 py-28 md:py-36">
        <div className="flex items-center gap-3 mb-12">
          <span className="w-5 h-px bg-[#8B7355]"/>
          <span className="text-[9px] text-[#8B7355] tracking-[3px] uppercase">003 / Selected Work</span>
        </div>
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-14">
          <h2 className="text-[clamp(28px,4vw,42px)] font-normal text-white leading-[1.1]"
            style={{ fontFamily: "var(--font-serif)" }}>
            Cases where data<br/>
            <span className="text-[#8B7355]">moved people.</span>
          </h2>
          <a href="https://github.com/clemweb3" target="_blank" rel="noopener noreferrer"
            className="text-[10px] text-[#8B7355] tracking-[2px] uppercase border border-[#1E1E1E] px-5 py-2.5 hover:border-[#8B7355] transition-colors duration-200 shrink-0">
            View All on GitHub
          </a>
        </div>
        <div className="flex flex-col">
          {PROJECTS.map((project) => (
            <div key={project.id}
              className="border-t border-[#1A1A1A] py-8 cursor-default"
              onMouseEnter={() => setHovered(project.id)}
              onMouseLeave={() => setHovered(null)}>
              <div className="grid grid-cols-1 md:grid-cols-[1fr_auto] gap-6 items-start">
                <div className="flex gap-6 items-start">
                  <span className="text-[#333] text-xs tracking-[2px] pt-1 shrink-0">{project.id}</span>
                  <div>
                    <div className="flex flex-wrap items-center gap-3 mb-2">
                      <h3 className={`text-base font-medium tracking-wide transition-colors duration-200 ${
                        hovered === project.id ? "text-[#8B7355]" : "text-white"
                      }`}>
                        {project.title}
                      </h3>
                      <span className="text-[9px] text-[#555] border border-[#1A1A1A] px-2 py-0.5 tracking-[1px]">
                        {project.status}
                      </span>
                    </div>
                    <p className="text-[#555] text-sm leading-relaxed max-w-lg mb-4">
                      {project.description}
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {project.tags.map((tag) => (
                        <span key={tag} className="text-[9px] text-[#8B7355] border border-[#1E1E1E] px-2.5 py-1">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
                <div className="flex gap-4 items-center pl-10 md:pl-0">
                  {project.demo && (
                    <a href={project.demo} target="_blank" rel="noopener noreferrer"
                      className="text-[10px] text-[#888] tracking-[2px] uppercase hover:text-[#8B7355] transition-colors duration-200">
                      Demo
                    </a>
                  )}
                  <a href={project.github} target="_blank" rel="noopener noreferrer"
                    className="text-[10px] text-[#888] tracking-[2px] uppercase hover:text-[#8B7355] transition-colors duration-200">
                    GitHub
                  </a>
                </div>
              </div>
            </div>
          ))}
          <div className="border-t border-[#1A1A1A]"/>
        </div>
      </div>
    </section>
  );
}