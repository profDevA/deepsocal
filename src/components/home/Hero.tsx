"use client";

import { useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const HEADLINE = "designing useful futures for southern California";
const DIM_COLOR = "rgba(17,17,17,0.2)";
const BRIGHT_COLOR = "#111";

export default function Hero() {
  const root = useRef<HTMLElement | null>(null);
  const headlineRef = useRef<HTMLHeadingElement | null>(null);

  useGSAP(
    () => {
      const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      if (reduce) {
        gsap.set(".hero-word", { color: BRIGHT_COLOR });
        gsap.set(".hero-sub, .hero-video, .hero-arrow", { opacity: 1, y: 0 });
        return;
      }

      gsap.set(".hero-word", { color: DIM_COLOR });
      gsap.set(".hero-sub, .hero-video, .hero-arrow", { opacity: 0, y: 16 });

      const introTl = gsap.timeline({
        defaults: { ease: "power3.out" },
        delay: 0.15,
      });
      introTl
        .to(".hero-sub", { opacity: 1, y: 0, duration: 0.7 })
        .to(".hero-video", { opacity: 1, y: 0, duration: 0.8 }, "-=0.4")
        .to(".hero-arrow", { opacity: 1, y: 0, duration: 0.5 }, "-=0.3");

      // Per-word color reveal mapped 1:1 to scroll progress during the pin.
      //
      // Timing math (7 words): duration=0.8, stagger.each=0.4
      //   total = (count-1) * each + duration = 6*0.4 + 0.8 = 3.2 units
      //   each word overlaps the next by (duration - each) = 0.4 units
      //
      // The overlap is what makes the handoff fluid (Attio-like) instead of
      // discrete-step. Words crossfade through each other rather than each
      // playing alone in its own slot with dead zones between.
      //
      // The total animation length is mapped to the full pin range below, so
      // there is no dead scroll at the start (first word starts at t=0) or end
      // (last word finishes at t=3.2 = full progress).
      //
      // scrub: 1 (vs `true`) gives a 1-second catch-up easing on the scroll →
      // animation mapping, which is what eliminates the rigid snap-to-scroll
      // feel and produces the fluid scroll behaviour seen on attio.com.
      const wordReveal = gsap.to(".hero-word", {
        color: BRIGHT_COLOR,
        ease: "power2.out",
        duration: 0.8,
        stagger: { each: 0.4, from: "start" },
        scrollTrigger: {
          trigger: root.current,
          start: "top top",
          end: "+=400",
          scrub: 0.3,
          pin: true,
          pinSpacing: true,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      });

      return () => {
        wordReveal.scrollTrigger?.kill();
        wordReveal.kill();
      };
    },
    { scope: root }
  );

  return (
    <section
      ref={root}
      id="hero"
      className="bg-[#e6e6e6] w-full flex flex-col items-center px-[16px] sm:px-[24px] md:px-[32px] pt-[80px] sm:pt-[120px] md:pt-[160px] lg:pt-[200px] pb-[120px] sm:pb-[180px] md:pb-[260px] lg:pb-[350px]"
    >
      <div className="w-full max-w-[1071px] flex flex-col items-center gap-[20px] sm:gap-[28px] md:gap-[40px] text-center">
        <h1
          ref={headlineRef}
          className="font-bangers tracking-[1px] sm:tracking-[2px] md:tracking-[3px] leading-[0.94] text-[36px] sm:text-[56px] md:text-[76px] lg:text-[96px] m-0 wrap-break-word hyphens-auto"
        >
          {HEADLINE.split(" ").map((w, i) => (
            <span
              key={`${w}-${i}`}
              className="hero-word inline-block mr-[0.25em] will-change-[color]"
            >
              {w}
            </span>
          ))}
        </h1>

        <p className="hero-sub font-inter text-[16px] leading-[20px] tracking-[0.48px] text-dark max-w-[564px] m-0">
          We work with local businesses, startups, and communities to turn real
          regional challenges into lasting solutions from the coastline to the
          culture to the commerce.
        </p>
      </div>

      <div className="mt-[60px] sm:mt-[80px] md:mt-[110px] lg:mt-[143px] w-full max-w-[924px] flex flex-col items-center gap-[60px] sm:gap-[76px] md:gap-[95px] lg:gap-[114px]">
        <div className="hero-video relative w-full max-w-[535px] aspect-535/271 overflow-hidden rounded-[8px] sm:rounded-[12px] md:rounded-[16px] bg-dark">
          <video
            src="/videos/california.mp4"
            autoPlay
            muted
            loop
            playsInline
            preload="metadata"
            className="absolute inset-0 w-full h-full object-cover"
            aria-label="DeepSoCal hero reel"
          />
          <div className="absolute inset-0 bg-linear-to-t from-black/35 via-transparent to-transparent pointer-events-none" />
        </div>

        <a
          href="#companies"
          aria-label="Scroll to next section"
          className="hero-arrow inline-flex items-center justify-center w-[20px] sm:w-[24px] md:w-[32px] h-auto text-dark animate-bounce hover:opacity-70 transition-opacity"
          style={{ animationDuration: "2.4s" }}
        >
          <Image
            src="/images/icons/scroll-arrow.svg"
            alt=""
            width={32}
            height={68}
            style={{ width: "100%", height: "auto" }}
            priority
          />
        </a>
      </div>
    </section>
  );
}
