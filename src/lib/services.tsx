// Single source of truth for services. Used by the home grid, the Services page
// and the Contact form, so slugs, titles and images can never drift apart.
// All copy here is placeholder: edit freely.

export type Service = {
  id: number;
  slug: string; // used for /services#slug and /contact?service=slug
  title: string;
  category: string;
  eventType: string; // label shown in the Contact form
  desc: string; // short line (home grid)
  long: string; // paragraph (Services page)
  includes: string[];
  img: string;
};

const u = (id: string) =>
  `https://images.unsplash.com/${id}?auto=format&fit=crop&w=1200&q=80`;

export const services: Service[] = [
  {
    id: 1,
    slug: "corporate-summits",
    title: "Corporate Summits",
    category: "Business",
    eventType: "Corporate",
    desc: "Conferences, offsites and launches, produced end to end.",
    long: "Conferences, leadership offsites and product launches built around one clear idea, so the room works as hard as the agenda does.",
    includes: [
      "Concept, run of show and speaker flow",
      "Stage, lighting and AV production",
      "Venue sourcing and guest travel",
      "On-site team from load-in to wrap",
    ],
    img: u("photo-1540575467063-178a50c2df87"),
  },
  {
    id: 2,
    slug: "luxury-weddings",
    title: "Luxury Weddings",
    category: "Social",
    eventType: "Wedding",
    desc: "Multi-day celebrations designed entirely around the two of you.",
    long: "Celebrations designed around the two of you, from the first site visit to the last dance, whether it is one evening or three days.",
    includes: [
      "Full design and styling",
      "Florals, lighting and table scapes",
      "Vendor curation and coordination",
      "Guest hospitality and logistics",
    ],
    img: u("photo-1519741497674-611481863552"),
  },
  {
    id: 3,
    slug: "brand-activations",
    title: "Brand Activations",
    category: "Marketing",
    eventType: "Brand activation",
    desc: "Pop-ups and experiences that put a brand in people’s hands.",
    long: "Pop-ups, launches and immersive experiences that let people step inside a brand rather than just look at it.",
    includes: [
      "Experience concept and spatial design",
      "Fabrication and installation",
      "Guest journey and content capture",
      "Staffing and on-ground management",
    ],
    img: u("photo-1492684223066-81342ee5ff30"),
  },
  {
    id: 4,
    slug: "private-galas",
    title: "Private Galas",
    category: "Exclusive",
    eventType: "Private gala",
    desc: "Invitation-only evenings, from the guest list to the last dance.",
    long: "Invitation-only evenings where every detail, from guest flow to the lighting cue for the toast, is planned in advance.",
    includes: [
      "Theme and venue direction",
      "Entertainment and programming",
      "Catering and service design",
      "Guest flow and VIP hospitality",
    ],
    // The old Private Galas photo ID did not load; swap this for your own image.
    img: u("photo-1511795409834-ef04bbd61622"),
  },
];