"use client";

import { motion } from "framer-motion";
import {
  SiJavascript,
  SiReact,
  SiNextdotjs,
  SiTailwindcss,
  SiShadcnui,
  SiNodedotjs,
  SiGo,
  SiArduino,
  SiRaspberrypi,
  SiEspressif,
} from "react-icons/si";
import { useLocale, useTranslations } from "next-intl";
import Image from "next/image";
import { BiLogoPostgresql } from "react-icons/bi";
import { GrMysql } from "react-icons/gr";
import { getStyles } from "@/styles";

const skills = [
  {
    name: "JavaScript",
    icon: <SiJavascript className="text-yellow-400" />,
    category: "Frontend",
  },
  {
    name: "React",
    icon: <SiReact className="text-cyan-400" />,
    category: "Frontend",
  },
  {
    name: "Next.js",
    icon: <SiNextdotjs className="text-black dark:text-black" />,
    category: "Frontend",
  },
  {
    name: "Tailwind CSS",
    icon: <SiTailwindcss className="text-cyan-400" />,
    category: "UI",
  },
  {
    name: "shadcn/ui",
    icon: <SiShadcnui className="text-slate-800" />,
    category: "UI",
  },
  {
    name: "Node.js",
    icon: <SiNodedotjs className="text-green-500" />,
    category: "Backend",
  },
  {
    name: "Go",
    icon: <SiGo className="text-cyan-500" />,
    category: "Backend",
  },
  {
    name: "Python",
    icon: (
      <Image
        src="/icons/python.png"
        alt="Python Logo"
        width={48}
        height={48}
        className="h-12 w-12 object-contain"
        priority
      />
    ),
    category: "Hardware",
  },
  {
    name: "Arduino",
    icon: <SiArduino className="text-teal-500" />,
    category: "Hardware",
  },
  {
    name: "Raspberry Pi",
    icon: <SiRaspberrypi className="text-[#C51A4A]" />,
    category: "Hardware",
  },
  {
    name: "Microcontroller",
    icon: <SiEspressif className="text-[#E7352C]" />,
    category: "Hardware",
  },
  {
    name: "MySQL",
    icon: <GrMysql className="text-[#00758F]" />,
    category: "Database",
  },
  {
    name: "PostgreSQL",
    icon: <BiLogoPostgresql className="text-[#336791]" />,
    category: "Database",
  },
];

export default function Skills() {
  const t = useTranslations("Skills");
  const locale = useLocale();
  const styles = getStyles(locale);

  return (
    <section className="section-ambient relative overflow-hidden px-4 py-20 sm:px-6 md:px-10">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-[-60px] top-[-40px] h-72 w-72 rounded-full bg-green-100/60 blur-3xl" />
        <div className="absolute right-[-50px] top-1/3 h-80 w-80 rounded-full bg-lime-100/45 blur-3xl" />
        <div className="absolute bottom-[-70px] left-1/3 h-72 w-72 rounded-full bg-emerald-100/40 blur-3xl" />
      </div>

      <div className={`relative mx-auto max-w-7xl ${styles.baseText}`}>
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{ duration: 0.5 }}
          className="mx-auto mb-14 max-w-3xl text-center"
        >

          <h2 className="text-4xl font-extrabold tracking-tight text-transparent sm:text-5xl md:text-6xl bg-gradient-to-r from-yellow-600 via-amber-500 to-green-400 bg-clip-text">
            {t("title")}
          </h2>

          <p className="mt-5 text-base leading-8 text-gray-600 sm:text-lg">
            {t("description")}
          </p>
        </motion.div>

        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 2xl:grid-cols-6">
          {skills.map((skill, index) => (
            <motion.div
              key={skill.name}
              initial={{ opacity: 0, y: 24, scale: 0.96 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.4, delay: index * 0.05 }}
              whileHover={{ y: -6, scale: 1.02 }}
              className="group relative overflow-hidden rounded-3xl border border-white/70 bg-white/80 p-5 shadow-[0_12px_40px_rgba(15,23,42,0.08)] backdrop-blur-xl transition-all duration-300"
            >
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-white via-transparent to-yellow-50 opacity-0 transition duration-300 group-hover:opacity-100" />
              <div className="relative flex flex-col items-center text-center">
                <div className="mb-4 flex h-20 w-20 items-center justify-center rounded-2xl bg-gradient-to-br from-gray-50 to-yellow-50 shadow-inner">
                  <div className="text-5xl">{skill.icon}</div>
                </div>

                <span className="mb-2 rounded-full bg-gray-100 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.16em] text-gray-500">
                  {skill.category}
                </span>

                <p className="text-base font-semibold text-gray-900 sm:text-lg">
                  {skill.name}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
