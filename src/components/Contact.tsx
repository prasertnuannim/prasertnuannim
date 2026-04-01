"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { SiLine } from "react-icons/si";
import { MdEmail, MdPhone } from "react-icons/md";
import { useLocale, useTranslations } from "next-intl";
import { getStyles } from "@/styles";

const VISITOR_COUNTER_NAMESPACE = "prasertnuannim-portfolio";
const VISITOR_COUNTER_NAME = "visitors";
const VISITOR_COUNTER_STORAGE_KEY = "prasertnuannim-portfolio-visitor-counted";
const VISITOR_COUNTER_BASE_URL = `https://api.counterapi.dev/v1/${VISITOR_COUNTER_NAMESPACE}/${VISITOR_COUNTER_NAME}`;

type CounterResponse = {
  count?: number;
};

let visitorCountRequest: Promise<number> | null = null;

async function getVisitorCount() {
  if (visitorCountRequest) {
    return visitorCountRequest;
  }

  visitorCountRequest = (async () => {
    const hasCountedVisit =
      window.localStorage.getItem(VISITOR_COUNTER_STORAGE_KEY) === "1";
    const endpoint = hasCountedVisit
      ? `${VISITOR_COUNTER_BASE_URL}/`
      : `${VISITOR_COUNTER_BASE_URL}/up`;

    if (!hasCountedVisit) {
      window.localStorage.setItem(VISITOR_COUNTER_STORAGE_KEY, "1");
    }

    try {
      const response = await fetch(endpoint, { cache: "no-store" });

      if (!response.ok) {
        throw new Error("Failed to load visitor count");
      }

      const data = (await response.json()) as CounterResponse;

      if (typeof data.count !== "number") {
        throw new Error("Invalid visitor count response");
      }

      return data.count;
    } catch (error) {
      if (!hasCountedVisit) {
        window.localStorage.removeItem(VISITOR_COUNTER_STORAGE_KEY);
      }

      visitorCountRequest = null;
      throw error;
    }
  })();

  return visitorCountRequest;
}

export default function Contact() {
  const t = useTranslations("contact");
  const locale = useLocale();
  const styles = getStyles(locale);
  const [visitorCount, setVisitorCount] = useState<number | null>(null);
  const [visitorCountError, setVisitorCountError] = useState(false);

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

  useEffect(() => {
    let isMounted = true;

    void getVisitorCount()
      .then((count) => {
        if (!isMounted) {
          return;
        }

        setVisitorCount(count);
        setVisitorCountError(false);
      })
      .catch(() => {
        if (isMounted) {
          setVisitorCountError(true);
        }
      });

    return () => {
      isMounted = false;
    };
  }, []);

  const formattedVisitorCount =
    typeof visitorCount === "number"
      ? new Intl.NumberFormat(locale === "th" ? "th-TH" : "en-US").format(
          visitorCount,
        )
      : null;
  const visitorCountText = visitorCountError
    ? t("visitorCountUnavailable")
    : formattedVisitorCount === null
      ? t("visitorCountLoading")
      : t("visitorCountSummary", { count: formattedVisitorCount });

  return (
    <section className="relative px-4 py-20 sm:px-6 md:px-10">
      <div className={`mx-auto max-w-6xl ${styles.baseText}`}>
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

            <p className="mt-8 text-center text-sm font-medium text-emerald-800 sm:text-base">
              {visitorCountText}
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
