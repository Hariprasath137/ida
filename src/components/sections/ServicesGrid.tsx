"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { services } from "@/lib/services";
import {
  AnimatePresence,
  motion,
  useMotionValue,
  useReducedMotion,
  useSpring,
  useTransform,
  useVelocity,
} from "framer-motion";

const EASE: [number, number, number, number] = [0.76, 0, 0.24, 1];

// Parent (clipped wrapper) watches the viewport; child slides up via variants.
// IMPORTANT: whileInView must NOT sit on the translated child, because the
// overflow-hidden parent clips it completely and it would never count as "in view".
const lineReveal = {
  hidden: { y: "110%" },
  show: (delay: number = 0) => ({
    y: 0,
    transition: { duration: 1, ease: EASE, delay },
  }),
};
const inView = { once: true, margin: "0px 0px -10% 0px" } as const;

const clamp = (v: number, min: number, max: number) =>
  Math.min(Math.max(v, min), max);

export default function ServicesGrid() {
  const reduce = useReducedMotion();

  // Hover devices get the cursor-following preview; touch gets an accordion.
  const [isFine, setIsFine] = useState(false);
  const [active, setActive] = useState<number | null>(null); // hover / focus
  const [open, setOpen] = useState<number | null>(null); // touch accordion
  const [failed, setFailed] = useState<Record<number, boolean>>({}); // broken images
  const pointer = useRef<{ x: number; y: number } | null>(null);

  useEffect(() => {
    const mq = window.matchMedia("(hover: hover) and (pointer: fine)");
    const update = () => setIsFine(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  // Keep hover state correct while scrolling under a stationary cursor
  // (browsers/smooth-scroll don't fire mouseleave, so the preview used to get stuck).
  useEffect(() => {
    if (!isFine) return;
    const onMove = (e: PointerEvent) => {
      pointer.current = { x: e.clientX, y: e.clientY };
    };
    const onScroll = () => {
      const p = pointer.current;
      if (!p) return;
      const el = document.elementFromPoint(p.x, p.y);
      const row = el?.closest<HTMLElement>("[data-svc]");
      if (row) {
        setActive(Number(row.dataset.svc));
        place(p.x, p.y);
      } else {
        setActive(null);
      }
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("scroll", onScroll);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isFine]);

  // ---------- Cursor-following preview ----------
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const sx = useSpring(mx, { stiffness: 170, damping: 22, mass: 0.6 });
  const sy = useSpring(my, { stiffness: 170, damping: 22, mass: 0.6 });
  const vx = useVelocity(sx);
  const tilt = useTransform(vx, [-1800, 1800], [-9, 9], { clamp: true });
  const rotate = useSpring(tilt, { stiffness: 150, damping: 18 });

  const place = (cx: number, cy: number, snap = false) => {
    const lg = window.innerWidth >= 1024;
    const w = lg ? 340 : 260;
    const h = lg ? 440 : 340;
    const x = Math.min(cx + 40, window.innerWidth - w - 24);
    const y = clamp(cy - h / 2, 16, window.innerHeight - h - 16);
    mx.set(x);
    my.set(y);
    if (snap) {
      // First hover: appear at the cursor instead of flying in from a corner
      (sx as unknown as { jump?: (v: number) => void }).jump?.(x);
      (sy as unknown as { jump?: (v: number) => void }).jump?.(y);
    }
  };

  const showPreview = isFine && active !== null;
  const current = isFine ? active : null;

  const renderRow = (svc: (typeof services)[number], i: number) => {
    const dimmed = current !== null && current !== i;

    const body = (
      <>
        <motion.span
          className="col-span-12 block overflow-hidden pb-[0.12em] md:col-span-7"
          initial={reduce ? false : "hidden"}
          whileInView="show"
          viewport={inView}
        >
          <motion.span className="block" variants={lineReveal} custom={i * 0.08}>
            <span className="block font-serif text-[2.6rem] leading-[1.05] text-charcoal transition-transform duration-500 ease-out group-hover:translate-x-4 group-focus-within:translate-x-4 md:text-6xl lg:text-7xl">
              {svc.title}
            </span>
          </motion.span>
        </motion.span>

        <span className="col-span-9 block max-w-[30ch] font-sans text-sm font-light leading-relaxed text-charcoal/65 md:col-span-3">
          {svc.desc}
        </span>

        <span className="col-span-3 flex items-center justify-end gap-3 md:col-span-2">
          <span className="rounded-full border border-charcoal/20 px-3 py-1 font-sans text-xs text-charcoal/70">
            {svc.category}
          </span>
          {!isFine && (
            <span
              aria-hidden
              className={`inline-block text-xl leading-none text-charcoal transition-transform duration-500 ${
                open === i ? "rotate-45" : ""
              }`}
            >
              +
            </span>
          )}
        </span>
      </>
    );

    const rowClass =
      "grid w-full grid-cols-12 items-baseline gap-x-6 gap-y-4 py-9 text-left outline-none transition-opacity duration-500 md:py-12 focus-visible:bg-charcoal/[0.04]";

    return (
      <li
        key={svc.id}
        className="group relative border-t border-charcoal/15 last:border-b"
      >
        {/* Gold line that draws across the row's top edge */}
        <span
          aria-hidden
          className={`pointer-events-none absolute -top-px left-0 h-px w-full origin-left bg-gold transition-transform duration-700 ease-[cubic-bezier(0.76,0,0.24,1)] group-hover:scale-x-100 group-focus-within:scale-x-100 ${
            open === i && !isFine ? "scale-x-100" : "scale-x-0"
          }`}
        />

        {isFine ? (
          <Link
            href={`/services#${svc.slug}`}
            data-svc={i}
            className={`${rowClass} ${dimmed ? "opacity-30" : "opacity-100"}`}
            onMouseEnter={(e) => {
              place(e.clientX, e.clientY, active === null);
              setActive(i);
            }}
            onFocus={(e) => {
              const r = e.currentTarget.getBoundingClientRect();
              place(r.left + r.width * 0.55, r.top + r.height / 2, active === null);
              setActive(i);
            }}
            onBlur={() => setActive(null)}
          >
            {body}
          </Link>
        ) : (
          <>
            <button
              type="button"
              aria-expanded={open === i}
              aria-controls={`svc-panel-${svc.id}`}
              onClick={() => setOpen(open === i ? null : i)}
              className={rowClass}
            >
              {body}
            </button>

            <AnimatePresence initial={false}>
              {open === i && (
                <motion.div
                  id={`svc-panel-${svc.id}`}
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.6, ease: EASE }}
                  className="overflow-hidden"
                >
                  <div className="pb-10">
                    {failed[svc.id] ? (
                      <div className="aspect-[4/3] w-full rounded-md bg-gradient-to-br from-charcoal to-black" />
                    ) : (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img
                        src={svc.img}
                        alt=""
                        loading="lazy"
                        decoding="async"
                        onError={() => setFailed((f) => ({ ...f, [svc.id]: true }))}
                        className="aspect-[4/3] w-full rounded-md object-cover"
                      />
                    )}
                    <Link
                      href={`/services#${svc.slug}`}
                      className="mt-5 inline-block border-b border-charcoal/40 pb-1 font-sans text-sm text-charcoal"
                    >
                      View {svc.title.toLowerCase()}
                    </Link>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </>
        )}
      </li>
    );
  };

  return (
    <section
      id="capabilities"
      className="relative bg-stone px-6 py-24 md:px-16 md:py-36"
    >
      <div className="mx-auto max-w-7xl">
        {/* ---------- Heading ---------- */}
        <div className="mb-16 grid gap-8 md:mb-24 md:grid-cols-12 md:items-end">
          <h2 className="flex flex-col font-serif leading-[1.02] text-charcoal md:col-span-8">
            <motion.span
              className="block overflow-hidden pb-[0.12em]"
              initial={reduce ? false : "hidden"}
              whileInView="show"
              viewport={inView}
            >
              <motion.span
                className="block text-5xl md:text-7xl lg:text-8xl"
                variants={lineReveal}
                custom={0}
              >
                Whatever the occasion,
              </motion.span>
            </motion.span>
            <motion.span
              className="block overflow-hidden pb-[0.12em]"
              initial={reduce ? false : "hidden"}
              whileInView="show"
              viewport={inView}
            >
              <motion.span
                className="block text-5xl italic text-gold md:text-7xl lg:text-8xl"
                variants={lineReveal}
                custom={0.1}
              >
                we design all of it.
              </motion.span>
            </motion.span>
          </h2>

          <p className="max-w-sm font-sans text-sm font-light leading-relaxed text-charcoal/70 md:col-span-4 md:justify-self-end md:text-base">
            From boardrooms to ballrooms, we handle the concept, the production
            and the night itself, so you can be a guest at your own event.
          </p>
        </div>

        {/* ---------- Index ---------- */}
        <ul onMouseLeave={() => setActive(null)} onMouseMove={(e) => isFine && place(e.clientX, e.clientY)}>
          {services.map((svc, i) => renderRow(svc, i))}
        </ul>

        <div className="mt-12 flex justify-end">
          <Link
            href="/services"
            className="group inline-flex items-center gap-4 font-sans text-sm text-charcoal"
          >
            <span>See all services</span>
            <span className="flex h-11 w-11 items-center justify-center rounded-full border border-charcoal/25 transition-colors duration-500 group-hover:border-gold group-hover:bg-gold">
              <svg
                width="14"
                height="14"
                viewBox="0 0 14 14"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.2"
                aria-hidden
                className="transition-transform duration-500 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
              >
                <path d="M2 12 12 2M5 2h7v7" />
              </svg>
            </span>
          </Link>
        </div>
      </div>

      {/* ---------- Floating preview (hover devices only) ---------- */}
      {isFine && (
        <motion.div
          aria-hidden
          style={{ x: sx, y: sy, rotate }}
          className="pointer-events-none fixed left-0 top-0 z-40 h-[340px] w-[260px] lg:h-[440px] lg:w-[340px]"
        >
          <motion.div
            className="relative h-full w-full overflow-hidden bg-charcoal"
            initial={false}
            animate={{
              clipPath: showPreview
                ? "inset(0% 0% 0% 0% round 6px)"
                : "inset(50% 0% 50% 0% round 6px)",
              scale: showPreview ? 1 : 0.92,
            }}
            transition={{ duration: reduce ? 0 : 0.6, ease: EASE }}
          >
            {services.map((svc, i) => (
              <motion.span key={svc.id} className="absolute inset-0 block">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <motion.img
                  src={svc.img}
                  alt=""
                  loading="eager"
                  decoding="async"
                  onError={() => setFailed((f) => ({ ...f, [svc.id]: true }))}
                  style={failed[svc.id] ? { display: "none" } : undefined}
                  className="h-full w-full object-cover"
                  initial={false}
                  animate={{
                    opacity: active === i ? 1 : 0,
                    scale: active === i ? 1 : 1.15,
                  }}
                  transition={{ duration: reduce ? 0 : 0.7, ease: EASE }}
                />
              </motion.span>
            ))}
            <div className="absolute inset-0 bg-gradient-to-t from-charcoal/40 via-transparent to-transparent" />
            {active !== null && failed[services[active].id] && (
              <div className="absolute inset-0 flex items-end bg-gradient-to-br from-charcoal to-black p-6">
                <p className="font-serif text-3xl italic text-ivory">{services[active].title}</p>
              </div>
            )}
          </motion.div>

          {/* Cursor badge */}
          <motion.span
            className="absolute -left-9 bottom-10 flex h-[74px] w-[74px] items-center justify-center rounded-full bg-gold font-sans text-xs text-charcoal"
            initial={false}
            animate={{ scale: showPreview ? 1 : 0 }}
            transition={{ duration: reduce ? 0 : 0.5, ease: EASE, delay: showPreview ? 0.1 : 0 }}
          >
            View
          </motion.span>
        </motion.div>
      )}
    </section>
  );
}