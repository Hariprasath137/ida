"use client";

import { motion } from "framer-motion";

export default function Intro() {
  return (
    // Changed background to premium Champagne and text to Charcoal
    <section className="py-32 md:py-40 bg-champagne text-charcoal overflow-hidden flex flex-col justify-center relative">
      
      <div className="px-8 md:px-16 mb-10 md:mb-16">
        <p className="text-[10px] md:text-xs uppercase tracking-[0.4em] text-charcoal/50 font-sans font-semibold">
          Our Philosophy
        </p>
      </div>

      <div className="flex whitespace-nowrap overflow-hidden">
        <motion.div
          className="flex gap-12 md:gap-24 items-center"
          animate={{ x: ["0%", "-50%"] }}
          // Slowed down the duration for a more premium, deliberate scroll
          transition={{ ease: "linear", duration: 25, repeat: Infinity }}
        >
          {[...Array(4)].map((_, i) => (
            <div key={i} className="flex items-center gap-12 md:gap-24">
              
              {/* Aesthetic update: Removed bold, added font-light and wide letter spacing */}
              <h2 className="text-[6vw] md:text-[4vw] font-sans font-light uppercase tracking-[0.2em] text-charcoal drop-shadow-sm">
                Every detail is meticulously designed.
              </h2>
              
              {/* Updated dot color to Soft Gold from the new brand palette */}
              <span className="w-2 h-2 md:w-4 md:h-4 rounded-full bg-gold inline-block opacity-80" />
              
              {/* Elegant Serif Italic for contrast */}
              <h2 className="text-[7vw] md:text-[4.5vw] font-serif italic text-charcoal/70">
                We author memories.
              </h2>
              
              <span className="w-2 h-2 md:w-4 md:h-4 rounded-full bg-gold inline-block opacity-80" />
            </div>
          ))}
        </motion.div>
      </div>

    </section>
  );
}