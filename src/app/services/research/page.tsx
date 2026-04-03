import type { Metadata } from "next";
import ServicePageLayout from "@/components/services/ServicePageLayout";
import Image from "next/image";

export const metadata: Metadata = {
  title: "Research",
  description: "Research-driven insights for strategic decision making in Southern California.",
};

export default function ResearchPage() {
  return (
    <ServicePageLayout
      heading="Research"
      description="Our research practice combines academic rigor with real-world application. We uncover the insights that matter most to your audience and your business, informing strategies that are grounded in evidence and empathy."
      heroImages={
        <Image src="/images/services/research-composite-accent.png" alt="Research" className="w-full" width={1400} height={525} style={{ width: "100%", height: "auto" }} />
      }
      categories={[
        { number: "01", title: "USER RESEARCH", description: "Understanding your audience through interviews, surveys, and ethnographic studies that reveal unmet needs and hidden opportunities." },
        { number: "02", title: "MARKET ANALYSIS", description: "Mapping competitive landscapes and identifying opportunities for differentiation in Southern California's unique market." },
        { number: "03", title: "DATA STRATEGY", description: "Building frameworks for collecting, analyzing, and acting on meaningful data that drives business decisions." },
        { number: "04", title: "COMMUNITY INSIGHTS", description: "Engaging with local communities to understand needs, behaviors, and aspirations that inform authentic brand strategies." },
        { number: "05", title: "IMPACT MEASUREMENT", description: "Designing systems to track and communicate the real-world impact of your work across communities." },
      ]}
      embeddedAlly={{
        body: "Guided by Systems Thinking, we don\u2019t just build audiences; we cultivate regional ecosystems. We use Deep Context and culturally relevant storytelling to turn passive followers into active participants.",
        body2: "What if you could prepare for tomorrow\u2019s opportunities today?",
        prompt: "...I need help in",
        buttonText: "Strategic Advantage",
        dropdownItems: ["Ethnographic Research", "Future Scenario Planning", "Community Impact Assessment"],
      }}
    />
  );
}
