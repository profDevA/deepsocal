"use client";

import { useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { socalThemes, type SoCalTheme } from "@/data/socal-themes";
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

        const PAIR_WIDTH = 386 + 27 + 328;
        const OUTER_GAP = 44;
        const STEP_WIDTH = PAIR_WIDTH + OUTER_GAP;
        const STEP_SCROLL = 300;
        const pairCount = socalThemes.length;
        const totalScroll = (pairCount - 1) * STEP_SCROLL;

        let currentIndex = 0;

        const goTo = (index: number) => {
          if (index === currentIndex) return;
          currentIndex = index;
          gsap.to(trackEl, {
            x: -index * STEP_WIDTH,
            duration: 0.4,
            ease: "power2.out",
            overwrite: true,
          });
        };

        const st = ScrollTrigger.create({
          trigger: section,
          start: "top top",
          end: `+=${totalScroll}`,
          pin: true,
          anticipatePin: 1,
          invalidateOnRefresh: true,
          onUpdate: (self) => {
            const targetIndex = Math.round(self.progress * (pairCount - 1));
            goTo(targetIndex);
          },
        });

        return () => {
          st.kill();
        };
      });
    },
    { scope: root }
  );

  return (
    <section
      ref={root}
      id="difference"
      className="bg-[#e6e6e6] w-full py-[60px] px-0"
    >
      <div className="w-full">
        {/* Heading row */}
        <div className="grid grid-cols-1 md:grid-cols-[1fr_1.6fr] gap-x-[50px] gap-y-6 py-[48px] px-[40px]">
          <h2 className="font-bangers text-dark text-[48px] leading-[1.04] tracking-[1.44px] m-0">
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
        <div className="relative mb-[50px] md:pl-[40px]">
          {/* California map — higher z-index, positioned left, taller than carousel items */}
          <div className="relative z-10 w-full md:w-[614px] h-[421px] rounded-[39px] overflow-hidden">
            <CaliforniaMap className="w-full h-full object-cover block" />
          </div>

          {/* Carousel — overlaps map area, items slide behind it */}
          <div className="mt-6 md:mt-0 md:absolute md:top-0 md:bottom-0 md:left-[654px] md:right-[40px] z-0 flex items-center overflow-hidden">
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
        <div className="border-b border-dark mx-[40px]" />
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
      <div
        className="relative w-[126px] h-[126px] rounded-full overflow-hidden flex items-center justify-center"
        style={{ backgroundColor: theme.iconBgColor ?? "transparent" }}
      >
        <Image
          src={theme.badgeImage}
          alt=""
          fill={!theme.iconBgColor}
          width={theme.iconBgColor ? 60 : undefined}
          height={theme.iconBgColor ? 60 : undefined}
          sizes="126px"
          className="object-cover"
        />
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
