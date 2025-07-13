"use client";

import { motion } from "framer-motion";
import { SiLine } from "react-icons/si";
import { useTranslations } from "next-intl";
export default function Contact() {
  const t = useTranslations("contact");
  return (
    <div className="min-h-screen bg-gray-300 flex items-center justify-center px-4">
      <div className="text-center max-w-xl">
        <h2 className="text-3xl font-bold text-white mb-4">{t("title")}</h2>

        <motion.p
          className="text-lg text-gray-800 mb-4"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          {t("description")}
        </motion.p>

        <motion.p
          className="text-xl text-blue-800 py-2"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          viewport={{ once: true }}
        >
          <a
            href="mailto:nuannimprasert@gmail.com"
            className="text-blue-600 hover:underline mt-2 inline-block"
          >
            nuannimprasert@gmail.com
          </a>
        </motion.p>

        <motion.a
          href="https://line.me/R/ti/p/~s_er_t"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 bg-green-500 hover:bg-green-600 text-white px-6 py-2 rounded-full transition duration-300"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          whileHover={{ scale: 1.05, rotate: [0, 2, -2, 0] }}
          transition={{
            opacity: { duration: 0.6, delay: 0.2 },
            y: { duration: 0.6, delay: 0.2 },
            rotate: { duration: 0.4 },
            scale: { duration: 0.2 },
          }}
          viewport={{ once: true }}
        >
          <SiLine className="text-xl" />
          ส่งข้อความทาง LINE
        </motion.a>
      </div>
    </div>
  );
}
