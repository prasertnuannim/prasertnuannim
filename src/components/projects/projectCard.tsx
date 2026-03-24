"use client";
import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import Image from "next/image";

type Props = {
  project: {
    id?: string;     
    title: string;
    description: string;
    image: string;
  };
  index: number;
  onClick: () => void;
};

export default function ProjectCard({ project, index, onClick }: Props) {
  const t = useTranslations("Projects");

  return (
    <motion.div
      className="flex h-[260px] w-[240px] flex-col overflow-hidden rounded-b-lg bg-gray-500 transition-shadow duration-300 hover:shadow-2xl"
      whileHover={{ scale: 1.03 }}
      transition={{ type: "spring", stiffness: 300 }}
    >
      <div className="relative h-[190px] w-full bg-gray-100">
        <Image
          src={project.image}
          alt={project.title}
          width={400}
          height={240}
          className="object-cover rounded-t-xl w-full p-2"
        />
      </div>
      <div className="flex flex-1 flex-col p-4 text-left">
        <h3 className="mb-2 text-lg font-semibold text-white sm:text-xl">
          {project.title}
        </h3>
        <motion.button
          onClick={onClick}
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          whileHover={{ scale: 1.05, rotate: 1 }}
          whileTap={{ scale: 0.95 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ delay: index * 0.2, duration: 0.5, ease: "easeOut" }}
          className="mt-auto inline-block self-start rounded bg-gradient-to-bl from-blue-200 to-gray-700 px-4 py-1.5 text-base font-bold text-white shadow-md hover:opacity-90"
        >
          {t("seeMore")}
        </motion.button>
      </div>
    </motion.div>
  );
}
