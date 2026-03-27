import GalaxySectionBackground from "@/components/GalaxySectionBackground";
import { LocaleProvider } from "@/components/IntlProvider";
import SwitchLanguage from "@/components/SwitchLanguage";
import "./globals.css";
import type { Metadata, Viewport } from "next";
import { Kalam, Mitr } from "next/font/google";

export const metadata: Metadata = {
  title: "Prasert Nuannim",
  description: "Portfolio and projects by Prasert Nuannim.",
  metadataBase: new URL("https://prasertnuannim.vercel.app"),
  openGraph: {
    title: "Prasert Nuannim",
    description: "พอร์ตโฟลิโอและผลงานของนักพัฒนา",
    url: "https://prasertnuannim.vercel.app",
    images: [
      {
        url: "https://prasertnuannim.vercel.app/images/sertCG.png",
        width: 1200,
        height: 630,
        alt: "Prasert's Portfolio",
      },
    ],
    siteName: "Prasert Nuannim",
    locale: "th_TH",
    type: "website",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
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

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${kalam.variable} ${mitr.variable}`}>
      <body className="bg-black text-white antialiased">
        <LocaleProvider>
          <div className="relative min-h-[100svh] overflow-x-hidden">
            <div aria-hidden="true" className="pointer-events-none fixed inset-0 z-0">
              <GalaxySectionBackground />
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(0,0,0,0.18),_transparent_42%)]" />
            </div>

            <div className="relative z-10">
              <SwitchLanguage />
              {children}
            </div>
          </div>
        </LocaleProvider>
      </body>
    </html>
  );
}
