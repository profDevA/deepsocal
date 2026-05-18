"use client";

import { useRef } from "react";
import Image from "next/image";
import { FaArrowDown, FaPlay } from "react-icons/fa6";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

const HEADLINE_DIM = "designing useful";
const HEADLINE_BRIGHT = "futures for southern California";

export default function Hero() {
  const root = useRef<HTMLElement | null>(null);

  useGSAP(
    () => {
      const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      if (reduce) {
        gsap.set(".hero-word, .hero-sub, .hero-video, .hero-arrow", {
          opacity: 1,
          y: 0,
        });
        return;
      }

      gsap.set(".hero-word", { opacity: 0, y: "0.6em", rotateX: -25 });
      gsap.set(".hero-sub, .hero-video, .hero-arrow", { opacity: 0, y: 16 });

      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
      tl.to(".hero-word", {
        opacity: 1,
        y: 0,
        rotateX: 0,
        duration: 0.8,
        stagger: 0.06,
      })
        .to(
          ".hero-sub",
          { opacity: 1, y: 0, duration: 0.7 },
          "-=0.5"
        )
        .to(
          ".hero-video",
          { opacity: 1, y: 0, duration: 0.8 },
          "-=0.4"
        )
        .to(
          ".hero-arrow",
          { opacity: 1, y: 0, duration: 0.5 },
          "-=0.3"
        );
    },
    { scope: root }
  );

  return (
    <section
      ref={root}
      id="hero"
      className="bg-[#e6e6e6] w-full flex flex-col items-center px-[clamp(16px,4vw,32px)] pt-[clamp(60px,12vw,180px)] pb-[clamp(40px,8vw,120px)]"
    >
      <div className="w-full max-w-[1071px] flex flex-col items-center gap-[clamp(20px,3vw,40px)] text-center">
        <h1
          className="font-bangers tracking-[clamp(0.5px,0.2vw,3px)] leading-[0.94] text-[clamp(36px,8vw,96px)] m-0 wrap-break-word hyphens-auto"
          style={{ perspective: "800px" }}
        >
          <span className="text-[rgba(17,17,17,0.2)]">
            {HEADLINE_DIM.split(" ").map((w, i) => (
              <span key={`d-${i}`} className="hero-word inline-block mr-[0.25em]">
                {w}
              </span>
            ))}
          </span>
          <span className="text-dark">
            {HEADLINE_BRIGHT.split(" ").map((w, i) => (
              <span key={`b-${i}`} className="hero-word inline-block mr-[0.25em]">
                {w}
              </span>
            ))}
          </span>
        </h1>

        <p className="hero-sub font-inter text-[16px] leading-[20px] tracking-[0.48px] text-dark max-w-[564px] m-0">
          We work with local businesses, startups, and communities to turn real
          regional challenges into lasting solutions from the coastline to the
          culture to the commerce.
        </p>
      </div>

      <div className="mt-[clamp(40px,7vw,90px)] w-full max-w-[924px] flex flex-col items-center gap-[clamp(32px,5vw,64px)]">
        <div
          className="hero-video relative w-full max-w-[535px] aspect-535/271 overflow-hidden rounded-[clamp(8px,1vw,16px)] bg-dark"
          aria-label="Hero video preview — final reel coming soon"
        >
          <Image
            src="/images/slide-4-surf.jpg"
            alt=""
            fill
            priority
            sizes="(max-width: 768px) 100vw, 535px"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-linear-to-t from-black/55 via-black/20 to-black/10" />
          <button
            type="button"
            aria-label="Play hero video"
            className="absolute inset-0 m-auto size-[clamp(48px,6vw,72px)] rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center cursor-pointer hover:bg-white transition-colors border-none shadow-[0_8px_24px_rgba(0,0,0,0.3)]"
          >
            <FaPlay className="text-dark text-[clamp(14px,1.8vw,20px)] ml-[3px]" />
          </button>
        </div>

        <a
          href="#companies"
          aria-label="Scroll to next section"
          className="hero-arrow flex items-center justify-center w-10 h-10 rounded-full border border-dark text-dark hover:bg-dark hover:text-white transition-colors animate-bounce"
          style={{ animationDuration: "2.4s" }}
        >
          <FaArrowDown className="text-[18px]" />
        </a>
      </div>
    </section>
  );
}
