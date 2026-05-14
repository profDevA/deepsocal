export type Testimonial = {
  quote: string;
  name: string;
  company: string;
  role?: string;
  avatar?: string;
};

const placeholderQuote =
  "DeepSoCal took our skate brand global without losing our roots. Sales grew 58% overseas in the first quarter.";

export const testimonials: Testimonial[] = [
  { name: "John Doe", company: "Forever a Surfer", quote: placeholderQuote },
  { name: "Maya Chen", company: "Coral Health", quote: placeholderQuote },
  { name: "Diego Reyes", company: "Salt & Sand", quote: placeholderQuote },
  { name: "Priya Patel", company: "Land Watchers", quote: placeholderQuote },
  { name: "Sam Carter", company: "OC Navigator", quote: placeholderQuote },
];
