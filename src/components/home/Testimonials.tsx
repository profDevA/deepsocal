"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { testimonials, type Testimonial } from "@/data/testimonials";

export default function Testimonials() {
  const [current, setCurrent] = useState(0);
  const total = testimonials.length;
  const [isAnimating, setIsAnimating] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const go = (dir: number) => {
    if (isAnimating) return;
    setIsAnimating(true);
    setCurrent((c) => (c + dir + total) % total);
  };

  useEffect(() => {
    if (isAnimating) {
      timeoutRef.current = setTimeout(() => setIsAnimating(false), 700);
    }
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, [isAnimating]);

  const getSlideStyle = (offset: number): React.CSSProperties => {
    switch (offset) {
      case -1:
        return {
          transform: "translateX(-82%) scale(0.83)",
          zIndex: 1,
          opacity: 1,
        };
      case 0:
        return {
          transform: "translateX(0%) scale(1)",
          zIndex: 10,
          opacity: 1,
        };
      case 1:
        return {
          transform: "translateX(82%) scale(0.83)",
          zIndex: 1,
          opacity: 1,
        };
      default:
        return {
          transform: `translateX(${offset < 0 ? "-160%" : "160%"}) scale(0.7)`,
          zIndex: 0,
          opacity: 0,
        };
    }
  };

  return (
    <section
      id="testimonials"
      className="bg-dark w-full py-[clamp(60px,9vw,120px)] px-[20px] overflow-hidden relative"
    >
      <h2 className="font-bangers text-white text-center text-[clamp(32px,4vw,48px)] leading-[50px] tracking-[1.44px] uppercase m-0 mb-[clamp(40px,6vw,80px)]">
        Trusted by SoCal brands
      </h2>

      <div className="relative mx-auto h-[420px] flex items-center justify-center overflow-hidden">
        {testimonials.map((t, i) => {
          let offset = i - current;
          if (offset > total / 2) offset -= total;
          if (offset < -total / 2) offset += total;

          const style = getSlideStyle(offset);
          const isCenter = offset === 0;

          return (
            <div
              key={i}
              className="absolute transition-all duration-700 ease-[cubic-bezier(0.25,0.1,0.25,1)]"
              style={style}
            >
              <TestimonialCard testimonial={t} isActive={isCenter} />
            </div>
          );
        })}

        {/* Left arrow */}
        <button
          type="button"
          onClick={() => go(-1)}
          aria-label="Previous testimonial"
          className="hidden md:flex absolute left-[20px] top-1/2 -translate-y-1/2 bg-white/90 w-[35px] h-[38px] items-center justify-center shadow-[0_0_16px_rgba(0,0,0,0.25)] hover:bg-white transition-colors cursor-pointer z-20"
        >
          <Image
            src="/images/icons/arrow-carousel.svg"
            alt=""
            width={17}
            height={15}
            className="rotate-180"
          />
        </button>

        {/* Right arrow */}
        <button
          type="button"
          onClick={() => go(1)}
          aria-label="Next testimonial"
          className="hidden md:flex absolute right-[20px] top-1/2 -translate-y-1/2 bg-white/90 w-[35px] h-[38px] items-center justify-center shadow-[0_0_16px_rgba(0,0,0,0.25)] hover:bg-white transition-colors cursor-pointer z-20"
        >
          <Image
            src="/images/icons/arrow-carousel.svg"
            alt=""
            width={17}
            height={15}
          />
        </button>
      </div>

      {/* Dots */}
      <div className="flex items-center justify-center gap-[15px] mt-[clamp(30px,4vw,48px)]">
        {testimonials.map((_, i) => (
          <button
            key={i}
            type="button"
            onClick={() => { if (!isAnimating) setCurrent(i); }}
            aria-label={`Go to testimonial ${i + 1}`}
            className={`size-[9px] rounded-full border border-dark transition-all cursor-pointer ${
              i === current ? "bg-dark" : "bg-transparent"
            }`}
          />
        ))}
      </div>
    </section>
  );
}

function TestimonialCard({
  testimonial,
}: {
  testimonial: Testimonial;
  isActive: boolean;
}) {
  return (
    <article className="bg-white relative overflow-hidden w-[676px] h-[364px] rounded-[37px] shadow-[0_0_16px_rgba(0,0,0,0.25)]">
      <span
        className="absolute top-[32px] right-[32px] font-bangers text-white text-[20px] leading-[1.4] px-[21px] py-0.5 whitespace-nowrap uppercase"
        style={{ backgroundColor: "rgba(17,17,17,0.8)" }}
      >
        {testimonial.company}
      </span>

      <div className="absolute left-[84px] right-[84px] top-[99px] bottom-[60px] flex flex-col justify-end gap-[20px]">
        <Image
          src="/images/icons/quote-mark.svg"
          alt=""
          width={30}
          height={21}
          className="opacity-60"
        />
        <h3 className="font-bangers text-dark text-[48px] leading-[50px] tracking-[1.44px] m-0 uppercase">
          {testimonial.name}
        </h3>
        <p className="font-inter font-medium italic text-dark text-[24px] leading-[1.4] m-0">
          &ldquo;{testimonial.quote}&rdquo;
        </p>
      </div>
    </article>
  );
}
