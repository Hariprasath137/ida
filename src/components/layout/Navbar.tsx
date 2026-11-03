"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  // Handle scroll effect for Navbar background
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Prevent background scrolling when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isMobileMenuOpen]);

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "About", href: "/about" },
    { name: "Services", href: "/services" },
    { name: "Contact", href: "/contact" },
  ];

  return (
    <>
      {/* Main Navbar */}
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          isScrolled
            ? "bg-[#0c0a09]/90 backdrop-blur-md py-4 shadow-lg border-b border-white/5"
            : "bg-transparent py-6"
        }`}
      >
        <div className="mx-auto max-w-7xl px-6 md:px-12 flex items-center justify-between">
          
          {/* Logo */}
          <Link href="/" className="relative z-50 group">
            <h1 className={`font-serif text-2xl md:text-3xl transition-colors duration-300 ${isMobileMenuOpen ? "text-[#fbf8f1]" : "text-[#c9a96e]"}`}>
              IDA<span className={`text-sm tracking-[0.2em] uppercase font-sans ml-2 ${isMobileMenuOpen ? "text-[#fbf8f1]/60" : "text-[#fbf8f1]/80"}`}>Events</span>
            </h1>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-10">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className={`font-sans text-[11px] font-medium uppercase tracking-[0.15em] transition-colors duration-300 hover:text-[#c9a96e] ${
                  pathname === link.href ? "text-[#c9a96e]" : "text-[#fbf8f1]"
                }`}
              >
                {link.name}
              </Link>
            ))}
          </div>

          {/* Desktop CTA Button */}
          <div className="hidden md:block">
            <Link
              href="/contact"
              className="inline-block border border-[#c9a96e]/50 px-6 py-2.5 font-sans text-[10px] uppercase tracking-[0.2em] text-[#c9a96e] transition-all duration-300 hover:bg-[#c9a96e] hover:text-[#0c0a09]"
            >
              Enquire
            </Link>
          </div>

          {/* Mobile Hamburger Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="relative z-50 flex flex-col items-center justify-center w-10 h-10 md:hidden focus:outline-none"
            aria-label="Toggle Menu"
          >
            <span
              className={`block w-6 h-[2px] bg-[#fbf8f1] transition-all duration-300 ${
                isMobileMenuOpen ? "rotate-45 translate-y-[6px]" : "mb-1.5"
              }`}
            />
            <span
              className={`block w-6 h-[2px] bg-[#fbf8f1] transition-all duration-300 ${
                isMobileMenuOpen ? "opacity-0" : "mb-1.5"
              }`}
            />
            <span
              className={`block w-6 h-[2px] bg-[#fbf8f1] transition-all duration-300 ${
                isMobileMenuOpen ? "-rotate-45 -translate-y-[6px]" : ""
              }`}
            />
          </button>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <div
        className={`fixed inset-0 z-40 bg-[#0c0a09] transition-all duration-500 ease-in-out md:hidden flex flex-col justify-center items-center ${
          isMobileMenuOpen ? "opacity-100 visible" : "opacity-0 invisible"
        }`}
      >
        <div className="flex flex-col items-center gap-8 text-center">
          {navLinks.map((link, index) => (
            <Link
              key={link.name}
              href={link.href}
              onClick={() => setIsMobileMenuOpen(false)}
              className="group relative overflow-hidden"
            >
              <span 
                className={`font-serif text-4xl transition-colors duration-300 ${
                  pathname === link.href ? "text-[#c9a96e] italic" : "text-[#fbf8f1]"
                }`}
                style={{
                  transitionDelay: isMobileMenuOpen ? `${index * 100}ms` : "0ms",
                  transform: isMobileMenuOpen ? "translateY(0)" : "translateY(20px)",
                  opacity: isMobileMenuOpen ? 1 : 0,
                  display: "block"
                }}
              >
                {link.name}
              </span>
            </Link>
          ))}
          
          <div 
            className="mt-8"
            style={{
              transitionDelay: isMobileMenuOpen ? `${navLinks.length * 100}ms` : "0ms",
              transform: isMobileMenuOpen ? "translateY(0)" : "translateY(20px)",
              opacity: isMobileMenuOpen ? 1 : 0,
            }}
          >
            <Link
              href="/contact"
              onClick={() => setIsMobileMenuOpen(false)}
              className="inline-block bg-[#c9a96e] text-[#0c0a09] px-8 py-4 font-sans text-xs uppercase tracking-[0.2em] font-semibold"
            >
              Start Planning
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}