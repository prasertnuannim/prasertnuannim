"use client";

import { getStyles } from "@/styles";
import { motion } from "framer-motion";
import { useLocale, useTranslations } from "next-intl";

export default function Work() {
  const t = useTranslations("workExperience");
  const locale = useLocale();
  const styles = getStyles(locale);

  const experiences = [
    {
      id: "genovation",
      position: "Full Stack Developer",
      company: "Genovation",
      period: "2024 - Present",
      description: t("descriptionGeno"),
    },
    {
      id: "belton",
      position: "IT Support",
      company: "Belton Industrial (Thailand) Ltd.",
      period: "2013 - 2024",
      description: t("descriptionBelton"),
    },
  ];

  return (
    <section className="section-ambient relative overflow-hidden px-4 py-20 sm:px-6 md:px-10">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-[-60px] top-[-40px] h-72 w-72 rounded-full bg-green-100/60 blur-3xl" />
        <div className="absolute right-[-70px] top-1/3 h-80 w-80 rounded-full bg-emerald-100/50 blur-3xl" />
        <div className="absolute bottom-[-80px] left-1/3 h-72 w-72 rounded-full bg-lime-100/40 blur-3xl" />
      </div>

      <div className={`relative mx-auto max-w-5xl ${styles.baseText}`}>
        <motion.div
          initial={{ opacity: 0, y: 22 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.5 }}
          className="mx-auto mb-14 max-w-3xl text-center"
        >

          <h2 className="text-4xl font-extrabold tracking-tight text-transparent sm:text-5xl bg-gradient-to-r from-green-800 via-green-500 to-emerald-300 bg-clip-text">
            {t("title")}
          </h2>
        </motion.div>

        <div className="relative mx-auto max-w-4xl">
          <motion.div
            aria-hidden="true"
            initial={{ scaleY: 0, opacity: 0.35 }}
            whileInView={{ scaleY: 1, opacity: 1 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="absolute left-4 top-0 hidden h-full w-px origin-top bg-gradient-to-b from-green-200 via-green-300 to-transparent sm:block"
          />

          <div className="space-y-8">
            {experiences.map((exp, i) => (
              <motion.div
                key={exp.id}
                initial={{ opacity: 0, x: -24, y: 10 }}
                whileInView={{ opacity: 1, x: 0, y: 0 }}
                transition={{ duration: 0.5, delay: i * 0.12 }}
                viewport={{ once: true, amount: 0.2 }}
                className="relative sm:pl-14"
              >
                <motion.div
                  aria-hidden="true"
                  initial={{ scale: 0.85, opacity: 0 }}
                  whileInView={{ scale: 1, opacity: 1 }}
                  viewport={{ once: true, amount: 0.4 }}
                  animate={{
                    scale: [1, 1.12, 1],
                    boxShadow: [
                      "0 0 0 0 rgba(34, 197, 94, 0.22)",
                      "0 0 0 8px rgba(34, 197, 94, 0)",
                      "0 0 0 0 rgba(34, 197, 94, 0)",
                    ],
                  }}
                  transition={{
                    scale: { duration: 1.8, repeat: Infinity, ease: "easeInOut" },
                    boxShadow: { duration: 1.8, repeat: Infinity, ease: "easeOut" },
                    opacity: { duration: 0.25 },
                  }}
                  className="absolute left-4 top-8 hidden h-3.5 w-3.5 -translate-x-1/2 rounded-full border-2 border-white bg-green-500 sm:block"
                />

                <div className="rounded-[28px] border border-white/70 bg-white/80 p-6 shadow-[0_16px_50px_rgba(15,23,42,0.08)] backdrop-blur-xl transition duration-300 hover:-translate-y-1 hover:shadow-[0_20px_60px_rgba(15,23,42,0.12)] sm:p-8">
                  <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                    <div>
                      <h3 className="text-xl font-bold text-gray-900 sm:text-2xl">
                        {exp.position}
                      </h3>
                      <p className="mt-1 text-base font-medium text-green-700">
                        {exp.company}
                      </p>
                    </div>

                    <div className="inline-flex w-fit rounded-full bg-green-50 px-4 py-1.5 text-sm font-semibold text-green-700 ring-1 ring-green-100">
                      {exp.period}
                    </div>
                  </div>

                  <p className="text-base leading-8 text-gray-600 sm:text-lg sm:leading-9">
                    {exp.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
