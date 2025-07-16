"use client";

import { motion } from "framer-motion";
import { SiLine } from "react-icons/si";
import { useLocale, useTranslations } from "next-intl";
import Image from "next/image";
import { getStyles } from "@/styles";

export default function Contact() {
  const t = useTranslations("contact");
  const locale = useLocale();
  const styles = getStyles(locale);
  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center px-16">
      <div className={`${styles.baseText}`}>
        <motion.div
          className="w-full max-w-2xl bg-white rounded-xl shadow-lg p-6 flex flex-col md:flex-row items-center gap-6"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          {/* Profile Image */}
          <div className="shrink-0">
            <Image
              src="/images/sertCG.png"
              alt="Prasert Nuannim"
              width={120}
              height={120}
            />
          </div>

          {/* Contact Info */}
          <div className="text-center md:text-left space-y-2">
            <h2 className="text-2xl font-bold text-gray-800">{t("title")}</h2>
            <p className="text-gray-600">{t("description")}</p>

            <p className="text-gray-700">
              <a href="tel:+66830099743" className="text-black hover:underline">
                083-009-9743
              </a>
            </p>

            <p className="text-black">
              <a
                href="mailto:nuannimprasert@gmail.com"
                className="hover:underline"
              >
                nuannimprasert@gmail.com
              </a>
            </p>

            <a
              href="https://line.me/R/ti/p/~s_er_t"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-4xl transition duration-300"
            >
              <SiLine className="text-xl" />
              ส่งข้อความทาง LINE
            </a>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
