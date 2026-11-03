import type { Metadata } from "next";
import { services } from "@/lib/services";
import MaskLine from "@/components/animations/MaskLine";
import ImageReveal from "@/components/animations/ImageReveal";
import ArrowLink from "@/components/ui/ArrowLink";

export const metadata: Metadata = {
  title: "Capabilities | IDA Events",
  description:
    "Corporate summits, luxury weddings, brand activations and private galas, designed and produced end to end.",
};

const steps = [
  {
    title: "Listen",
    text: "We start with your brief, your guests and the feeling you want the evening to leave behind.",
  },
  {
    title: "Design",
    text: "Concept, spatial plans and moodboards, refined with you until every choice has a reason.",
  },
  {
    title: "Produce",
    text: "Our team builds, sources and rehearses, so nothing on the day is improvised.",
  },
  {
    title: "Host",
    text: "We run the event on site, from load-in to the last guest, while you enjoy it.",
  },
];

export default function Services() {
  return (
    <main>
      {/* ---------- Header ---------- */}
      <header className="mx-auto grid max-w-7xl gap-8 px-6 pb-20 pt-36 md:grid-cols-12 md:items-end md:px-16 md:pb-28 md:pt-48">
        <h1 className="font-serif text-5xl leading-[1.02] text-charcoal md:col-span-8 md:text-7xl lg:text-8xl">
          <MaskLine>Everything an event needs,</MaskLine>
          <MaskLine delay={0.1} innerClassName="italic text-gold">
            designed as one thing.
          </MaskLine>
        </h1>
        <p className="max-w-sm font-sans text-sm font-light leading-relaxed text-charcoal/70 md:col-span-4 md:justify-self-end md:text-base">
          From concept to flawless execution, we offer comprehensive event
          design and production for four kinds of occasion.
        </p>
      </header>

      {/* ---------- Services ---------- */}
      {services.map((svc, i) => {
        const flip = i % 2 === 1;
        return (
          <section
            key={svc.id}
            id={svc.slug}
            className="scroll-mt-28 border-t border-charcoal/15"
          >
            <div className="mx-auto grid max-w-7xl items-start gap-10 px-6 py-20 md:px-16 md:py-32 lg:grid-cols-12 lg:gap-20">
              <div className={`lg:col-span-7 ${flip ? "lg:order-2" : ""}`}>
                <ImageReveal
                  src={svc.img}
                  label={svc.title}
                  aspect="aspect-[4/5]"
                />
              </div>

              <div
                className={`lg:sticky lg:top-36 lg:col-span-5 ${
                  flip ? "lg:order-1" : ""
                }`}
              >
                <span className="inline-block rounded-full border border-charcoal/20 px-3 py-1 font-sans text-xs text-charcoal/70">
                  {svc.category}
                </span>

                <h2 className="mt-6 font-serif text-4xl leading-[1.05] text-charcoal md:text-6xl">
                  <MaskLine>{svc.title}</MaskLine>
                </h2>

                <p className="mt-6 max-w-md font-sans text-base font-light leading-relaxed text-charcoal/75">
                  {svc.long}
                </p>

                <ul className="mt-10 border-t border-charcoal/15">
                  {svc.includes.map((item) => (
                    <li
                      key={item}
                      className="border-b border-charcoal/15 py-4 font-sans text-sm text-charcoal/80"
                    >
                      {item}
                    </li>
                  ))}
                </ul>

                <div className="mt-10">
                  <ArrowLink href={`/contact?service=${svc.slug}`}>
                    Enquire about {svc.title.toLowerCase()}
                  </ArrowLink>
                </div>
              </div>
            </div>
          </section>
        );
      })}

      {/* ---------- Process (a real sequence, so numbered) ---------- */}
      <section className="border-t border-charcoal/15 bg-stone">
        <div className="mx-auto max-w-7xl px-6 py-24 md:px-16 md:py-32">
          <h2 className="max-w-3xl font-serif text-4xl leading-[1.05] text-charcoal md:text-6xl">
            <MaskLine>How an evening goes from</MaskLine>
            <MaskLine delay={0.1}>idea to guest list.</MaskLine>
          </h2>

          <ol className="mt-16 grid gap-10 md:mt-24 md:grid-cols-4 md:gap-8">
            {steps.map((s, i) => (
              <li key={s.title} className="border-t border-charcoal/20 pt-6">
                <span className="font-serif text-2xl text-gold">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="mt-6 font-serif text-3xl text-charcoal">
                  {s.title}
                </h3>
                <p className="mt-3 max-w-xs font-sans text-sm font-light leading-relaxed text-charcoal/70">
                  {s.text}
                </p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* ---------- Closing call ---------- */}
      <section className="mx-auto max-w-7xl px-6 py-24 md:px-16 md:py-36">
        <div className="flex flex-col items-start justify-between gap-10 md:flex-row md:items-end">
          <h2 className="font-serif text-4xl leading-[1.05] text-charcoal md:text-7xl">
            <MaskLine>Have a date in mind?</MaskLine>
            <MaskLine delay={0.1} innerClassName="italic text-gold">
              Let’s talk it through.
            </MaskLine>
          </h2>
          <ArrowLink href="/contact">Start the conversation</ArrowLink>
        </div>
      </section>
    </main>
  );
}