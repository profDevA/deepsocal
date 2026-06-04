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
            Deep Local and SoCal Local are the ideas behind this collection —
            objects, uniforms, and everyday essentials inspired by Southern
            California.
          </p>
        </div>
      </section>

      {/* Hero card with scrollable product carousel */}
      <section className="w-full px-0 lg:px-[28px] pb-[60px] lg:pb-[80px]">
        <ShopHeroCard products={products} heroImage={HERO_IMAGE} />
      </section>

      {/* Editorial brand sections — mobile only (Figma 821:4066). Desktop has
          no design for these yet. */}
      <ShopStory />
    </div>
  );
}

function ShopStory() {
  return (
    <section className="lg:hidden w-full bg-[#1e1e1e] text-white">
      {/* WHY THIS EXISTS */}
      <div className="flex flex-col items-center gap-[10px] text-center px-[22px] pt-[108px] pb-[60px]">
        <h2 className="font-acumin-condensed text-[42px] leading-[50px] tracking-[1.26px] uppercase m-0">
          Why this exists
        </h2>
        <p className="font-acumin font-normal text-[16px] leading-[20px] max-w-[357px] m-0">
          These are not random agency products. The shop holds two connected
          ideas: Deep Local, a personal identity rooted in place, and SoCal
          Local, a community layer celebrating the people, businesses, and
          culture that shape Southern California.
        </p>
      </div>

      {/* DEEP LOCAL + SOCAL LOCAL — inside a top/bottom white-bordered band */}
      <div className="border-t border-b border-white mx-[12px] px-[12px] py-[40px] flex flex-col gap-[40px]">
        <div className="flex flex-col gap-[14px]">
          <h3 className="font-acumin-condensed text-[40px] leading-[50px] tracking-[1.2px] uppercase m-0">
            Deep Local
          </h3>
          <div className="font-acumin font-normal text-[16px] leading-[20px] tracking-[0.48px] flex flex-col gap-[20px] m-0">
            <p className="m-0">Deep Local is about belonging to a place.</p>
            <p className="m-0">
              Not just living here, but understanding the people, systems,
              stories, and environments that shape Southern California.
            </p>
            <p className="m-0">
              These pieces are designed for people who feel connected to where
              they are and invested in where it is going.
            </p>
          </div>
        </div>

        <div className="flex flex-col gap-[14px]">
          <h3 className="font-acumin-condensed text-[40px] leading-[50px] tracking-[1.2px] uppercase m-0">
            SoCal Local
          </h3>
          <div className="font-acumin font-normal text-[16px] leading-[20px] tracking-[0.48px] flex flex-col gap-[20px] m-0">
            <p className="m-0">
              SoCal Local celebrates the communities that make Southern
              California unique.
            </p>
            <ul className="list-disc ps-[24px] flex flex-col m-0">
              <li>Local makers.</li>
              <li>Local businesses.</li>
              <li>Local culture.</li>
              <li>Local stories.</li>
            </ul>
            <p className="m-0">
              Every piece is a small expression of that connection.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
