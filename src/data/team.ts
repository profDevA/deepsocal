export type TeamMember = {
  name: string;
  role: string;
  bio: string;
  avatar: string;
  skills: string[];
  social?: {
    linkedin?: string;
    twitter?: string;
    github?: string;
  };
};

/**
 * Leadership / featured team members. Rendered above the discipline groups
 * on the About page when present.
 */
export const leadership: TeamMember[] = [
  {
    name: "Dr. Fas Lebbie",
    role: "Founder & Chief Strategist",
    bio: "Former Head of Design at Frankie. Teaches design at Carnegie Mellon. Based in Southern California.",
    avatar: "/images/about/ceo.png",
    skills: ["Strategy", "Design Leadership", "Research"],
  },
];

export type TeamGroup = {
  id: string;
  name: string;
  members: string[];
};

/**
 * Discipline groupings rendered on the About page.
 * Members list intentionally short while team scales — partner network is
 * additive (per 5/18 dev-network decision, see `business-terms.md`).
 */
export const teamGroups: TeamGroup[] = [
  {
    id: "design",
    name: "Design",
    members: ["Israel Adeniji", "+ partner network"],
  },
  {
    id: "development",
    name: "Development",
    members: ["Xiang Chen", "+ partner network"],
  },
  {
    id: "strategy",
    name: "Strategy",
    members: ["Dr. Fas Lebbie", "+ advisory partners"],
  },
  {
    id: "research",
    name: "Research",
    members: ["Dr. Fas Lebbie", "+ Carnegie Mellon collaborators"],
  },
  {
    id: "operations",
    name: "Operations",
    members: ["+ hiring"],
  },
];
