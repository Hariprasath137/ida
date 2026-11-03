"use client";

import React from "react";

const CLIENTS = [
  "Ritz-Carlton",
  "Vogue",
  "Rolex",
  "Mercedes-Benz",
  "LVMH",
  "Four Seasons",
  "Cartier",
  "Bloomberg",
];

export default function ClientsMarquee() {
  return (
    <section className="relative flex w-full flex-col items-center justify-center overflow-hidden bg-[#0c0a09] py-12 md:py-20 border-b border-white/5">
      <style>{`
        @keyframes marquee {
          0% { transform: translateX(0%); }
          100% { transform: translateX(-100%); }
        }
        .animate-marquee {
          display: flex;
          animation: marquee 30s linear infinite;
        }
        .animate-marquee:hover {
          animation-play-state: paused;
        }
      `}</style>

      {/* Section Label */}
      <div className="mb-8 text-center md:mb-12">
        <p className="font-sans text-[10px] uppercase tracking-[0.3em] text-[#c9a96e]">
          Trusted by Global Brands
        </p>
      </div>

      {/* Marquee Wrapper with Fade Edges */}
      <div className="relative flex w-full max-w-[100vw] overflow-hidden">
        {/* Left/Right Gradients for smooth fade effect */}
        <div className="pointer-events-none absolute bottom-0 left-0 top-0 z-10 w-16 bg-gradient-to-r from-[#0c0a09] to-transparent md:w-40" />
        <div className="pointer-events-none absolute bottom-0 right-0 top-0 z-10 w-16 bg-gradient-to-l from-[#0c0a09] to-transparent md:w-40" />

        {/* Scrolling Content - Duplicated for seamless loop */}
        <div className="flex w-fit">
          <div className="animate-marquee flex flex-shrink-0 items-center gap-12 px-6 md:gap-24 md:px-12">
            {CLIENTS.map((client, i) => (
              <div
                key={i}
                className="flex items-center justify-center grayscale transition-all duration-500 hover:grayscale-0"
              >
                {/* Replace this h3 with <img> tags when you have actual client logos */}
                <h3 className="font-serif text-2xl tracking-wide text-[#fbf8f1]/40 transition-colors hover:text-[#c9a96e] md:text-4xl">
                  {client}
                </h3>
              </div>
            ))}
          </div>

          {/* Duplicate set for seamless looping */}
          <div className="animate-marquee flex flex-shrink-0 items-center gap-12 px-6 md:gap-24 md:px-12" aria-hidden="true">
            {CLIENTS.map((client, i) => (
              <div
                key={`dup-${i}`}
                className="flex items-center justify-center grayscale transition-all duration-500 hover:grayscale-0"
              >
                <h3 className="font-serif text-2xl tracking-wide text-[#fbf8f1]/40 transition-colors hover:text-[#c9a96e] md:text-4xl">
                  {client}
                </h3>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}