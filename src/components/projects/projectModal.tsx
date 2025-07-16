"use client";
import { getStyles } from "@/styles";
import { motion } from "framer-motion";
import { useLocale } from "next-intl";
import Image from "next/image";

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
  const locale = useLocale();
  const styles = getStyles(locale);
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
    className="bg-white rounded-xl p-6 w-full max-w-xl md:max-w-2xl max-h-[90vh] overflow-y-auto relative"
    initial={{ y: 50, opacity: 0 }}
    animate={{ y: 0, opacity: 1 }}
    exit={{ y: 50, opacity: 0 }}
    onClick={(e) => e.stopPropagation()}
  >
          <h3 className="text-xl font-bold text-gray-800 mb-4">
            {project.title}
          </h3>
          <div className="relative w-full flex justify-center h-48 mb-4">
            <Image
              src={project.image}
              alt={project.title}
              width={400}
              height={240}
              className="object-cover p-2 shadow-2xl"
            />
          </div>
          <p className="text-gray-700 indent-8 whitespace-pre-line">
            {project.description}
          </p>
          <button
            onClick={onClose}
            className="mt-4 ml-2 px-4 py-1 bg-gray-800 text-white rounded hover:bg-gray-500 cursor-pointer"
          >
            Close
          </button>
        </motion.div>
      </motion.div>
    </div>
  );
}
