import SwitchLanguage from "@/components/SwitchLanguage";
import "./globals.css";
import { Kalam, Mitr } from "next/font/google";
import { NextIntlClientProvider } from "next-intl";
import { getLocale, getMessages } from "next-intl/server";

export const metadata = {
  title: "Prasert Nuannim",
  description: "คำอธิบายเว็บไซต์ของคุณ",
  metadataBase: new URL('https://prasertnuannim.vercel.app'),
  openGraph: {
    title: "Prasert Nuannim",
    description: "พอร์ตโฟลิโอและผลงานของนักพัฒนา",
    url: "https://prasertnuannim.vercel.app",
    siteName: "Prasert Portfolio",
    images: [
      {
        url: "https://prasertnuannim.vercel.app/images/sertCG.png",
        width: 1200,
        height: 630,
        alt: "Prasert's Portfolio",
      },
    ],
    ite_name: "Prasert Nuannim",
    locale: "th_TH",
    type: "website",
  },
};
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
    <html className={`${kalam.variable} ${mitr.variable}`}>
      <body className="antialiased">
        <NextIntlClientProvider locale={locale} messages={messages}>
          <SwitchLanguage />
          {children}
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
