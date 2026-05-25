"use client";

import { useState, useCallback } from "react";
import Image from "next/image";
import { FaArrowRight } from "react-icons/fa6";

interface CaseStudyCarouselProps {
  images: string[];
  title: string;
}

export default function CaseStudyCarousel({
  images,
  title,
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
      <div className="relative aspect-642/399 rounded-[30px] overflow-hidden bg-[#828282]">
        {images.map((src, i) => (
          <Image
            key={src}
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
            className="absolute right-0 top-1/2 -translate-y-1/2 h-[38px] w-[45px] flex items-center justify-center cursor-pointer border-none transition-colors hover:bg-black"
            style={{ backgroundColor: "rgba(2,2,2,0.8)" }}
          >
            <FaArrowRight className="text-white text-[14px]" />
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
              className={`size-[9.184px] rounded-full border border-dark cursor-pointer p-0 ${
                i === active ? "bg-dark" : "bg-transparent"
              } transition-colors`}
            />
          ))}
        </div>
      )}
    </div>
  );
}
