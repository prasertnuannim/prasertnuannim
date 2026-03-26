"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { useTranslations } from "next-intl";

type Props = {
  project: {
    title: string;
    description: string;
    image: string;
    link?: string;
  };
  onClick: () => void;
};

export default function ProjectCard({
  project,
  onClick,
}: Props) {
  const t = useTranslations("Projects");

  return (
    <motion.button
      type="button"
      onClick={onClick}
      aria-label={project.title}
      whileHover={{ y: -8, scale: 1.01 }}
      whileTap={{ scale: 0.99 }}
      transition={{ type: "spring", stiffness: 260, damping: 22 }}
      className="group relative mx-auto flex h-[28rem] w-full max-w-[320px] flex-col overflow-hidden rounded-b-[20px] border border-slate-200/80 bg-white/92 text-left shadow-[0_18px_60px_rgba(15,23,42,0.12)] transition-shadow duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-300/60 focus-visible:ring-offset-2 focus-visible:ring-offset-transparent"
    >
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(34,197,94,0.16),_transparent_42%)] opacity-0 transition duration-500 group-hover:opacity-100" />

      <div
        className="relative flex h-[14rem] items-center justify-center overflow-hidden border-b border-slate-200/70 bg-[linear-gradient(180deg,rgba(248,250,252,0.98),rgba(226,232,240,0.9))] p-3"
      >
        <div
          className="relative h-full w-full overflow-hidden rounded-[5px] border border-black/5 bg-white shadow-[0_12px_34px_rgba(15,23,42,0.16)]"
        >
          <Image
            src={project.image}
            alt={project.title}
            fill
            sizes="(min-width: 1280px) 320px, 320px, 100vw"
            className="object-contain p-1 transition duration-700 group-hover:scale-[1.02]"
          />
        </div>
      </div>

      <div className="relative flex flex-1 flex-col p-5 sm:p-6">
        <div className="flex-1">
          <h3 className="text-center text-xl font-semibold leading-tight tracking-tight text-slate-900 sm:text-2xl">
            {project.title}
          </h3>

          <p className="mt-4 text-sm leading-6 text-slate-600 [display:-webkit-box] overflow-hidden [-webkit-box-orient:vertical] [-webkit-line-clamp:5]">
            {project.description}
          </p>
        </div>

        <div className="mt-6 flex items-center gap-3 pt-5 text-xs font-semibold uppercase tracking-[0.24em] text-emerald-700">
          <span className="h-px flex-1 bg-current/35" />
          <span>{t("seeMore")}</span>
        </div>
      </div>
    </motion.button>
  );
}
