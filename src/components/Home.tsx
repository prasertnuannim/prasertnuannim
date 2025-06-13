import Image from "next/image";
import ColorMotionInChar from "./motions/ColorMotionInChar";
import { useTranslations } from "next-intl";

export default function Home() {
  const t = useTranslations("Home");
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-tr from-gray-400 to-white text-gray-800 flex-col text-center px-4 py-8">
      <div className="w-full flex justify-center">
        <Image
          src="/images/sertCG.png"
          alt="Sert CG logo"
          width={400}
          height={400}
          className="w-48 sm:w-64 md:w-80 h-auto"
        />
      </div>
      <div className="tracking-[-0.5em] font-bold text-md">
        <ColorMotionInChar className="pl-1 text-[32px]" name={"Hi I'm Sert"} />
      </div>
      <p className="mt-4 text-base text-white sm:text-lg max-w-md">
        {t("welcomeMessage")}
      </p>
    </div>
  );
}
