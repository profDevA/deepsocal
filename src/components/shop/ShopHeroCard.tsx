"use client";

import { useRef, useState, useCallback, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { FaArrowRight } from "react-icons/fa6";
import gsap from "gsap";
import { type Product } from "@/data/products";

const CARD_HEIGHT = 445;
const CARD_GAP = 37;
const CARD_STEP = CARD_HEIGHT + CARD_GAP;
const ANIM_DURATION = 0.55;
const WHEEL_COOLDOWN = 500;

interface ShopHeroCardProps {
  products: Product[];
  heroImage: string;
}

export default function ShopHeroCard({
  products,
  heroImage,
}: ShopHeroCardProps) {
  const trackRef = useRef<HTMLDivElement>(null);
  const scrollAreaRef = useRef<HTMLDivElement>(null);
  const activeRef = useRef(0);
  const animatingRef = useRef(false);
  const lastWheelRef = useRef(0);
  const [activeIndex, setActiveIndex] = useState(0);

  const goToIndex = useCallback(
    (index: number) => {
      const clamped = Math.max(0, Math.min(index, products.length - 1));
      if (clamped === activeRef.current || animatingRef.current) return;

      animatingRef.current = true;
      activeRef.current = clamped;
      setActiveIndex(clamped);

      gsap.to(trackRef.current, {
        y: -clamped * CARD_STEP,
        duration: ANIM_DURATION,
        ease: "power2.out",
        onComplete: () => {
          animatingRef.current = false;
        },
      });
    },
    [products.length],
  );

  useEffect(() => {
    const el = scrollAreaRef.current;
    if (!el) return;

    const onWheel = (e: WheelEvent) => {
      e.preventDefault();
      const now = Date.now();
      if (now - lastWheelRef.current < WHEEL_COOLDOWN) return;
      lastWheelRef.current = now;

      if (e.deltaY > 0) goToIndex(activeRef.current + 1);
      else if (e.deltaY < 0) goToIndex(activeRef.current - 1);
    };

    el.addEventListener("wheel", onWheel, { passive: false });
    return () => el.removeEventListener("wheel", onWheel);
  }, [goToIndex]);

  // Touch/swipe support
  useEffect(() => {
    const el = scrollAreaRef.current;
    if (!el) return;
    let startY = 0;

    const onTouchStart = (e: TouchEvent) => {
      startY = e.touches[0].clientY;
    };
    const onTouchEnd = (e: TouchEvent) => {
      const deltaY = startY - e.changedTouches[0].clientY;
      if (Math.abs(deltaY) < 40) return;
      if (deltaY > 0) goToIndex(activeRef.current + 1);
      else goToIndex(activeRef.current - 1);
    };

    el.addEventListener("touchstart", onTouchStart, { passive: true });
    el.addEventListener("touchend", onTouchEnd, { passive: true });
    return () => {
      el.removeEventListener("touchstart", onTouchStart);
      el.removeEventListener("touchend", onTouchEnd);
    };
  }, [goToIndex]);

  return (
    <div className="max-w-[1384px] mx-auto h-auto lg:h-[1162px] border border-[#c4c4c4] rounded-[30px] overflow-hidden relative isolate">
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

      {/* Desktop: GSAP-animated product slider */}
      <div
        ref={scrollAreaRef}
        className="hidden lg:block absolute top-[85px] bottom-0 right-[91px] w-[399px] overflow-hidden z-10"
      >
        <div ref={trackRef} className="flex flex-col gap-[37px]">
          {products.map((product) => (
            <ProductCard key={product.slug} product={product} />
          ))}
        </div>
      </div>

      {/* Mobile: products stacked with padding */}
      <div className="lg:hidden flex flex-col gap-[20px] p-[20px] relative z-10">
        {products.map((product) => (
          <ProductCard key={product.slug} product={product} />
        ))}
      </div>

      {/* Pagination dots — rotated -90° vertical, tracks active product */}
      <div className="hidden lg:flex absolute right-[26px] top-1/2 -translate-y-1/2 z-20">
        <div className="-rotate-90 flex items-center gap-[15px]">
          {products.map((_, i) => (
            <button
              key={i}
              type="button"
              aria-label={`Show product ${i + 1}`}
              onClick={() => goToIndex(i)}
              className={`size-[9.184px] rounded-full border-[0.765px] border-white cursor-pointer transition-colors duration-300 p-0 ${
                i === activeIndex
                  ? "bg-white"
                  : "bg-transparent hover:bg-white/50"
              }`}
            />
          ))}
        </div>
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
      <div className="absolute inset-x-0 bottom-0 h-[200px] bg-white rounded-[30.593px] overflow-hidden z-[5]">
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
