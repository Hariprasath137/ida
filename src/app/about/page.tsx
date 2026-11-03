import type { Metadata } from "next";
import MaskLine from "@/components/animations/MaskLine";
import ImageReveal from "@/components/animations/ImageReveal";
import ArrowLink from "@/components/ui/ArrowLink";

export const metadata: Metadata = {
  title: "Philosophy | IDA Events",
  description:
    "IDA is a bespoke event design studio. Every texture, lighting cue and spatial arrangement is planned to be remembered.",
};

const principles = [
  {
    title: "Texture",
    text: "Fabric, finish and material chosen by hand, so the room feels as good as it looks.",
  },
  {
    title: "Light",
    text: "Every lighting cue is written into the evening, from the first arrival to the last song.",
  },
  {
    title: "Space",
    text: "We plan how guests move, gather and pause, so the layout does quiet work all night.",
  },
];

const facts = [
  { label: "Studio", value: "IDA Experiential Events" },
  { label: "Based in", value: "India, available worldwide" },
  { label: "Approach", value: "Bespoke, scaling from private galas to global arenas" },
];

const team = [
  {
    name: "Vikram Aditya",
    role: "Founder & Creative Director",
    image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=800&auto=format&fit=crop",
  },
  {
    name: "Ananya Sharma",
    role: "Head of Global Production",
    image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=800&auto=format&fit=crop",
  },
  {
    name: "Rahul Menon",
    role: "Technical Design Lead",
    image: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?q=80&w=800&auto=format&fit=crop",
  },
];

export default function About() {
  return (
    <main className="bg-[#fbf8f1]">
      {/* ---------- Header ---------- */}
      <header className="mx-auto max-w-7xl px-6 pb-20 pt-36 md:px-16 md:pb-28 md:pt-48">
        <h1 className="font-serif text-5xl leading-[1.02] text-[#2b2622] md:text-7xl lg:text-8xl">
          <MaskLine>An event should not</MaskLine>
          <MaskLine delay={0.1}>merely happen.</MaskLine>
          <MaskLine delay={0.2} innerClassName="italic text-[#c9a96e]">
            It should be remembered.
          </MaskLine>
        </h1>
      </header>

      {/* ---------- Story ---------- */}
      <section className="mx-auto grid max-w-7xl items-start gap-12 px-6 pb-24 md:px-16 md:pb-36 lg:grid-cols-12 lg:gap-20">
        <div className="lg:col-span-5">
          <ImageReveal
            src="https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?auto=format&fit=crop&w=1200&q=80"
            label="IDA Events Studio"
            aspect="aspect-[4/5]"
          />
        </div>

        <div className="lg:col-span-6 lg:col-start-7 lg:pt-10">
          <p className="font-serif text-3xl leading-[1.25] text-[#2b2622] md:text-4xl">
            IDA was born from a desire to elevate the standard of event
            design. We reject the generic.
          </p>

          <div className="mt-10 max-w-xl space-y-6 font-sans text-base font-light leading-[1.8] text-[#2b2622]/75 md:text-lg">
            <p>
              Whether it is an intimate luxury wedding, a high-stakes corporate summit, or a sprawling educational expo, we believe that an event should not merely happen; it should be experienced, felt, and remembered.
            </p>
            <p>
              As a premier creative studio, our approach is entirely bespoke. Every texture, every lighting cue, and every spatial arrangement is meticulously planned to create an immersive cinematic environment tailored to your unique narrative.
            </p>
          </div>

          <dl className="mt-14 max-w-xl border-t border-[#2b2622]/15">
            {facts.map((f) => (
              <div
                key={f.label}
                className="grid grid-cols-3 gap-4 border-b border-[#2b2622]/15 py-4"
              >
                <dt className="font-sans text-sm text-[#2b2622]/55">{f.label}</dt>
                <dd className="col-span-2 font-sans text-sm text-[#2b2622]">
                  {f.value}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      {/* ---------- Principles ---------- */}
      <section className="border-t border-[#2b2622]/15 bg-[#eae5d9]">
        <div className="mx-auto max-w-7xl px-6 py-24 md:px-16 md:py-32">
          <h2 className="max-w-3xl font-serif text-4xl leading-[1.05] text-[#2b2622] md:text-6xl">
            <MaskLine>Three things we never</MaskLine>
            <MaskLine delay={0.1}>leave to chance.</MaskLine>
          </h2>

          <div className="mt-16 grid gap-10 md:mt-24 md:grid-cols-3 md:gap-8">
            {principles.map((p) => (
              <div key={p.title} className="border-t border-[#2b2622]/20 pt-8">
                <h3 className="font-serif text-4xl text-[#2b2622] md:text-5xl">
                  {p.title}
                </h3>
                <p className="mt-5 max-w-xs font-sans text-sm font-light leading-relaxed text-[#2b2622]/70">
                  {p.text}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ---------- NEW: Behind the Scenes (Visual Break) ---------- */}
      <section className="relative w-full h-[60vh] md:h-[80vh] overflow-hidden">
        <div className="absolute inset-0 bg-black">
          <img 
            src="https://images.unsplash.com/photo-1511556532299-8f662fc26c06?q=80&w=2070&auto=format&fit=crop" 
            alt="Behind the scenes at IDA Events"
            className="w-full h-full object-cover opacity-60"
          />
        </div>
        <div className="absolute inset-0 flex items-center justify-center text-center px-6">
          <h2 className="font-serif text-4xl md:text-6xl lg:text-7xl text-white max-w-4xl leading-[1.1]">
            We thrive in the spaces where <span className="italic text-[#c9a96e]">art meets logistics.</span>
          </h2>
        </div>
      </section>

      {/* ---------- NEW: The Team ---------- */}
      <section className="mx-auto max-w-7xl px-6 py-24 md:px-16 md:py-36">
        <div className="mb-16 md:mb-24">
          <h2 className="font-sans text-[10px] font-semibold uppercase tracking-[0.3em] text-[#c9a96e] mb-4">
            Our People
          </h2>
          <p className="font-serif text-4xl md:text-6xl text-[#2b2622] max-w-2xl leading-[1.1]">
            The minds behind the magic.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-12 md:grid-cols-3 md:gap-8">
          {team.map((member, idx) => (
            <div key={idx} className="group">
              <div className="overflow-hidden mb-6 aspect-[3/4] rounded-sm bg-[#eae5d9]">
                <img 
                  src={member.image} 
                  alt={member.name} 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 grayscale group-hover:grayscale-0"
                />
              </div>
              <h3 className="font-serif text-2xl text-[#2b2622] mb-1">{member.name}</h3>
              <p className="font-sans text-xs uppercase tracking-widest text-[#2b2622]/60">{member.role}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ---------- Closing call ---------- */}
      <section className="mx-auto max-w-7xl px-6 pb-24 md:px-16 md:pb-36 border-t border-[#2b2622]/15 pt-24 md:pt-36">
        <div className="flex flex-col items-start justify-between gap-10 md:flex-row md:items-end">
          <h2 className="font-serif text-4xl leading-[1.05] text-[#2b2622] md:text-7xl">
            <MaskLine>Tell us what you’d</MaskLine>
            <MaskLine delay={0.1} innerClassName="italic text-[#c9a96e]">
              like to remember.
            </MaskLine>
          </h2>
          <div className="flex flex-col gap-6">
            <ArrowLink href="/contact">Start the conversation</ArrowLink>
            <ArrowLink href="/services">See what we design</ArrowLink>
          </div>
        </div>
      </section>
    </main>
  );
}