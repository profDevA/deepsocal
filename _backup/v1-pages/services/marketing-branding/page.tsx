import type { Metadata } from "next";
import ServicePageLayout from "@/components/services/ServicePageLayout";
import Image from "next/image";

export const metadata: Metadata = {
  title: "Marketing + Branding",
  description: "Strategic marketing and branding services for Southern California brands.",
};

export default function MarketingBrandingPage() {
  return (
    <ServicePageLayout
      heading="MARKETING &nbsp; + Branding"
      description="Our approach unites core offerings across Social Media Management, Always-on Content, and Paid Media & Analytics. This end-to-end strategy provides a holistic way to increase brand affinity, build community engagement, and reach new audiences."
      heroImages={
        <div className="relative w-full max-w-[1396px] mx-auto bg-brand overflow-hidden aspect-1396/657">
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <Image src="/images/services/marketing-palm.jpg" alt="" className="absolute left-1/2 top-[46%] -translate-x-1/2 -translate-y-1/2 object-cover max-w-none" width={1644} height={525} style={{ width: "118%", height: "86%" }} />
          </div>
          <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
            <Image src="/images/services/marketing-shirt.png" alt="" className="absolute left-[-97.49%] top-[-127.75%] max-w-none" width={800} height={800} style={{ width: "297.03%", height: "351.03%" }} />
          </div>
        </div>
      }
      categories={[
        { number: "01", title: "BRAND STRATEGY", description: "We clarify your role in the regional ecosystem, using deep cultural research to make your mission essential to Southern California's future. This ensures your brand stays resilient and relevant amidst the region's social and economic shifts." },
        { number: "02", title: "BRAND ARCHITECTURE<br/>& POSITIONING", description: "We apply systems thinking to organize complex portfolios into clear frameworks that reduce friction and guide user understanding. Our approach removes redundancy and creates seamless and intuitive navigation." },
        { number: "03", title: "VISUAL IDENTITY", description: "We move beyond aesthetics to create accessible, adaptive design languages that function flawlessly across digital interfaces and physical environments." },
        { number: "04", title: "CONTENT STRATEGY/<br/>EMAIL MARKETING", description: "We architect regional narratives that transform your brand from an outsider into an Embedded Ally, driving participation within the community. We ground your messaging in the lived reality of local neighborhoods." },
        { number: "05", title: "DIGITAL PRESENCE &<br/>SOCIAL MEDIA", description: "We build organic communities where your brand becomes a trusted participant in Southern California's digital ecosystem, turning casual interest into deep and meaningful connections." },
      ]}
      embeddedAlly={{
        body: "Guided by Systems Thinking, we don\u2019t just build audiences; we cultivate regional ecosystems. We use Deep Context and culturally relevant storytelling to turn passive followers into active participants.",
        body2: "See how we can help with your marketing needs.",
        prompt: "...I need help",
        buttonText: "For Authentic Growth",
        dropdownItems: ["Brand Strategy", "Brand Architecture & Positioning", "Visual Identity", "Content Strategy / Email Marketing", "Digital Marketing & Growth"],
      }}
    />
  );
}
