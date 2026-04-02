import type { Metadata } from "next";
import ServicePageLayout from "@/components/services/ServicePageLayout";

export const metadata: Metadata = {
  title: "AI Strategy + Integration",
  description: "AI strategy and integration services for forward-thinking SoCal organizations.",
};

export default function AIStrategyPage() {
  return (
    <ServicePageLayout
      heading="AI Strategy + Integration"
      description="We move beyond the hype to identify high-impact AI opportunities tailored to your business. Our AI practice helps organizations navigate the rapidly evolving landscape of artificial intelligence with practical, measurable results."
      heroImages={
        <img src="/images/services/oc-navigator.png" alt="AI Strategy" className="w-full" />
      }
      categories={[
        { number: "01", title: "AI READINESS<br/>ASSESSMENT", description: "Evaluating your organization's data, infrastructure, and culture for successful AI adoption." },
        { number: "02", title: "STRATEGY<br/>DEVELOPMENT", description: "Creating actionable AI roadmaps that align with your business objectives and competitive landscape." },
        { number: "03", title: "IMPLEMENTATION", description: "Integrating AI solutions into your existing workflows and systems with minimal disruption." },
        { number: "04", title: "TRAINING &<br/>ENABLEMENT", description: "Empowering your team with the knowledge and skills to leverage AI tools effectively." },
        { number: "05", title: "ETHICS &<br/>GOVERNANCE", description: "Establishing responsible AI frameworks that protect your brand and your customers." },
      ]}
      embeddedAlly={{
        body: "Guided by Systems Thinking, we don\u2019t just build audiences; we cultivate regional ecosystems. We use Deep Context and culturally relevant storytelling to turn passive followers into active participants. Deep SoCal tracks the Impact KPIs that actually move your business forward, proving your value to the region and driving sustainable growth.",
        prompt: "...I need help in",
        buttonText: "Future-proofing",
        dropdownItems: ["AI Strategy & Roadmapping", "AI Strategy & Systems Integration", "Creative AI & Brand Experience", "AI Innovation & Future Scenario Planning"],
      }}
    />
  );
}
