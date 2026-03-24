"use client";

import { motion } from "framer-motion";
import { SiLine } from "react-icons/si";
import { MdEmail, MdPhone } from "react-icons/md";
import { useLocale, useTranslations } from "next-intl";
import { getStyles } from "@/styles";

export default function Contact() {
  const t = useTranslations("contact");
  const locale = useLocale();
  const styles = getStyles(locale);

  const contactItems = [
    {
      href: "tel:+66830099743",
      label: t("phoneLabel"),
      value: "083-009-9743",
      icon: <MdPhone className="text-2xl" />,
      ariaLabel: "Call 083-009-9743",
    },
    {
      href: "mailto:nuannimprasert@gmail.com",
      label: t("emailLabel"),
      value: "nuannimprasert@gmail.com",
      icon: <MdEmail className="text-2xl" />,
      ariaLabel: "Send email to nuannimprasert@gmail.com",
      valueClassName: "break-all",
    },
  ];

  return (
    <section className="section-ambient relative overflow-hidden px-4 py-20 sm:px-6 md:px-10">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-[-50px] top-[-40px] h-72 w-72 rounded-full bg-green-100/60 blur-3xl" />
        <div className="absolute right-[-60px] top-1/3 h-80 w-80 rounded-full bg-emerald-100/50 blur-3xl" />
        <div className="absolute bottom-[-80px] left-1/3 h-72 w-72 rounded-full bg-lime-100/40 blur-3xl" />
      </div>

      <div className={`relative mx-auto max-w-6xl ${styles.baseText}`}>
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.5 }}
          className="mx-auto mb-12 max-w-3xl text-center"
        >
          <h2 className="bg-gradient-to-r from-green-800 via-green-500 to-emerald-300 bg-clip-text text-4xl font-extrabold tracking-tight text-transparent sm:text-5xl">
            {t("title")}
          </h2>

          <p className="mt-5 text-base leading-8 text-gray-600 sm:text-lg">
            {t("description")}
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.96, y: 20 }}
          whileInView={{ opacity: 1, scale: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.5 }}
          className="mx-auto max-w-3xl overflow-hidden rounded-[32px] border border-white/70 bg-white/80 shadow-[0_20px_80px_rgba(15,23,42,0.08)] backdrop-blur-xl"
        >
          <div className="p-8 sm:p-10">
            <div className="space-y-4">
              {contactItems.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  aria-label={item.ariaLabel}
                  className="group flex items-center gap-4 rounded-2xl border border-gray-100 bg-gray-50/80 px-5 py-4 transition duration-300 hover:-translate-y-0.5 hover:border-green-200 hover:bg-white hover:shadow-md"
                >
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-green-50 text-green-600">
                    {item.icon}
                  </div>

                  <div className="min-w-0">
                    <p className="text-base text-gray-500">{item.label}</p>
                    <p
                      className={`text-lg font-semibold text-gray-900 group-hover:text-green-700 ${
                        item.valueClassName ?? ""
                      }`}
                    >
                      {item.value}
                    </p>
                  </div>
                </a>
              ))}
            </div>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <a
                href="https://line.me/R/ti/p/~s_er_t"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Open LINE contact"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-green-500 to-emerald-500 px-6 py-3 text-base font-semibold text-white shadow-lg transition duration-300 hover:-translate-y-0.5 hover:shadow-xl sm:text-lg"
              >
                <SiLine className="text-xl" />
                {t("lineButton")}
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
