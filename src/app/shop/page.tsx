import type { Metadata } from "next";
import PageFrame from "@/components/layout/PageFrame";
import ShopHeroCard from "@/components/shop/ShopHeroCard";
import { products } from "@/data/products";

export const metadata: Metadata = {
  title: "Shop the Look",
  description:
    "DeepSoCal's design-led merch — small-batch goods inspired by Southern California.",
};

const HERO_IMAGE = "/images/shop/shop-main-bg.png";

export default function ShopPage() {
  return (
    <div className="bg-[#e6e6e6] w-full">
      <PageFrame />

      {/* Title + Description */}
      <section className="w-full px-[40px] pt-[80px] pb-[60px] flex flex-col items-center">
        <div className="flex flex-col items-center gap-[49px] text-center max-w-[799px]">
          <h1 className="font-acumin-condensed text-dark text-[96px] leading-[90px] tracking-[2.88px] uppercase">
            Shop the look
          </h1>
          <p className="font-inter text-dark text-[16px] leading-[20px] tracking-[0.48px] max-w-[482px]">
            Deep SoCal is a design-led technology studio working with local
            businesses, startups, and communities to solve real challenges
            across the region from coastlines to culture to commerce.
          </p>
        </div>
      </section>

      {/* Hero card with scrollable product carousel */}
      <section className="w-full px-[14px] lg:px-[28px] pb-[80px]">
        <ShopHeroCard products={products} heroImage={HERO_IMAGE} />
      </section>
    </div>
  );
}
