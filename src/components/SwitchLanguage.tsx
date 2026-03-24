"use client";
import { useLocaleState } from "@/components/IntlProvider";
import { useEffect } from "react";
import { motion, useAnimation } from "framer-motion";

type SwitchLanguageProps = {
  variant?: "floating" | "modal";
};

export default function SwitchLanguage({
  variant = "floating",
}: SwitchLanguageProps) {
  const { locale, setLocale } = useLocaleState();
  const textControls = useAnimation();

  const toggleLocale = () => {
    setLocale(locale === "th" ? "en" : "th");
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

  const isModal = variant === "modal";

  return (
    <div
      className={
        isModal
          ? "shrink-0"
          : "switch-language fixed right-4 z-50 p-5"
      }
    >
      <button
        onClick={toggleLocale}
        className={
          isModal
            ? "flex h-10 w-10 items-center justify-center rounded-full border border-gray-200 bg-white text-sm font-bold text-gray-500 shadow-md transition-all duration-300 hover:cursor-pointer hover:bg-gray-100 hover:text-gray-700"
            : "flex h-12 w-12 items-center justify-center rounded-full border border-gray-300 text-gray-400 font-bold shadow-lg backdrop-blur-md transition-all duration-300 hover:cursor-pointer hover:bg-gray-200 hover:shadow-xl"
        }
      >
        <motion.span
          animate={textControls}
          initial={{ rotate: 0 }}
          className="block"
        >
          {locale.toUpperCase()}
        </motion.span>
      </button>
    </div>
  );
}
