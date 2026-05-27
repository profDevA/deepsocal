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

// Vertical pixels of page scroll required to advance one card. Calibrated
// to feel like the OrthoFX "3 easy steps" section (~60vh of runway per
// transition). Bumping this makes the scroll-through slower and more
// deliberate; reducing it makes the cards stream faster.
const STEP_SCROLL = 500;

// Pixels of vertical offset for the pin start point — keeps the card top
// flush against the bottom of the sticky `Header` (min-h-[64px]) rather
// than pinning behind it. Per Israel/Fas: "the bottom line of the header
// and top line of the section should be matched."
const HEADER_OFFSET = 64;

// Visible top/bottom gaps inside the column at end-of-scroll. The track
// has `pt-[TOP_GAP]px` (real layout space at the top). The bottom gap is
// achieved by translating the track so the LAST card's bottom edge sits
// `BOTTOM_GAP` above the column's bottom edge — see runtime math below.
//
// Keep these in sync with the Tailwind class on the track div
// (`pt-[120px]`). Both default to 120px for symmetric breathing room.
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

  // ──────────────────────────────────────────────────────────────────────
  // Scroll-driven vertical card stream — matches the OrthoFX "3 easy steps
  // to a confident smile" pattern:
  //
  //   <section style="height: calc(100svh + 125.984svh)">  // scroll runway
  //     <div class="fullscreenWrapper" style="position:absolute; top:0">
  //       <!-- pinned background + cards that translate up -->
  //     </div>
  //   </section>
  //
  // GSAP equivalent: pin the hero card, translate the products track
  // upward as scroll progresses. `scrub: 1` (1s easing catch-up) + `snap`
  // with `directional: true` + `delay: 0.15` mirrors the config proven on
  // `WhyAreWeDifferent`. Eliminates "reverse on scroll-up" by construction
  // (track.y is a pure linear function of scroll progress) and gives the
  // spring-smoothed feel that OrthoFX's Framer Motion implementation has.
  // ──────────────────────────────────────────────────────────────────────
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

        // Bottom edge of the last card in TRACK-LOCAL coordinates:
        //   pt(120) + N cards (445 each) + (N-1) inter-gaps (37 each)
        const trackContentBottom =
          TOP_GAP + cardCount * CARD_HEIGHT + (cardCount - 1) * CARD_GAP;

        // Translate as a FUNCTION so GSAP recomputes it on every refresh
        // (e.g. window resize). `invalidateOnRefresh: true` below tells
        // ScrollTrigger to re-evaluate this each time.
        //
        // End state: last card's bottom edge = sectionHeight - BOTTOM_GAP.
        //   trackContentBottom - translate = sectionHeight - BOTTOM_GAP
        //   translate = trackContentBottom - sectionHeight + BOTTOM_GAP
        const computeTranslate = () => {
          const sectionHeight = sectionEl.getBoundingClientRect().height;
          return Math.max(
            0,
            trackContentBottom - sectionHeight + BOTTOM_GAP,
          );
        };

        // Snap intervals: one snap per card transition. On most viewports
        // each snap moves the track by ~CARD_STEP px (480ish); on very
        // tall viewports each snap moves less because there's less total
        // translate to distribute, which is fine — the cards still
        // animate uniformly into view.
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
      // Card fills the viewport on desktop: bottom of section card aligns
      // with the bottom of the screen during pin. Per Fas 5/27: "scroll
      // box should fill the whole page, bottom should match screen
      // bottom." The bottom gap (≈120px below the last card at
      // end-of-scroll) is NOT enforced by capping this height — instead
      // GSAP below calculates `totalTranslate` against the live section
      // height so the last card's bottom edge lands at
      // `sectionHeight - BOTTOM_GAP` regardless of viewport.
      className="max-w-[1384px] mx-auto h-auto lg:h-[calc(100vh-64px)] border border-[#c4c4c4] rounded-[30px] overflow-hidden relative isolate"
    >
      {/* Hero background — fills entire card */}
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

      {/* Desktop: scroll-driven product track.
          Per Fas 5/27: "the gap should be shown at first, if I scroll,
          scrolling items take the place, [the gap] should not be shown."
          → an empty gap is visible at the top of the column on first
          render. As the user scrolls, the cards translate upward and
          fill that gap (taking its place). Past full scroll the gap is
          gone — cards have moved up into and past it.

          Implementation:
          - `top-0 bottom-0` keeps the column spanning the section's
            full height (no `top-[180px]` push-down, which Fas rejected:
            "we have to remove top 185px, top should be 0").
          - The column itself has no background, so the hero image
            (z=-10, behind the column) shows through anywhere the
            column's contents don't paint.
          - The TRACK has `pt-[120px]` — that's the gap. At rest, the
            track's top 120px is empty padding (nothing painted) and
            the hero shows through. The first card sits 120px below the
            column top.
          - GSAP scrub translates the track upward. The padding moves
            with it, shrinks visually (clipped at the column's top edge
            by `overflow-hidden`), and the cards naturally take its
            place. Same mechanic OrthoFX uses — no mask required.
          - At progress=1, the padding has fully translated past the
            top edge and the last `END_VISIBLE` cards sit normally in
            the column.
          - No wheel interception — the track's `y` is driven entirely
            by ScrollTrigger as the page scrolls past the pinned
            section. */}
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

      {/* Mobile: products stacked with padding (no pin, no scroll-driven
          animation — would feel awkward on touch + small screens). */}
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
      className="group relative block w-full h-[445px] bg-[#dadada] rounded-[30.593px] overflow-hidden shadow-[0_4px_10.2px_rgba(0,0,0,0.05)] no-underline shrink-0"
    >
      {/* Product image — fills entire card as background, white panel covers the bottom */}
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
          <span className="font-bangers text-dark/30 text-[40px] tracking-[1.5px] uppercase select-none">
            {product.name}
          </span>
        </div>
      )}

      {/* Price tag */}
      <span
        className="absolute top-[39px] left-[228px] inline-flex items-center justify-center px-[10.5px] font-bangers text-[#d7d7d7] text-[20px] leading-[1.4] whitespace-pre z-10"
        style={{ backgroundColor: "rgba(0,0,0,0.6)" }}
      >
        {`$ ${product.price.toFixed(2)}  ${product.shipping}`}
      </span>

      {/* White info panel — covers bottom half, sits above the background image */}
      <div className="absolute inset-x-0 bottom-0 h-[200px] bg-white rounded-[30.593px] overflow-hidden z-5">
        <div className="absolute top-[49px] left-[33px] right-[33px] flex items-end gap-[29.5px]">
          <div className="flex flex-col gap-[11px] flex-1 min-w-0">
            <h3 className="font-bangers text-[#303030] text-[36px] leading-[45px] tracking-[1.08px] uppercase m-0">
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
