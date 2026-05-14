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
