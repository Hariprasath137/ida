"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const TESTIMONIALS = [
  {
    quote: "The team handled our international educational symposium flawlessly. From managing 2,000+ students to VIP guests, the execution was highly professional.",
    client: "Dr. Arvind Swamy",
    event: "Academic Symposium '25",
  },
  {
    quote: "They didn't just plan our wedding; they orchestrated an absolute masterpiece. Every detail was perfect, leaving us to simply enjoy the magic of our big day.",
    client: "Priya & Siddharth",
    event: "Destination Wedding",
  },
  {
    quote: "Our annual corporate summit has never looked this good. The stage design, lighting, and flawless timeline elevated our brand's presence significantly.",
    client: "Sarah Jenkins, CEO",
    event: "Global Tech Summit",
  },
];

export default function Testimonials() {
  const sectionRef = useRef<HTMLElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const q = gsap.utils.selector(cardsRef);

    gsap.fromTo(
      q(".testimonial-card"),
      { y: 50, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 1,
        stagger: 0.2,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 75%",
        },
      }
    );
  }, []);

  return (
    <section ref={sectionRef} className="bg-[#fbf8f1] py-24 md:py-32 px-6 md:px-12">
      <div className="mx-auto max-w-7xl">
        <div className="mb-16 flex flex-col items-center text-center md:mb-24">
          <h2 className="font-sans text-[10px] font-semibold uppercase tracking-[0.3em] text-[#a89b82] mb-4">
            Client Stories
          </h2>
          <p className="font-serif text-3xl text-[#2b2622] md:text-5xl lg:text-6xl leading-[1.1] max-w-3xl">
            Trusted by universities, enterprises, and families alike.
          </p>
        </div>

        <div ref={cardsRef} className="grid grid-cols-1 gap-12 md:grid-cols-3 md:gap-8">
          {TESTIMONIALS.map((item, i) => (
            <div key={i} className="testimonial-card flex flex-col items-center text-center md:items-start md:text-left">
              <span className="font-serif text-6xl text-[#c9a96e] leading-none mb-4 opacity-60">
                “
              </span>
              <p className="font-serif text-xl md:text-2xl text-[#2b2622] leading-relaxed mb-8 flex-grow">
                {item.quote}
              </p>
              <div className="mt-auto">
                <div className="h-[1px] w-12 bg-[#c9a96e]/50 mb-4 mx-auto md:mx-0" />
                <h4 className="font-sans text-sm font-semibold uppercase tracking-widest text-[#2b2622] mb-1">
                  {item.client}
                </h4>
                <p className="font-sans text-[10px] uppercase tracking-[0.2em] text-[#8c7b6a]">
                  {item.event}
             </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}