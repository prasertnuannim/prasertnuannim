"use client";

import { useState } from "react";
import { AnimatePresence } from "framer-motion";
import { useLocale, useTranslations } from "next-intl";
import { getStyles } from "@/styles";
import ProjectCard from "./projects/projectCard";
import ProjectModal from "./projects/projectModal";

type Project = {
  title: string;
  description: string;
  image: string;
  link?: string;
};

export default function Projects() {
  const t = useTranslations("Projects");
  const locale = useLocale();
  const styles = getStyles(locale);

  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const workProjects: Project[] = [
    {
      title: "OEE Dashboard Website",
      description: t("descriptionOEE"),
      image: "/images/oeeDashboard.png",
    },
    {
      title: "Monitor Machine Website",
      description: t("descriptionMonitorMachine"),
      image: "/images/monitorMachine.png",
    },
    {
      title: "ESD Tester Website",
      description: t("descriptionESD"),
      image: "/images/esdReport.png",
    },
    {
      title: "Blueprint Status Website",
      description: t("descriptionBluePrintStatus"),
      image: "/images/bluePrintRoom.png",
    },
  ];

  const pocProjects: Project[] = [
    {
      title: "Next Auth POC",
      description: t("descriptionNextAuth"),
      image: "/images/pocNextAuth.png",
      link: "https://github.com/yourusername/esd-tester",
    },
    {
      title: "Scada Dashboard POC",
      description: t("descriptionScada"),
      image: "/images/pocScada.png",
      link: "https://github.com/yourusername/pocScada.png",
    },
  ];

  return (
    <div className="w-screen bg-white py-10 pb-14 px-4 md:px-10 flex justify-center">
      <div className="w-full max-w-7xl flex flex-col items-center gap-2">
        <div className={styles.baseText}>
          <h2 className="text-4xl font-bold bg-gradient-to-r from-green-700 via-green-500 via-30% to-gray-100 bg-clip-text text-transparent text-center">
            {t("title")}
          </h2>
          <section className="mb-4 mt-6 w-full">
            <h3 className="text-xl  text-left mb-6 bg-gradient-to-b from-gray-800 via-gray-500 via-30% to-gray-100 bg-clip-text text-transparent">
              {t("workProjects")}
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
              {workProjects.map((project, index) => (
                <ProjectCard
                  key={index}
                  project={project}
                  index={index}
                  onClick={() => setSelectedProject(project)}
                />
              ))}
            </div>
          </section>

          <section className="w-full">
            <h3 className="text-xl text-left mb-6 bg-gradient-to-b from-gray-800 via-gray-500 via-30% to-gray-100 bg-clip-text text-transparent">
              {t("pocProjects")}
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
              {pocProjects.map((project, index) => (
                <ProjectCard
                  key={index + workProjects.length}
                  project={project}
                  index={index + workProjects.length}
                  onClick={() => setSelectedProject(project)}
                />
              ))}
            </div>
          </section>
        </div>
      </div>

      <AnimatePresence>
        {selectedProject && (
          <ProjectModal
            project={selectedProject}
            onClose={() => setSelectedProject(null)}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
