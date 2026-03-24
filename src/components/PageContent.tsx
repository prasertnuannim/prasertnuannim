"use client";

import About from "@/components/About";
import Contact from "@/components/Contact";
import Home from "@/components/Home";
import Navbar from "@/components/Navbar";
import Projects from "@/components/Projects";
import SectionTracker from "@/components/SectionTracker";
import Skills from "@/components/Skills";
import Works from "@/components/Works";

export default function PageContent() {
  const sectionClassName = "relative z-10 min-h-screen scroll-mt-6 md:scroll-mt-8";

  return (
    <main className="relative isolate overflow-x-hidden">
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 z-0">
        <div className="absolute inset-0 bg-[linear-gradient(180deg,#fbfdf8_0%,#f4f8f2_38%,#eef4ec_100%)]" />
        <div className="absolute left-[-11rem] top-0 h-[28rem] w-[28rem] rounded-full bg-green-100/60 blur-3xl" />
        <div className="absolute right-[-10rem] top-[18rem] h-[26rem] w-[26rem] rounded-full bg-emerald-100/50 blur-3xl" />
        <div className="absolute left-1/3 top-[62rem] h-[24rem] w-[24rem] rounded-full bg-lime-100/35 blur-3xl" />
        <div className="absolute right-[8%] top-[124rem] h-[22rem] w-[22rem] rounded-full bg-green-100/30 blur-3xl" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(255,255,255,0.72),_transparent_45%)]" />
        <div className="absolute inset-0 opacity-40 [background-image:linear-gradient(rgba(255,255,255,0.55)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.45)_1px,transparent_1px)] [background-size:72px_72px] [mask-image:linear-gradient(180deg,rgba(0,0,0,0.18),transparent_82%)]" />
      </div>

      <div className="relative z-20">
        <SectionTracker />
        <Navbar />

        <section id="home" className={sectionClassName}>
          <Home />
        </section>
        <section id="about" className={sectionClassName}>
          <About />
        </section>
        <section id="skills" className={sectionClassName}>
          <Skills />
        </section>
        <section id="projects" className={sectionClassName}>
          <Projects />
        </section>
        <section id="works" className={sectionClassName}>
          <Works />
        </section>
        <section id="contact" className={sectionClassName}>
          <Contact />
        </section>
      </div>
    </main>
  );
}
