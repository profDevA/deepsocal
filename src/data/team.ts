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

export const team: TeamMember[] = [];

export type TeamGroup = {
  id: string;
  name: string;
  members: string[];
};

// Placeholder names from Figma — replace with real team
export const teamGroups: TeamGroup[] = [
  {
    id: "design",
    name: "Design team",
    members: ["Bruce Torphy", "Sonia Kessler", "Taylor Lehner"],
  },
  {
    id: "marketing",
    name: "Marketing",
    members: ["Bruce Torphy", "Sonia Kessler", "Taylor Lehner"],
  },
  {
    id: "development",
    name: "Development",
    members: ["Bruce Torphy", "Sonia Kessler", "Taylor Lehner"],
  },
  {
    id: "research",
    name: "Research",
    members: ["Bruce Torphy", "Sonia Kessler", "Taylor Lehner"],
  },
  {
    id: "branding",
    name: "Branding",
    members: ["Bruce Torphy", "Sonia Kessler", "Taylor Lehner"],
  },
];
