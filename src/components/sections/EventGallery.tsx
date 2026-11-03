"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export default function EventGallery() {
  const sectionRef = useRef<HTMLElement>(null);
  const galleryRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const q = gsap.utils.selector(galleryRef);

    gsap.fromTo(
      q(".gallery-item"),
      { y: 80, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 1.2,
        stagger: 0.15,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 75%",
        },
      }
    );
  }, []);

  const galleryImages = [
    {
      src: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?q=80&w=2070&auto=format&fit=crop",
      title: "International Business Summit",
      span: "md:col-span-2 md:row-span-2",
      aspect: "aspect-[4/3] md:aspect-auto",
    },
    {
      src: "/university.jpg",
      title: "University Tech Fest",
      span: "md:col-span-1 md:row-span-1",
      aspect: "aspect-square",
    },
    {
      src: "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?q=80&w=2070&auto=format&fit=crop",
      title: "Automobile Product Launch",
      span: "md:col-span-1 md:row-span-1",
      aspect: "aspect-square",
    },
    {
      src: "https://images.unsplash.com/photo-1519225421980-715cb0215aed?q=80&w=2070&auto=format&fit=crop",
      title: "Royal Destination Wedding",
      span: "md:col-span-1 md:row-span-2",
      aspect: "aspect-[3/4] md:aspect-auto",
    },
    {
      src: "https://images.unsplash.com/photo-1459749411175-04bf5292ceea?q=80&w=2070&auto=format&fit=crop",
      title: "Open Air Music Festival",
      span: "md:col-span-2 md:row-span-1",
      aspect: "aspect-[21/9]",
    },
  ];

  return (
    <section ref={sectionRef} className="bg-[#0c0a09] py-24 md:py-32 px-6 md:px-12">
      <div className="mx-auto max-w-7xl">
        <div className="mb-16 md:mb-24 flex flex-col md:flex-row md:items-end justify-between gap-8">
          <div className="max-w-3xl">
            <h2 className="font-sans text-[10px] font-semibold uppercase tracking-[0.3em] text-[#c9a96e] mb-4">
              Our Visual Portfolio
            </h2>
            <p className="font-serif text-3xl text-[#fbf8f1] md:text-5xl lg:text-6xl leading-[1.1]">
              From boardrooms to ballrooms, we set the perfect stage.
            </p>
          </div>
        </div>

        <div ref={galleryRef} className="grid grid-cols-1 md:grid-cols-3 md:grid-rows-3 gap-4 md:gap-6 md:h-[900px]">
          {galleryImages.map((img, i) => (
            <div key={i} className={`gallery-item group relative overflow-hidden bg-[#221e1a] rounded-sm ${img.span} ${img.aspect} w-full h-full`}>
              <img
                src={img.src}
                alt={img.title}
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-black/0 transition-colors duration-500 group-hover:bg-black/40" />
              <div className="absolute inset-0 flex flex-col justify-end p-8">
                <div className="translate-y-8 opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100">
                  <p className="font-serif text-2xl text-white md:text-3xl">
                    {img.title}
                  </p>
                  <div className="mt-4 h-[1px] w-12 bg-[#c9a96e] transition-all duration-700 delay-100 group-hover:w-24" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}