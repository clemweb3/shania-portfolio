"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", handler);
    return () => window.removeEventListener("scroll", handler);
  }, []);

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      scrolled ? "bg-[#080808]/95 backdrop-blur-sm border-b border-[#1A1A1A]" : "bg-transparent"
    }`}>
      <div className="max-w-[1200px] mx-auto px-10 md:px-24 h-[60px] flex items-center justify-between">

        {/* Logo */}
        <Link href="#home"
          className="text-white text-base tracking-[3px] flex items-center gap-2 font-medium"
          style={{ fontFamily: "var(--font-serif)" }}>
          NIA <span className="text-[#8B7355] text-lg">◆</span>
        </Link>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-10">
          {[
            { label: "Work", href: "#featured-projects" },
            { label: "Experience", href: "#experience" },
            { label: "About", href: "#about" },
            { label: "Contact", href: "#contact" },
          ].map((item) => (
            <Link key={item.label} href={item.href}
              className="text-[#666] hover:text-[#8B7355] text-[11px] tracking-[2.5px] uppercase font-medium transition-colors duration-200">
              {item.label}
            </Link>
          ))}
        </div>

        <div className="flex items-center gap-4">
          <a href="/resume.pdf" target="_blank"
            className="hidden md:block border border-[#333] text-[#8B7355] text-[10px] tracking-[2px] uppercase px-5 py-2 hover:border-[#8B7355] transition-colors duration-200 font-medium">
            Resume
          </a>
          {/* Hamburger */}
          <button className="md:hidden flex flex-col gap-[6px] p-2"
            onClick={() => setMenuOpen(!menuOpen)}>
            <span className={`w-6 h-px bg-white transition-all duration-200 ${menuOpen ? "rotate-45 translate-y-[7px]" : ""}`}/>
            <span className={`w-6 h-px bg-white transition-all duration-200 ${menuOpen ? "opacity-0" : ""}`}/>
            <span className={`w-6 h-px bg-white transition-all duration-200 ${menuOpen ? "-rotate-45 -translate-y-[7px]" : ""}`}/>
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="md:hidden bg-[#080808] border-t border-[#1A1A1A] px-10 py-8 flex flex-col gap-6">
          {[
            { label: "Work", href: "#featured-projects" },
            { label: "Experience", href: "#experience" },
            { label: "About", href: "#about" },
            { label: "Contact", href: "#contact" },
          ].map((item) => (
            <Link key={item.label} href={item.href}
              onClick={() => setMenuOpen(false)}
              className="text-[#888] hover:text-[#8B7355] text-sm tracking-[3px] uppercase transition-colors">
              {item.label}
            </Link>
          ))}
          <a href="/resume.pdf" target="_blank"
            className="text-[#8B7355] text-sm tracking-[2px] uppercase border-t border-[#1A1A1A] pt-6">
            Resume
          </a>
        </div>
      )}
    </nav>
  );
}