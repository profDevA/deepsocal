import type { Metadata } from "next";
import { teamGroups } from "@/data/team";
import { faqValueTags } from "@/data/faqs";
import FAQAccordion from "@/components/about/FAQAccordion";
import ContactCTAButton from "@/components/modals/ContactCTAButton";

export const metadata: Metadata = {
  title: "About",
  description:
    "DeepSoCal is a multidisciplinary team of researchers, designers, engineers, and systems thinkers based in Southern California.",
};

const approachPillars = [
  {
    id: "digital-strategy",
    title: "Digital\nStrategy",
    color: "#D9DDD1",
    items: [
      "Audience research",
      "Channel architecture",
      "Roadmaps & rituals",
    ],
  },
  {
    id: "content-influencers",
    title: "Content &\nInfluencers",
    color: "#F5B086",
    items: [
      "Editorial systems",
      "Always-on production",
      "Trusted creator partnerships",
    ],
  },
  {
    id: "paid-media",
    title: "Paid Media\n& Analytics",
    color: "#CCDCDB",
    items: [
      "Performance media",
      "Attribution & dashboards",
      "Local market testing",
    ],
  },
] as const;

export default function AboutPage() {
  return (
    <div className="bg-[#e6e6e6] w-full">
      <section className="w-full px-[clamp(20px,4vw,80px)] pt-[clamp(40px,6vw,80px)] pb-[clamp(40px,5vw,60px)]">
        <div className="max-w-[1380px] mx-auto flex flex-col items-center gap-[clamp(24px,4vw,49px)] text-center">
          <h1 className="font-bangers text-dark text-[clamp(40px,7vw,96px)] leading-[0.94] tracking-[clamp(1.5px,0.3vw,2.88px)] uppercase m-0 max-w-[799px]">
            The best social narratives are success stories
          </h1>
          <p className="font-inter text-dark text-[16px] leading-[20px] tracking-[0.48px] max-w-[703px] m-0">
            Our core offerings across Social Media Management, Always-on
            Content, and Paid Media &amp; Analytics. This end-to-end strategy
            provides a holistic way to increase brand affinity, build community
            engagement, and reach new audiences.
          </p>
          <ContactCTAButton label="Discover our approach" />
        </div>
      </section>

      <section className="w-full px-[clamp(20px,4vw,80px)] pb-[clamp(40px,6vw,80px)]">
        <div
          className="max-w-[1380px] mx-auto aspect-1358/725 rounded-[clamp(20px,2.5vw,30px)] overflow-hidden relative"
          style={{
            backgroundImage:
              "linear-gradient(140deg, #D9DDD1 0%, #c8c8c8 50%, #5E5E5E 100%)",
          }}
        >
          <div
            className="absolute inset-0 opacity-20 mix-blend-overlay"
            style={{
              backgroundImage:
                "repeating-linear-gradient(45deg, transparent 0 18px, rgba(255,255,255,0.2) 18px 20px)",
            }}
          />
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="font-bangers text-white/30 text-[clamp(40px,6vw,80px)] tracking-[2px] uppercase select-none">
              Studio image
            </span>
          </div>
        </div>
      </section>

      <section className="w-full px-[clamp(20px,4vw,80px)] py-[clamp(40px,6vw,80px)]">
        <div className="max-w-[1380px] mx-auto grid grid-cols-1 md:grid-cols-[1fr_2fr] gap-[clamp(32px,5vw,80px)] items-start md:divide-x md:divide-dark">
          <div className="md:pr-[clamp(20px,3vw,60px)] flex flex-col gap-6">
            <h2 className="font-bangers text-dark text-[clamp(48px,8vw,96px)] leading-[1] tracking-[2.88px] uppercase m-0">
              team
            </h2>
            <p className="font-inter text-dark text-[16px] leading-[20px] tracking-[0.48px] max-w-[510px] m-0">
              Based in Southern California, our multidisciplinary team of
              researchers, designers, engineers, and systems thinkers helps
              businesses grow with purpose. We design strategies that strengthen
              communities and bring creativity and technology together to drive
              systemic change.
            </p>
          </div>

          <div className="md:pl-[clamp(20px,3vw,60px)] grid grid-cols-2 lg:grid-cols-3 gap-x-[clamp(20px,2vw,32px)] gap-y-[clamp(32px,4vw,48px)]">
            {teamGroups.map((group) => (
              <div key={group.id} className="flex flex-col gap-[clamp(12px,1.5vw,18px)]">
                <h3 className="font-bangers text-dark text-[clamp(16px,1.6vw,18px)] leading-[1.2] tracking-[0.36px] uppercase m-0">
                  {group.name}
                </h3>
                <ul className="flex flex-col gap-[8px] list-none p-0 m-0">
                  {group.members.map((m) => (
                    <li
                      key={m}
                      className="font-inter text-dark text-[15px] leading-[1.4] tracking-[0.45px]"
                    >
                      {m}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="w-full px-[clamp(20px,4vw,80px)] py-[clamp(40px,6vw,80px)] border-t border-dark">
        <div className="max-w-[1380px] mx-auto flex flex-col items-center gap-[clamp(24px,3vw,40px)] text-center">
          <h2 className="font-bangers text-dark text-[clamp(36px,5vw,64px)] leading-[1] tracking-[1.92px] uppercase m-0 max-w-[995px]">
            Trivision approach, singular
          </h2>
          <p className="font-inter text-dark text-[16px] leading-[20px] tracking-[0.48px] max-w-[919px] m-0">
            We&apos;re not a remote agency, we&apos;re your neighbors. Our
            social media shows our deep understanding of Orange County&apos;s
            economic, social, and operational landscape allows us to design
            solutions grounded in regional reality. Our work helps your brand
            build:
          </p>
        </div>
      </section>

      <section className="w-full px-[clamp(20px,4vw,80px)] pb-[clamp(40px,6vw,80px)]">
        <div className="max-w-[1380px] mx-auto flex flex-col gap-[clamp(32px,4vw,60px)]">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-[clamp(24px,3vw,40px)]">
            {approachPillars.map((pillar) => (
              <div key={pillar.id} className="flex flex-col gap-3">
                <h3 className="font-bangers text-dark text-[clamp(28px,3vw,40px)] leading-[1] tracking-[1.5px] uppercase m-0 whitespace-pre-wrap">
                  {pillar.title}
                </h3>
                <div
                  className="aspect-square rounded-[clamp(16px,2vw,24px)] border border-[#b0b0b0] shadow-[0_5px_20px_rgba(0,0,0,0.08)] p-[clamp(20px,3%,28px)] flex flex-col justify-end gap-3 relative overflow-hidden"
                  style={{ backgroundColor: pillar.color }}
                >
                  <div
                    className="absolute inset-0 opacity-15 mix-blend-multiply"
                    style={{
                      backgroundImage:
                        "repeating-linear-gradient(45deg, transparent 0 14px, rgba(0,0,0,0.06) 14px 16px)",
                    }}
                  />
                  <ul className="relative flex flex-col gap-1 list-none p-0 m-0">
                    {pillar.items.map((item) => (
                      <li
                        key={item}
                        className="font-inter font-medium text-dark text-[clamp(14px,1.4vw,16px)] leading-[1.4] tracking-[-0.2px]"
                      >
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>

          <div className="flex flex-wrap items-center justify-center gap-[8px]">
            {faqValueTags.map((tag) => (
              <span
                key={tag}
                className="font-inter text-dark text-[14px] leading-[1.2] tracking-[0.4px] bg-white/70 border border-dark/15 px-3 py-2 whitespace-nowrap"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </section>

      <section className="w-full px-[clamp(20px,4vw,80px)] pb-[clamp(60px,8vw,120px)]" id="faqs">
        <div className="max-w-[1380px] mx-auto border-t border-dark pt-[clamp(40px,5vw,60px)] grid grid-cols-1 md:grid-cols-[1fr_2fr] gap-[clamp(24px,4vw,60px)] items-start md:divide-x md:divide-dark">
          <div className="md:pr-[clamp(20px,3vw,60px)] flex flex-col gap-4">
            <h2 className="font-bangers text-dark text-[clamp(40px,5vw,53px)] leading-[1] tracking-[1.59px] uppercase m-0">
              FAQS
            </h2>
            <p className="font-inter text-dark text-[16px] leading-[20px] tracking-[0.48px] max-w-[324px] m-0">
              Need-to-knows, nice-to-knows, and everything in between.
            </p>
          </div>

          <div className="md:pl-[clamp(20px,3vw,60px)]">
            <FAQAccordion />
          </div>
        </div>
      </section>
    </div>
  );
}
