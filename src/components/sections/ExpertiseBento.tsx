"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export default function ExpertiseBento() {
  const sectionRef = useRef<HTMLElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const q = gsap.utils.selector(gridRef);

    // Staggered pop-up reveal for the Bento boxes
    gsap.fromTo(
      q(".bento-box"),
      { y: 60, opacity: 0, scale: 0.95 },
      {
        y: 0,
        opacity: 1,
        scale: 1,
        duration: 1,
        stagger: 0.1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 70%",
        },
      }
    );
  }, []);

  return (
    <section ref={sectionRef} className="bg-[#0c0a09] py-24 md:py-32 px-6 md:px-12 border-b border-white/5">
      <div className="mx-auto max-w-7xl">
        {/* Section Header */}
        <div className="mb-16 md:mb-20">
          <h2 className="font-sans text-[10px] font-semibold uppercase tracking-[0.3em] text-[#c9a96e] mb-4">
            The IDA Edge
          </h2>
          <p className="font-serif text-3xl text-[#fbf8f1] md:text-5xl leading-[1.1] max-w-2xl">
            Anatomy of an extraordinary event.
          </p>
        </div>

        {/* Trendy Bento Grid Layout */}
        <div 
          ref={gridRef} 
          className="grid grid-cols-1 md:grid-cols-4 md:auto-rows-[260px] gap-4 md:gap-6"
        >
          
          {/* Box 1: Large Text Block (2x2) */}
          <div className="bento-box group col-span-1 md:col-span-2 md:row-span-2 bg-[#141210] rounded-lg p-8 md:p-12 flex flex-col justify-between border border-white/5 hover:border-[#c9a96e]/30 transition-colors duration-500">
            <div>
              <h3 className="font-serif text-3xl md:text-5xl text-[#fbf8f1] mb-6 leading-tight">
                We engineer <br/><i className="text-[#c9a96e]">environments.</i>
              </h3>
              <p className="font-sans text-sm font-light leading-relaxed text-[#fbf8f1]/70 max-w-md">
                We don’t just plan events; we architect experiences. By blending visionary creative design with flawless technical precision, we transform empty spaces into captivating worlds tailored to your narrative.
              </p>
            </div>
            <div className="mt-12">
              <span className="inline-block border-b border-[#c9a96e] pb-1 font-sans text-[10px] uppercase tracking-widest text-[#c9a96e]">
                Creative Direction & Strategy
              </span>
            </div>
          </div>

          {/* Box 2: Vertical Image (1x2) - Stage/Concert vibe */}
          <div className="bento-box group col-span-1 md:col-span-1 md:row-span-2 relative overflow-hidden rounded-lg bg-[#221e1a]">
            <img 
              src="https://images.unsplash.com/photo-1492684223066-81342ee5ff30?q=80&w=1000&auto=format&fit=crop" 
              alt="Technical Production"
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0c0a09] via-transparent to-transparent opacity-90" />
            <div className="absolute bottom-6 left-6 right-6">
              <p className="font-serif text-xl text-white mb-1">Technical</p>
              <p className="font-sans text-[10px] uppercase tracking-widest text-white/60">Production</p>
            </div>
          </div>

          {/* Box 3: NEW Image Box (1x1) Replacing the 500+ text */}
          <div className="bento-box group col-span-1 md:col-span-1 md:row-span-1 relative overflow-hidden rounded-lg bg-[#221e1a]">
            <img 
              src="/meeting.jpg" 
              alt="Signature Events"
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
            />
            {/* Dark overlay for text readability */}
            <div className="absolute inset-0 bg-black/20 transition-colors duration-500 group-hover:bg-black/40" />
            
            {/* Small floating tag */}
            <div className="absolute bottom-6 left-6">
              <p className="font-sans text-[10px] uppercase tracking-widest text-white backdrop-blur-md bg-black/30 px-3 py-1 rounded-full border border-white/20">
                Flawless Execution
              </p>
            </div>
          </div>

          {/* Box 4: Small Image Box (1x1) - Detail/Wedding vibe */}
          <div className="bento-box group col-span-1 md:col-span-1 md:row-span-1 relative overflow-hidden rounded-lg bg-[#221e1a]">
            <img 
              src="https://images.unsplash.com/photo-1519225421980-715cb0215aed?q=80&w=1000&auto=format&fit=crop" 
              alt="Bespoke Details"
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-black/30 transition-colors duration-500 group-hover:bg-black/10" />
            <div className="absolute top-6 left-6">
              <p className="font-sans text-[10px] uppercase tracking-widest text-white backdrop-blur-md bg-black/20 px-3 py-1 rounded-full border border-white/20">
                Bespoke Details
              </p>
            </div>
          </div>

          {/* Box 5: Wide Image Block (2x1) - Corporate/Crowd vibe */}
          <div className="bento-box group col-span-1 md:col-span-2 md:row-span-1 relative overflow-hidden rounded-lg bg-[#221e1a]">
            <img 
              src="https://images.unsplash.com/photo-1540575467063-178a50c2df87?q=80&w=1500&auto=format&fit=crop" 
              alt="Global Scale"
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-[#0c0a09] via-[#0c0a09]/60 to-transparent opacity-90" />
            <div className="absolute inset-0 p-8 flex flex-col justify-center max-w-sm">
              <h4 className="font-serif text-2xl text-[#fbf8f1] mb-2">Arena-Scale Capability</h4>
              <p className="font-sans text-xs font-light leading-relaxed text-[#fbf8f1]/70">
                From intimate gatherings to massive educational expos and global summits, we handle scale effortlessly.
              </p>
            </div>
          </div>

          {/* Box 6: Dark Text Block (2x1) */}
          <div className="bento-box group col-span-1 md:col-span-2 md:row-span-1 bg-[#1a1714] rounded-lg p-8 flex flex-col justify-center border border-white/5 hover:border-[#c9a96e]/30 transition-colors duration-500">
            <h4 className="font-serif text-2xl text-[#c9a96e] mb-3">Flawless Hospitality</h4>
            <p className="font-sans text-sm font-light leading-relaxed text-[#fbf8f1]/70 max-w-lg">
              Guest experience is paramount. Our dedicated logistics team ensures seamless travel, luxury accommodation, and pristine on-ground hospitality for every single attendee.
            </p>
          </div>

        </div>
      </div>
    </section>
  );
}