export default function Contact() {
  return (
    <section id="contact" className="relative bg-[#050505] overflow-hidden">
      <div className="absolute inset-0 pointer-events-none" style={{
        backgroundImage: "linear-gradient(#111 1px, transparent 1px), linear-gradient(90deg, #111 1px, transparent 1px)",
        backgroundSize: "160px 80px",
      }}/>
      <div className="hidden md:block absolute top-0 bottom-0 left-[23%] w-px bg-[#111]"/>
      <div className="hidden md:block absolute top-0 bottom-0 left-[70%] w-px bg-[#111]"/>
      <div className="relative z-10 max-w-[1100px] mx-auto px-8 md:px-20 py-28 md:py-36">
        <div className="flex items-center gap-3 mb-12">
          <span className="w-5 h-px bg-[#8B7355]"/>
          <span className="text-[9px] text-[#8B7355] tracking-[3px] uppercase">005 / Contact</span>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-[1fr_280px] gap-12 md:gap-20">
          <div>
            <h2 className="text-[clamp(32px,5vw,56px)] font-normal text-white leading-[1.05] mb-10"
              style={{ fontFamily: "var(--font-serif)" }}>
              Let's work<br/>
              <span className="text-[#8B7355]">together.</span>
            </h2>
            <p className="text-[#555] text-sm leading-relaxed max-w-md mb-10">
              Open to full-time roles, internships, and project collaborations
              in BI, data science, and business analysis.
            </p>
            <a href="mailto:shaniakeith23@gmail.com"
              className="inline-block px-8 py-3.5 bg-[#8B7355] text-white text-[10px] tracking-[2px] uppercase hover:bg-[#a0896a] transition-colors duration-200">
              Get In Touch
            </a>
          </div>
          <div className="flex flex-col gap-6 md:pt-4">
            {[
              { label: "Email", value: "shaniakeith23@gmail.com", href: "mailto:shaniakeith23@gmail.com" },
              { label: "Phone", value: "+63 9064475715", href: "tel:+639064475715" },
              { label: "LinkedIn", value: "shania-keith-dela-vega", href: "https://www.linkedin.com/in/shania-keith-dela-vega-/" },
              { label: "GitHub", value: "clemweb3", href: "https://github.com/clemweb3" },
            ].map(({ label, value, href }) => (
              <div key={label} className="border-t border-[#1A1A1A] pt-5">
                <p className="text-[9px] text-[#555] tracking-[2px] uppercase mb-1">{label}</p>
                <a href={href}
                  target={href.startsWith("http") ? "_blank" : undefined}
                  rel="noopener noreferrer"
                  className="text-[#888] text-sm hover:text-[#8B7355] transition-colors duration-200">
                  {value}
                </a>
              </div>
            ))}
          </div>
        </div>
        <div className="border-t border-[#1A1A1A] mt-20 pt-8 flex flex-col sm:flex-row justify-between gap-4">
          <p className="text-[#333] text-[10px] tracking-[1px]">
            2025 Shania Keith Dela Vega. All Rights Reserved.
          </p>
          <p className="text-[#333] text-[10px] italic" style={{ fontFamily: "var(--font-serif)" }}>
            Obsessed with process. Driven by results.
          </p>
        </div>
      </div>
    </section>
  );
}