export type FAQCategory =
  | "connection"
  | "collective-events"
  | "workshops"
  | "local-tools"
  | "global-trends"
  | "embedded-allies"
  | "solutions";

export type FAQ = {
  category: FAQCategory;
  question: string;
  answer: string;
};

export const faqs: FAQ[] = [];

export const faqCategoryLabels: Record<FAQCategory, string> = {
  connection: "Connection",
  "collective-events": "Collective Events",
  workshops: "Workshops",
  "local-tools": "Local Tools",
  "global-trends": "Global Trends",
  "embedded-allies": "Embedded Allies",
  solutions: "Solutions Curatorial Concierge",
};
