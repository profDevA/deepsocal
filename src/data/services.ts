import type { ServiceId } from "./case-studies";

export type Service = {
  id: ServiceId;
  name: string;
  description: string;
  longDescription: string;
  image: string;
};

export const services: Service[] = [
  {
    id: "brand-strategy",
    name: "Brand Strategy",
    description: "TBD — Fas to write",
    longDescription: "TBD",
    image: "/img/services/brand-strategy.jpg",
  },
  {
    id: "identity-systems",
    name: "Identity Systems",
    description: "TBD",
    longDescription: "TBD",
    image: "/img/services/identity-systems.jpg",
  },
  {
    id: "digital-experiences",
    name: "Digital Experiences",
    description: "TBD",
    longDescription: "TBD",
    image: "/img/services/digital-experiences.jpg",
  },
  {
    id: "next-gen-innovations",
    name: "Next-Gen Innovations",
    description: "TBD",
    longDescription: "TBD",
    image: "/img/services/next-gen-innovations.jpg",
  },
];

export const getServiceById = (id: ServiceId): Service | undefined =>
  services.find((s) => s.id === id);
