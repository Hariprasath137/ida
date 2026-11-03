"use client";

import { motion } from "framer-motion";

export default function RevealText({ text, delay = 0, className = "" }: { text: string, delay?: number, className?: string }) {
  // Split text by lines (using <br/> tag concept handled manually or just simple string splitting if needed, 
  // but here we just do a smooth mask reveal for the whole block or words)
  return (
    <div className="overflow-hidden inline-block w-full">
      <motion.div
        initial={{ y: "100%", opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 1.2, ease: [0.76, 0, 0.24, 1], delay }}
        className={className}
      >
        {text}
      </motion.div>
    </div>
  );
}