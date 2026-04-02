import type { Metadata } from "next";
import ServicePageLayout from "@/components/services/ServicePageLayout";

export const metadata: Metadata = {
  title: "Design",
  description: "Strategic design services creating transformative experiences for SoCal brands.",
};

export default function DesignPage() {
  return (
    <ServicePageLayout
      heading="Design"
      description="We design experiences that move people. From digital products to physical spaces, our design practice is rooted in research, strategy, and a deep understanding of Southern California's unique cultural landscape."
      heroImages={
        <div className="relative">
          <img src="/images/services/design-hero.jpg" alt="Design" className="w-full" />
          <div className="absolute bottom-[5%] right-[5%]">
            <img src="/images/services/design-screenshot.png" alt="" style={{ width: "clamp(200px, 30vw, 500px)" }} />
          </div>
        </div>
      }
      categories={[
        { number: "01", title: "UI/UX DESIGN", description: "Creating intuitive, beautiful digital experiences that delight users and drive business goals." },
        { number: "02", title: "PRODUCT DESIGN", description: "Designing digital products from concept to launch with a focus on user needs and market fit." },
        { number: "03", title: "VISUAL DESIGN", description: "Crafting visual systems and assets that communicate your brand with clarity and impact." },
        { number: "04", title: "EXPERIENCE DESIGN", description: "Designing end-to-end experiences across digital and physical touchpoints." },
        { number: "05", title: "DESIGN SYSTEMS", description: "Building scalable design systems that ensure consistency and efficiency across your organization." },
      ]}
      embeddedAlly={{
        body: "Guided by Systems Thinking, we don\u2019t just build audiences; we cultivate regional ecosystems. Design shapes how people experience your brand every day. We don\u2019t just polish surfaces; we engineer systems.",
        body2: "Ready to create interactions that flow effortlessly?",
        prompt: "...I need help in",
        buttonText: "Creating lasting impact",
        dropdownItems: ["Transition Design", "UX & Interaction Design", "UI Design", "User Research & Testing", "Motion Design", "Training & Education"],
      }}
    />
  );
}
