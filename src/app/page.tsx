
import About from "@/components/About";
import Contact from "@/components/Contact";
import Home from "@/components/Home";
import Navbar from "@/components/Navbar";
import Projects from "@/components/Projects";
import SectionHeightLogger from "@/components/SectionHeightLogger";
import Skills from "@/components/Skills";
import Works from "@/components/Works";
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
      <div>
        <Navbar />
      </div>
       
      <SectionHeightLogger id="home" >
        <Home />
      </SectionHeightLogger>
      <SectionHeightLogger id="about">
        <About />
      </SectionHeightLogger>
      <SectionHeightLogger id="skills" >
        <Skills />
      </SectionHeightLogger>
      <SectionHeightLogger id="projects" >
        <Projects />
      </SectionHeightLogger>
      <SectionHeightLogger id="works">
        <Works />
      </SectionHeightLogger>
      <SectionHeightLogger id="contact" >
        <Contact />
      </SectionHeightLogger>
    </main>
  );
}
