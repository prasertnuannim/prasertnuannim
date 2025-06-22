"use client";

import { motion } from "framer-motion";

const experiences = [
  {
    position: "Frontend Developer",
    company: "TechCorp Solutions",
    period: "Jan 2022 – Present",
    description:
      "Developed and maintained web applications using React, Next.js, and Tailwind CSS. Collaborated with design and backend teams to deliver responsive and user-friendly interfaces.",
  },
  {
    position: "Junior Web Developer",
    company: "Creative Studio",
    period: "Jun 2020 – Dec 2021",
    description:
      "Assisted in building landing pages and dashboards. Focused on UI implementation and improving performance for mobile users.",
  },
];

export default function Work() {
  return (
    <div className="min-h-screen py-16 px-16 bg-gray-50">
      <div className="max-w-4xl mx-auto px-4">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-12">
          Work Experience
        </h2>
        <div className="space-y-8">
          {experiences.map((exp, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: i * 0.2 }}
              viewport={{ once: true }}
              className="bg-white dark:bg-gray-800 shadow-md rounded-lg p-6"
            >
              <h3 className="text-xl font-semibold text-gray-800 dark:text-white">
                {exp.position} – <span className="font-normal">{exp.company}</span>
              </h3>
              <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">{exp.period}</p>
              <p className="text-gray-700 dark:text-gray-300">{exp.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
