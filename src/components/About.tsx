"use client";

import { motion } from "framer-motion";
import { getStyles } from "@/styles";
import { useLocale, useTranslations } from "next-intl";

export default function About() {
  const t = useTranslations("About");
  const locale = useLocale();
  const styles = getStyles(locale);

  return (
    <section className="section-ambient relative overflow-hidden px-4 py-20 sm:px-6 md:px-10">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-[-40px] top-[-60px] h-72 w-72 rounded-full bg-emerald-100/60 blur-3xl" />
        <div className="absolute right-[-60px] top-1/3 h-80 w-80 rounded-full bg-green-100/50 blur-3xl" />
        <div className="absolute bottom-[-80px] left-1/3 h-72 w-72 rounded-full bg-lime-100/40 blur-3xl" />
      </div>

      <div className="relative mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.5 }}
          className={`mx-auto max-w-4xl ${styles.baseText}`}
        >

          <h2 className="text-4xl font-extrabold tracking-tight text-transparent sm:text-5xl bg-gradient-to-r from-green-800 via-green-500 to-emerald-300 bg-clip-text">
            {t("title")}
          </h2>

          <div className="mt-8 rounded-[28px] border border-white/70 bg-white/80 p-6 shadow-[0_20px_70px_rgba(15,23,42,0.08)] backdrop-blur-xl sm:p-8 md:p-10">
            <div className="space-y-6 text-left text-base leading-8 text-gray-700 sm:text-lg sm:leading-9">
              <p>{t("description1")}</p>
              <p>{t("description2")}</p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
