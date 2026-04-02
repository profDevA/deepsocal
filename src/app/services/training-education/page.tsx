import type { Metadata } from "next";
import ServicePageLayout from "@/components/services/ServicePageLayout";

export const metadata: Metadata = {
  title: "Training & Education",
  description: "Professional training and education programs for SoCal organizations.",
};

export default function TrainingEducationPage() {
  return (
    <ServicePageLayout
      heading="Training &amp; Education"
      description="Our training programs empower organizations and individuals with the skills they need to thrive. From design thinking workshops to AI literacy programs, we create learning experiences that drive real capability building."
      heroImages={
        <img src="/images/services/design-screenshot.png" alt="Training & Education" className="w-full" />
      }
      categories={[
        { number: "01", title: "DESIGN THINKING<br/>WORKSHOPS", description: "Hands-on sessions that teach teams to approach challenges with creativity and empathy." },
        { number: "02", title: "AI LITERACY<br/>PROGRAMS", description: "Demystifying AI for non-technical teams to drive informed decision-making across your organization." },
        { number: "03", title: "BRAND TRAINING", description: "Ensuring brand consistency by training your team on brand guidelines, voice, and visual standards." },
        { number: "04", title: "RESEARCH METHODS", description: "Teaching practical research techniques for gathering actionable insights from your audience." },
        { number: "05", title: "LEADERSHIP<br/>DEVELOPMENT", description: "Building creative leadership capacity for organizations driving community impact." },
      ]}
      embeddedAlly={{
        body: "Guided by Systems Thinking, we don\u2019t just build audiences; we cultivate regional ecosystems. We create curricula that transform how you gather insights, ensuring your future product decisions are grounded in validated human behavior rather than assumptions.",
        prompt: "...I need help in",
        buttonText: "building internal capacity",
        dropdownItems: ["Co-Designing Workshops", "Research & Design", "Social Media Marketing", "AI Integration & Design Strategy"],
      }}
    />
  );
}
