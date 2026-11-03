"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Link from "next/link";

export default function CTA() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const q = gsap.utils.selector(sectionRef);

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top 80%",
      },
    });

    // Fade up text elements
    tl.fromTo(
      q(".cta-text"),
      { y: 50, opacity: 0 },
      { y: 0, opacity: 1, duration: 1, stagger: 0.2, ease: "power3.out" }
    );

    // Button scale pop
    tl.fromTo(
      q(".cta-button"),
      { scale: 0.9, opacity: 0 },
      { scale: 1, opacity: 1, duration: 0.8, ease: "back.out(1.7)" },
      "-=0.4"
    );
  }, []);

  return (
    <section 
      ref={sectionRef} 
      className="relative flex flex-col items-center justify-center bg-[#fbf8f1] py-32 px-6 md:py-48 text-center overflow-hidden border-t border-[#2b2622]/10"
    >
      {/* Background subtle noise/texture (optional for premium feel) */}
      <div 
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")` }}
      />

      <div className="relative z-10 mx-auto max-w-4xl flex flex-col items-center">
        <p className="cta-text font-sans text-[10px] font-semibold uppercase tracking-[0.3em] text-[#a89b82] mb-6">
          Your Next Step
        </p>

        <h2 className="cta-text font-serif text-4xl md:text-6xl lg:text-7xl leading-[1.1] text-[#2b2622] mb-8">
          Ready to plan something <span className="italic text-[#c9a96e]">extraordinary?</span>
        </h2>

        <p className="cta-text font-sans text-sm md:text-base font-light text-[#2b2622]/70 mb-12 max-w-2xl leading-relaxed">
          Whether it’s a global business summit, an educational expo, or a luxury wedding, our team is ready to bring your vision to life with flawless execution.
        </p>

        <div className="cta-button">
          <Link
            href="/contact"
            className="group relative inline-flex items-center justify-center overflow-hidden bg-[#2b2622] px-10 py-5 font-sans text-xs uppercase tracking-[0.2em] text-[#fbf8f1] transition-all duration-500 hover:bg-[#c9a96e]"
          >
            <span className="relative z-10 transition-transform duration-500 group-hover:-translate-y-12">
              Start the Conversation
            </span>
            <span className="absolute inset-0 z-10 flex items-center justify-center translate-y-12 transition-transform duration-500 group-hover:translate-y-0">
              Let's Talk
            </span>
          </Link>
        </div>
      </div>
    </section>
  );
}