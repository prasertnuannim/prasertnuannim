"use client";

import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useLocale, useTranslations } from "next-intl";
import { getStyles } from "@/styles";
import ProjectCard from "./projects/projectCard";
import ProjectModal from "./projects/projectModal";

type Project = {
  id: string;
  title: string;
  description: string;
  image: string;
  link?: string;
};

export default function Projects() {
  const t = useTranslations("Projects");
  const locale = useLocale();
  const styles = getStyles(locale);

  const [selectedProjectId, setSelectedProjectId] = useState<string | null>(null);

  const workProjects: Project[] = useMemo(
    () => [
      {
        id: "oee-dashboard",
        title: t("titleOEE"),
        description: t("descriptionOEE"),
        image: "/images/oeeDashboard.png",
      },
      {
        id: "monitor-machine",
        title: t("titleMonitorMachine"),
        description: t("descriptionMonitorMachine"),
        image: "/images/monitorMachine.png",
      },
      {
        id: "esd-tester",
        title: t("titleESD"),
        description: t("descriptionESD"),
        image: "/images/esdReport.png",
      },
      {
        id: "blueprint-status",
        title: t("titleBlueprintStatus"),
        description: t("descriptionBluePrintStatus"),
        image: "/images/bluePrintRoom.png",
      },
       {
        id: "pawcare",
        title: t("titlePawcare"),
        description: t("descriptionPawcare"),
        image: "/images/pawcare.png",
      },
       {
        id: "opt-sense",
        title: t("titleOptSence"),
        description: t("descriptionOptSence"),
        image: "/images/optSense.png",
      },
        {
        id: "univa",
        title: t("titleUniva"),
        description: t("descriptionUniva"),
        image: "/images/univa.png",
      },
    ],
    [t],
  );

  const pocProjects: Project[] = useMemo(
    () => [
      {
        id: "scada-dashboard-poc",
        title: t("titleScada"),
        description: t("descriptionScada"),
        image: "/images/pocScada.png",
        link: "https://github.com/yourusername/poc-scada",
      },
      {
        id: "boilerplate",
        title: t("titleBoilerplate"),
        description: t("descriptionNextAuth"),
        image: "/images/boilerplate.png",
      },
    ],
    [t],
  );

  const selectedProject = useMemo(() => {
    if (!selectedProjectId) {
      return null;
    }

    return [...workProjects, ...pocProjects].find(
      (project) => project.id === selectedProjectId,
    ) ?? null;
  }, [pocProjects, selectedProjectId, workProjects]);

  return (
    <section className="relative w-full px-4 py-20 sm:px-6 md:px-10">
      <div className="mx-auto flex w-full max-w-7xl flex-col gap-14">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.5 }}
          className={`mx-auto flex max-w-3xl flex-col items-center text-center ${styles.baseText}`}
        >
          <h2 className="text-4xl font-extrabold tracking-tight text-transparent sm:text-5xl md:text-6xl bg-gradient-to-r from-green-800 via-green-500 to-emerald-300 bg-clip-text">
            {t("title")}
          </h2>
        </motion.div>

        <motion.section
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.15 }}
          transition={{ duration: 0.55 }}
          className="relative rounded-[28px] border border-white/70 bg-white/75 p-6 shadow-[0_20px_80px_rgba(16,24,40,0.08)] backdrop-blur-xl sm:p-8"
        >
          <div className="mb-8 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <h3 className="text-2xl i font-bold text-gray-900 sm:text-3xl">
                {t("workProjects")}
              </h3>
            </div>
          </div>

          <div className="flex justify-center">
            <div className="grid w-full grid-cols-1 gap-6 justify-items-stretch md:grid-cols-2 xl:grid-cols-4">
              {workProjects.map((project, index) => (
                <motion.div
                  key={project.id}
                  initial={{ opacity: 0, y: 18 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.15 }}
                  transition={{ duration: 0.35, delay: index * 0.05 }}
                  className="group relative mx-auto h-full w-full max-w-[320px]"
                >
                  <div className="pointer-events-none absolute -inset-2 rounded-[28px] bg-gradient-to-r from-green-200/20 via-emerald-100/20 to-transparent opacity-0 blur-xl transition duration-500 group-hover:opacity-100" />
                  <div className="relative">
                    <ProjectCard
                      project={project}
                      onClick={() => setSelectedProjectId(project.id)}
                    />
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.section>

        <motion.section
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.15 }}
          transition={{ duration: 0.55, delay: 0.05 }}
          className="relative rounded-[28px] border border-white/70 bg-white/75 p-6 shadow-[0_20px_90px_rgba(15,23,42,0.12)] backdrop-blur-xl sm:p-8"
        >
          <div className="absolute inset-0 rounded-[28px] bg-[radial-gradient(circle_at_top_right,_rgba(52,211,153,0.1),_transparent_28%)]" />
          <div className="relative mb-8 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <h3 className="text-2xl font-bold text-gray-900 sm:text-3xl">
                {t("pocProjects")}
              </h3>
            </div>
          </div>

          <div className="flex justify-center">
            <div className="grid w-full max-w-4xl grid-cols-1 gap-8 justify-items-stretch md:grid-cols-2">
              {pocProjects.map((project, index) => (
                <motion.div
                  key={project.id}
                  initial={{ opacity: 0, y: 18 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.15 }}
                  transition={{ duration: 0.35, delay: index * 0.06 }}
                  className="group relative mx-auto h-full w-full max-w-[320px]"
                >
                  <div className="pointer-events-none absolute -inset-2 rounded-[28px] bg-emerald-400/10 opacity-0 blur-xl transition duration-500 group-hover:opacity-100" />
                  <div className="relative">
                    <ProjectCard
                      project={project}
                      onClick={() => setSelectedProjectId(project.id)}
                    />
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.section>
      </div>

      <AnimatePresence>
        {selectedProject && (
          <ProjectModal
            project={selectedProject}
            onClose={() => setSelectedProjectId(null)}
          />
        )}
      </AnimatePresence>
    </section>
  );
}
