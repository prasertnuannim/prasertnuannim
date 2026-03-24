"use client";
import SwitchLanguage from "@/components/SwitchLanguage";
import { getStyles } from "@/styles";
import { motion } from "framer-motion";
import { useLocale, useTranslations } from "next-intl";
import Image from "next/image";
import { useEffect } from "react";

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
  const styles = getStyles(locale);

  useEffect(() => {
    document.body.classList.add("project-modal-open");

    return () => {
      document.body.classList.remove("project-modal-open");
    };
  }, []);

  return (
    <div className={styles.baseText}>
  <motion.div
  className="fixed inset-0 z-[100] flex items-center justify-center bg-gray-200 bg-opacity-50 px-4 md:px-8 overflow-auto"
  initial={{ opacity: 0 }}
  animate={{ opacity: 1 }}
  exit={{ opacity: 0 }}
  onClick={onClose}
>
  <motion.div
    className="relative max-h-[90vh] w-full max-w-xl overflow-y-auto rounded-xl bg-white p-6 shadow-2xl md:max-w-2xl"
    initial={{ y: 50, opacity: 0 }}
    animate={{ y: 0, opacity: 1 }}
    exit={{ y: 50, opacity: 0 }}
    onClick={(e) => e.stopPropagation()}
  >
          <div className="mb-4 flex items-start justify-between gap-4">
            <h3 className="text-2xl font-bold text-gray-800 sm:text-3xl">
              {project.title}
            </h3>
            <SwitchLanguage variant="modal" />
          </div>
          <div className="relative w-full flex justify-center h-auto mb-4">
            <Image
              src={project.image}
              alt={project.title}
              width={400}
              height={340}
              className="object-cover p-2 shadow-2xl"
            />
          </div>
          <p className="whitespace-pre-line indent-8 text-base leading-8 text-gray-700 sm:text-lg sm:leading-9">
            {project.description}
          </p>
          <button
            onClick={onClose}
            className="mt-4 ml-2 cursor-pointer rounded bg-gray-800 px-4 py-1.5 text-base text-white hover:bg-gray-500 sm:text-lg"
          >
            {t("close")}
          </button>
        </motion.div>
      </motion.div>
    </div>
  );
}
