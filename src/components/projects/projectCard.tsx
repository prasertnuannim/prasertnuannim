"use client";
import { motion } from "framer-motion";
import Image from "next/image";

type Props = {
  project: {
    title: string;
    description: string;
    image: string;
  };
  index: number;
  onClick: () => void;
};

export default function ProjectCard({ project, index, onClick }: Props) {
  return (
    <motion.div
      className="flex w-[220px] h-[240px] bg-gray-500 rounded-b-2xl overflow-hidden flex-col hover:shadow-2xl transition-shadow duration-300"
      whileHover={{ scale: 1.03 }}
      transition={{ type: "spring", stiffness: 300 }}
    >
      <div className="relative w-full h-[180px] bg-gray-100">
        <Image
          src={project.image}
          alt={project.title}
          width={400}
          height={240}
          className="object-cover rounded-t-xl w-full p-2"
        />
      </div>
      <div className="p-4 text-left flex flex-col flex-1">
        <h3 className="text-[16px] font-semibold text-white mb-2">
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
          className="inline-block mt-auto px-4 py-1 bg-gradient-to-bl from-blue-200 to-gray-700 text-white text-sm font-bold rounded hover:opacity-90 self-start shadow-md"
        >
          See more
        </motion.button>
      </div>
    </motion.div>
  );
}
