"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import ColorMotionInChar from "./motions/ColorMotionInChar";
import { useLocale, useTranslations } from "next-intl";
import { getStyles } from "@/styles";

export default function Home() {
  const t = useTranslations("Home");
  const locale = useLocale();
  const styles = getStyles(locale);
  const welcomeMessageClass =
    locale === "en"
      ? "mx-auto mt-6 max-w-3xl whitespace-pre-line text-xs leading-6 text-gray-600 sm:text-sm sm:leading-7 md:max-w-4xl md:text-base lg:text-lg"
      : "mx-auto mt-6 max-w-3xl whitespace-pre-line text-sm leading-7 text-gray-600 sm:text-base sm:leading-8 md:max-w-4xl md:text-lg lg:text-xl";

  return (
    <section className="section-ambient relative flex min-h-screen items-center justify-center overflow-hidden px-4 py-10 sm:px-8 md:px-16">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-[-60px] top-[-40px] h-72 w-72 rounded-full bg-green-100/60 blur-3xl" />
        <div className="absolute right-[-80px] top-1/4 h-96 w-96 rounded-full bg-emerald-100/50 blur-3xl" />
        <div className="absolute bottom-[-80px] left-1/3 h-80 w-80 rounded-full bg-lime-100/40 blur-3xl" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(255,255,255,0.75),_transparent_45%)]" />
      </div>

      <div
        className={`relative mx-auto flex w-full max-w-6xl flex-col items-center text-center ${styles.baseText}`}
      >
        <motion.div
          initial={{ opacity: 0, y: 24, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.6 }}
          className="w-full rounded-[32px] border border-white/70 bg-white/70 px-6 py-10 shadow-[0_20px_80px_rgba(15,23,42,0.08)] backdrop-blur-xl sm:px-10 sm:py-14"
        >

          <motion.div
            initial={{ opacity: 0, scale: 0.92 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.15, duration: 0.5 }}
            className="mb-10 flex justify-center"
          >
            <div className="relative w-full max-w-[18rem] sm:max-w-[22rem] md:max-w-[26rem]">
              <motion.div
                animate={{
                  y: [0, -10, 0],
                  rotate: [-1.8, 1.2, -1.8],
                  scale: [1, 1.025, 1],
                }}
                whileHover={{ y: -8, rotate: 0, scale: 1.05 }}
                transition={{ duration: 5.5, repeat: Infinity, ease: "easeInOut" }}
                className="relative"
              >
                <Image
                  src="/images/sertCG.png"
                  alt="Sert profile illustration"
                  width={2100}
                  height={1500}
                  className="h-auto w-full object-contain saturate-110 contrast-110 drop-shadow-[0_22px_44px_rgba(15,23,42,0.2)]"
                  priority
                />
              </motion.div>
            </div>
          </motion.div>

          <div className="mx-auto max-w-5xl">

            <div className="flex justify-center">
              <ColorMotionInChar
                className="text-4xl font-extrabold leading-tight sm:text-5xl md:text-6xl lg:text-7xl"
                colors={["#ef4444", "#f97316", "#eab308", "#22c55e", "#06b6d4", "#3b82f6", "#8b5cf6", "#ec4899", "#ef4444"]}
                name={"Hi I'm Sert"}
              />
            </div>

            <motion.p
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.35, duration: 0.5 }}
              className={welcomeMessageClass}
            >
              {t("welcomeMessage")}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.45, duration: 0.5 }}
              className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row"
            >
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
