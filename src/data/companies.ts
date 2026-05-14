export type Company = {
  name: string;
  logo: string;
  url?: string;
};

export const companies: Company[] = [
  { name: "Navigator", logo: "/img/companies/navigator.svg" },
  { name: "Galderma", logo: "/img/companies/galderma.svg" },
  { name: "Carnegie Mellon University", logo: "/img/companies/cmu.svg" },
  { name: "NYU", logo: "/img/companies/nyu.svg" },
  { name: "Med USA", logo: "/img/companies/med-usa.svg" },
];
