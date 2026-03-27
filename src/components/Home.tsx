"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { useLocale, useTranslations } from "next-intl";
import ColorMotionInChar from "./motions/ColorMotionInChar";
import { getStyles } from "@/styles";

const spaceNebulae = [
  {
    id: "cyan",
    className:
      "-left-20 top-10 h-64 w-64 sm:h-80 sm:w-80 bg-[radial-gradient(circle_at_center,rgba(56,189,248,0.2),rgba(59,130,246,0.08)_48%,transparent_74%)]",
    x: [0, 24, -10, 0],
    y: [0, -18, 12, 0],
    scale: [1, 1.08, 0.98, 1],
    duration: 18,
  },
  {
    id: "emerald",
    className:
      "right-[-6%] bottom-[12%] h-72 w-72 sm:h-96 sm:w-96 bg-[radial-gradient(circle_at_center,rgba(16,185,129,0.16),rgba(6,182,212,0.06)_52%,transparent_74%)]",
    x: [0, -18, 8, 0],
    y: [0, 16, -10, 0],
    scale: [0.98, 1.12, 1, 0.98],
    duration: 20,
  },
  {
    id: "violet",
    className:
      "left-1/2 top-1/2 h-80 w-80 -translate-x-1/2 -translate-y-1/2 sm:h-[32rem] sm:w-[32rem] bg-[radial-gradient(circle_at_center,rgba(168,85,247,0.12),rgba(59,130,246,0.05)_46%,transparent_72%)]",
    x: [0, 10, -12, 0],
    y: [0, -12, 14, 0],
    scale: [1, 1.06, 0.96, 1],
    duration: 22,
  },
];

const spaceStars = [
  {
    id: "star-1",
    className:
      "left-[9%] top-[16%] h-1.5 w-1.5 bg-white/80 shadow-[0_0_12px_rgba(255,255,255,0.9)]",
  },
  {
    id: "star-2",
    className:
      "left-[18%] top-[28%] h-1 w-1 bg-cyan-100/80 shadow-[0_0_12px_rgba(207,250,254,0.85)]",
  },
  {
    id: "star-3",
    className:
      "right-[14%] top-[18%] h-1.5 w-1.5 bg-white/70 shadow-[0_0_12px_rgba(255,255,255,0.85)]",
  },
  {
    id: "star-4",
    className:
      "right-[21%] top-[34%] h-1 w-1 bg-sky-200/80 shadow-[0_0_10px_rgba(191,219,254,0.85)]",
  },
  {
    id: "star-5",
    className:
      "left-[16%] bottom-[22%] h-1.5 w-1.5 bg-violet-100/70 shadow-[0_0_12px_rgba(221,214,254,0.8)]",
  },
  {
    id: "star-6",
    className:
      "right-[11%] bottom-[18%] h-1.5 w-1.5 bg-white/80 shadow-[0_0_14px_rgba(255,255,255,0.9)]",
  },
  {
    id: "star-7",
    className:
      "left-[48%] top-[10%] h-1 w-1 bg-cyan-100/70 shadow-[0_0_10px_rgba(224,242,254,0.75)]",
  },
  {
    id: "star-8",
    className:
      "left-[52%] bottom-[14%] h-1 w-1 bg-white/65 shadow-[0_0_10px_rgba(255,255,255,0.75)]",
  },
];

export default function Home() {
  const t = useTranslations("Home");
  const locale = useLocale();
  const styles = getStyles(locale);
  const welcomeMessageClass =
    locale === "en"
      ? "mx-auto mt-6 max-w-3xl whitespace-pre-line text-xs leading-6 text-white/74 drop-shadow-[0_8px_28px_rgba(15,23,42,0.55)] sm:text-sm sm:leading-7 md:max-w-4xl md:text-base lg:text-lg"
      : "mx-auto mt-6 max-w-3xl whitespace-pre-line text-sm leading-7 text-white/74 drop-shadow-[0_8px_28px_rgba(15,23,42,0.55)] sm:text-base sm:leading-8 md:max-w-4xl md:text-lg lg:text-xl";

  return (
    <section className="relative flex min-h-[100svh] items-center justify-center overflow-hidden px-4 py-10 sm:px-8 md:px-16">
      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        <div className="absolute inset-0" />
        <div className="absolute inset-0" />

        {spaceNebulae.map((nebula) => (
          <motion.div
            key={nebula.id}
            animate={{
              x: nebula.x,
              y: nebula.y,
              scale: nebula.scale,
              opacity: [0.55, 0.85, 0.62, 0.55],
            }}
            transition={{
              duration: nebula.duration,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className={`absolute rounded-full blur-3xl ${nebula.className}`}
          />
        ))}

        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_42%,rgba(125,211,252,0.08),transparent_18%),radial-gradient(circle_at_24%_70%,rgba(16,185,129,0.08),transparent_22%),radial-gradient(circle_at_80%_22%,rgba(192,132,252,0.08),transparent_16%)]" />

        {spaceStars.map((star) => (
          <div key={star.id} className={`absolute rounded-full ${star.className}`} />
        ))}
      </div>

      <div
        className={`relative z-10 mx-auto flex w-full max-w-6xl flex-col items-center text-center ${styles.baseText}`}
      >
        <motion.div
          initial={{ opacity: 0, y: 24, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.6 }}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.92 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.15, duration: 0.5 }}
            className="mb-10 flex justify-center"
          >
            <div className="relative flex w-full max-w-[18rem] items-center justify-center sm:max-w-[22rem] md:max-w-[26rem]">
              <motion.div
                animate={{
                  x: [0, 3, 0, -2, 0],
                  y: [0, -4, -7, -4, 0],
                  rotate: [-1, -0.35, 0.5, -0.2, -1],
                  scale: [1, 1.01, 1.018, 1.01, 1],
                }}
                whileHover={{
                  x: 0,
                  y: -5,
                  rotate: 0,
                  scale: 1.03,
                  transition: {
                    type: "spring",
                    stiffness: 90,
                    damping: 18,
                    mass: 1.1,
                  },
                }}
                transition={{
                  duration: 8.5,
                  repeat: Infinity,
                  ease: [0.42, 0, 0.58, 1],
                  times: [0, 0.24, 0.5, 0.76, 1],
                }}
                className="relative flex w-full items-center justify-center"
              >
                <div className="absolute left-1/2 top-1/2 -z-10 h-[90%] w-[90%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-white/20 blur-3xl" />
                <div className="absolute left-1/2 top-[58%] -z-10 h-[20%] w-[60%] -translate-x-1/2 rounded-full bg-white/16 blur-2xl" />

                <Image
                  src="/images/sert.png"
                  alt="Sert profile illustration"
                  width={2100}
                  height={1500}
                  className="relative z-10 h-auto w-full object-contain saturate-110 contrast-110 drop-shadow-[0_24px_42px_rgba(15,23,42,0.26)]"
                  priority
                />
              </motion.div>
            </div>
          </motion.div>

          <div className="mx-auto max-w-5xl">
            <div className="flex justify-center">
              <ColorMotionInChar
                className="text-4xl font-extrabold leading-tight sm:text-5xl md:text-6xl lg:text-7xl"
                colors={[
                  "#ef4444",
                  "#f97316",
                  "#eab308",
                  "#22c55e",
                  "#06b6d4",
                  "#3b82f6",
                  "#8b5cf6",
                  "#ec4899",
                  "#ef4444",
                ]}
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
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
