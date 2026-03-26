"use client";

import SwitchLanguage from "@/components/SwitchLanguage";
import { motion } from "framer-motion";
import { useLocale, useTranslations } from "next-intl";
import Image from "next/image";
import { useEffect } from "react";
import { FiArrowUpRight, FiX } from "react-icons/fi";

type Props = {
  project: {
    title: string;
    description: string;
    image: string;
    link?: string;
  };
  onClose: () => void;
};

export default function ProjectModal({ project, onClose }: Props) {
  const t = useTranslations("Projects");
  const locale = useLocale();
  const fontClassName = locale === "th" ? "font-thai" : "font-eng";
  const modalEyebrow = locale === "th" ? "รายละเอียดโปรเจกต์" : "Project details";
  const openProjectLabel = locale === "th" ? "เปิดลิงก์โปรเจกต์" : "Open project";
  const hasProjectLink = Boolean(project.link && !project.link.includes("yourusername"));
  const projectStatusLabel = hasProjectLink
    ? locale === "th"
      ? "มีลิงก์โปรเจกต์"
      : "Live link"
    : locale === "th"
      ? "ตัวอย่างโปรเจกต์"
      : "Preview";

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    document.body.classList.add("project-modal-open", "overflow-hidden");
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.classList.remove("project-modal-open", "overflow-hidden");
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [onClose]);

  return (
    <motion.div
      className={`fixed inset-0 z-[100] overflow-y-auto bg-slate-950/52 px-4 py-6 backdrop-blur-sm md:px-8 ${fontClassName}`}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
    >
      <div className="flex min-h-full items-center justify-center">
        <motion.div
          role="dialog"
          aria-modal="true"
          aria-labelledby="project-modal-title"
          className="relative w-full max-w-5xl overflow-hidden rounded-[34px] border border-white/80 bg-[linear-gradient(145deg,rgba(255,255,255,0.98),rgba(242,247,244,0.97))] shadow-[0_30px_120px_rgba(15,23,42,0.25)]"
          initial={{ y: 36, opacity: 0, scale: 0.98 }}
          animate={{ y: 0, opacity: 1, scale: 1 }}
          exit={{ y: 36, opacity: 0, scale: 0.98 }}
          transition={{ duration: 0.28, ease: "easeOut" }}
          onClick={(event) => event.stopPropagation()}
        >
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(56,189,248,0.08),_transparent_28%),radial-gradient(circle_at_bottom_right,_rgba(16,185,129,0.12),_transparent_32%)]" />

          <div className="relative flex items-start justify-between gap-4 border-b border-slate-200 px-5 py-5 sm:px-8">
            <div className="min-w-0">
              <p className="text-xs font-semibold uppercase tracking-[0.28em] text-emerald-700">
                {modalEyebrow}
              </p>
              <h3
                id="project-modal-title"
                className="mt-3 text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl"
              >
                {project.title}
              </h3>
            </div>

            <div className="flex shrink-0 items-center gap-3">
              <SwitchLanguage variant="modal" />
              <button
                type="button"
                onClick={onClose}
                aria-label={t("close")}
                className="flex h-10 w-10 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-500 transition hover:bg-slate-50 hover:text-slate-700"
              >
                <FiX className="text-lg" />
              </button>
            </div>
          </div>

          <div className="relative grid lg:grid-cols-[1.08fr_0.92fr]">
            <div className="relative flex min-h-[320px] items-center justify-center overflow-hidden border-b border-slate-200 bg-[linear-gradient(180deg,rgba(248,250,252,0.98),rgba(241,245,249,0.92))] p-5 lg:min-h-full lg:border-b-0 lg:border-r lg:border-slate-200 lg:p-7">
              <div className="relative aspect-[16/10] w-full max-w-[42rem] overflow-hidden rounded-[24px] border border-slate-200 bg-white shadow-[0_18px_50px_rgba(15,23,42,0.12)]">
                <Image
                  src={project.image}
                  alt={project.title}
                  fill
                  sizes="(min-width: 1024px) 52vw, 100vw"
                  className="object-contain p-3"
                />
              </div>
            </div>

            <div className="relative flex flex-col p-6 sm:p-8">
              <div className="inline-flex w-fit rounded-full border border-emerald-200 bg-emerald-50 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.24em] text-emerald-700">
                {projectStatusLabel}
              </div>

              <p className="mt-6 whitespace-pre-line text-base leading-8 text-slate-600 sm:text-lg sm:leading-9">
                {project.description}
              </p>

              <div className="mt-8 flex flex-wrap gap-3">
                {hasProjectLink && project.link && (
                  <a
                    href={project.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 rounded-full bg-white px-5 py-3 text-sm font-semibold text-slate-900 transition hover:bg-emerald-100"
                  >
                    {openProjectLabel}
                    <FiArrowUpRight className="text-base" />
                  </a>
                )}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}
