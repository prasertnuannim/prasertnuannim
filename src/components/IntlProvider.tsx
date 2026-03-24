"use client";

import enMessages from "@/messages/en.json";
import thMessages from "@/messages/th.json";
import { NextIntlClientProvider } from "next-intl";
import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";

const localeStorageKey = "preferred-locale";
const defaultTimeZone = "Asia/Bangkok";
const supportedLocales = ["en", "th"] as const;
const messages = {
  en: enMessages,
  th: thMessages,
} as const;

export type AppLocale = (typeof supportedLocales)[number];

type LocaleContextValue = {
  locale: AppLocale;
  setLocale: (locale: AppLocale) => void;
};

const LocaleContext = createContext<LocaleContextValue | null>(null);

function isSupportedLocale(locale: string): locale is AppLocale {
  return supportedLocales.includes(locale as AppLocale);
}

function getStoredLocale() {
  if (typeof window === "undefined") {
    return null;
  }

  const storedLocale = window.localStorage.getItem(localeStorageKey);
  return storedLocale && isSupportedLocale(storedLocale) ? storedLocale : null;
}

function getBrowserLocale(): AppLocale {
  if (typeof navigator === "undefined") {
    return "en";
  }

  const browserLocale = navigator.language.slice(0, 2).toLowerCase();
  return isSupportedLocale(browserLocale) ? browserLocale : "en";
}

export function LocaleProvider({ children }: Readonly<{ children: ReactNode }>) {
  const [locale, setLocale] = useState<AppLocale>("en");

  useEffect(() => {
    const nextLocale = getStoredLocale() ?? getBrowserLocale();
    setLocale(nextLocale);
  }, []);

  useEffect(() => {
    document.documentElement.lang = locale;
    window.localStorage.setItem(localeStorageKey, locale);
  }, [locale]);

  return (
    <LocaleContext.Provider value={{ locale, setLocale }}>
      <NextIntlClientProvider
        locale={locale}
        messages={messages[locale]}
        timeZone={defaultTimeZone}
      >
        {children}
      </NextIntlClientProvider>
    </LocaleContext.Provider>
  );
}

export function useLocaleState() {
  const context = useContext(LocaleContext);

  if (!context) {
    throw new Error("useLocaleState must be used within LocaleProvider");
  }

  return context;
}
