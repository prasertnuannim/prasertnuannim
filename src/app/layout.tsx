import SwitchLanguage from "@/components/SwitchLanguage";
import "./globals.css";
import { Kalam, Mitr } from "next/font/google";
import { NextIntlClientProvider } from "next-intl";
import { getLocale, getMessages } from "next-intl/server";

const kalam = Kalam({
  variable: "--font-kalam",
  subsets: ["latin"],
  weight: ["300", "400", "700"],
});

const mitr = Mitr({
  subsets: ["thai"],
  weight: ["400", "700"],
  variable: "--font-mitr",
});
export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const messages = await getMessages();
  const locale = await getLocale();
  return (
    <html lang={locale} className={`${kalam.variable} ${mitr.variable}`}>
      <body className="font-kalam antialiased">
        <NextIntlClientProvider messages={messages}>
          <SwitchLanguage />
          {children}
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
