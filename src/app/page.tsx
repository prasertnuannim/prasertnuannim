import About from "@/components/About";
import Contact from "@/components/Contact";
import Home from "@/components/Home";
import Navbar from "@/components/Navbar";
import Projects from "@/components/Projects";
import Services from "@/components/Services";
import Skills from "@/components/Skills";
import { AbstractIntlMessages } from "next-intl";
import { getMessages } from "next-intl/server";

export async function generateMetadata({
  params: { locale },
}: {
  params: { locale: string };
}) {
    const messages: AbstractIntlMessages = await getMessages({locale})
    const title =
      typeof messages.TabTitle === "object" && messages.TabTitle !== null
        ? (messages.TabTitle as Record<string, string>).home
        : undefined;
    return {
      title,
      description: "Welcome to my portfolio website",
    }
}

export default function HomePage() {
  return (
    <main className="relative">
      <Navbar />
      <section id="home">
        <Home />
      </section>
      <section id="about">
        <About />
      </section>
      <section id="skills">
        <Skills />
      </section>
      <section id="projects">
        <Projects />
      </section>
      <section id="services">
        <Services />
      </section>
      <section id="contact">
        <Contact />
      </section>
    </main>
  );
}
