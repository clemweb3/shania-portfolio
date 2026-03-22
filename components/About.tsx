export default function About() {
  return (
    <section id="about" className="relative bg-[#0A0A0A] overflow-hidden">
      <div className="absolute inset-0 pointer-events-none" style={{
        backgroundImage: "linear-gradient(#111 1px, transparent 1px), linear-gradient(90deg, #111 1px, transparent 1px)",
        backgroundSize: "160px 80px",
      }}/>
      <div className="hidden md:block absolute top-0 bottom-0 left-[23%] w-px bg-[#111]"/>
      <div className="hidden md:block absolute top-0 bottom-0 left-[70%] w-px bg-[#111]"/>
      <div className="relative z-10 max-w-[1100px] mx-auto px-8 md:px-20 py-28 md:py-36">
        <div className="flex items-center gap-3 mb-12">
          <span className="w-5 h-px bg-[#8B7355]"/>
          <span className="text-[9px] text-[#8B7355] tracking-[3px] uppercase">004 / About</span>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-[1fr_280px] gap-12 md:gap-20">
          <div>
            <h2 className="text-[clamp(28px,4vw,42px)] font-normal text-white leading-[1.1] mb-10"
              style={{ fontFamily: "var(--font-serif)" }}>
              I engineer with focus,<br/>
              iteration, and<br/>
              <span className="text-[#8B7355]">a bit of madness.</span>
            </h2>
            <div className="flex flex-col gap-4 max-w-lg">
              <p className="text-[#555] text-sm leading-relaxed">
                I believe tools say something about the person who builds them.
                This site is a reflection of how I think. Technical but still human,
                structured but always adaptable.
              </p>
              <p className="text-[#555] text-sm leading-relaxed">
                Every project here was a small obsession. I enjoy breaking a problem
                apart, shaping it, and seeing it become something that gives value
                to someone else.
              </p>
              <p className="text-[#555] text-sm leading-relaxed">
                This space grows with me. As I learn, I update.
                Think of it as a living notebook.
              </p>
            </div>
          </div>
          <div className="flex flex-col gap-6 md:pt-2">
            <div className="border-t border-[#1A1A1A] pt-6">
              <p className="text-[9px] text-[#555] tracking-[2px] uppercase mb-3">Education</p>
              <p className="text-white text-sm mb-1">BS Data Science</p>
              <p className="text-[#888] text-xs">Mapua University, Makati</p>
              <p className="text-[#8B7355] text-[10px] tracking-[1px] mt-1">Graduating 2026</p>
            </div>
            <div className="border-t border-[#1A1A1A] pt-6">
              <p className="text-[9px] text-[#555] tracking-[2px] uppercase mb-3">Credentials</p>
              <div className="flex flex-col gap-2">
                {["IBFAP Scholar", "Consistent Dean's Lister"].map((c) => (
                  <div key={c} className="flex items-center gap-2">
                    <span className="text-[#8B7355] text-xs">*</span>
                    <span className="text-[#888] text-xs">{c}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="border-t border-[#1A1A1A] pt-6">
              <p className="text-[9px] text-[#555] tracking-[2px] uppercase mb-3">Coursework</p>
              <div className="flex flex-wrap gap-2">
                {["Machine Learning", "Financial Analytics", "Statistical Modeling",
                  "Business Analysis", "Business Intelligence", "Artificial Intelligence"].map((c) => (
                  <span key={c} className="text-[9px] text-[#555] border border-[#1A1A1A] px-2.5 py-1">
                    {c}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}