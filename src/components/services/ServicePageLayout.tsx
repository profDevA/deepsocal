"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { FaAngleDown } from "react-icons/fa6";
import { useModal } from "@/components/modals/ModalProvider";

interface Category {
  number: string;
  title: string;
  description: string;
}

interface EmbeddedAllyData {
  body: string;
  body2?: string;
  prompt: string;
  buttonText: string;
  dropdownItems: string[];
}

interface ServicePageProps {
  heading: string;
  description: string;
  heroImages: React.ReactNode;
  categories: Category[];
  allyText?: string;
  allyDropdownText?: string;
  embeddedAlly?: EmbeddedAllyData;
}

export default function ServicePageLayout({
  heading,
  description,
  heroImages,
  categories,
  allyText = "...design that connects people",
  allyDropdownText = "For lasting impact",
  embeddedAlly,
}: ServicePageProps) {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [allyDropdown, setAllyDropdown] = useState(false);
  const { openModal } = useModal();

  return (
    <>
      {/* Banner */}
      <section id="banner" className="px-[1.1vw]! max-[1025px]:px-[15px]! py-[4vw] max-[1025px]:py-[60px]">
        <div className="w-full">
          <div className="w-full px-0">
            <div className="flex flex-wrap">
              <div className="w-full">
                <div className="relative">
                  <div className="pt-0">
                    <div className="flex justify-center">
                      <div className="block max-w-[1068px] w-[74.2%] mx-auto max-[767.98px]:w-full">
                        <div className="flex mb-2 w-full items-end justify-between">
                          <div className="font-inter text-xs font-medium leading-none tracking-normal text-dark">
                            <span className="uppercase">Solving Challenges</span>
                          </div>
                          <div className="font-inter text-xs font-medium leading-none tracking-normal text-dark text-right">
                            <span className="lowercase">driving innovation</span>
                          </div>
                        </div>
                        <Image src="/images/DeepSoCal-banner.svg" className="w-full bg-black px-[1.1vw] py-[1.1vw]" alt="DeepSoCal" width={1068} height={200} unoptimized style={{ width: "100%", height: "auto" }} />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Tagline */}
      <section className="px-[1.1vw]! max-[1025px]:px-[15px]! py-[24px] sm:py-[32px] md:py-[40px]">
        <div className="w-full px-[1.1vw] max-[1025px]:px-[15px]">
          <div className="flex items-center justify-center max-w-[1378px] mx-auto gap-[24px] sm:gap-[40px] md:gap-[56px] lg:gap-[71px] flex-nowrap">
            <span className="flex-[1_1_0] max-w-[315px] h-px bg-dark opacity-85 max-[991px]:hidden!" aria-hidden="true"></span>
            <p className="shrink-0 w-[280px] sm:w-[400px] md:w-[500px] lg:w-[606px] font-inter text-[16px] sm:text-[18px] md:text-[20px] font-bold leading-[1.13] tracking-[-0.32px] text-dark text-center mb-0">DeepSoCal is a regional strategic design agency building transformative experiences for SoCal&rsquo;s brands by blending deep research, AI &amp; technology, strategy, design, and technology.</p>
            <span className="flex-[1_1_0] max-w-[315px] h-px bg-dark opacity-85 max-[991px]:hidden!" aria-hidden="true"></span>
          </div>
        </div>
      </section>

      {/* Your Ally dropdown */}
      <section id="your-ally" className="flex flex-wrap items-center px-[1.1vw] max-[1025px]:px-[15px] py-[40px] sm:py-[80px] md:py-[120px] lg:py-[160px]">
        <div className="w-full">
          <div className="flex flex-wrap">
            <div className="w-full">
              <div className="max-w-[50vw] text-center mx-auto max-[1025px]:max-w-full">
                <h4 className="font-instrument text-[20px] sm:text-[26px] md:text-[32px] lg:text-[36px] font-normal tracking-[-1.44px] leading-[1.38]">{allyText}</h4>
                <div className="relative inline-flex">
                  <button
                    className="bg-black text-brand border border-[#bdbdbd] rounded-[15px] px-[25px] py-3 font-inter font-light italic text-[16px] sm:text-[18px] md:text-[22px] lg:text-[24px] gap-2.5 min-w-[280px] inline-flex justify-between items-center cursor-pointer no-underline outline-none"
                    type="button"
                    onClick={() => setDropdownOpen(!dropdownOpen)}
                    style={dropdownOpen ? { borderRadius: "15px 15px 0 0" } : { borderRadius: "15px" }}
                  >
                    {allyDropdownText} <span className="text-brand text-sm pointer-events-none"><FaAngleDown /></span>
                  </button>
                  <div
                    className="absolute top-full left-0 w-full z-1060 grid transition-[grid-template-rows,opacity] duration-400 ease-in-out"
                    style={{ gridTemplateRows: dropdownOpen ? "1fr" : "0fr", opacity: dropdownOpen ? 1 : 0 }}
                  >
                    <div className="overflow-hidden">
                      <ul className="border border-black p-[1vw] rounded-b-[2.3vw] bg-brand mt-0 border-t-0 w-full list-none">
                        <li className="border-b border-[#C8C8C8] last:border-b-0"><Link className="py-[0.75vw] text-center text-[1.1vw] font-light italic text-dark-text bg-transparent transition-all duration-400 ease-in-out no-underline block cursor-pointer hover:bg-black/5" href="/services/marketing-branding" onClick={() => setDropdownOpen(false)}>Marketing + Branding</Link></li>
                        <li className="border-b border-[#C8C8C8] last:border-b-0"><Link className="py-[0.75vw] text-center text-[1.1vw] font-light italic text-dark-text bg-transparent transition-all duration-400 ease-in-out no-underline block cursor-pointer hover:bg-black/5" href="/services/research" onClick={() => setDropdownOpen(false)}>Research</Link></li>
                        <li className="border-b border-[#C8C8C8] last:border-b-0"><Link className="py-[0.75vw] text-center text-[1.1vw] font-light italic text-dark-text bg-transparent transition-all duration-400 ease-in-out no-underline block cursor-pointer hover:bg-black/5" href="/services/design" onClick={() => setDropdownOpen(false)}>Design</Link></li>
                        <li className="border-b border-[#C8C8C8] last:border-b-0"><Link className="py-[0.75vw] text-center text-[1.1vw] font-light italic text-dark-text bg-transparent transition-all duration-400 ease-in-out no-underline block cursor-pointer hover:bg-black/5" href="/services/ai-strategy" onClick={() => setDropdownOpen(false)}>AI Strategy + Integration</Link></li>
                        <li className="border-b border-[#C8C8C8] last:border-b-0"><Link className="py-[0.75vw] text-center text-[1.1vw] font-light italic text-dark-text bg-transparent transition-all duration-400 ease-in-out no-underline block cursor-pointer hover:bg-black/5" href="/services/training-education" onClick={() => setDropdownOpen(false)}>Training &amp; Education</Link></li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Service Hero */}
      <section className="px-[1.1vw]! max-[1025px]:px-[15px]! bg-dark text-brand relative z-0 before:content-[''] before:absolute before:left-1/2 before:-translate-x-1/2 before:top-0 before:h-full before:w-[min(100%,1415px)] before:border-l-[0.75px] before:border-r-[0.75px] before:border-white before:box-border before:pointer-events-none before:z-1">
        <div className="w-full px-0 border-t border-b border-brand pt-[4vw] max-[1025px]:pt-[60px] pb-0 flex flex-col relative z-2">
          <div className="flex flex-wrap order-1">
            <div className="w-full text-center">
              <div className="font-druk">
                <h3 className="text-[28px] sm:text-[48px] md:text-[76px] lg:text-[105px] uppercase leading-[1.1] text-brand max-[767.98px]:leading-[1.05]" dangerouslySetInnerHTML={{ __html: heading }} />
              </div>
            </div>
          </div>
          <div className="flex flex-wrap order-2">
            <div className="w-full text-center pt-3 px-3 md:pt-4">
              <div className="mx-auto" style={{ maxWidth: 707 }}>
                <p className="mb-0 font-inter text-base font-medium leading-[1.42] text-brand text-center tracking-[-0.432px] max-w-3xl mx-auto">{description}</p>
              </div>
            </div>
          </div>
          <div className="flex flex-wrap order-3 md:mt-16 pb-[4vw] max-[1025px]:pb-[60px] md:pb-0">
            <div className="w-full">
              <div className="max-w-[1396px] mx-auto relative overflow-visible">
                {heroImages}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="px-[1.1vw]! max-[1025px]:px-[15px]! py-[4vw] max-[1025px]:py-[60px]">
        <div className="w-full px-0">
          <div className="flex flex-wrap">
            <div className="w-full">
              <h2 className="font-inter text-xs font-medium uppercase tracking-[0.25px] leading-tight text-dark mb-5 max-[767.98px]:text-[11px] max-[767.98px]:mb-4">Categories</h2>
            </div>
          </div>
          <div className="flex flex-wrap">
            <div className="w-full">
              {categories.map((cat, i) => (
                <div className={`block ${i === 0 ? "border-t border-dark " : ""}border-b border-dark py-4`} key={i}>
                  <div className="grid! grid-cols-[30%_30%_40%] gap-x-0 items-center w-full min-h-[100px] sm:min-h-[120px] md:min-h-[142px] lg:min-h-[164px] max-[767.98px]:grid-cols-[15%_35%_50%] max-[767.98px]:min-h-[80px] max-[575px]:grid-cols-[12%_38%_50%]">
                    <div className="relative text-[22px] sm:text-[24px] md:text-[28px] lg:text-[30px] leading-normal pr-4 self-stretch flex items-start pt-[8px] sm:pt-[14px] md:pt-[20px] lg:pt-[24px] after:content-[''] after:absolute after:w-px after:bg-dark after:right-0 after:top-0 after:bottom-0 max-[767.98px]:text-sm max-[767.98px]:after:top-[-10px] max-[767.98px]:after:bottom-[-10px] font-druk">{cat.number}</div>
                    <div className="text-[22px] sm:text-[32px] md:text-[46px] lg:text-[58px] leading-[0.79] font-medium pl-[0.75rem] sm:pl-[0.875rem] md:pl-[1rem] max-[767.98px]:text-[14px] max-[767.98px]:leading-[0.95] font-druk" dangerouslySetInnerHTML={{ __html: cat.title }} />
                    <div className="pl-[1rem] sm:pl-[1.25rem] md:pl-[1.5rem] lg:pl-[2rem]">
                      <p className="m-0 font-inter text-base! font-medium leading-[1.4] tracking-[-0.02em] max-[767.98px]:text-[11px]! max-[767.98px]:leading-[1.35]!">{cat.description}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Embedded Ally */}
      {embeddedAlly && (
        <section id="embedded-ally" className="bg-dark text-brand py-5 -mx-[1.1vw] px-[1.1vw] max-[1025px]:-mx-[15px] max-[1025px]:px-[15px]">
          <div className="w-full px-0 border-t border-b border-brand py-4">
            <div className="flex flex-wrap items-center">
              <div className="w-full lg:w-5/12">
                <div className="border-l border-r border-brand py-[8vw] px-6 pb-[7vw] max-[1024px]:border-l-0 max-[1024px]:border-r-0 max-[1024px]:border-b max-[1024px]:border-[rgba(227,223,220,0.35)] max-[1024px]:pb-7 max-[1024px]:mb-2 max-[1024px]:pt-0">
                  <h3 className="font-druk text-[20px] sm:text-[32px] md:text-[44px] lg:text-[55px] mb-0 leading-[1.1]">YOUR <br /> EMBEDDED ALLY</h3>
                  <p className="font-quintessential text-[1.15rem] sm:text-[1.35rem] md:text-[1.5rem] lg:text-[1.625rem] leading-[1.35] mb-2">Across Southern California</p>
                  <p className="font-inter text-base leading-[1.45] tracking-[-0.33px] text-brand mt-4 mb-0">{embeddedAlly.body}</p>
                  {embeddedAlly.body2 && (
                    <p className="font-inter text-base leading-[1.45] tracking-[-0.33px] text-brand mt-3 mb-0">{embeddedAlly.body2}</p>
                  )}
                </div>
              </div>
              <div className="w-full lg:w-7/12">
                <div className="border-r border-brand flex flex-col items-center justify-center h-full px-6 py-[8vw] pb-[7vw] max-[1024px]:border-r-0 max-[1024px]:pt-5 max-[1024px]:pb-0 text-center">
                  <p className="font-inter text-[1.15rem] sm:text-[1.35rem] md:text-[1.55rem] lg:text-[1.75rem] leading-[1.4] text-brand mb-1">{embeddedAlly.prompt}</p>
                  <div className="relative inline-flex">
                    <button
                      className="bg-transparent border-none text-brand font-druk text-[24px] sm:text-[36px] md:text-[46px] lg:text-[55px] leading-[1.1] flex items-center gap-3 cursor-pointer flex-wrap justify-center max-[1024px]:text-[1.15rem] max-[1024px]:gap-[0.65rem]"
                      type="button"
                      onClick={() => setAllyDropdown(!allyDropdown)}
                    >
                      {embeddedAlly.buttonText}
                      <span className="bg-brand text-dark rounded-full w-[40px] sm:w-[44px] md:w-[48px] lg:w-[52px] h-[40px] sm:h-[44px] md:h-[48px] lg:h-[52px] min-w-[40px] inline-flex items-center justify-center text-[1.1rem] max-[1024px]:w-[37px] max-[1024px]:h-[37px] max-[1024px]:min-w-[37px]">
                        <FaAngleDown />
                      </span>
                    </button>
                    <div
                      className="absolute top-full left-0 w-full z-1060 grid transition-[grid-template-rows,opacity] duration-400 ease-in-out mt-2"
                      style={{ gridTemplateRows: allyDropdown ? "1fr" : "0fr", opacity: allyDropdown ? 1 : 0 }}
                    >
                      <div className="overflow-hidden">
                        <ul className="list-none bg-brand rounded-lg py-2 px-0 m-0">
                          {embeddedAlly.dropdownItems.map((item, i) => (
                            <li key={i} className="border-b border-[#C8C8C8] last:border-b-0">
                              <a
                                className="block py-2 px-4 text-dark text-sm font-inter no-underline cursor-pointer transition-colors duration-300 hover:bg-black/5"
                                href="#"
                                onClick={(e) => { e.preventDefault(); setAllyDropdown(false); openModal("contact"); }}
                              >
                                {item}
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
      )}
    </>
  );
}
