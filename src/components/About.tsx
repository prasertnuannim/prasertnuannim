import { getStyles } from "@/styles";
import { useLocale, useTranslations } from "next-intl";
import React from "react";

export default function About() {
  const t = useTranslations("About");
  const locale = useLocale();
  const styles = getStyles(locale);
  return (
    <div
      className="min-h-screen flex items-center py-20 justify-center bg-gradient-to-tr from-gray-600 via-gray-400 to-gray-200 text-black px-4">
      <div className="max-w-4xl px-16">
        <div className={`${styles.baseText}`}>
          <h2 className="text-2xl font-bold mb-4 indent-16">{t("title")}</h2>
          <div className="text-while indent-8">{t("description1")}</div>
          <div className="text-while indent-8">{t("description2")}</div>
        </div>
      </div>
    </div>
  );
}
