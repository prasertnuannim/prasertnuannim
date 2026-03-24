"use client";

import { motion } from "framer-motion";

interface Props {
  name: string;
  className?: string;
  colors?: string[];
}

export default function ColorMotionInChar({ name, className, colors }: Props) {
  const defaultColors = [
    "#ef4444",
    "#f97316",
    "#eab308",
    "#22c55e",
    "#06b6d4",
    "#3b82f6",
    "#8b5cf6",
    "#ec4899",
    "#ef4444",
  ];
  const colorPalette = colors && colors.length > 0 ? colors : defaultColors;
  const textClassName = className ?? "text-2xl font-bold";
  const glowPalette = colorPalette.map(
    (color) => `0 0 12px ${color}55, 0 0 28px ${color}33`
  );
  const bounceFrames = [0, -18, 0, -8, 0];
  const scaleFrames = [1, 1.12, 0.96, 1.04, 1];
  const rotateFrames = [0, -3, 0, 2, 0];

  const text = name ?? "";
  return (
    <div className="inline-flex flex-wrap justify-center whitespace-pre">
      {text.split("").map((char, i) => {
        const isSpace = char === " ";

        return (
          <motion.span
            key={i}
            className={`${textClassName} origin-bottom will-change-transform`}
            animate={{
              color: colorPalette,
              textShadow: glowPalette,
              ...(isSpace
                ? {}
                : {
                    y: bounceFrames,
                    scale: scaleFrames,
                    rotate: rotateFrames,
                  }),
            }}
            transition={{
              color: {
                duration: 4.2,
                repeat: Infinity,
                repeatType: "mirror",
                ease: "linear",
                delay: i * 0.08,
              },
              textShadow: {
                duration: 4.2,
                repeat: Infinity,
                repeatType: "mirror",
                ease: "linear",
                delay: i * 0.08,
              },
              ...(isSpace
                ? {}
                : {
                    y: {
                      duration: 1.35,
                      times: [0, 0.22, 0.5, 0.72, 1],
                      repeat: Infinity,
                      repeatDelay: 0.18,
                      ease: [0.34, 1.56, 0.64, 1],
                      delay: i * 0.06,
                    },
                    scale: {
                      duration: 1.35,
                      times: [0, 0.22, 0.5, 0.72, 1],
                      repeat: Infinity,
                      repeatDelay: 0.18,
                      ease: "easeInOut",
                      delay: i * 0.06,
                    },
                    rotate: {
                      duration: 1.35,
                      times: [0, 0.22, 0.5, 0.72, 1],
                      repeat: Infinity,
                      repeatDelay: 0.18,
                      ease: "easeInOut",
                      delay: i * 0.06,
                    },
                  }),
            }}
            style={{ display: "inline-block" }}
          >
            {isSpace ? "\u00A0" : char}
          </motion.span>
        );
      })}
    </div>
  );
}
