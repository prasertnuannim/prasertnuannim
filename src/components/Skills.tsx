"use client";

import { useEffect, useRef } from "react";
import { motion, useAnimation, useInView } from "framer-motion";
import {
  SiJavascript,
  SiReact,
  SiNextdotjs,
  SiTailwindcss,
  SiNodedotjs,
} from "react-icons/si";
import { useTranslations } from "next-intl";

const skills = [
  {
    name: "JavaScript",
    icon: <SiJavascript className="text-yellow-400" />,
    delay: 0,
  },
  { name: "React", icon: <SiReact className="text-blue-400" />, delay: 0.2 },
  {
    name: "Next.js",
    icon: <SiNextdotjs className="text-black dark:text-white" />,
    delay: 0.4,
  },
  {
    name: "Tailwind CSS",
    icon: <SiTailwindcss className="text-teal-400" />,
    delay: 0.6,
  },
  {
    name: "Node.js",
    icon: <SiNodedotjs className="text-green-500" />,
    delay: 0.8,
  },
];

export default function Skills() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  const controls = useAnimation();
  const t = useTranslations("Skills");

  useEffect(() => {
    if (isInView) {
      controls.start((i) => ({
        scale: [1, 1.1, 1],
        transition: {
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut",
          delay: skills[i].delay,
        },
      }));
    }
  }, [isInView, controls]);

  return (
    <div
      className="min-h-screen py-16 bg-gradient-to-b from-gray-100 via-yellow-100 to-yellow-300"
      ref={ref}
    >
      <div className="max-w-4xl mx-auto px-4 text-center">
        <p className="text-4xl font-bold mb-4 p-2 bg-gradient-to-r from-yellow-800 via-30% to-gray-100 bg-clip-text text-transparent drop-shadow-2xl">
          {t("title")}
        </p>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-8 justify-items-center">
          {skills.map((skill, i) => (
            <motion.div
              key={skill.name}
              className="flex flex-col items-center mt-2"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: skill.delay }}
              viewport={{ once: true }}
            >
              <motion.div
                custom={i}
                animate={controls}
                initial={{ scale: 1 }}
                className="p-4 rounded-lg bg-gray-700 shadow-lg"
              >
                <div className="text-5xl">{skill.icon}</div>
              </motion.div>
              <motion.div custom={i} animate={controls} initial={{ scale: 1 }}>
                <p className="mt-2 font-semibold text-black">{skill.name}</p>
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
