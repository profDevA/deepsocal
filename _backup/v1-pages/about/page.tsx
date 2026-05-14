import type { Metadata } from "next";
import AboutFaqClient from "./AboutFaqClient";
import StatsSlider from "./StatsSlider";
import Image from "next/image";

export const metadata: Metadata = {
  title: "About",
  description: "As embedded allies, we build resilient futures for Southern California's lifestyle brands through community and culture.",
};

const igIcon = (stroke: string) => (
  <svg className="absolute bottom-3 right-3 w-6 h-6 opacity-85" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="2" y="2" width="20" height="20" rx="5" stroke={stroke} strokeWidth="1.5"/>
    <circle cx="12" cy="12" r="5" stroke={stroke} strokeWidth="1.5"/>
    <circle cx="17.5" cy="6.5" r="1.5" fill={stroke}/>
  </svg>
);

export default function AboutPage() {
  return (
    <>
      {/* 1. HERO HEADING */}
      <section className="pt-5 pb-4 font-druk px-[1.1vw]! max-[1025px]:px-[15px]!">
        <div className="w-full px-0">
          <div className="flex flex-wrap items-start gap-0">
            <div className="w-full">
              <div className="max-w-[65vw] uppercase">
                <h1 className="text-[5vw] max-[767px]:text-[8vw] max-[575px]:text-[45px]">As embedded allies, we build resilient futures for Southern California&apos;s lifestyle brands through community and culture</h1>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. HERO: Stats left + Face images right */}
      <section className="px-[1.1vw]! max-[1025px]:px-[15px]! pb-0">
        <div className="w-full px-0 border-t border-dark pt-8">
          <div className="flex flex-wrap items-start! gap-0">
            <div className="w-full md:w-5/12">
              <div className="pr-12 pt-8 flex flex-col justify-start gap-3 relative after:content-[''] after:absolute after:w-px after:h-full after:right-0 after:top-0 after:bg-dark max-[991px]:after:hidden max-[991px]:pr-0 max-[991px]:pb-8">
                <div className="mb-0">
                  <h3 className="font-druk uppercase text-[3vw] leading-[1.15] mb-4">We Measure Our Impact With<br/>Numbers. Big Ones. Huge.</h3>
                  <p className="text-[65%]">Deep regional knowledge meets academic rigor. We understand Orange County&apos;s challenges because we&apos;re embedded here—turning complex problems into strategic solutions that scale.</p>
                </div>
                <StatsSlider />
              </div>
            </div>
            <div className="w-full md:w-7/12">
              <div className="relative overflow-hidden h-[clamp(340px,31vw,460px)] max-[991px]:h-[320px] max-[575px]:h-[240px]">
                <Image className="object-cover object-[center_35%]" src="/images/about/img-frame.jpg" alt="Southern California community" fill sizes="(max-width: 768px) 100vw, 58vw" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. SOCAL-LOCAL banner (dark) */}
      <section className="px-[1.1vw]! max-[1025px]:px-[15px]! bg-dark text-brand pt-[2.1rem]">
        <div className="w-full px-0 border-t border-brand pt-8">
          <div className="flex flex-wrap gap-0">
            <div className="w-full">
              <div className="px-[2.25%]">
                <h2 className="font-druk uppercase text-center text-[clamp(56px,5.3vw,78px)] tracking-[0.05rem] leading-none mb-4 max-[767px]:text-[10vw]">SoCal-Local</h2>
                <p className="text-center max-w-[700px] mx-auto mb-14 text-[0.64rem] leading-[1.4] max-[767px]:max-w-full">We&apos;re rooted in Southern California — its culture, communities, and creative energy. Our deep regional knowledge lets us design strategies that resonate locally and scale meaningfully. From Orange County&apos;s coastline to its neighborhoods, we understand the landscape because we live it.</p>
                <div className="relative overflow-hidden h-[360px] max-[575px]:h-[250px]">
                  <Image className="object-cover object-[center_54%]" src="/images/about/img1476.jpg" alt="SoCal community silhouettes" fill sizes="100vw" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. WE ARE DESIGNERS + TEAM */}
      <section className="px-[1.1vw]! max-[1025px]:px-[15px]! pt-12 pb-8 max-[767px]:bg-dark max-[767px]:text-brand max-[767px]:py-8">
        <div className="w-full px-0 border-t border-dark pt-8">
          <div className="flex flex-wrap gap-0">
            <div className="w-full">
              <h2 className="font-druk uppercase text-[clamp(52px,4vw,66px)] max-w-[72%] leading-[0.98] mx-auto mb-12 px-8 max-[767px]:text-[7vw] max-[767px]:max-w-full max-[767px]:text-brand text-center">We are designers and researchers shaping Southern California&apos;s future through community and impact.</h2>
            </div>
          </div>
          <div className="flex flex-wrap border-t border-dark pt-[1.35rem] mt-5">
            <div className="w-full md:w-1/3">
              <div className="relative pr-8 h-full after:content-[''] after:absolute after:w-px after:h-full after:right-0 after:top-0 after:bg-dark max-[991px]:after:hidden">
                <h3 className="font-druk uppercase text-[2.9rem] tracking-[0.04rem] mb-4">Team</h3>
                <p className="text-[65%] leading-[1.35]">Based in Southern California, our multidisciplinary team of researchers, designers, engineers, and systems thinkers helps businesses grow with purpose. We design strategies that strengthen communities and bring creativity and technology together to drive systemic change.</p>
              </div>
            </div>
            <div className="w-full md:w-2/3">
              <div className="grid grid-cols-3 gap-x-8 gap-y-[1.65rem] px-4 max-[991px]:grid-cols-2 max-[575px]:grid-cols-1">
                <div>
                  <h6 className="text-[0.72rem] font-medium mb-[0.55rem] text-dark uppercase max-[1299px]:text-[13px]">Design <span className="hidden max-[767px]:inline max-[767px]:text-sm">[+]</span></h6>
                  <ul className="list-none pl-0 text-[0.61rem] max-[1299px]:text-[10px] max-[1599px]:text-[75%]">
                    <li className="my-1 text-dark">Visual Identity</li>
                    <li className="my-1 text-dark">UX/UI Design</li>
                    <li className="my-1 text-dark">Campaign Creative</li>
                    <li className="my-1 text-dark">Packaging &amp; Print</li>
                  </ul>
                </div>
                <div>
                  <h6 className="text-[0.72rem] font-medium mb-[0.55rem] text-dark uppercase max-[1299px]:text-[13px]">Marketing <span className="hidden max-[767px]:inline max-[767px]:text-sm">[+]</span></h6>
                  <ul className="list-none pl-0 text-[0.61rem] max-[1299px]:text-[10px] max-[1599px]:text-[75%]">
                    <li className="my-1 text-dark">Brand Strategy</li>
                    <li className="my-1 text-dark">Social Media Management</li>
                    <li className="my-1 text-dark">Content &amp; SEO</li>
                    <li className="my-1 text-dark">Paid Media &amp; Analytics</li>
                  </ul>
                </div>
                <div>
                  <h6 className="text-[0.72rem] font-medium mb-[0.55rem] text-dark uppercase max-[1299px]:text-[13px]">Development <span className="hidden max-[767px]:inline max-[767px]:text-sm">[+]</span></h6>
                  <ul className="list-none pl-0 text-[0.61rem] max-[1299px]:text-[10px] max-[1599px]:text-[75%]">
                    <li className="my-1 text-dark">Full-Stack Web</li>
                    <li className="my-1 text-dark">E-Commerce Platforms</li>
                    <li className="my-1 text-dark">CMS &amp; Integrations</li>
                    <li className="my-1 text-dark">Performance Optimization</li>
                  </ul>
                </div>
                <div>
                  <h6 className="text-[0.72rem] font-medium mb-[0.55rem] text-dark uppercase max-[1299px]:text-[13px]">Research <span className="hidden max-[767px]:inline max-[767px]:text-sm">[+]</span></h6>
                  <ul className="list-none pl-0 text-[0.61rem] max-[1299px]:text-[10px] max-[1599px]:text-[75%]">
                    <li className="my-1 text-dark">Ethnographic Studies</li>
                    <li className="my-1 text-dark">Community Impact Analysis</li>
                    <li className="my-1 text-dark">Market &amp; Audience Insights</li>
                    <li className="my-1 text-dark">Future Scenario Planning</li>
                  </ul>
                </div>
                <div>
                  <h6 className="text-[0.72rem] font-medium mb-[0.55rem] text-dark uppercase max-[1299px]:text-[13px]">AI Strategy <span className="hidden max-[767px]:inline max-[767px]:text-sm">[+]</span></h6>
                  <ul className="list-none pl-0 text-[0.61rem] max-[1299px]:text-[10px] max-[1599px]:text-[75%]">
                    <li className="my-1 text-dark">AI Roadmapping</li>
                    <li className="my-1 text-dark">Automation &amp; Agents</li>
                    <li className="my-1 text-dark">Generative Content</li>
                    <li className="my-1 text-dark">Predictive Analytics</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. FOUNDER QUOTE IMAGE STRIP */}
      <section className="px-[1.1vw]! max-[1025px]:px-[15px]! bg-dark text-brand p-0">
        <div className="w-full px-0">
          <div className="relative min-h-[340px] bg-[url('/images/slide-4-surf.jpg')] bg-cover bg-center bg-no-repeat before:content-[''] before:absolute before:inset-0 before:bg-black/68 max-[767px]:min-h-[300px] max-[575px]:min-h-[260px]">
            <div className="relative z-1 max-w-[760px] mx-auto py-[86px] px-5 pb-[72px] text-white max-[767px]:px-4 max-[767px]:py-[54px] max-[767px]:pb-11">
              <p className="text-base leading-[1.32] mb-8 text-left max-[767px]:text-[0.9rem] max-[575px]:text-[0.82rem]">&ldquo;When my family immigrated to San Clemente at age 12, Southern California became the foundation that taught me how to navigate America. I left to pursue my education- learning systems thinking, design and research at the highest levels. But I always knew I&apos;d come back. Now, I&apos;m using everything I learned to serve the place that gave me everything. This isn&apos;t just business for us - it&apos;s personal. Orange County shaped who I am, and I&apos;m committed to using these skills to strengthen the communities, business, and systems that make this region thrive.&rdquo;</p>
              <div className="flex items-center justify-center gap-4">
                <span className="w-[72px] h-[72px] rounded-full bg-[url('/images/about/ceo.png')] bg-position-[center_top] bg-cover bg-no-repeat border-2 border-white shrink-0 mr-4 max-[767px]:w-[60px] max-[767px]:h-[60px]"></span>
                <div className="flex flex-col items-start text-left leading-snug">
                  <strong className="text-[0.92rem] font-medium">Dr. Fas Lebbie</strong>
                  <span className="text-[0.72rem] uppercase tracking-[0.06rem] font-bold">Founder</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 6. WE'RE SOCAL-LOCAL + COMMUNITY / GROWTH / IMPACT */}
      <section className="px-[1.1vw]! max-[1025px]:px-[15px]! pt-12 pb-6">
        <div className="w-full px-0 border-t border-dark pt-8">
          <div className="flex flex-wrap">
            <div className="w-full">
              <div className="text-center">
                <h2 className="font-druk uppercase text-[86px] font-medium leading-[115px] text-black mb-2 max-[991px]:text-[10vw] max-[991px]:leading-[1.2]">We&apos;re SoCal-Local.</h2>
                <h2 className="font-druk uppercase text-[clamp(50px,3.9vw,64px)] mb-5 max-w-[70%] mx-auto leading-none max-[991px]:text-[6vw]">Why the community chooses us as embedded allies</h2>
                <p className="max-w-[90%] mx-auto mb-6 font-inter text-2xl font-normal leading-7 tracking-[-0.325px] text-black">We&apos;re not a remote agency — we&apos;re your neighbors. Our social media shows our deep understanding of Orange County&apos;s economic, social, and operational landscape allows us to design solutions grounded in regional reality.</p>
                <p className="max-w-[90%] mx-auto mb-6 font-inter text-2xl font-normal leading-7 tracking-[-0.325px] text-black">Our work helps your brand build:</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="px-[1.1vw]! max-[1025px]:px-[15px]! pb-[4vw] max-[1025px]:pb-[60px]">
        <div className="w-full px-0">
          <div className="flex flex-wrap gap-0 max-w-[1068px] mx-auto mb-2">
            <div className="w-full md:w-1/3">
              <h2 className="font-druk uppercase text-[clamp(28px,3.3vw,48px)] tracking-[0.02rem] p-0 mb-3 text-center">Community</h2>
            </div>
            <div className="w-full md:w-1/3">
              <h2 className="font-druk uppercase text-[clamp(28px,3.3vw,48px)] tracking-[0.02rem] p-0 mb-3 text-center">Growth</h2>
            </div>
            <div className="w-full md:w-1/3">
              <h2 className="font-druk uppercase text-[clamp(28px,3.3vw,48px)] tracking-[0.02rem] p-0 mb-3 text-center">Impact</h2>
            </div>
          </div>
          <div className="grid grid-cols-3 gap-2.5 p-0 mx-auto mb-8 max-w-[1068px] max-[991px]:grid-cols-2 max-[575px]:grid-cols-2">
            <div className="relative overflow-hidden rounded-none aspect-square">
              <Image className="w-full h-full object-cover block" src="/images/about/grid-1.jpg" alt="SoCal street scene" fill sizes="(max-width: 575px) 50vw, 33vw" />
              {igIcon("white")}
            </div>
            <div className="relative overflow-hidden rounded-none aspect-square bg-white">
              <Image className="w-full h-full object-contain object-center block" src="/images/about/grid-2.jpg" alt="Surfing magazine" fill sizes="(max-width: 575px) 50vw, 33vw" />
              {igIcon("#111")}
            </div>
            <div className="relative overflow-hidden rounded-none aspect-square">
              <Image className="w-full h-full object-cover block" src="/images/about/grid-3.jpg" alt="SoCal downtown" fill sizes="(max-width: 575px) 50vw, 33vw" />
              {igIcon("white")}
            </div>
            <div className="relative overflow-hidden rounded-none aspect-square">
              <Image className="w-full h-full object-cover block" src="/images/about/grid-4.jpg" alt="SoCal lifestyle" fill sizes="(max-width: 575px) 50vw, 33vw" />
              {igIcon("white")}
            </div>
            <div className="relative overflow-hidden rounded-none aspect-square">
              <Image className="w-full h-full object-cover block" src="/images/about/grid-5.jpg" alt="VR experience" fill sizes="(max-width: 575px) 50vw, 33vw" />
              {igIcon("white")}
            </div>
            <div className="relative overflow-hidden rounded-none aspect-square">
              <Image className="w-full h-full object-cover block" src="/images/about/grid-6.jpg" alt="Night market" fill sizes="(max-width: 575px) 50vw, 33vw" />
              {igIcon("white")}
            </div>
          </div>
          <div className="flex flex-wrap gap-[7px_6px] p-0 justify-start max-w-[1068px] mx-auto mb-4">
            <span className="border border-dark/50 rounded-[48px] px-4 h-9 inline-flex items-center justify-center text-sm font-inter font-normal tracking-[-0.32px]">Connection</span>
            <span className="border border-dark/50 rounded-[48px] px-4 h-9 inline-flex items-center justify-center text-sm font-inter font-normal tracking-[-0.32px]">Collective Growth</span>
            <span className="border border-dark/50 rounded-[48px] px-4 h-9 inline-flex items-center justify-center text-sm font-inter font-normal tracking-[-0.32px]">Belonging</span>
            <span className="border border-dark/50 rounded-[48px] px-4 h-9 inline-flex items-center justify-center text-sm font-inter font-normal tracking-[-0.32px]">Local Pride</span>
            <span className="border border-dark/50 rounded-[48px] px-4 h-9 inline-flex items-center justify-center text-sm font-inter font-normal tracking-[-0.32px]">Shared Values</span>
            <span className="border border-dark/50 rounded-[48px] px-4 h-9 inline-flex items-center justify-center text-sm font-inter font-normal tracking-[-0.32px]">Diversity</span>
            <span className="border border-dark/50 rounded-[48px] px-4 h-9 inline-flex items-center justify-center text-sm font-inter font-normal tracking-[-0.32px]">Everyday Lifestyle</span>
            <span className="border border-dark/50 rounded-[48px] px-4 h-9 inline-flex items-center justify-center text-sm font-inter font-normal tracking-[-0.32px]">Creative Expression</span>
          </div>
          <div className="text-center mt-3 mb-4">
            <a href="#" className="text-[9.5px] text-dark uppercase tracking-[0.04rem] no-underline border-b border-dashed border-dark px-10 pb-0.5">Load more [+]</a>
          </div>
        </div>
      </section>

      {/* 7. FAQS (dark) */}
      <AboutFaqClient />
    </>
  );
}
