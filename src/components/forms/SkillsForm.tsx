"use client";

import { useEffect, useRef } from "react";
import { motion, useAnimation, useInView } from "framer-motion";
import { SiJavascript, SiReact, SiNextdotjs, SiTailwindcss, SiNodedotjs } from "react-icons/si";

const skills = [
  { name: "JavaScript", icon: <SiJavascript className="text-yellow-400" />, delay: 0 },
  { name: "React", icon: <SiReact className="text-blue-400" />, delay: 0.2 },
  { name: "Next.js", icon: <SiNextdotjs className="text-black dark:text-white" />, delay: 0.4 },
  { name: "Tailwind CSS", icon: <SiTailwindcss className="text-teal-400" />, delay: 0.6 },
  { name: "Node.js", icon: <SiNodedotjs className="text-green-500" />, delay: 0.8 },
];

export default function SkillsForm() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  const controls = useAnimation();

  useEffect(() => {
    if (isInView) {
      controls.start(i => ({
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
    <div className="py-16 bg-gray-700" ref={ref}>
      <div className="max-w-4xl mx-auto px-4 text-center">
        <h2 className="text-3xl font-bold mb-8">My Skills</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-8 justify-items-center">
          {skills.map((skill, i) => (
            <motion.div
              key={skill.name}
              className="flex flex-col items-center"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: skill.delay }}
              viewport={{ once: true }}
            >
              <motion.div
                custom={i}
                animate={controls}
                initial={{ scale: 1 }}
                className="text-5xl mb-2"
              >
                {skill.icon}
              </motion.div>
              <p className="text-gray-700 dark:text-gray-300">{skill.name}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
