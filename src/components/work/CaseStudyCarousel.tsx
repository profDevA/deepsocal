"use client";

import { useState, useCallback } from "react";
import Image from "next/image";

interface CaseStudyCarouselProps {
  images: string[];
  title: string;
  /** Render dots in white for placement on a dark background. */
  onDark?: boolean;
}

export default function CaseStudyCarousel({
  images,
  title,
  onDark = false,
}: CaseStudyCarouselProps) {
  const [active, setActive] = useState(0);

  const next = useCallback(() => {
    setActive((i) => (i + 1) % images.length);
  }, [images.length]);

  const goTo = useCallback((index: number) => {
    setActive(index);
  }, []);

  if (images.length === 0) return null;

  return (
    <div className="flex flex-col gap-[24px]">
      <div className="relative aspect-350/403 lg:aspect-642/399 overflow-hidden bg-[#828282]">
        {images.map((src, i) => (
          <Image
            key={i}
            src={src}
            alt={`${title} — slide ${i + 1}`}
            fill
            sizes="(max-width: 768px) 100vw, 642px"
            className={`object-cover transition-opacity duration-500 ${
              i === active ? "opacity-100" : "opacity-0"
            }`}
          />
        ))}

        {images.length > 1 && (
          <button
            type="button"
            aria-label="Next slide"
            onClick={next}
            className="absolute right-0 top-1/2 -translate-y-1/2 h-[38px] w-[35px] flex items-center justify-center cursor-pointer bg-[#1e1e1e] border border-[rgba(181,181,181,0.2)] transition-colors hover:bg-black"
          >
            {/* Vector 1145 — the Figma next arrow, stroked white */}
            <svg
              width="17.25"
              height="15.25"
              viewBox="0 0 34.647 30.7843"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="block"
              aria-hidden="true"
            >
              <path
                d="M18.5 0.126211C20.9 9.32621 30.1667 14.2929 34.5 15.6262H0M34.5 15.6262C30.8333 15.6262 22.5 18.6262 18.5 30.6262"
                stroke="white"
              />
            </svg>
          </button>
        )}
      </div>

      {images.length > 1 && (
        <div className="flex items-center justify-center gap-[15px]">
          {images.map((_, i) => (
            <button
              key={i}
              type="button"
              aria-label={`Go to slide ${i + 1}`}
              onClick={() => goTo(i)}
              className={`size-[9.184px] rounded-full border cursor-pointer p-0 transition-colors ${
                onDark ? "border-white" : "border-dark"
              } ${
                i === active
                  ? onDark
                    ? "bg-white"
                    : "bg-dark"
                  : "bg-transparent"
              }`}
            />
          ))}
        </div>
      )}
    </div>
  );
}
