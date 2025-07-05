"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import Image from "next/image";


export default function Projects() {
    const t = useTranslations("Projects");
    const projects = [
  {
    title: "OEE Dashboard Website",
    description: <div className='text-white indent-8'>{t("descriptionOEE")}</div>,
    image: "/images/oeeDashboard.png",
    // github: "https://github.com/yourname/portfolio",
    // demo: "https://yourdomain.com",
  },
  {
    title: "Portfolio Website",
    description: "A personal portfolio site built with Next.js and Tailwind CSS.",
    image: "/images/portfolio.png",
    github: "https://github.com/yourname/portfolio",
    demo: "https://yourdomain.com",
  },
  {
    title: "Portfolio Website",
    description: "A personal portfolio site built with Next.js and Tailwind CSS.",
    image: "/images/portfolio.png",
    github: "https://github.com/yourname/portfolio",
    demo: "https://yourdomain.com",
  },
   {
    title: "Portfolio Website",
    description: "A personal portfolio site built with Next.js and Tailwind CSS.",
    image: "/images/portfolio.png",
    github: "https://github.com/yourname/portfolio",
    demo: "https://yourdomain.com",
  },
  {
    title: "Portfolio Website",
    description: "A personal portfolio site built with Next.js and Tailwind CSS.",
    image: "/images/portfolio.png",
    github: "https://github.com/yourname/portfolio",
    demo: "https://yourdomain.com",
  },
  {
    title: "Portfolio Website",
    description: "A personal portfolio site built with Next.js and Tailwind CSS.",
    image: "/images/portfolio.png",
    github: "https://github.com/yourname/portfolio",
    demo: "https://yourdomain.com",
  },
];

  return (
    <div className="min-h-screen py-16 bg-white">
      <div className="max-w-6xl mx-auto px-16 text-center">
        <h2 className="text-3xl font-bold text-gray-800 mb-12">My Projects</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
          {projects.map((project, index) => (
            <motion.div
              key={index}
              className="bg-gray-500 rounded-xl p-4 overflow-hidden shadow-lg hover:shadow-2xl transition-shadow duration-300"
              whileHover={{ scale: 1.03 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <Image
                src={project.image}
                alt={project.title}
                width={500}
                height={300}
                className="rounded-xl p-1"
              />
              <div className="p-6 text-left">
                <h3 className="text-xl font-semibold text-white">
                  {project.title}
                </h3>
                <p className="mt-1 text-gray-600">
                  {project.description}
                </p>
                {/* <div className="mt-4 flex space-x-4">
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-4 py-2 text-sm bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-white rounded hover:bg-gray-300 dark:hover:bg-gray-600"
                  >
                    GitHub
                  </a>
                  <a
                    href={project.demo}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-4 py-2 text-sm bg-blue-500 text-white rounded hover:bg-blue-600"
                  >
                    Demo
                  </a>
                </div> */}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
