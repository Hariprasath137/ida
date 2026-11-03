"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export default function VideoShowreel() {
  const sectionRef = useRef<HTMLElement>(null);
  const videoContainerRef = useRef<HTMLDivElement>(null);
  const playBtnRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    
    // Parallax & Scale effect on scroll
    gsap.fromTo(
      videoContainerRef.current,
      { scale: 0.85, borderRadius: "24px" },
      {
        scale: 1,
        borderRadius: "0px",
        ease: "power2.inOut",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
          end: "center center",
          scrub: 1,
        },
      }
    );

    // Play button pop animation
    gsap.fromTo(
      playBtnRef.current,
      { scale: 0, opacity: 0 },
      {
        scale: 1,
        opacity: 1,
        duration: 1,
        ease: "elastic.out(1, 0.5)",
        scrollTrigger: {
          trigger: videoContainerRef.current,
          start: "top 60%",
        },
      }
    );
  }, []);

  return (
    <section 
      ref={sectionRef} 
      className="relative w-full bg-[#0c0a09] py-16 md:py-32 flex justify-center items-center overflow-hidden"
    >
      <div 
        ref={videoContainerRef}
        className="relative w-full max-w-[1920px] h-[50vh] md:h-[80vh] overflow-hidden group cursor-pointer"
      >
        {/* Placeholder image for Video Thumbnail */}
        <img 
          src="https://images.unsplash.com/photo-1511556532299-8f662fc26c06?q=80&w=2070&auto=format&fit=crop" 
          alt="IDA Events Showreel"
          className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
        />
        
        {/* Dark overlay for cinematic feel */}
        <div className="absolute inset-0 bg-black/40 transition-colors duration-500 group-hover:bg-black/20" />

        {/* Floating Text */}
        <div className="absolute top-8 left-8 md:top-12 md:left-12 z-10">
          <p className="font-sans text-[10px] font-semibold uppercase tracking-[0.3em] text-[#c9a96e] mb-2 drop-shadow-md">
            The IDA Experience
          </p>
          <h2 className="font-serif text-2xl md:text-4xl text-white drop-shadow-lg">
            Watch our Showreel
          </h2>
        </div>

        {/* Centered Play Button */}
        <div 
          ref={playBtnRef}
          className="absolute inset-0 flex items-center justify-center z-10"
        >
          <div className="w-20 h-20 md:w-28 md:h-28 rounded-full bg-white/10 backdrop-blur-md border border-white/30 flex items-center justify-center transition-transform duration-300 group-hover:scale-110 group-hover:bg-white/20">
            {/* Play Icon */}
            <svg 
              viewBox="0 0 24 24" 
              fill="none" 
              stroke="currentColor" 
              className="w-8 h-8 md:w-10 md:h-10 text-white ml-2"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <polygon points="5 3 19 12 5 21 5 3" fill="currentColor" />
            </svg>
          </div>
        </div>
      </div>
    </section>
  );
}