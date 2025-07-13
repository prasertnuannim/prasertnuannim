"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTranslations } from "next-intl";
import Image from "next/image";

export default function Projects() {
  const t = useTranslations("Projects");
  const [selectedProject, setSelectedProject] = useState<null | {
    title: string;
    description: string;
    image: string;
    link?: string;
  }>(null);

  const workProjects = [
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
  ];

  const pocProjects = [
    {
      title: "ESD Tester POC",
      description: t("descriptionESD"),
      image: "/images/pocNextAuth.png",
      link: "https://github.com/yourusername/esd-tester",
    },
  ];

  const renderProjectCard = (project: any, index: number) => (
    <motion.div
      key={index}
      className="flex h-[300px] bg-gray-500 rounded-b-2xl overflow-hidden flex-col hover:shadow-2xl transition-shadow duration-300"
      whileHover={{ scale: 1.03 }}
      transition={{ type: "spring", stiffness: 300 }}
    >
      <div className="relative w-full h-[180px] bg-gray-100">
        <Image
          src={project.image}
          alt={project.title}
          fill
          className="object-cover p-4"
        />
      </div>
      <div className="p-4 text-left flex flex-col flex-1">
        <h3 className="text-xl font-semibold text-white mb-2">
          {project.title}
        </h3>
        <motion.button
          onClick={() => setSelectedProject(project)}
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          whileHover={{ scale: 1.05, rotate: 1 }}
          whileTap={{ scale: 0.95 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{
            delay: index * 0.2,
            duration: 0.5,
            ease: "easeOut",
          }}
         className="inline-block mt-auto px-4 py-1 bg-gradient-to-bl from-blue-200 to-gray-700 text-white text-sm font-bold rounded hover:opacity-90 self-start shadow-md cursor-pointer"

        >
          See more
        </motion.button>
      </div>
    </motion.div>
  );

  return (
    <div className="min-h-screen py-16 bg-white">
      <div className="max-w-6xl mx-auto px-6">
        <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">
          {t("title")}
        </h2>

        <section className="mb-12">
          <h3 className="text-2xl font-semibold text-gray-800 mb-6 text-left">
            Work Projects
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
            {workProjects.map(renderProjectCard)}
          </div>
        </section>

        <section>
          <h3 className="text-2xl font-semibold text-gray-800 mb-6 text-left">
            POC Projects
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
            {pocProjects.map((project, i) =>
              renderProjectCard(project, i + workProjects.length)
            )}
          </div>
        </section>
      </div>

      {/* Modal */}
      <AnimatePresence>
        {selectedProject && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 px-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedProject(null)}
          >
            <motion.div
              className="bg-white rounded-xl p-6 max-w-lg w-full max-h-[90vh] overflow-y-auto relative"
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 50, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
            >
              <h3 className="text-xl font-bold text-gray-800 mb-4">
                {selectedProject.title}
              </h3>
              <div className="relative w-full h-48 mb-4">
                <Image
                  src={selectedProject.image}
                  alt={selectedProject.title}
                  fill
                  className="object-cover p-4"
                />
              </div>
              <p className="text-gray-700 indent-8 whitespace-pre-line">
                {selectedProject.description}
              </p>

              {selectedProject.link && (
                <a
                  href={selectedProject.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-4 inline-block px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                >
                  View GitHub
                </a>
              )}

              <button
                onClick={() => setSelectedProject(null)}
                className="mt-4 ml-2 px-4 py-2 bg-gray-700 text-white rounded hover:bg-gray-800 cursor-pointer"
              >
                Close
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
