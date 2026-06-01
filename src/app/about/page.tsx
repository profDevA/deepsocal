import type { Metadata } from "next";
import Image from "next/image";
import { teamGroups } from "@/data/team";
import FAQAccordion from "@/components/about/FAQAccordion";
import ContactCTAButton from "@/components/modals/ContactCTAButton";
import PageFrame from "@/components/layout/PageFrame";

const communityValueTags = [
  "Connection",
  "Collective Growth",
  "Belonging",
  "Local Pride",
  "Shared Values",
  "Diversity",
  "Everyday Lifestyle",
  "Creative Expression",
];

export const metadata: Metadata = {
  title: "About",
  description:
    "DeepSoCal is a multidisciplinary team of researchers, designers, engineers, and systems thinkers based in Southern California.",
};

type GridImage = { src: string; alt: string; instagram?: boolean };

const gridImages: GridImage[] = [
  { src: "/images/about/grid-community-1.png", alt: "" },
  {
    src: "/images/about/grid-instagram-slide.png",
    alt: "",
    instagram: true,
  },
  { src: "/images/about/grid-community-2.png", alt: "" },
  { src: "/images/about/grid-handsome-man.png", alt: "" },
  { src: "/images/about/grid-malibu.png", alt: "" },
  { src: "/images/about/grid-community-3.png", alt: "" },
];

export default function AboutPage() {
  return (
    <div className="w-full">
      <PageFrame />

      {/* HERO — heading + description + image + CTA */}
      <section className="w-full px-[20px] pt-[48px] pb-[40px] lg:px-[40px] lg:pt-[80px] lg:pb-[60px] flex flex-col items-center">
        <div className="w-full max-w-[1380px] flex flex-col items-center gap-[17px] lg:gap-[49px] text-center">
          <h1 className="font-acumin-condensed text-dark text-[38px] leading-[39px] tracking-[1.14px] lg:text-[96px] lg:leading-[90px] lg:tracking-[2.88px] uppercase m-0 max-w-[799px]">
            socal-local
          </h1>
          <p className="font-inter text-dark text-[14px] leading-[16px] lg:text-[16px] lg:leading-[20px] tracking-[0.48px] max-w-[350px] lg:max-w-[703px] m-0">
            Our core offerings across Social Media Management, Always-on
            Content, and Paid Media &amp; Analytics. This end-to-end strategy
            provides a holistic way to increase brand affinity, build community
            engagement, and reach new audiences.
          </p>
        </div>

        <div className="w-full max-w-[1358px] mt-[46px] lg:mt-[49px] aspect-357/290 lg:aspect-1358/725 overflow-hidden relative bg-[#1f1f1f]">
          <Image
            src="/images/about/hero-socal-local.png"
            alt="Southern California coastline"
            fill
            priority
            sizes="(max-width: 1380px) 100vw, 1358px"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-[rgba(230,230,230,0.1)]" />
        </div>

        <ContactCTAButton
          label="Discover Our Approach"
          className="mt-[46px] lg:mt-[80px] font-acumin-condensed bg-dark text-white text-[18px] leading-normal tracking-normal w-[201px] h-[43px] inline-flex items-center justify-center cursor-pointer transition-colors hover:bg-[#333] border-none"
        />

        <h2 className="mt-[64px] lg:mt-[128px] font-acumin-condensed text-dark text-[32px] leading-[30px] tracking-[0.96px] lg:text-[42px] lg:leading-[50px] lg:tracking-[1.26px] uppercase m-0 max-w-[356px] lg:max-w-[1164px] text-center">
          WE ARE Designers and researchers shaping Southern California&rsquo;s
          future through community and impact.
        </h2>
      </section>

      {/* TEAM */}
      <section className="w-full">
        <div className="border-t border-b border-dark mx-[20px] py-[40px] lg:mx-[25px] lg:py-[60px]">
          <div className="max-w-[1395px] mx-auto grid grid-cols-1 lg:grid-cols-[421px_1fr] gap-[40px] lg:gap-[173px] items-start">
            <div className="flex flex-col gap-[24px]">
              <h2 className="font-acumin-condensed text-dark text-[43px] leading-[50px] tracking-[1.29px] uppercase m-0">
                team
              </h2>
              <p className="font-inter text-dark text-[14px] leading-[20px] lg:text-[16px] tracking-[0.42px] lg:tracking-[0.48px] max-w-[510px] m-0">
                Based in Southern California, our multidisciplinary team of
                researchers, designers, engineers, and systems thinkers helps
                businesses grow with purpose. We design strategies that
                strengthen communities and bring creativity and technology
                together to drive systemic change.
              </p>
            </div>

            <div className="lg:border-l lg:border-dark lg:pl-[89px]">
              <div className="grid grid-cols-2 lg:grid-cols-3 gap-x-[40px] lg:gap-x-[21px] gap-y-[28px] lg:gap-y-[32px]">
                {teamGroups.map((group) => (
                  <div key={group.id} className="flex flex-col gap-[14px] lg:gap-[17px]">
                    <h3 className="font-inter font-semibold text-dark text-[18px] leading-[28px] uppercase m-0">
                      {group.name}
                    </h3>
                    <ul className="flex flex-col gap-[8px] list-none p-0 m-0">
                      {group.members.map((m) => (
                        <li
                          key={m}
                          className="font-inter text-dark text-[16px] leading-[20px] tracking-[0.48px]"
                        >
                          {m}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FOUNDER QUOTE — testimonial card + Discover our approach CTA */}
      <section className="w-full">
        <div className="border-b border-dark mx-[20px] pt-[48px] pb-[40px] lg:mx-[25px] lg:pt-[80px] lg:pb-[60px]">
          <div className="max-w-[1078px] mx-auto flex flex-col items-center gap-[40px] lg:gap-[50px]">
            <div className="relative w-full overflow-hidden bg-[#1e1e1e]">
              <Image
                src="/images/about/approach-quote-bg.jpg"
                alt=""
                fill
                sizes="(max-width: 1080px) 100vw, 1078px"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-[rgba(0,0,0,0.7)]" />
              <div className="relative flex flex-col items-center justify-center gap-[22px] px-[24px] py-[46px] lg:px-[120px] lg:py-[88px] text-center">
                <p className="font-acumin italic text-[#f5f5f7] text-[20px] lg:text-[26px] leading-[140%] max-w-[836px] m-0">
                  &ldquo;We don&rsquo;t parachute in and disappear. We embed with
                  your team, learn how Southern California actually moves, and
                  build marketing that earns trust block by block — so the work
                  keeps compounding long after launch.&rdquo;
                </p>
                <div className="flex items-center lg:items-end justify-center gap-[22px]">
                  <span className="relative block w-[62px] h-[62px] rounded-full overflow-hidden shrink-0">
                    <Image
                      src="/images/about/approach-avatar.png"
                      alt="Fas Lebbie"
                      fill
                      sizes="62px"
                      className="object-cover"
                    />
                  </span>
                  <span className="font-acumin italic text-white text-[26px] leading-[140%]">
                    Fas Lebbie
                  </span>
                </div>
              </div>
            </div>

            <ContactCTAButton
              label="Discover Our Approach"
              className="font-acumin-condensed bg-dark text-white text-[18px] leading-normal tracking-normal w-[201px] h-[43px] inline-flex items-center justify-center cursor-pointer transition-colors hover:bg-[#333] border-none"
            />
          </div>
        </div>
      </section>

      {/* WE'RE SOCAL-LOCAL — community grid */}
      <section className="w-full px-[20px] pt-[64px] pb-[40px] lg:px-[40px] lg:pt-[100px] lg:pb-[80px]">
        <div className="max-w-[1380px] mx-auto flex flex-col items-center gap-[26px] text-center">
          <h2 className="font-acumin-condensed text-dark text-[32px] leading-[30px] tracking-[0.96px] lg:text-[42px] lg:leading-[50px] lg:tracking-[1.26px] uppercase m-0 max-w-[360px] lg:max-w-[995px]">
            WE&rsquo;RE SOCAL-LOCAL.
            <br />
            WHY the community CHOOSEs US AS EMBEDDED ALLIES
          </h2>
          <p className="hidden lg:block font-inter text-dark text-[16px] leading-[20px] tracking-[0.48px] max-w-[919px] m-0">
            We&rsquo;re not a remote agency, we&rsquo;re your neighbors. Our
            social media shows our deep understanding of Orange County&rsquo;s
            economic, social, and operational landscape allows us to design
            solutions grounded in regional reality.
            <br />
            Our work is helps your brand build:
          </p>
        </div>

        <div className="max-w-[1068px] mx-auto mt-[33px] lg:mt-[60px] flex flex-col gap-[16px] lg:gap-[33px]">
          <div className="grid grid-cols-3 gap-[7px] lg:gap-[20px] text-center">
            <h3 className="font-acumin-condensed text-dark text-[18px] leading-[22.7px] tracking-[0.54px] lg:text-[36px] lg:leading-[45px] lg:tracking-[1.08px] m-0 uppercase">
              Community
            </h3>
            <h3 className="font-acumin-condensed text-dark text-[18px] leading-[22.7px] tracking-[0.54px] lg:text-[36px] lg:leading-[45px] lg:tracking-[1.08px] m-0 uppercase">
              Growth
            </h3>
            <h3 className="font-acumin-condensed text-dark text-[18px] leading-[22.7px] tracking-[0.54px] lg:text-[36px] lg:leading-[45px] lg:tracking-[1.08px] m-0 uppercase">
              Impact
            </h3>
          </div>

          <div className="grid grid-cols-3 gap-[7px] lg:gap-[20px]">
            {gridImages.map((image, i) => (
              <div
                key={i}
                className={`relative aspect-square overflow-hidden border border-[#adadad] shadow-[0px_4px_10.2px_0px_rgba(0,0,0,0.05)] ${
                  image.instagram ? "bg-white" : ""
                }`}
              >
                <Image
                  src={image.src}
                  alt={image.alt}
                  fill
                  sizes="(max-width: 768px) 50vw, 342px"
                  className={
                    image.instagram ? "object-contain" : "object-cover"
                  }
                />
                {image.instagram && (
                  <span className="absolute bottom-[6px] right-[6px] lg:bottom-[12px] lg:right-[24px] z-10 inline-flex items-center justify-center w-[10px] h-[10px] lg:w-[24px] lg:h-[24px] text-dark">
                    <svg
                      width="100%"
                      height="100%"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <rect
                        x="2"
                        y="2"
                        width="20"
                        height="20"
                        rx="5"
                        stroke="currentColor"
                        strokeWidth="2"
                      />
                      <circle
                        cx="12"
                        cy="12"
                        r="5"
                        stroke="currentColor"
                        strokeWidth="2"
                      />
                      <circle cx="17.5" cy="6.5" r="1.25" fill="currentColor" />
                    </svg>
                  </span>
                )}
              </div>
            ))}
          </div>

          <div className="hidden lg:flex flex-wrap gap-[7px_6px]">
            {communityValueTags.map((tag) => (
              <span
                key={tag}
                className="border-[0.5px] border-dark inline-flex items-center justify-center h-[36px] px-[12px] font-inter text-dark text-[14px] leading-[18px] tracking-[0.42px] whitespace-nowrap"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="w-full bg-[#1e1e1e]" id="faqs">
        <div className="border-t border-b border-white mx-[20px] lg:mx-[25px] py-[40px]">
          <div className="max-w-[1404px] mx-auto grid grid-cols-1 lg:grid-cols-[461px_1fr] items-stretch">
            <div className="flex flex-col gap-[33px] justify-center pl-0 lg:pl-[22px] pr-[14px] pb-[40px] lg:py-[40px]">
              <h2 className="font-acumin-condensed text-white text-[48px] leading-[50px] tracking-[1.44px] uppercase m-0">
                FAQS
              </h2>
              <p className="font-inter text-white text-[16px] leading-[20px] tracking-[0.48px] max-w-[324px] m-0">
                Need-to-knows, nice-to-knows,
                <br />
                and everything in between.
              </p>
            </div>

            <div className="lg:border-l lg:border-white lg:pl-[14px]">
              <FAQAccordion />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
