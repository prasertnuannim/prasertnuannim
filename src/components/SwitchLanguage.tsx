"use client";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { motion, useAnimation } from "framer-motion";

export default function SwitchLanguage() {
  const [locale, setLocale] = useState<string>("");
  const router = useRouter();
  const textControls = useAnimation();

  useEffect(() => {
    const cookieLocale = document.cookie
      .split("; ")
      .find((row) => row.startsWith("NEXT_LOCALE="))
      ?.split("=")[1];
    if (cookieLocale) {
      setLocale(cookieLocale);
    } else {
      const browserLocale = navigator.language.slice(0, 2);
      setLocale(browserLocale);
      document.cookie = `NEXT_LOCALE=${browserLocale};`;
      router.refresh();
    }
  }, [router]);

  const toggleLocale = () => {
    const newLocale = locale === "th" ? "en" : "th";
    setLocale(newLocale);
    document.cookie = `NEXT_LOCALE=${newLocale};`;
    router.refresh();
  };

  useEffect(() => {
    const interval = setInterval(() => {
      textControls.start({
        rotate: [0, 360],
        transition: { duration: 1, ease: "linear" },
      });
    }, 10000);
    textControls.start({
      rotate: [0, 360],
      transition: { duration: 1, ease: "linear" },
    });

    return () => clearInterval(interval);
  }, [textControls]);

  return (
    <div className="fixed right-4 z-50 p-5">
      <button
        onClick={toggleLocale}
        className="w-12 h-12 rounded-full backdrop-blur-md text-gray-400 font-bold border border-gray-300 shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center hover:cursor-pointer hover:bg-gray-200"
      >
        <motion.span
          animate={textControls}
          initial={{ rotate: 0 }}
          className="block"
        >
          {locale === "th" ? "TH" : "EN"}
        </motion.span>
      </button>
    </div>
  );
}
