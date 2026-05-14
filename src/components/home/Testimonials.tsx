"use client";

import { useCallback, useEffect, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import { FaArrowLeft, FaArrowRight, FaQuoteLeft } from "react-icons/fa6";
import { testimonials, type Testimonial } from "@/data/testimonials";

export default function Testimonials() {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: true,
    align: "center",
    containScroll: false,
    skipSnaps: false,
  });
  const [selectedIndex, setSelectedIndex] = useState(0);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    onSelect();
    emblaApi.on("select", onSelect);
    emblaApi.on("reInit", onSelect);
  }, [emblaApi, onSelect]);

  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi]);
  const scrollTo = useCallback(
    (i: number) => emblaApi?.scrollTo(i),
    [emblaApi]
  );

  return (
    <section
      id="testimonials"
      className="bg-dark w-full py-[clamp(60px,9vw,120px)] overflow-hidden relative"
    >
      <h2 className="font-bangers text-white text-center text-[clamp(32px,4vw,48px)] leading-tight tracking-[1.44px] uppercase m-0 mb-[clamp(40px,6vw,80px)]">
        Trusted by SoCal brands
      </h2>

      <div className="relative">
        <div ref={emblaRef} className="overflow-hidden">
          <div className="flex items-center">
            {testimonials.map((t, i) => (
              <div
                key={`${t.name}-${i}`}
                className="shrink-0 basis-[80%] md:basis-[45%] flex justify-center px-3"
              >
                <TestimonialCard
                  testimonial={t}
                  isActive={i === selectedIndex}
                />
              </div>
            ))}
          </div>
        </div>

        <button
          type="button"
          onClick={scrollPrev}
          aria-label="Previous testimonial"
          className="hidden md:flex absolute left-[24px] top-1/2 -translate-y-1/2 bg-white/95 size-[44px] items-center justify-center shadow-md hover:bg-white transition-colors cursor-pointer rounded-sm z-10"
        >
          <FaArrowLeft className="text-dark text-sm" />
        </button>
        <button
          type="button"
          onClick={scrollNext}
          aria-label="Next testimonial"
          className="hidden md:flex absolute right-[24px] top-1/2 -translate-y-1/2 bg-white/95 size-[44px] items-center justify-center shadow-md hover:bg-white transition-colors cursor-pointer rounded-sm z-10"
        >
          <FaArrowRight className="text-dark text-sm" />
        </button>
      </div>

      <div className="flex items-center justify-center gap-[12px] mt-[clamp(30px,4vw,48px)]">
        {testimonials.map((_, i) => (
          <button
            key={i}
            type="button"
            onClick={() => scrollTo(i)}
            aria-label={`Go to testimonial ${i + 1}`}
            className={`size-[10px] rounded-full border border-white transition-all ${
              i === selectedIndex ? "bg-white scale-110" : "bg-transparent opacity-60"
            }`}
          />
        ))}
      </div>
    </section>
  );
}

function TestimonialCard({
  testimonial,
  isActive,
}: {
  testimonial: Testimonial;
  isActive: boolean;
}) {
  return (
    <article
      className={`bg-white relative w-full max-w-[676px] transition-all duration-500 ease-out ${
        isActive
          ? "opacity-100 scale-100 shadow-[0_0_30px_rgba(0,0,0,0.4)] rounded-[clamp(20px,2.5vw,37px)]"
          : "opacity-50 scale-90 shadow-[0_0_16px_rgba(0,0,0,0.2)] rounded-[clamp(16px,2vw,30px)]"
      }`}
      style={{ aspectRatio: "676 / 364" }}
    >
      <span
        className="absolute top-[clamp(16px,5%,32px)] right-[clamp(16px,5%,32px)] font-bangers text-white text-[clamp(13px,1.5vw,18px)] leading-[1.4] px-4 py-1 whitespace-nowrap uppercase tracking-wide"
        style={{ backgroundColor: "rgba(17,17,17,0.85)" }}
      >
        {testimonial.company}
      </span>

      <div className="absolute inset-0 px-[clamp(24px,8%,84px)] py-[clamp(24px,12%,80px)] flex flex-col justify-end gap-[clamp(12px,2vw,20px)]">
        <FaQuoteLeft className="text-dark/40 text-[clamp(18px,2vw,24px)] -mb-2" />
        <h3 className="font-bangers text-dark text-[clamp(28px,5vw,48px)] leading-[1] tracking-[1.44px] m-0 uppercase">
          {testimonial.name}
        </h3>
        <p className="font-inter font-medium italic text-dark text-[clamp(14px,1.8vw,22px)] leading-[1.4] m-0 line-clamp-3">
          &ldquo;{testimonial.quote}&rdquo;
        </p>
      </div>
    </article>
  );
}
