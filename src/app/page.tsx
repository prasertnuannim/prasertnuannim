import About from "@/components/About";
import Contact from "@/components/Contact";
import Home from "@/components/Home";
import Navbar from "@/components/Navbar";
import Projects from "@/components/Projects";
import SectionTracker from "@/components/SectionTracker";
import Skills from "@/components/Skills";
import Works from "@/components/Works";

export default function HomePage() {
  return (
    <main className="snap-y snap-mandatory h-screen overflow-y-scroll scroll-smooth">
      <SectionTracker />
      <Navbar />

      <section id="home" className="min-h-screen bg-white snap-start">
        <Home />
      </section>
      <section id="about" className="min-h-screen bg-white snap-start">
        <About />
      </section>
      <section id="skills" className="min-h-screen bg-white snap-start">
        <Skills />
      </section>
      <section id="projects" className="min-h-screen bg-white snap-start">
        <Projects />
      </section>
      <section id="works" className="min-h-screen bg-white snap-start">
        <Works />
      </section>
      <section id="contact" className="h-[100vh] bg-white snap-start">
        <Contact />
      </section>
    </main>
  );
}
