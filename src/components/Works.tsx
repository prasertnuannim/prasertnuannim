"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";


export default function Work() {
  const t = useTranslations("workExperience");
  const experiences = [
  {
    position: "Full Stack Developer",
    company: "Genovation",
    period: "2024 - Present",
    description:
      <div className='text-white indent-8'>{t("descriptionGeno")}</div>
  },
  {
    position: "IT Support",
    company: "Belton Industrial (Thailand) Ltd.",
    period: "2013 - 2024",
    description:
      <div className='text-white indent-8'>{t("descriptionBelton")}</div>
  },
];

  return (
    <div className="min-h-screen py-16 px-16 bg-gray-200">
      <div className="max-w-2xl mx-auto px-4">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-4">
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
              className="bg-gray-600 shadow-md rounded-lg p-6"
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
