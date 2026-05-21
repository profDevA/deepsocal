export type TeamGroup = {
  id: string;
  name: string;
  members: string[];
};

export const teamGroups: TeamGroup[] = [
  {
    id: "design-team",
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
