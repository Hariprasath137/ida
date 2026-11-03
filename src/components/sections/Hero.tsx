"use client";

import {
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
  type CSSProperties,
} from "react";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);
ScrollTrigger.config({ ignoreMobileResize: true });

/* -------------------------------------------------------------------------- */
/*  SETTINGS                                                                  */
/* -------------------------------------------------------------------------- */

const SCROLL_LENGTH = "+=400%";
const EXIT_WASH = "bg-charcoal";
const SCENES = ["Entrance", "Stage"];
const TOTAL = 10;

const useIsoLayoutEffect =
  typeof window !== "undefined" ? useLayoutEffect : useEffect;

const vars = (o: Record<string, string | number>) => o as CSSProperties;

/* -------------------------------------------------------------------------- */
/*  SHAPES & DATA                                                             */
/* -------------------------------------------------------------------------- */

const LAMPS = [8, 22, 36, 50, 64, 78, 92];
const BEAM_COLORS = [
  "rgba(255,226,170,0.55)",
  "rgba(255,255,255,0.38)",
  "rgba(255,176,150,0.40)",
];

const CROWD = Array.from({ length: 44 }, (_, i) => {
  const r = 17 + ((i * 7) % 9);
  const base = 214 + ((i * 13) % 26);
  return {
    x: Math.round(i * (1600 / 43) + ((i * 53) % 29) - 14),
    r,
    cy: base - r * 2.2,
    arm: i % 3 === 0 ? (i % 2 ? 1 : -1) : 0,
  };
});

function Crowd() {
  return (
    <svg
      viewBox="0 0 1600 260"
      preserveAspectRatio="xMidYMax slice"
      className="absolute inset-x-0 bottom-0 h-[30%] w-full"
      aria-hidden
    >
      <g fill="#0b0908" stroke="#0b0908" strokeLinecap="round">
        {CROWD.map((p, i) => (
          <g key={i}>
            {p.arm !== 0 && (
              <line
                x1={p.x + p.arm * p.r * 1.6}
                y1={p.cy + p.r * 2}
                x2={p.x + p.arm * p.r * 2.4}
                y2={p.cy - p.r * 2.4}
                strokeWidth={p.r * 0.55}
              />
            )}
            <circle cx={p.x} cy={p.cy} r={p.r} stroke="none" />
            <ellipse cx={p.x} cy={p.cy + p.r * 2.6} rx={p.r * 2.5} ry={p.r * 1.9} stroke="none" />
          </g>
        ))}
        <rect y="238" width="1600" height="30" stroke="none" />
      </g>
    </svg>
  );
}

const PROJECTED_TEXTS = [
  { subtitle: "Weddings · Private Events", title: "Moments you'll never forget." },
  { subtitle: "Concerts · Summits · Launches", title: "Where the night begins." },
  { subtitle: "Expos · Conferences · Galas", title: "Setting the industry standard." },
];

/* -------------------------------------------------------------------------- */
/*  FLORAL ARCH (pure SVG – no image needed)                                  */
/* -------------------------------------------------------------------------- */

// Deterministic pseudo-random so server & client render the same arch
const rand = (n: number) => {
  const x = Math.sin(n * 127.1 + 311.7) * 43758.5453;
  return x - Math.floor(x);
};

const ROSE_COLORS = ["#f8a38b", "#ffc79a", "#fff0d6", "#f58f7c", "#ffd9b0"];
const LEAF_COLORS = ["#2f7d32", "#3c9140", "#4caf50", "#256b2a"];

// Point on the arch curve. t: 0 (left base) -> 1 (right base)
const archPoint = (t: number, rxo = 0, ryo = 0) => {
  const th = Math.PI - t * Math.PI;
  return {
    x: 500 + (390 + rxo) * Math.cos(th),
    y: 440 - (370 + ryo) * Math.sin(th),
  };
};

const ARCH_ROSES = [
  ...Array.from({ length: 19 }, (_, i) => {
    const p = archPoint(i / 18);
    return { x: p.x, y: p.y, r: 26 + rand(i) * 20, c: ROSE_COLORS[i % 5] };
  }),
  { x: 130, y: 480, r: 34, c: ROSE_COLORS[0] },
  { x: 92, y: 535, r: 28, c: ROSE_COLORS[2] },
  { x: 150, y: 540, r: 24, c: ROSE_COLORS[1] },
  { x: 870, y: 480, r: 34, c: ROSE_COLORS[3] },
  { x: 908, y: 535, r: 28, c: ROSE_COLORS[4] },
  { x: 850, y: 540, r: 24, c: ROSE_COLORS[0] },
];

const ARCH_HYDRANGEA = Array.from({ length: 12 }, (_, i) => {
  const p = archPoint((i + 0.5) / 12, (rand(i + 40) - 0.5) * 50, (rand(i + 60) - 0.5) * 50);
  return { x: p.x, y: p.y, r: 20 + rand(i + 5) * 12 };
});

const ARCH_LEAVES = [
  // along the arch curve
  ...Array.from({ length: 110 }, (_, i) => {
    const p = archPoint(rand(i), (rand(i + 9) - 0.5) * 90, (rand(i + 17) - 0.5) * 90);
    return { x: p.x, y: p.y, rot: rand(i + 3) * 360, c: LEAF_COLORS[i % 4], s: 0.8 + rand(i + 7) * 0.9 };
  }),
  // down the pillars
  ...Array.from({ length: 70 }, (_, i) => {
    const left = i % 2 === 0;
    const base = left ? 110 : 890;
    return {
      x: base + (rand(i + 90) - 0.5) * 70,
      y: 480 + rand(i + 120) * 380,
      rot: rand(i + 33) * 360,
      c: LEAF_COLORS[i % 4],
      s: 0.7 + rand(i + 2) * 0.7,
    };
  }),
  // bushes at the base
  ...Array.from({ length: 60 }, (_, i) => {
    const left = i % 2 === 0;
    const base = left ? 100 : 900;
    return {
      x: base + (rand(i + 200) - 0.5) * 130,
      y: 800 + rand(i + 240) * 70,
      rot: rand(i + 77) * 360,
      c: LEAF_COLORS[i % 4],
      s: 0.8 + rand(i + 4) * 0.9,
    };
  }),
];

const ARCH_BLOOMS = Array.from({ length: 90 }, (_, i) => {
  const onArch = i < 50;
  if (onArch) {
    const p = archPoint(rand(i + 300), (rand(i + 310) - 0.5) * 80, (rand(i + 320) - 0.5) * 80);
    return { x: p.x, y: p.y, r: 2.5 + rand(i) * 2.5 };
  }
  const base = i % 2 === 0 ? 105 : 895;
  return { x: base + (rand(i + 400) - 0.5) * 120, y: 520 + rand(i + 420) * 340, r: 2.5 + rand(i) * 2.5 };
});

function Rose({ x, y, r, c }: { x: number; y: number; r: number; c: string }) {
  return (
    <g transform={`translate(${x} ${y})`}>
      <circle r={r} fill={c} stroke="rgba(0,0,0,0.12)" strokeWidth="1.2" />
      <circle r={r * 0.78} fill={c} stroke="rgba(0,0,0,0.14)" strokeWidth="1.2" />
      <circle r={r * 0.55} fill={c} stroke="rgba(0,0,0,0.16)" strokeWidth="1.2" />
      <circle r={r * 0.3} fill={c} stroke="rgba(0,0,0,0.2)" strokeWidth="1.2" />
      <path
        d={`M ${-r * 0.4} 0 Q ${-r * 0.4} ${-r * 0.45} 0 ${-r * 0.4} Q ${r * 0.4} ${-r * 0.35} ${r * 0.35} ${r * 0.1}`}
        fill="none"
        stroke="rgba(0,0,0,0.18)"
        strokeWidth="1.2"
        strokeLinecap="round"
      />
      <circle r={r} fill="url(#roseShine)" />
    </g>
  );
}

function Drape() {
  return (
    <g>
      {/* hanging pillar cloth */}
      <path
        d="M95 440 C85 600 75 760 40 865 L225 865 C195 760 205 600 215 440 Z"
        fill="url(#silk)"
      />
      <path
        d="M215 470 C235 620 250 760 300 860 L360 860 C330 740 320 600 300 470 Z"
        fill="url(#silk)"
        opacity="0.95"
      />
      {/* swag across the top */}
      <path
        d="M150 420 C190 270 320 200 480 140 C430 290 360 400 270 480 Z"
        fill="url(#silk)"
      />
      {/* fold lines */}
      <g fill="none" stroke="#e6d2ac" strokeWidth="2.5" strokeLinecap="round" opacity="0.8">
        <path d="M130 460 C125 620 115 760 95 860" />
        <path d="M165 460 C160 620 160 760 150 860" />
        <path d="M195 460 C200 620 205 760 215 860" />
        <path d="M250 500 C265 640 285 760 320 858" />
        <path d="M200 400 C260 320 350 250 450 180" />
        <path d="M230 440 C290 360 370 290 460 220" />
      </g>
    </g>
  );
}

function FloralArch({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 1000 900"
      preserveAspectRatio="xMidYMax meet"
      className={className}
      aria-label="Floral wedding arch"
      role="img"
    >
      <defs>
        <linearGradient id="silk" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#f3e3c3" />
          <stop offset="0.45" stopColor="#fff8ea" />
          <stop offset="1" stopColor="#ecd8b4" />
        </linearGradient>
        <radialGradient id="roseShine" cx="35%" cy="30%" r="70%">
          <stop offset="0" stopColor="rgba(255,255,255,0.45)" />
          <stop offset="1" stopColor="rgba(255,255,255,0)" />
        </radialGradient>
      </defs>

      {/* drapes (right side is mirrored left) */}
      <Drape />
      <g transform="translate(1000 0) scale(-1 1)">
        <Drape />
      </g>

      {/* greenery */}
      {ARCH_LEAVES.map((l, i) => (
        <ellipse
          key={`l${i}`}
          cx={l.x}
          cy={l.y}
          rx={15 * l.s}
          ry={6.5 * l.s}
          fill={l.c}
          transform={`rotate(${l.rot} ${l.x} ${l.y})`}
        />
      ))}

      {/* ivory hydrangea clusters */}
      {ARCH_HYDRANGEA.map((h, i) => (
        <g key={`h${i}`}>
          <circle cx={h.x} cy={h.y} r={h.r} fill="#fbf4e2" stroke="rgba(0,0,0,0.08)" />
          {[0, 1, 2, 3, 4, 5].map((k) => (
            <circle
              key={k}
              cx={h.x + Math.cos(k * 1.05) * h.r * 0.55}
              cy={h.y + Math.sin(k * 1.05) * h.r * 0.55}
              r={h.r * 0.32}
              fill="#fffaf0"
              stroke="rgba(0,0,0,0.07)"
            />
          ))}
        </g>
      ))}

      {/* roses */}
      {ARCH_ROSES.map((r, i) => (
        <Rose key={`r${i}`} {...r} />
      ))}

      {/* baby's breath */}
      {ARCH_BLOOMS.map((b, i) => (
        <circle key={`b${i}`} cx={b.x} cy={b.y} r={b.r} fill="#fffdf6" />
      ))}
    </svg>
  );
}

/* -------------------------------------------------------------------------- */
/*  HERO COMPONENT                                                            */
/* -------------------------------------------------------------------------- */

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);

  // Entrance Refs
  const textRef = useRef<HTMLDivElement>(null);
  const entranceRef = useRef<HTMLDivElement>(null);
  const entranceBgRef = useRef<HTMLDivElement>(null);
  const archImgRef = useRef<HTMLDivElement>(null);

  // Stage Refs
  const stageRef = useRef<HTMLDivElement>(null);
  const beamsRef = useRef<HTMLDivElement>(null);
  const washRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef(0);

  const [scene, setScene] = useState(0);

  useIsoLayoutEffect(() => {
    const section = sectionRef.current;
    if (!section) return;
    const q = gsap.utils.selector(section);
    const mm = gsap.matchMedia();

    mm.add("(prefers-reduced-motion: no-preference)", () => {
      /* ---------- 1. INITIAL SETUP ---------- */
      gsap.set(q(".hero-line"), { yPercent: 115 });
      gsap.set(q(".hero-fade"), { y: 24, opacity: 0 });
      gsap.set(entranceRef.current, { scale: 1, opacity: 1 });
      gsap.set(archImgRef.current, { scale: 1, yPercent: 0 });

      /* ---------- 2. LOAD ANIMATION ---------- */
      gsap
        .timeline({ defaults: { ease: "power3.out" }, delay: 0.1 })
        .fromTo(archImgRef.current, { opacity: 0, scale: 1.05 }, { opacity: 1, scale: 1, duration: 1.5 })
        .to(q(".hero-line"), { yPercent: 0, duration: 1.1, stagger: 0.12 }, 0.2)
        .to(q(".hero-fade"), { y: 0, opacity: 1, duration: 0.9, stagger: 0.1 }, 0.5);

      /* ---------- 3. SCROLL JOURNEY ---------- */
      const tl = gsap.timeline({
        defaults: { ease: "none" },
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: SCROLL_LENGTH,
          scrub: 0.9,
          pin: true,
          pinSpacing: true,
          anticipatePin: 1,
          invalidateOnRefresh: true,
          onUpdate: (self) => {
            const t = self.progress * TOTAL;
            const s = t < 1.8 ? 0 : 1;
            if (s !== sceneRef.current) {
              sceneRef.current = s;
              setScene(s);
            }
          },
        },
      });

      // 1. Zoom THROUGH the arch
      tl.to(textRef.current, { autoAlpha: 0, scale: 1.5, y: -40, duration: 1.2, ease: "power2.in" }, 0)
        .to(entranceRef.current, { scale: 5.2, yPercent: 40, duration: 2.8, ease: "power2.in" }, 0)
        .to(entranceRef.current, { autoAlpha: 0, duration: 0.4 }, 2)
        .to(entranceBgRef.current, { autoAlpha: 0, duration: 1.5, ease: "power1.inOut" }, 1);

      // 2. Stage Appears
      tl.fromTo(stageRef.current, { scale: 0.6 }, { scale: 1, duration: 3, ease: "power2.out" }, 0)
        .fromTo(stageRef.current, { autoAlpha: 0 }, { autoAlpha: 1, duration: 1.4 }, 0.8)
        .fromTo(beamsRef.current, { opacity: 0 }, { opacity: 1, duration: 1.6 }, 1.2);

      // 3. LED Wall Text Cycle
      const texts = q(".stage-text-item");

      tl.fromTo(texts[0], { autoAlpha: 0, y: 20 }, { autoAlpha: 1, y: 0, duration: 0.9, ease: "power2.out" }, 2.1)
        .to(texts[0], { autoAlpha: 0, y: -15, duration: 0.6 }, 4.2);

      tl.fromTo(texts[1], { autoAlpha: 0, y: 15 }, { autoAlpha: 1, y: 0, duration: 0.6 }, 4.6)
        .to(texts[1], { autoAlpha: 0, y: -15, duration: 0.6 }, 6.2);

      tl.fromTo(texts[2], { autoAlpha: 0, y: 15 }, { autoAlpha: 1, y: 0, duration: 0.6 }, 6.6)
        .to(texts[2], { autoAlpha: 0, y: -30, duration: 0.6, ease: "power1.in" }, 8.4);

      // Slow Dolly In on the stage
      tl.to(stageRef.current, { scale: 1.1, duration: 5.4, ease: "none" }, 3.0);

      // 4. Exit
      tl.to(stageRef.current, { scale: 4, duration: 1.6, ease: "power2.in" }, 8.4)
        .to(washRef.current, { opacity: 1, duration: 1.3, ease: "power1.in" }, 8.7);
    });

    return () => mm.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative h-[100svh] min-h-[640px] w-full overflow-hidden bg-[#0c0a09]"
    >
      <style>{`
        @keyframes hero-sway{from{transform:rotate(var(--r0,-6deg))}to{transform:rotate(var(--r1,6deg))}}
        @keyframes hero-cue{0%{transform:translateY(-100%)}100%{transform:translateY(100%)}}
        @media (prefers-reduced-motion:reduce){.hero-anim{animation:none!important}}
        /* text width = arch void width (mobile: arch is height-based, so void scales with screen height) */
        .hero-text-pad{padding-left:calc(50vw - min(40vw, 14svh));padding-right:calc(50vw - min(40vw, 14svh))}
        @media (min-width:768px){.hero-text-pad{padding-left:22vw;padding-right:22vw}}
      `}</style>

      {/* =================== SCENE 2: CONCERT STAGE =================== */}
      <div
        ref={stageRef}
        className="absolute inset-0 z-[2] will-change-transform"
        style={{ opacity: 0, visibility: "hidden", transformOrigin: "50% 42%" }}
      >
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(120% 80% at 50% 38%, #2b2019 0%, #120e0b 60%, #080605 100%)",
          }}
        />

        {/* LED wall with dynamic text projection */}
        <div
          className="absolute left-1/2 top-[20%] aspect-[16/8] w-[84%] -translate-x-1/2 overflow-hidden border border-gold/30 md:w-[56%] md:aspect-[16/7]"
          style={{
            background: "linear-gradient(160deg, #33231a 0%, #17110d 100%)",
            boxShadow: "0 0 140px rgba(214,178,120,0.28)",
          }}
        >
          <div
            className="absolute inset-0"
            style={{
              backgroundImage:
                "linear-gradient(rgba(255,255,255,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.05) 1px, transparent 1px)",
              backgroundSize: "20px 20px",
            }}
          />
          <div className="absolute inset-0 flex items-center justify-center px-4 text-center">
            {PROJECTED_TEXTS.map((item, index) => (
              <div
                key={index}
                className="stage-text-item absolute inset-0 flex flex-col items-center justify-center"
                style={{ opacity: 0, visibility: "hidden" }}
              >
                <p className="mb-3 font-sans text-[9px] font-semibold uppercase tracking-[0.3em] text-gold md:text-[11px]">
                  {item.subtitle}
                </p>
                <p className="font-serif text-3xl italic leading-[1.1] text-ivory md:text-6xl">
                  {item.title}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Light beams */}
        <div ref={beamsRef} className="absolute inset-0" style={{ opacity: 0 }}>
          {LAMPS.map((x, i) => (
            <div
              key={x}
              className="hero-anim absolute top-[9%]"
              style={vars({
                left: `${x}%`,
                width: "20vw",
                height: "92%",
                marginLeft: "-10vw",
                transformOrigin: "50% 0",
                clipPath: "polygon(46% 0, 54% 0, 100% 100%, 0 100%)",
                background: `linear-gradient(to bottom, ${BEAM_COLORS[i % 3]}, rgba(255,255,255,0) 88%)`,
                mixBlendMode: "screen",
                animation: `hero-sway ${5 + (i % 3)}s ease-in-out ${i * -0.7}s infinite alternate`,
                "--r0": `${-9 + (i % 2) * 4}deg`,
                "--r1": `${7 - (i % 2) * 3}deg`,
              })}
            />
          ))}
        </div>

        <div className="absolute left-[3%] right-[3%] top-[7.4%] h-[3px] bg-gradient-to-r from-transparent via-ivory/50 to-transparent" />
        {LAMPS.map((x) => (
          <span
            key={x}
            className="absolute top-[8%] h-3 w-3 -translate-x-1/2 rounded-full bg-ivory shadow-[0_0_24px_8px_rgba(255,226,170,0.7)]"
            style={{ left: `${x}%` }}
          />
        ))}

        <div
          className="absolute inset-x-0 bottom-0 h-[42%] overflow-hidden border-t border-gold/40"
          style={{ background: "linear-gradient(to top, #0c0a08, #2a2119 60%, #3a2d21)" }}
        >
          <div
            className="absolute inset-x-[-20%] top-0 h-[160%] origin-top"
            style={{
              backgroundImage:
                "linear-gradient(rgba(214,178,120,0.18) 1px, transparent 1px), linear-gradient(90deg, rgba(214,178,120,0.18) 1px, transparent 1px)",
              backgroundSize: "90px 90px",
              transform: "perspective(520px) rotateX(62deg)",
              maskImage: "linear-gradient(to bottom, rgba(0,0,0,0.9), transparent 85%)",
              WebkitMaskImage: "linear-gradient(to bottom, rgba(0,0,0,0.9), transparent 85%)",
            }}
          />
          {[22, 50, 78].map((x) => (
            <div
              key={x}
              className="absolute top-[8%] h-[16%] w-[26%] -translate-x-1/2 rounded-full bg-gold/25 blur-xl"
              style={{ left: `${x}%` }}
            />
          ))}
        </div>

        <div
          className="absolute inset-x-0 bottom-0 h-[45%]"
          style={{
            background:
              "radial-gradient(80% 60% at 50% 100%, rgba(214,178,120,0.2), transparent 70%)",
          }}
        />
        <Crowd />
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "radial-gradient(120% 90% at 50% 45%, transparent 55%, rgba(0,0,0,0.65) 100%)",
          }}
        />
      </div>

      {/* =================== SCENE 1: FLORAL WEDDING ENTRANCE =================== */}
      {/* Pure White Background */}
      <div ref={entranceBgRef} className="absolute inset-0 z-[3] bg-white"></div>

      {/* Floral arch (code-made SVG, no image file) */}
      <div
        ref={entranceRef}
        className="pointer-events-none absolute inset-0 z-[4] flex items-end justify-center overflow-hidden"
        style={{ transformOrigin: "50% 45%" }}
      >
        {/* Mobile: arch is full screen height, wider than the screen, so the sides crop and the centre void stays big.
            Desktop: fits the full width/height as before. */}
        <div
          ref={archImgRef}
          className="relative h-full flex-none aspect-[1000/900] md:aspect-auto md:w-full"
        >
          <FloralArch className="h-full w-full" />
        </div>
      </div>

      {/* Entrance Text - centered in the arch's open void */}
      <div
        ref={textRef}
        className="hero-text-pad absolute inset-0 z-[5] flex flex-col items-center justify-center pt-16 text-center md:pt-20"
      >
        <div className="mb-3 overflow-hidden md:mb-4">
          <p className="hero-fade font-sans text-[7px] font-semibold uppercase tracking-[0.22em] text-[#a89b82] md:text-[10px] md:tracking-[0.35em] drop-shadow-sm">
            Experiential Design Studio · India
          </p>
        </div>

        <h1 className="mb-4 flex flex-col items-center font-serif leading-[1.1] text-[#2b2622] md:mb-5">
          <span className="block overflow-hidden pb-[0.1em]">
            <span className="hero-line block text-balance text-[1.35rem] sm:text-3xl md:text-5xl lg:text-6xl drop-shadow-sm">
              Every Event. Every Detail.
            </span>
          </span>
          <span className="mt-1 block overflow-hidden pb-[0.1em]">
            <span className="hero-line block text-balance text-[1.35rem] italic text-[#c9a96e] sm:text-3xl md:text-5xl lg:text-6xl drop-shadow-sm">
              Extraordinary Experiences.
            </span>
          </span>
        </h1>

        <p className="hero-fade mx-auto mb-5 max-w-lg font-sans text-[11px] font-medium leading-relaxed text-[#2b2622]/80 max-md:[@media(max-height:700px)]:hidden md:mb-8 md:text-sm drop-shadow-sm">
          We transform ideas into remarkable experiences through thoughtful
          planning, creative production and flawless execution.
        </p>

        <div className="flex w-full max-w-xs flex-col gap-3 md:w-auto md:max-w-none md:flex-row">
          <div className="hero-fade pointer-events-auto">
            <Link
              href="/services"
              className="block bg-[#2b2622] px-6 py-3 font-sans text-[10px] uppercase tracking-[0.15em] text-white transition-colors duration-300 hover:bg-[#c9a96e] md:inline-block md:px-8 md:py-4 md:text-xs"
            >
              Explore Our Events
            </Link>
          </div>
          <div className="hero-fade pointer-events-auto">
            <Link
              href="/contact"
              className="block border border-[#2b2622]/20 bg-white/60 backdrop-blur-md px-6 py-3 font-sans text-[10px] uppercase tracking-[0.15em] text-[#2b2622] transition-all duration-300 hover:border-[#2b2622] hover:bg-white md:inline-block md:px-8 md:py-4 md:text-xs"
            >
              Plan Your Event
            </Link>
          </div>
        </div>

        {/* Scroll cue */}
        <div className="hero-fade absolute bottom-8 left-1/2 flex -translate-x-1/2 flex-col items-center font-sans text-[8px] uppercase tracking-[0.25em] text-[#2b2622]/80 md:bottom-12">
          <span className="mb-2">Scroll to enter</span>
          <div className="relative h-6 w-px overflow-hidden bg-[#2b2622]/30">
            <div
              className="hero-anim absolute inset-0 bg-[#2b2622]"
              style={{ animation: "hero-cue 1.6s linear infinite" }}
            />
          </div>
        </div>
      </div>

      {/* Fade into the next section */}
      <div
        ref={washRef}
        className={`pointer-events-none absolute inset-0 z-[6] ${EXIT_WASH}`}
        style={{ opacity: 0 }}
      />

      {/* Progress Indicator */}
      <nav
        aria-hidden
        className="pointer-events-none absolute right-3 top-1/2 z-[7] flex -translate-y-1/2 flex-col gap-4 text-white mix-blend-difference md:right-6"
      >
        {SCENES.map((label, i) => (
          <div key={label} className="flex items-center justify-end gap-3">
            <span
              className={`hidden font-sans text-[10px] uppercase tracking-[0.25em] transition-opacity duration-500 md:inline ${
                scene === i ? "opacity-100" : "opacity-0"
              }`}
            >
              {label}
            </span>
            <span
              className={`block h-[6px] rounded-full bg-white transition-all duration-500 ${
                scene === i ? "w-8" : "w-[6px] opacity-50"
              }`}
            />
          </div>
        ))}
      </nav>
    </section>
  );
}