import { getStyles } from '@/styles';
import { useLocale, useTranslations } from 'next-intl';
import React from 'react'

export default function About() {
  const t = useTranslations("About");
  const locale = useLocale();
  const styles = getStyles(locale);
  return (
    <div className="flex items-center py-20 justify-center bg-white text-black px-4">
      <div className="max-w-2xl">
        <h2 className="text-2xl font-bold mb-4 indent-16">{t("title")}</h2>
        <div className={`${styles.baseText}`}>
          <div className='text-black indent-8'>{t("description1")}</div>
          <div className='text-black indent-8'>{t("description2")}</div>
          <div className='text-black indent-8'>{t("description3")}</div>
        </div>
      </div>
    </div>
  )
}
