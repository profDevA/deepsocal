"use client";

import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { FaArrowRight } from "react-icons/fa6";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { type Product } from "@/data/products";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const CARD_HEIGHT = 445;
const CARD_GAP = 37;
const STEP_SCROLL = 500;
// Pin start point must equal the sticky Header's min-h so the card top
// lands flush against the header bottom instead of pinning behind it.
const HEADER_OFFSET = 64;
// Must stay in sync with the `pt-[120px]` Tailwind class on the track div.
const TOP_GAP = 120;
const BOTTOM_GAP = 120;

interface ShopHeroCardProps {
  products: Product[];
  heroImage: string;
}

export default function ShopHeroCard({
  products,
  heroImage,
}: ShopHeroCardProps) {
  const root = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const reduce = window.matchMedia(
        "(prefers-reduced-motion: reduce)",
      ).matches;
      if (reduce) return;

      const mm = gsap.matchMedia();

      mm.add("(min-width: 1024px)", () => {
        const trackEl = trackRef.current;
        const sectionEl = root.current;
        if (!trackEl || !sectionEl) return;

        const cardCount = products.length;
        if (cardCount < 2) return;

        const trackContentBottom =
          TOP_GAP + cardCount * CARD_HEIGHT + (cardCount - 1) * CARD_GAP;

        // Passed as a function so `invalidateOnRefresh` re-evaluates against
        // the live section height on resize. End-state math: last card's
        // bottom = sectionHeight - BOTTOM_GAP.
        const computeTranslate = () => {
          const sectionHeight = sectionEl.getBoundingClientRect().height;
          return Math.max(
            0,
            trackContentBottom - sectionHeight + BOTTOM_GAP,
          );
        };

        const snapSteps = cardCount - 1;

        const tween = gsap.to(trackEl, {
          y: () => -computeTranslate(),
          ease: "none",
          scrollTrigger: {
            trigger: sectionEl,
            start: `top ${HEADER_OFFSET}px`,
            end: () => `+=${snapSteps * STEP_SCROLL}`,
            pin: true,
            pinSpacing: true,
            anticipatePin: 1,
            invalidateOnRefresh: true,
            scrub: 1,
            snap: {
              snapTo: 1 / snapSteps,
              duration: { min: 0.25, max: 0.5 },
              ease: "power2.inOut",
              delay: 0.15,
              directional: true,
              inertia: false,
            },
          },
        });

        return () => {
          tween.scrollTrigger?.kill();
          tween.kill();
        };
      });
    },
    { scope: root, dependencies: [products.length] },
  );

  return (
    <div
      ref={root}
      className="max-w-[1384px] mx-auto h-auto lg:h-[calc(100vh-64px)] border border-[#c4c4c4] overflow-hidden relative isolate"
    >
      <div className="absolute inset-0 -z-10 bg-[#1f1f1f]">
        <Image
          src={heroImage}
          alt="DeepSoCal merch lifestyle"
          fill
          priority
          sizes="(max-width: 1384px) 100vw, 1384px"
          className="object-cover object-bottom"
        />
        <div className="absolute inset-0 bg-[rgba(0,0,0,0.1)]" />
      </div>

      {/* The track's `pt-[120px]` is real layout space — at rest the hero
          shows through it, and GSAP scrolls the padding past the top edge
          (clipped by `overflow-hidden`) so cards take its place. */}
      <div className="hidden lg:block absolute top-0 bottom-0 right-[91px] w-[399px] overflow-hidden z-10">
        <div
          ref={trackRef}
          className="flex flex-col gap-[37px] pt-[120px] will-change-transform"
        >
          {products.map((product) => (
            <ProductCard key={product.slug} product={product} />
          ))}
        </div>
      </div>

      {/* Mobile fallback — no pin/scrub, just a stacked list. */}
      <div className="lg:hidden flex flex-col gap-[20px] p-[20px] relative z-10">
        {products.map((product) => (
          <ProductCard key={product.slug} product={product} />
        ))}
      </div>
    </div>
  );
}

function ProductCard({ product }: { product: Product }) {
  const cover = product.images[0];

  return (
    <Link
      href={`/shop/${product.slug}`}
      className="group relative block w-full h-[445px] bg-[#dadada] overflow-hidden shadow-[0_4px_10.2px_rgba(0,0,0,0.05)] no-underline shrink-0"
    >
      {cover ? (
        <Image
          src={cover}
          alt={product.name}
          fill
          sizes="427px"
          className="object-cover object-top"
        />
      ) : (
        <div
          className="absolute inset-0 flex items-center justify-center"
          style={{ backgroundColor: product.themeColor }}
        >
          <span className="font-acumin-condensed text-dark/30 text-[40px] tracking-[1.5px] uppercase select-none">
            {product.name}
          </span>
        </div>
      )}

      <span
        className="absolute top-[39px] left-[228px] inline-flex items-center justify-center px-[10.5px] font-acumin-condensed text-[#d7d7d7] text-[20px] leading-[1.4] whitespace-pre z-10"
        style={{ backgroundColor: "rgba(0,0,0,0.6)" }}
      >
        {`$ ${product.price.toFixed(2)}  ${product.shipping}`}
      </span>

      <div className="absolute inset-x-0 bottom-0 h-[200px] bg-white overflow-hidden z-5">
        <div className="absolute top-[49px] left-[33px] right-[33px] flex items-end gap-[29.5px]">
          <div className="flex flex-col gap-[11px] flex-1 min-w-0">
            <h3 className="font-acumin-condensed text-[#303030] text-[36px] leading-[45px] tracking-[1.08px] uppercase m-0">
              {product.name}
            </h3>
            <p className="font-inter text-dark text-[16px] leading-[20px] tracking-[0.48px] m-0 line-clamp-3">
              {product.description}
            </p>
          </div>
          <FaArrowRight className="text-dark text-[28px] shrink-0 transition-transform group-hover:translate-x-1" />
        </div>
      </div>
    </Link>
  );
}
