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
    (color) => `0 0 8px ${color}44, 0 0 18px ${color}22`
  );
  const bounceFrames = [0, -4, -7, -4, 0];
  const scaleFrames = [1, 1.015, 1.03, 1.015, 1];
  const rotateFrames = [0, -0.8, 0, 0.6, 0];

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
                duration: 6,
                repeat: Infinity,
                repeatType: "mirror",
                ease: "easeInOut",
                delay: i * 0.12,
              },
              textShadow: {
                duration: 6,
                repeat: Infinity,
                repeatType: "mirror",
                ease: "easeInOut",
                delay: i * 0.12,
              },
              ...(isSpace
                ? {}
                : {
                    y: {
                      duration: 2.8,
                      times: [0, 0.28, 0.5, 0.74, 1],
                      repeat: Infinity,
                      repeatDelay: 0.3,
                      ease: "easeInOut",
                      delay: i * 0.08,
                    },
                    scale: {
                      duration: 2.8,
                      times: [0, 0.28, 0.5, 0.74, 1],
                      repeat: Infinity,
                      repeatDelay: 0.3,
                      ease: "easeInOut",
                      delay: i * 0.08,
                    },
                    rotate: {
                      duration: 2.8,
                      times: [0, 0.28, 0.5, 0.74, 1],
                      repeat: Infinity,
                      repeatDelay: 0.3,
                      ease: "easeInOut",
                      delay: i * 0.08,
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
