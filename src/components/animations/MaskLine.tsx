"use client";

import type { ReactNode } from "react";
import { motion, useReducedMotion } from "framer-motion";

const EASE: [number, number, number, number] = [0.76, 0, 0.24, 1];

const variants = {
  hidden: { y: "110%" },
  show: (delay: number = 0) => ({
    y: 0,
    transition: { duration: 1, ease: EASE, delay },
  }),
};

/**
 * Masked line reveal. The clipping wrapper is what watches the viewport
 * (watching the translated child would never fire, because it is fully clipped).
 */
export default function MaskLine({
  children,
  delay = 0,
  className = "",
  innerClassName = "",
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
  innerClassName?: string;
}) {
  const reduce = useReducedMotion();
  return (
    <motion.span
      className={`block overflow-hidden pb-[0.12em] ${className}`}
      initial={reduce ? false : "hidden"}
      whileInView="show"
      viewport={{ once: true, margin: "0px 0px -8% 0px" }}
    >
      <motion.span
        className={`block ${innerClassName}`}
        variants={variants}
        custom={delay}
      >
        {children}
      </motion.span>
    </motion.span>
  );
}