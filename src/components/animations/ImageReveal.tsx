"use client";

import { useRef, useState } from "react";
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from "framer-motion";

const EASE: [number, number, number, number] = [0.76, 0, 0.24, 1];

/**
 * Image that wipes open when scrolled into view, then drifts slightly (parallax).
 * Falls back to a dark panel with the label if the image fails to load.
 */
export default function ImageReveal({
  src,
  label = "",
  aspect = "aspect-[4/5]",
  className = "",
  parallax = true,
}: {
  src: string;
  label?: string;
  aspect?: string;
  className?: string;
  parallax?: boolean;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const [failed, setFailed] = useState(false);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y = useTransform(
    scrollYProgress,
    [0, 1],
    reduce || !parallax ? ["0%", "0%"] : ["-7%", "7%"]
  );

  return (
    <motion.div
      ref={ref}
      className={`relative ${aspect} ${className}`}
      initial={reduce ? false : "hidden"}
      whileInView="show"
      viewport={{ once: true, margin: "0px 0px -10% 0px" }}
    >
      <motion.div
        className="absolute inset-0 overflow-hidden bg-charcoal"
        variants={{
          hidden: { clipPath: "inset(100% 0% 0% 0%)" },
          show: {
            clipPath: "inset(0% 0% 0% 0%)",
            transition: { duration: 1.2, ease: EASE },
          },
        }}
      >
        {failed ? (
          <div className="absolute inset-0 flex items-end bg-gradient-to-br from-charcoal to-black p-6">
            <p className="font-serif text-3xl italic text-ivory">{label}</p>
          </div>
        ) : (
          // eslint-disable-next-line @next/next/no-img-element
          <motion.img
            src={src}
            alt=""
            loading="lazy"
            decoding="async"
            onError={() => setFailed(true)}
            style={{ y }}
            className="absolute -top-[8%] left-0 h-[116%] w-full object-cover"
            variants={{
              hidden: { scale: 1.25 },
              show: { scale: 1, transition: { duration: 1.6, ease: EASE } },
            }}
          />
        )}
      </motion.div>
    </motion.div>
  );
}