export type Company = {
  name: string;
  logo?: string;
  url?: string;
};

export const companies: Company[] = [
  { name: "OC Navigator", logo: "/images/marquee-oc-navigator.svg" },
  { name: "DC Shoes", logo: "/images/marquee-dc.svg" },
  { name: "Galderma", logo: "/images/marquee-galderma.svg" },
  { name: "University of Utah", logo: "/images/marquee-utah.svg" },
  { name: "Carnegie Mellon", logo: "/images/marquee-carnegie.svg" },
  { name: "OC Links", logo: "/images/marquee2-oclinks.svg" },
  { name: "Meta", logo: "/images/marquee2-meta.svg" },
  { name: "Med USA", logo: "/images/marquee2-med.svg" },
  { name: "MIT", logo: "/images/marquee2-mit.svg" },
  { name: "BYU", logo: "/images/marquee2-byu.svg" },
  { name: "ZNet", logo: "/images/marquee2-znet.svg" },
];
