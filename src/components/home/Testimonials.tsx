"use client";

import { useRef, useState } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { testimonials, type Testimonial } from "@/data/testimonials";

const SLIDE_DURATION = 0.65;
const SLIDE_EASE = "power3.inOut";

export default function Testimonials() {
  const [current, setCurrent] = useState(0);
  const [pendingNext, setPendingNext] = useState<{
    index: number;
    direction: number;
  } | null>(null);

  const total = testimonials.length;
  const isAnimatingRef = useRef(false);
  const currentRef = useRef<HTMLDivElement>(null);
  const nextRef = useRef<HTMLDivElement>(null);

  const go = (dir: number) => {
    if (isAnimatingRef.current) return;
    isAnimatingRef.current = true;
    const nextIndex = (current + dir + total) % total;
    setPendingNext({ index: nextIndex, direction: dir });
  };

  useGSAP(
    () => {
      if (!pendingNext || !currentRef.current || !nextRef.current) return;
      const dir = pendingNext.direction;

      // xPercent (not x) so motion stays correct at any viewport width.
      gsap.set(nextRef.current, { xPercent: 100 * dir });

      const tl = gsap.timeline({
        onComplete: () => {
          setCurrent(pendingNext.index);
          setPendingNext(null);
          isAnimatingRef.current = false;
        },
      });

      tl.to(
        currentRef.current,
        {
          xPercent: -100 * dir,
          duration: SLIDE_DURATION,
          ease: SLIDE_EASE,
        },
        0
      );

      tl.to(
        nextRef.current,
        {
          xPercent: 0,
          duration: SLIDE_DURATION,
          ease: SLIDE_EASE,
        },
        0
      );
    },
    { dependencies: [pendingNext] }
  );

  return (
    <section
      id="testimonials"
      className="bg-[#1e1e1e] border-t border-b border-white w-full"
    >
      <div className="mx-auto max-w-[1380px] px-[40px] py-[120px] lg:py-[160px]">
        <div className="grid gap-[60px] lg:grid-cols-[1fr_1.35fr] lg:gap-[140px] items-start">
          <div className="flex flex-col gap-[60px] lg:gap-[80px]">
            <h2 className="font-acumin-condensed text-white text-[36px] sm:text-[40px] lg:text-[42px] leading-[50px] tracking-[1.26px] uppercase m-0 max-w-[377px]">
              Trusted by SoCal Brands
            </h2>
            <div className="flex items-center gap-[50px]">
              <NavButton
                direction="left"
                label="Previous testimonial"
                onClick={() => go(-1)}
              />
              <NavButton
                direction="right"
                label="Next testimonial"
                onClick={() => go(1)}
              />
            </div>
          </div>

          {/* min-h locks viewport height so slides of different quote
              lengths don't cause the section to reflow mid-animation. */}
          <div className="relative overflow-hidden min-h-[260px] lg:min-h-[280px] max-w-[600px]">
            <div
              key={`current-${current}`}
              ref={currentRef}
              className="will-change-transform"
            >
              <Slide testimonial={testimonials[current]} />
            </div>
            {pendingNext && (
              <div
                key={`next-${pendingNext.index}`}
                ref={nextRef}
                className="absolute inset-0 will-change-transform"
              >
                <Slide testimonial={testimonials[pendingNext.index]} />
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

function Slide({ testimonial }: { testimonial: Testimonial }) {
  return (
    <div className="flex flex-col gap-[50px] lg:gap-[60px]">
      <div className="flex items-start gap-[10px]">
        <QuoteGlyph />
        <p className="font-acumin italic text-white text-[20px] sm:text-[22px] lg:text-[26px] leading-[1.4] m-0 flex-1">
          {testimonial.quote}
        </p>
      </div>
      <div className="flex items-center gap-[22px]">
        <Avatar name={testimonial.name} src={testimonial.avatar} />
        <p className="font-acumin italic text-white text-[20px] lg:text-[26px] leading-[1.4] m-0">
          {testimonial.name}
        </p>
      </div>
    </div>
  );
}

// Figma 545:3909 lists `px-[22px] py-[7px]` as auto-layout metadata —
// applied as real CSS padding on a 35px-wide button it collapses the icon
// out of view. `flex items-center justify-center` centers the arrow inside
// the fixed box instead. bg lifted from Figma's `#1e1e1e` (= section bg,
// reads as a hole in-browser) to `#2a2a2a` for visible mass.
function NavButton({
  direction,
  label,
  onClick,
}: {
  direction: "left" | "right";
  label: string;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={label}
      className="bg-[#2a2a2a] hover:bg-[#3a3a3a] transition-colors flex items-center justify-center w-[35px] h-[38px] cursor-pointer drop-shadow-[0_0_8.15px_rgba(0,0,0,0.25)]"
    >
      <ArrowGlyph direction={direction} />
    </button>
  );
}

function ArrowGlyph({ direction }: { direction: "left" | "right" }) {
  return (
    <svg
      width="17"
      height="15"
      viewBox="0 0 17.47 15.68"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={direction === "left" ? "rotate-180" : ""}
      aria-hidden="true"
    >
      <path
        d="M9.25 0.189C10.45 4.789 15.083 7.273 17.25 7.939H0M17.25 7.939C15.417 7.939 11.25 9.439 9.25 15.439"
        stroke="white"
        strokeWidth="1.5"
      />
    </svg>
  );
}

function QuoteGlyph() {
  return (
    <svg
      width="30"
      height="22"
      viewBox="0 0 30.46 21.45"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="shrink-0 mt-[10px]"
      aria-hidden="true"
    >
      <path
        d="M0.363 5.527C2.080 -0.054 9.307 -0.019 12.706 0.697C8.842 1.555 6.445 3.917 5.730 4.990V9.820H11.633V21.090H0.363V5.527Z"
        stroke="white"
        strokeWidth="0.726"
      />
      <path
        d="M18.036 5.527C19.753 -0.054 26.980 -0.019 30.378 0.697C26.515 1.555 24.118 3.917 23.402 4.990V9.820H29.305V21.090H18.036V5.527Z"
        stroke="white"
        strokeWidth="0.726"
      />
    </svg>
  );
}

function Avatar({ name, src }: { name: string; src?: string }) {
  const initial = name.charAt(0).toUpperCase();

  if (src) {
    return (
      // eslint-disable-next-line @next/next/no-img-element
      <img
        src={src}
        alt={name}
        width={62}
        height={62}
        className="size-[62px] rounded-full object-cover shrink-0"
      />
    );
  }

  return (
    <div
      aria-label={name}
      className="size-[62px] rounded-full bg-[#3a3a3a] flex items-center justify-center text-white font-acumin italic text-[22px] shrink-0"
    >
      {initial}
    </div>
  );
}
