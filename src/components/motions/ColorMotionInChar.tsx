"use client";

import { motion } from "framer-motion";

interface Props {
  name: string;
  className?: string;
  colors?: string[];
}

export default function ColorMotionInChar({ name, className, colors }: Props) {
  const defaultColors = ["#ffffff", "#D1D5DB", "#ffffff"];
  const colorPalette = colors && colors.length > 0 ? colors : defaultColors;

  const text = name ?? "";
  return (
    <div className="flex space-x-1 text-2xl font-bold">
      {text.split("").map((char, i) => (
        <motion.span
          key={i}
          className={className}
          animate={{
            color: colorPalette,
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            repeatType: "mirror",
            ease: "easeInOut",
            delay: i * 0.1,
          }}
        >
          {char}
        </motion.span>
      ))}
    </div>
  );
}
