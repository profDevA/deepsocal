import type { ServiceId } from "./case-studies";

export type Service = {
  id: ServiceId;
  slug: ServiceId;
  name: string;
  description: string;
  longDescription: string;
  ctaLabel: string;
  themeColor: string;
  /** Hero image for service detail page. Optional — falls back to a tinted gradient. */
  heroImage?: string;
};

export const services: Service[] = [
  {
    id: "brand-strategy",
    slug: "brand-strategy",
    name: "Brand Strategy",
    description: "Brand systems built on community insight.",
    longDescription:
      "We approach marketing as community-building. Campaigns are shaped by how Southern California communities live and interact. By blending cultural insight with systems thinking, we design strategies that create participation, build credibility, and help brands grow as trusted parts of their communities.",
    ctaLabel: "Work With Us",
    themeColor: "#D9DDD1",
    heroImage: "/images/services/marketing-palm.jpg",
  },
  {
    id: "identity-systems",
    slug: "identity-systems",
    name: "Identity Systems",
    description: "Visual languages that scale with you.",
    longDescription:
      "We design identity systems that hold together across every surface — from packaging and signage to product and editorial. Built on cultural research and a Southern California sensibility, our systems scale with your brand without losing the specificity that makes it yours.",
    ctaLabel: "Work With Us",
    themeColor: "#F3D4C4",
    heroImage: "/images/services/design-hero.jpg",
  },
  {
    id: "digital-experiences",
    slug: "digital-experiences",
    name: "Digital Experiences",
    description: "Useful tools for real local needs.",
    longDescription:
      "We build digital products that meet people where they are. From civic platforms to commerce experiences, we pair research-led design with modern engineering so the tools we ship feel inevitable to the communities that use them.",
    ctaLabel: "Work With Us",
    themeColor: "#CCDCDB",
    heroImage: "/images/services/research-composite-accent.png",
  },
  {
    id: "next-gen-innovations",
    slug: "next-gen-innovations",
    name: "Next-Gen Innovations",
    description: "AI, climate, and emerging-tech work.",
    longDescription:
      "We partner with teams exploring AI, climate adaptation, and emerging technology in service of Southern California. Our work translates new capability into things people can actually use — never tech for its own sake, always grounded in regional context.",
    ctaLabel: "Work With Us",
    themeColor: "#DBD3E7",
    heroImage: "/images/slide-2-ochealth.jpg",
  },
];

export const getServiceById = (id: ServiceId): Service | undefined =>
  services.find((s) => s.id === id);
