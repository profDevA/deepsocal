"use client";

import { useState, useCallback } from "react";
import Link from "next/link";
import Image from "next/image";
import useEmblaCarousel from "embla-carousel-react";
import { FaAngleDown } from "react-icons/fa6";

const categories = [
  { id: "all", label: "All Works" },
  { id: "design", label: "Design" },
  { id: "research", label: "Research" },
  { id: "marketing-branding", label: "Marketing + Branding" },
  { id: "training-education", label: "Training + Education" },
  { id: "ai-strategy-integration", label: "AI Strategy + Integration" },
];

const workItems = [
  { title: "OC Resource Navigator", category: "Design + Research", image: "/images/oc-resource-navigator.png", tags: ["design", "research"], href: "/works/forever-a-surfer" },
  { title: "Surf Magazine", category: "Strategy + Content", image: "/images/surf-magazin.png", tags: ["marketing-branding"], href: "/works/forever-a-surfer" },
  { title: "OC Links", category: "Campaign Strategy", image: "/images/oc-links.png", tags: ["marketing-branding"], href: "/works/forever-a-surfer" },
  { title: "Coral Health", category: "Strategy + Influencers", image: "/images/coral-health.png", tags: ["marketing-branding"], href: "/works/forever-a-surfer" },
  { title: "Orphanage Campaign", category: "Strategy + Influencers", image: "/images/orphanage-campain.png", tags: ["marketing-branding"], href: "/works/forever-a-surfer" },
  { title: "Concrete Dreams", category: "Campaign Strategy", image: "/images/concrete-dreams.png", tags: ["marketing-branding"], href: "/works/forever-a-surfer" },
  { title: "Salt & Sand", category: "Strategy + Influencers", image: "/images/salt-sand.png", tags: ["marketing-branding"], href: "/works/forever-a-surfer" },
  { title: "Luku Watches", category: "Strategy + Influencers", image: "/images/luku-watches.png", tags: ["marketing-branding"], href: "/works/forever-a-surfer" },
];

const testimonials = [
  { quote: `"Each project is a chance to explore new possibilities, challenge conventions, and design experiences that resonate deeply. For me, reaching new heights means constantly evolving brands do the same through design".`, name: "Tim Brown", pos: "IDEO" },
  { quote: `"DeepSoCal brought a level of strategic depth we hadn't experienced before. They didn't just design — they embedded themselves in our community to understand what truly matters to our audience".`, name: "Partner", pos: "OC Health Care Agency" },
  { quote: `"Working with DeepSoCal felt like having an in-house team that truly understood Southern California. Their research-driven approach transformed how we connect with our community".`, name: "Partner", pos: "Pacific Horizon" },
];

const marqueeRow1 = ["marquee-oc-navigator.svg", "marquee-carnegie.svg", "marquee-utah.svg", "marquee-galderma.svg", "marquee-dc.svg"];
const marqueeRow2 = ["marquee2-byu.svg", "marquee2-med.svg", "marquee2-znet.svg", "marquee2-oclinks.svg", "marquee2-meta.svg", "marquee2-mit.svg"];

export default function WorkGrid() {
  const [filter, setFilter] = useState("all");
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [showSections, setShowSections] = useState(true);

  const [testiRef, testiApi] = useEmblaCarousel({ loop: true });

  const scrollPrev = useCallback(() => testiApi?.scrollPrev(), [testiApi]);
  const scrollNext = useCallback(() => testiApi?.scrollNext(), [testiApi]);

  const activeLabel = categories.find((c) => c.id === filter)?.label || "All Works";

  const handleFilter = (id: string) => {
    setFilter(id);
    setDropdownOpen(false);
    setShowSections(id === "all");
  };

  return (
    <>
      {/* Filter section */}
      <section id="your-ally" className="flex flex-wrap items-center py-[4vw] max-[1025px]:py-[60px] px-[1.1vw] max-[1025px]:px-[15px]">
        <div className="w-full">
          <div className="flex flex-wrap">
            <div className="w-full">
              <div className="max-w-[50vw] text-center mx-auto max-[1025px]:max-w-full">
                <h4 className="font-instrument text-[clamp(20px,2.5vw,36px)] font-normal tracking-[-1.44px] leading-[1.38]">
                  ...Your Embedded Ally in Southern California
                </h4>
                <div className="relative inline-flex">
                  <a
                    className="bg-black text-brand border border-[#bdbdbd] rounded-[15px] px-[25px] py-3 font-inter font-light italic text-[clamp(16px,1.6vw,24px)] gap-2.5 min-w-[280px] inline-flex justify-between items-center cursor-pointer no-underline outline-none"
                    href="#"
                    role="button"
                    onClick={(e) => { e.preventDefault(); setDropdownOpen(!dropdownOpen); }}
                    style={dropdownOpen ? { borderRadius: "15px 15px 0 0" } : { borderRadius: "15px" }}
                  >
                    {activeLabel}
                    <span className="text-brand text-sm pointer-events-none"><FaAngleDown /></span>
                  </a>
                  <div
                    className="absolute top-full left-0 w-full z-1060 grid transition-[grid-template-rows,opacity] duration-400 ease-in-out"
                    style={{ gridTemplateRows: dropdownOpen ? "1fr" : "0fr", opacity: dropdownOpen ? 1 : 0 }}
                  >
                    <div className="overflow-hidden">
                      <ul className="border border-black p-[1vw] rounded-b-[2.3vw] bg-brand mt-0 border-t-0 w-full list-none">
                        {categories.map((cat) => (
                          <li key={cat.id} className="border-b border-[#C8C8C8] last:border-b-0">
                            <a
                              className="py-[0.75vw] text-center text-[1.1vw] font-light italic text-dark-text bg-transparent transition-all duration-400 ease-in-out no-underline block cursor-pointer hover:bg-black/5"
                              href="#"
                              onClick={(e) => { e.preventDefault(); handleFilter(cat.id); }}
                            >
                              {cat.label}
                            </a>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Work items */}
      <section className="px-[1.1vw]! max-[1025px]:px-[15px]! pb-5">
        <div className={`w-full ${showSections ? "border-b border-black" : ""}`}>
          <div className="w-full px-0">
            <div className="flex flex-wrap">
              <div className="w-full">
                <div className="relative grid grid-cols-3 mx-[clamp(15px,2.5vw,40px)] max-[991px]:grid-cols-2 max-[575px]:grid-cols-1">
                  <div className="absolute top-0 left-[6px] right-[6px] h-px bg-dark" />
                  <div className="absolute top-[6px] bottom-[6px] left-0 right-0 bg-[linear-gradient(#111,#111),linear-gradient(#111,#111)] bg-position-[calc(100%/3)_0,calc(200%/3)_0] bg-size-[0.75px_100%] bg-no-repeat pointer-events-none z-1 max-[991px]:bg-[linear-gradient(#111,#111)] max-[991px]:bg-position-[50%_0] max-[991px]:bg-size-[0.75px_100%] max-[575px]:hidden" />
                  {workItems.map((item, i) => {
                    const visible = filter === "all" || item.tags.includes(filter);
                    return (
                      <div
                        key={i}
                        className="relative after:content-[''] after:absolute after:bottom-0 after:left-[6px] after:right-[6px] after:h-px after:bg-dark"
                        style={{ display: visible ? "block" : "none" }}
                      >
                        <Link href={item.href} className="flex flex-col items-center no-underline text-inherit h-full p-[clamp(4px,0.5vw,8px)_clamp(6px,0.8vw,12px)] hover:text-inherit">
                          <div className="w-full h-[clamp(140px,16vw,222px)] overflow-hidden mt-[clamp(40px,5vw,70px)] relative">
                            <Image src={item.image} alt={item.title} className="w-full h-full object-cover block" fill sizes="(max-width: 600px) 100vw, (max-width: 1025px) 50vw, 25vw" />
                          </div>
                          <h3 className="font-inter font-semibold text-[clamp(16px,1.6vw,24px)] uppercase text-center tracking-[-0.66px] text-dark-text mt-[18px] mb-1">{item.title}</h3>
                          <p className="font-inter font-medium text-[clamp(10px,0.85vw,12px)] uppercase text-center text-dark mb-6">{item.category}</p>
                        </Link>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Partners / Testimonials */}
            {showSections && (
              <section id="partners" className="min-h-screen max-[1025px]:min-h-0 -mx-[1.1vw] relative pt-[6vw] px-[1.2vw] pb-[5vw] max-[600px]:p-[60px_15px]">
                <div className="absolute top-0 left-0 w-full h-full z-[-1] before:content-[''] before:absolute before:w-full before:h-full before:bg-black before:top-0 before:left-0 before:opacity-60 before:z-1">
                  <video autoPlay loop muted playsInline className="w-full h-full object-cover">
                    <source src="/videos/bck_video.mp4" type="video/mp4" />
                  </video>
                </div>
                <div className="w-full relative z-2">
                  <div className="flex flex-wrap gap-y-[5vw]">
                    <div className="w-full">
                      <div className="max-w-[50%] block ml-auto text-right max-[1025px]:max-w-[65%] max-[600px]:max-w-full">
                        <h2 className="font-druk uppercase text-brand" style={{ fontSize: '9vw', lineHeight: 1.15 }}>
                          Partners trust us, and here&apos;s what they&apos;re saying.
                        </h2>
                      </div>
                    </div>
                    <div className="w-full">
                      <div className="max-w-[30%] max-[1025px]:max-w-[50%] max-[600px]:max-w-full">
                        <div ref={testiRef} className="overflow-hidden">
                          <div className="flex">
                            {testimonials.map((t, i) => (
                              <div key={i} className="flex-[0_0_100%] min-w-0">
                                <div className="flex flex-wrap flex-col gap-[1.5vw] text-white max-[1025px]:gap-[30px]">
                                  <div className="italic text-[1.15vw] font-normal max-[1025px]:text-inherit">
                                    <p>{t.quote}</p>
                                  </div>
                                  <div className="flex flex-wrap gap-[2vw] items-center">
                                    <div className="w-[5vw] h-[5vw] rounded-full overflow-hidden relative max-[1025px]:w-[75px] max-[1025px]:h-[75px]">
                                      <Image src="/images/testimonial.png" alt="testimonial" className="absolute top-0 left-0 w-full h-full object-cover" fill sizes="(max-width: 1025px) 75px, 5vw" />
                                    </div>
                                    <div className="flex flex-col gap-[0.6vw]">
                                      <h4 className="text-[1.2vw] text-white font-normal m-0 max-[1025px]:text-[125%]">{t.name}</h4>
                                      <h4 className="text-[#6E6E73] text-[1.2vw] m-0 max-[1025px]:text-[125%]">{t.pos}</h4>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                        <div className="flex flex-wrap gap-[2vw] mt-5">
                          <button onClick={scrollPrev} className="bg-transparent border-none cursor-pointer p-0">
                            <span className="relative block w-[1.5vw] h-[1.5vw] max-[1025px]:w-[35px] max-[1025px]:h-[35px]">
                              <Image src="/images/nav-left.svg" alt="Previous" className="brightness-0 invert" fill sizes="(max-width: 1025px) 35px, 1.5vw" unoptimized />
                            </span>
                          </button>
                          <button onClick={scrollNext} className="bg-transparent border-none cursor-pointer p-0">
                            <span className="relative block w-[1.5vw] h-[1.5vw] max-[1025px]:w-[35px] max-[1025px]:h-[35px]">
                              <Image src="/images/nav-right.svg" alt="Next" className="brightness-0 invert" fill sizes="(max-width: 1025px) 35px, 1.5vw" unoptimized />
                            </span>
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </section>
            )}

            {/* Clients marquee */}
            {showSections && (
              <div className="flex flex-wrap py-2">
                <div className="w-full lg:w-1/3 border-r border-black py-2">
                  <div className="py-4">
                    <h2 className="font-druk uppercase" style={{ fontSize: 'clamp(28px, 5vw, 85px)' }}>Clients we&apos;ve worked with</h2>
                    <Link href="/works" className="bg-black text-white uppercase rounded-none font-[Arial,sans-serif] text-xs font-normal tracking-[-0.44px] px-6 py-3 min-h-[43px] inline-flex items-center justify-center no-underline border-none cursor-pointer">Our Work</Link>
                  </div>
                </div>
                <div className="w-full lg:w-2/3 flex flex-wrap pb-2 lg:pl-3">
                  <div className="w-full border-b border-black">
                    <div className="relative overflow-hidden w-full flex h-full gap-x-[5vw] py-4">
                      <ul className="flex items-center gap-x-[5vw] animate-marquee-right m-0 list-none p-0 shrink-0 min-w-max">
                        {marqueeRow1.map((img, i) => (
                          <li key={i} className="flex items-center shrink-0"><Image src={`/images/${img}`} alt="client" className="object-contain" width={120} height={35} unoptimized style={{ width: "auto", height: "auto", maxHeight: "35px", maxWidth: "none" }} /></li>
                        ))}
                      </ul>
                      <ul className="flex items-center gap-x-[5vw] animate-marquee-right m-0 list-none p-0 shrink-0 min-w-max" aria-hidden="true">
                        {marqueeRow1.map((img, i) => (
                          <li key={i} className="flex items-center shrink-0"><Image src={`/images/${img}`} alt="client" className="object-contain" width={120} height={35} unoptimized style={{ width: "auto", height: "auto", maxHeight: "35px", maxWidth: "none" }} /></li>
                        ))}
                      </ul>
                    </div>
                  </div>
                  <div className="w-full">
                    <div className="relative overflow-hidden w-full flex h-full gap-x-[5vw] py-3">
                      <ul className="flex items-center gap-x-[5vw] animate-marquee m-0 list-none p-0 shrink-0 min-w-max">
                        {marqueeRow2.map((img, i) => (
                          <li key={i} className="flex items-center shrink-0"><Image src={`/images/${img}`} alt="client" className="object-contain" width={120} height={35} unoptimized style={{ width: "auto", height: "auto", maxHeight: "35px", maxWidth: "none" }} /></li>
                        ))}
                      </ul>
                      <ul className="flex items-center gap-x-[5vw] animate-marquee m-0 list-none p-0 shrink-0 min-w-max" aria-hidden="true">
                        {marqueeRow2.map((img, i) => (
                          <li key={i} className="flex items-center shrink-0"><Image src={`/images/${img}`} alt="client" className="object-contain" width={120} height={35} unoptimized style={{ width: "auto", height: "auto", maxHeight: "35px", maxWidth: "none" }} /></li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>
    </>
  );
}
