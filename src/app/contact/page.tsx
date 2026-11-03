"use client";

import { useEffect, useState, type ReactNode } from "react";
import { AnimatePresence, motion } from "framer-motion";
import MaskLine from "@/components/animations/MaskLine";
import { services } from "@/lib/services";

const EVENT_TYPES = [...services.map((s) => s.eventType), "Other"];
const GUESTS = ["Under 50", "50 to 150", "150 to 300", "300 or more"];

const EASE: [number, number, number, number] = [0.76, 0, 0.24, 1];

type Status = "idle" | "sending" | "sent" | "error";

const inputClass =
  "w-full bg-transparent py-3 font-sans text-base text-charcoal outline-none placeholder:text-charcoal/35";

/** Underlined field: label above, line draws in on focus. */
function Field({
  label,
  htmlFor,
  optional,
  children,
}: {
  label: string;
  htmlFor: string;
  optional?: boolean;
  children: ReactNode;
}) {
  return (
    <div>
      <label
        htmlFor={htmlFor}
        className="mb-1 flex justify-between font-sans text-xs text-charcoal/60"
      >
        <span>{label}</span>
        {optional && <span className="text-charcoal/40">Optional</span>}
      </label>
      <div className="group relative border-b border-charcoal/20">
        {children}
        <span
          aria-hidden
          className="absolute -bottom-px left-0 h-px w-full origin-left scale-x-0 bg-charcoal transition-transform duration-500 group-focus-within:scale-x-100"
        />
      </div>
    </div>
  );
}

export default function Contact() {
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState("");
  const [eventType, setEventType] = useState("");
  const [sentTo, setSentTo] = useState("");

  // Arriving from /services via /contact?service=slug preselects the event type
  useEffect(() => {
    const slug = new URLSearchParams(window.location.search).get("service");
    const match = services.find((s) => s.slug === slug);
    if (match) setEventType(match.eventType);
  }, []);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const data = Object.fromEntries(new FormData(e.currentTarget).entries());

    if (data.company) return; // honeypot: real people never fill this in
    if (!eventType) {
      setStatus("error");
      setError("Please choose the type of event.");
      return;
    }

    setStatus("sending");
    setError("");
    try {
      // TODO: connect your backend here, for example:
      // const res = await fetch("/api/enquiry", {
      //   method: "POST",
      //   headers: { "Content-Type": "application/json" },
      //   body: JSON.stringify({ ...data, eventType }),
      // });
      // if (!res.ok) throw new Error("Request failed");
      await new Promise((r) => setTimeout(r, 1200)); // simulated delay

      setSentTo(String(data.email ?? ""));
      setStatus("sent");
    } catch {
      setStatus("error");
      setError(
        "Something went wrong sending your enquiry. Please try again, or email us directly."
      );
    }
  }

  function reset() {
    setStatus("idle");
    setError("");
    setEventType("");
  }

  return (
    <main className="mx-auto max-w-7xl px-6 pb-24 pt-36 md:px-16 md:pb-36 md:pt-48">
      {/* ---------- Header ---------- */}
      <header className="mb-16 grid gap-8 md:mb-24 md:grid-cols-12 md:items-end">
        <h1 className="font-serif text-6xl leading-[1.02] text-charcoal md:col-span-7 md:text-8xl">
          <MaskLine>Let’s talk.</MaskLine>
        </h1>
        <p className="max-w-md font-sans text-sm font-light leading-relaxed text-charcoal/70 md:col-span-5 md:justify-self-end md:text-base">
          Share your vision with us. We take on a limited number of projects to
          ensure uncompromising quality.
        </p>
      </header>

      <div className="grid gap-16 lg:grid-cols-12 lg:gap-20">
        {/* ---------- Details ---------- */}
        <aside className="lg:col-span-4">
          <dl className="border-t border-charcoal/15">
            <div className="border-b border-charcoal/15 py-6">
              <dt className="font-sans text-xs text-charcoal/55">Email</dt>
              <dd className="mt-2">
                <a
                  href="mailto:hr@idainternational.com"
                  className="font-serif text-2xl text-charcoal transition-colors hover:text-gold"
                >
                  hr@idainternational.com
                </a>
              </dd>
            </div>
            <div className="border-b border-charcoal/15 py-6">
              <dt className="font-sans text-xs text-charcoal/55">Phone</dt>
              <dd className="mt-2">
                <a
                  href="tel:+919876543210"
                  className="font-serif text-2xl text-charcoal transition-colors hover:text-gold"
                >
                  +91 98765 43210
                </a>
              </dd>
            </div>
            <div className="border-b border-charcoal/15 py-6">
              <dt className="font-sans text-xs text-charcoal/55">Studio</dt>
              <dd className="mt-2 font-serif text-2xl leading-snug text-charcoal">
                12, Design Avenue,
                <br />
                Creative District
              </dd>
            </div>
          </dl>
        </aside>

        {/* ---------- Form ---------- */}
        <div className="lg:col-span-7 lg:col-start-6">
          <AnimatePresence mode="wait">
            {status === "sent" ? (
              <motion.div
                key="sent"
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.7, ease: EASE }}
                className="border-t border-charcoal/15 pt-12"
                role="status"
              >
                <svg
                  width="56"
                  height="56"
                  viewBox="0 0 56 56"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.2"
                  className="text-gold"
                  aria-hidden
                >
                  <circle cx="28" cy="28" r="26" />
                  <motion.path
                    d="M17 29l8 8 14-17"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ duration: 0.8, delay: 0.3, ease: EASE }}
                  />
                </svg>
                <h2 className="mt-8 font-serif text-4xl leading-[1.1] text-charcoal md:text-5xl">
                  Thank you. Your enquiry is with us.
                </h2>
                <p className="mt-5 max-w-md font-sans text-base font-light leading-relaxed text-charcoal/70">
                  {sentTo
                    ? `We’ll reply to ${sentTo} soon.`
                    : "We’ll be in touch soon."}
                </p>
                <button
                  type="button"
                  onClick={reset}
                  className="mt-10 border-b border-charcoal/40 pb-1 font-sans text-sm text-charcoal transition-colors hover:border-gold hover:text-gold"
                >
                  Send another enquiry
                </button>
              </motion.div>
            ) : (
              <motion.form
                key="form"
                onSubmit={handleSubmit}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.4 }}
                className="flex flex-col gap-9"
                noValidate={false}
              >
                {/* Honeypot (hidden from people and screen readers) */}
                <input
                  type="text"
                  name="company"
                  tabIndex={-1}
                  autoComplete="off"
                  aria-hidden
                  className="absolute left-[-9999px] h-0 w-0 opacity-0"
                />

                <div className="grid gap-9 sm:grid-cols-2 sm:gap-8">
                  <Field label="First name" htmlFor="firstName">
                    <input
                      id="firstName"
                      name="firstName"
                      type="text"
                      required
                      autoComplete="given-name"
                      className={inputClass}
                    />
                  </Field>
                  <Field label="Last name" htmlFor="lastName">
                    <input
                      id="lastName"
                      name="lastName"
                      type="text"
                      required
                      autoComplete="family-name"
                      className={inputClass}
                    />
                  </Field>
                </div>

                <div className="grid gap-9 sm:grid-cols-2 sm:gap-8">
                  <Field label="Email address" htmlFor="email">
                    <input
                      id="email"
                      name="email"
                      type="email"
                      required
                      autoComplete="email"
                      className={inputClass}
                    />
                  </Field>
                  <Field label="Phone" htmlFor="phone" optional>
                    <input
                      id="phone"
                      name="phone"
                      type="tel"
                      autoComplete="tel"
                      className={inputClass}
                    />
                  </Field>
                </div>

                {/* Event type: chips instead of a dropdown */}
                <div>
                  <p
                    id="eventTypeLabel"
                    className="mb-3 font-sans text-xs text-charcoal/60"
                  >
                    Type of event
                  </p>
                  <div
                    role="radiogroup"
                    aria-labelledby="eventTypeLabel"
                    className="flex flex-wrap gap-3"
                  >
                    {EVENT_TYPES.map((t) => {
                      const selected = eventType === t;
                      return (
                        <button
                          key={t}
                          type="button"
                          role="radio"
                          aria-checked={selected}
                          onClick={() => setEventType(t)}
                          className={`rounded-full border px-5 py-2.5 font-sans text-sm transition-colors duration-300 ${
                            selected
                              ? "border-charcoal bg-charcoal text-ivory"
                              : "border-charcoal/25 text-charcoal hover:border-charcoal"
                          }`}
                        >
                          {t}
                        </button>
                      );
                    })}
                  </div>
                </div>

                <div className="grid gap-9 sm:grid-cols-2 sm:gap-8">
                  <Field label="Approximate date" htmlFor="date" optional>
                    <input
                      id="date"
                      name="date"
                      type="date"
                      className={`${inputClass} [color-scheme:light]`}
                    />
                  </Field>
                  <Field label="Number of guests" htmlFor="guests" optional>
                    <select
                      id="guests"
                      name="guests"
                      defaultValue=""
                      className={`${inputClass} appearance-none`}
                    >
                      <option value="">Select a range</option>
                      {GUESTS.map((g) => (
                        <option key={g} value={g}>
                          {g}
                        </option>
                      ))}
                    </select>
                    <svg
                      width="12"
                      height="12"
                      viewBox="0 0 12 12"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.2"
                      className="pointer-events-none absolute right-0 top-1/2 -translate-y-1/2 text-charcoal/60"
                      aria-hidden
                    >
                      <path d="M2 4l4 4 4-4" />
                    </svg>
                  </Field>
                </div>

                <Field label="Tell us about your vision" htmlFor="message">
                  <textarea
                    id="message"
                    name="message"
                    rows={4}
                    required
                    className={`${inputClass} resize-none`}
                  />
                </Field>

                <div className="flex flex-col items-start gap-5">
                  <button
                    type="submit"
                    disabled={status === "sending"}
                    className="bg-charcoal px-10 py-4 font-sans text-sm tracking-wide text-ivory transition-colors duration-500 hover:bg-gold hover:text-charcoal disabled:cursor-not-allowed disabled:opacity-60"
                  >
                    {status === "sending" ? "Sending…" : "Send enquiry"}
                  </button>

                  <p
                    role="alert"
                    aria-live="polite"
                    className="min-h-[1.25rem] font-sans text-sm text-red-700"
                  >
                    {status === "error" ? error : ""}
                  </p>
                </div>
              </motion.form>
            )}
          </AnimatePresence>
        </div>
      </div>
    </main>
  );
}