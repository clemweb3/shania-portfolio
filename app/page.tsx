import Hero from "@/components/Hero";
import WhatIDo from "@/components/WhatIDo";
import Projects from "@/components/Projects";
import AuthorsNotes from "@/components/AuthorsNotes";
import Contact from "@/components/Contact";

export default function Home() {
  return (
    <main className="bg-[#0A0F1F] text-[#E5E9F0] font-sans">
      <Hero />
      <WhatIDo />
      <Projects />
      <AuthorsNotes />
      <Contact />
    </main>
  );
}