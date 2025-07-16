import Image from "next/image";
import ColorMotionInChar from "./motions/ColorMotionInChar";
import { useLocale, useTranslations } from "next-intl";
import { getStyles } from "@/styles";

export default function Home() {
  const t = useTranslations("Home");
  const locale = useLocale();
  const styles = getStyles(locale);
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-tr from-gray-400 to-white text-gray-800 flex-col text-center px-16 py-8">
      <div className={styles.baseText}>
        <div className="w-full flex justify-center">
          <Image
            src="/images/sertCG.png"
            alt="Sert CG logo"
            width={400}
            height={400}
            className="w-48 sm:w-64 md:w-80 h-auto"
          />
        </div>
        <div className="tracking-[-0.5em] font-bold text-md w-full flex justify-center">
          <ColorMotionInChar
            className="pl-1 text-[32px]"
            name={"Hi I'm Sert"}
          />
        </div>

        {t("welcomeMessage")}
      </div>
    </div>
  );
}
