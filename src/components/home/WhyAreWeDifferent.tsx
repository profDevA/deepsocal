"use client";

import { useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { socalThemes, type SoCalTheme } from "@/data/socal-themes";
import { themeIcons } from "@/data/theme-icons";
import CaliforniaMap from "./CaliforniaMap";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function WhyAreWeDifferent() {
  const root = useRef<HTMLElement | null>(null);
  const track = useRef<HTMLDivElement | null>(null);

  useGSAP(
    () => {
      const reduce = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
      ).matches;
      if (reduce) return;

      const mm = gsap.matchMedia();

      mm.add("(min-width: 768px)", () => {
        const trackEl = track.current;
        const section = root.current;
        if (!trackEl || !section) return;

        const getDistance = () => {
          const container = trackEl.parentElement;
          if (!container) return 0;
          return trackEl.scrollWidth - container.clientWidth;
        };

        if (getDistance() <= 0) return;

        const tween = gsap.to(trackEl, {
          x: () => -getDistance(),
          ease: "none",
          scrollTrigger: {
            trigger: section,
            start: "top top",
            end: () => `+=${getDistance()}`,
            scrub: 0.8,
            pin: true,
            anticipatePin: 1,
            invalidateOnRefresh: true,
          },
        });

        return () => {
          tween.scrollTrigger?.kill();
          tween.kill();
        };
      });
    },
    { scope: root }
  );

  return (
    <section
      ref={root}
      id="difference"
      className="bg-[#e6e6e6] w-full py-[clamp(40px,6vw,80px)] px-[clamp(20px,4vw,80px)]"
    >
      <div className="max-w-[1380px] mx-auto">
        {/* Heading row */}
        <div className="grid grid-cols-1 md:grid-cols-[1fr_1.6fr] gap-x-[clamp(30px,5vw,80px)] gap-y-6 py-[clamp(40px,4vw,53px)]">
          <h2 className="font-bangers text-dark text-[clamp(32px,4vw,48px)] leading-[1.04] tracking-[1.44px] m-0">
            Why are we different?
          </h2>
          <p className="font-inter text-dark text-[16px] leading-[20px] tracking-[0.48px] max-w-[742px] m-0">
            We treat marketing like community-building, because that&apos;s what
            it is. Every campaign we run is shaped by how Southern California
            actually lives, moves, and connects. We blend cultural insight with
            systems thinking to create strategies that don&apos;t just reach
            people, they bring them in. The result: brands that communities
            actually trust.
          </p>
        </div>

        {/* Cards row — map stays fixed, carousel slides behind it */}
        <div className="relative mb-[clamp(40px,5vw,60px)]">
          {/* California map — higher z-index, positioned left, taller than carousel items */}
          <div className="relative z-10 w-full md:w-[44%] md:max-w-[614px] h-[421px] rounded-[39px] overflow-hidden">
            <CaliforniaMap className="w-full h-full object-cover block" />
          </div>

          {/* Carousel — overlaps map area, items slide behind it */}
          <div className="mt-6 md:mt-0 md:absolute md:top-0 md:bottom-0 md:left-[46%] md:right-0 z-0 flex items-center overflow-visible">
            <div
              ref={track}
              className="flex gap-[44px] items-center will-change-transform"
            >
              {socalThemes.map((theme) => (
                <CarouselPair key={theme.id} theme={theme} />
              ))}
            </div>
          </div>
        </div>

        {/* Bottom border */}
        <div className="border-b border-dark mx-[-30px]" />
      </div>
    </section>
  );
}

function CarouselPair({ theme }: { theme: SoCalTheme }) {
  return (
    <div className="flex gap-[27px] items-center shrink-0">
      <PhotoCard src={theme.carouselImage} />
      <ThemeCard theme={theme} />
    </div>
  );
}

function PhotoCard({ src }: { src: string }) {
  return (
    <div className="relative shrink-0 w-[386px] h-[391px] rounded-[36px] overflow-hidden border border-[#b0b0b0] shadow-[0_6px_38px_rgba(0,0,0,0.25)] bg-[#222]">
      <Image
        src={src}
        alt=""
        fill
        sizes="386px"
        className="object-cover"
      />
    </div>
  );
}

function ThemeCard({ theme }: { theme: SoCalTheme }) {
  return (
    <article
      className="shrink-0 w-[328px] h-[328px] rounded-[24px] border border-[#b0b0b0] shadow-[0_5px_38px_rgba(0,0,0,0.18)] overflow-hidden p-8 flex flex-col justify-center gap-[10px]"
      style={{ backgroundColor: theme.bgColor }}
    >
      {/* Icon placeholder — designer is providing final icons */}
      <div className="w-[110px] h-[110px] rounded-full bg-white/50 flex items-center justify-center shadow-[0_2px_8px_rgba(0,0,0,0.06)]">
        <svg
          viewBox="0 0 24 24"
          width="44"
          height="44"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="text-dark/60"
        >
          <path d={themeIcons[theme.id] ?? themeIcons.culture} />
        </svg>
      </div>

      <span
        className="self-start font-bangers text-[#d7d7d7] text-[22px] leading-[1.4] px-[14px] py-1 uppercase"
        style={{ backgroundColor: "rgba(30,30,30,0.8)" }}
      >
        {theme.name}
      </span>

      <p className="font-inter font-medium text-dark text-[20px] leading-[28px] tracking-[-0.48px] m-0">
        {theme.description}
      </p>
    </article>
  );
}
