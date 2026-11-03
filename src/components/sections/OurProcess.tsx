"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const STEPS = [
  {
    id: "01",
    title: "Discovery & Vision",
    desc: "We begin by understanding your unique style, preferences, and the core objective of your extraordinary event.",
  },
  {
    id: "02",
    title: "Curation & Design",
    desc: "Our team crafts a bespoke concept, detailing every visual, technical, and experiential element to absolute perfection.",
  },
  {
    id: "03",
    title: "Flawless Execution",
    desc: "On the day, our experts manage everything behind the scenes, allowing you to be a guest at your own event.",
  },
];

export default function OurProcess() {
  const sectionRef = useRef<HTMLElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);
  const stepsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const q = gsap.utils.selector(stepsRef);

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top 60%",
      },
    });

    // Animate the connecting line expanding
    tl.fromTo(
      lineRef.current,
      { scaleX: 0 },
      { scaleX: 1, duration: 1.5, ease: "power3.inOut", transformOrigin: "left center" }
    );

    // Staggered fade-up for each step
    tl.fromTo(
      q(".process-step"),
      { y: 40, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.8,
        stagger: 0.25,
        ease: "power2.out",
      },
      "-=1.0" // Start slightly before the line finishes drawing
    );
  }, []);

  return (
    <section ref={sectionRef} className="bg-[#0c0a09] py-24 md:py-32 px-6 md:px-12 overflow-hidden">
      <div className="mx-auto max-w-7xl">
        {/* Section Header */}
        <div className="mb-20 flex flex-col items-center text-center">
          <h2 className="font-sans text-[10px] font-semibold uppercase tracking-[0.3em] text-[#c9a96e] mb-4">
            Our Process
          </h2>
          <p className="font-serif text-3xl text-[#fbf8f1] md:text-5xl lg:text-6xl leading-[1.1] max-w-3xl">
            How we bring your vision to life.
          </p>
        </div>

        {/* Process Steps */}
        <div className="relative mt-12 md:mt-24">
          {/* Horizontal Line for Desktop (Hidden on mobile) */}
          <div className="hidden md:block absolute top-[28px] left-0 right-0 h-[1px] bg-white/10">
            <div ref={lineRef} className="h-full w-full bg-[#c9a96e]" />
          </div>

          <div ref={stepsRef} className="grid grid-cols-1 gap-16 md:grid-cols-3 md:gap-12">
            {STEPS.map((step, i) => (
              <div key={i} className="process-step relative flex flex-col md:text-left text-center">
                
                {/* Number & Node indicator */}
                <div className="flex flex-col items-center md:items-start mb-6 md:mb-8">
                  {/* Circle Node (Desktop only) */}
                  <div className="hidden md:flex absolute top-[23px] w-3 h-3 rounded-full bg-[#0c0a09] border-2 border-[#c9a96e] z-10" />
                  
                  <span className="font-serif text-5xl md:text-7xl text-[#fbf8f1]/10 leading-none md:pl-2">
                    {step.id}
                  </span>
                </div>

                <h3 className="font-serif text-2xl text-[#fbf8f1] mb-4">
                  {step.title}
                </h3>
                
                <p className="font-sans text-sm font-light leading-relaxed text-[#fbf8f1]/60">
                  {step.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}