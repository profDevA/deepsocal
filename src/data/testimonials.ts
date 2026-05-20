export type Testimonial = {
  quote: string;
  name: string;
  company: string;
  role?: string;
  avatar?: string;
};

export const testimonials: Testimonial[] = [
  { name: "John Doe", company: "Forever a Surfer", quote: "DeepSoCal took our skate brand global without losing our roots. Sales grew 58% overseas in the first quarter." },
  { name: "Maya Chen", company: "Coral Health", quote: "They understood our mission from day one. The rebrand brought in 3x more community partnerships within six months." },
  { name: "Diego Reyes", company: "Salt & Sand", quote: "Our new identity connects with locals and tourists alike. Foot traffic is up 40% since the launch." },
  { name: "Priya Patel", company: "Land Watchers", quote: "The campaign turned our conservation data into stories people actually shared. Volunteer sign-ups doubled overnight." },
  { name: "Sam Carter", company: "OC Navigator", quote: "DeepSoCal helped us redesign the entire resource system. Residents now find services in half the time." },
];
