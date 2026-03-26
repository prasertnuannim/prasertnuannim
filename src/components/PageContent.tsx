"use client";

import About from "@/components/About";
import Contact from "@/components/Contact";
import Home from "@/components/Home";
import Navbar from "@/components/Navbar";
import Projects from "@/components/Projects";
import Section from "@/components/Section";
import SectionTracker from "@/components/SectionTracker";
import Skills from "@/components/Skills";
import Works from "@/components/Works";

export default function PageContent() {
  return (
    <main>
      <SectionTracker />
      <Navbar />

      <Section id="home">
        <Home />
      </Section>
      <Section id="about">
        <About />
      </Section>
      <Section id="skills">
        <Skills />
      </Section>
      <Section id="projects">
        <Projects />
      </Section>
      <Section id="works">
        <Works />
      </Section>
      <Section id="contact">
        <Contact />
      </Section>
    </main>
  );
}
