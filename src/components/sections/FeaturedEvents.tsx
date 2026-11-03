"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Link from "next/link";

export default function FeaturedEvents() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const q = gsap.utils.selector(sectionRef);

    gsap.fromTo(
      q(".event-card"),
      { y: 50, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 1,
        stagger: 0.15,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 75%",
        },
      }
    );
  }, []);

  // Diverse Event Categories
  const events = [
    {
      title: "Corporate Summits",
      desc: "Immersive professional gatherings, board meetings, and global conferences.",
      image: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?q=80&w=2070&auto=format&fit=crop", 
      category: "Business",
    },
    {
      title: "Educational Expos",
      desc: "Academic symposiums, campus fests, and large-scale educational exhibitions.",
      image: "expo.jpg", 
      category: "Education",
    },
    {
      title: "Luxury Weddings",
      desc: "Bespoke celebrations tailored to your unique love story and traditions.",
      image: "https://images.unsplash.com/photo-1519225421980-715cb0215aed?q=80&w=2070&auto=format&fit=crop", 
      category: "Private",
    },
    {
      title: "Brand Activations",
      desc: "High-impact product launches and pop-up experiences that engage customers.",
      image: "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?q=80&w=2070&auto=format&fit=crop", 
      category: "Commercial",
    },
    {
      title: "Live Concerts",
      desc: "End-to-end production for live music, entertainment shows, and festivals.",
      image: "https://images.unsplash.com/photo-1459749411175-04bf5292ceea?q=80&w=2070&auto=format&fit=crop", 
      category: "Entertainment",
    },
    {
      title: "Social Galas",
      desc: "Milestone birthdays, anniversaries, and exclusive VIP private gatherings.",
      image: "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?q=80&w=2069&auto=format&fit=crop", 
      category: "Social",
    }
  ];

  return (
    <section ref={sectionRef} className="relative w-full bg-charcoal px-6 py-24 md:px-12 lg:py-32">
      <div className="mx-auto max-w-7xl">
        <div className="mb-16 flex flex-col items-start justify-between gap-6 md:mb-24 md:flex-row md:items-end">
          <div className="max-w-2xl">
            <h2 className="font-sans text-xs font-semibold uppercase tracking-[0.2em] text-gold mb-4">
              Our Expertise
            </h2>
            <p className="font-serif text-4xl text-ivory md:text-5xl lg:text-6xl leading-[1.1]">
              Whatever the occasion, we design all of it.
            </p>
          </div>
          <Link
            href="/services"
            className="group flex items-center gap-3 border-b border-gold/30 pb-2 font-sans text-sm tracking-[0.1em] text-ivory transition-colors hover:border-gold"
          >
            View All Services
            <span className="transition-transform group-hover:translate-x-2">→</span>
          </Link>
        </div>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {events.map((event, i) => (
            <div key={i} className="event-card group relative flex flex-col overflow-hidden bg-[#221e1a] rounded-sm">
              <div className="relative aspect-[4/5] w-full overflow-hidden">
                <div 
                  className="absolute inset-0 bg-cover bg-center transition-transform duration-1000 group-hover:scale-110"
                  style={{ backgroundImage: `url(${event.image})` }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-charcoal via-charcoal/20 to-transparent opacity-80 transition-opacity group-hover:opacity-60" />
                
                <span className="absolute left-6 top-6 rounded-full border border-ivory/20 bg-charcoal/50 px-4 py-1.5 font-sans text-[10px] uppercase tracking-widest text-ivory backdrop-blur-sm">
                  {event.category}
                </span>
              </div>
              
              <div className="absolute bottom-0 left-0 right-0 p-8 transform transition-transform duration-500">
                <h3 className="mb-3 font-serif text-2xl text-ivory md:text-3xl">
                  {event.title}
                </h3>
                <p className="font-sans text-sm font-light leading-relaxed text-ivory/70 opacity-0 transform translate-y-4 transition-all duration-500 group-hover:opacity-100 group-hover:translate-y-0">
                  {event.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}