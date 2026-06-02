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
    <div className="bg-white w-full">
      <PageFrame />

      {/* Title + Description */}
      <section className="w-full px-[20px] pt-[48px] pb-[40px] lg:px-[40px] lg:pt-[80px] lg:pb-[60px] flex flex-col items-center">
        <div className="flex flex-col items-center gap-[17px] lg:gap-[26px] text-center max-w-[1147px]">
          <h1 className="font-acumin-condensed text-[#1e1e1e] text-[38px] leading-[39px] tracking-[1.14px] lg:text-[82px] lg:leading-[88px] lg:tracking-normal uppercase">
            Shop the look
          </h1>
          <p className="font-inter text-[#1e1e1e] text-[14px] leading-[16px] lg:text-[16px] lg:leading-[20px] tracking-[0.42px] lg:tracking-normal max-w-[350px] lg:max-w-[751px]">
            Deep SoCal is a design-led technology studio working with local
            businesses, startups, and communities to solve real challenges
            across the region from coastlines to culture to commerce.
          </p>
        </div>
      </section>

      {/* Hero card with scrollable product carousel */}
      <section className="w-full px-[20px] lg:px-[28px] pb-[60px] lg:pb-[80px]">
        <ShopHeroCard products={products} heroImage={HERO_IMAGE} />
      </section>
    </div>
  );
}
