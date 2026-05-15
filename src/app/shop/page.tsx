import type { Metadata } from "next";
import Link from "next/link";
import { FaArrowRight } from "react-icons/fa6";
import { products, type Product } from "@/data/products";

export const metadata: Metadata = {
  title: "Shop the Look",
  description:
    "DeepSoCal's design-led merch — small-batch goods inspired by Southern California.",
};

export default function ShopPage() {
  return (
    <div className="bg-[#e6e6e6] w-full pt-[clamp(40px,6vw,80px)] pb-[clamp(40px,6vw,80px)] px-[clamp(16px,2vw,28px)]">
      <div className="max-w-[1384px] mx-auto">
        <header className="flex flex-col items-center gap-[clamp(20px,3vw,49px)] text-center mb-[clamp(40px,6vw,80px)] max-w-[799px] mx-auto">
          <h1 className="font-bangers text-dark text-[clamp(48px,8vw,96px)] leading-[0.94] tracking-[clamp(1.5px,0.3vw,2.88px)] uppercase m-0">
            Shop the look
          </h1>
          <p className="font-inter text-dark text-[16px] leading-[20px] tracking-[0.48px] max-w-[482px] m-0">
            Deep SoCal is a design-led technology studio working with local
            businesses, startups, and communities to solve real challenges
            across the region from coastlines to culture to commerce.
          </p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-[3fr_2fr] gap-[clamp(24px,3vw,40px)] items-start">
          <div
            className="relative w-full lg:sticky lg:top-[100px] aspect-[1384/820] rounded-[clamp(20px,2.5vw,30px)] overflow-hidden"
            style={{
              backgroundImage:
                "linear-gradient(140deg, #D9DDD1 0%, #8E8E93 60%, #5E5E5E 100%)",
            }}
          >
            <div className="absolute inset-0 bg-black/10" />
            <div
              className="absolute inset-0 mix-blend-overlay opacity-25"
              style={{
                backgroundImage:
                  "repeating-linear-gradient(45deg, transparent 0 18px, rgba(255,255,255,0.18) 18px 20px)",
              }}
            />
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="font-bangers text-white/30 text-[clamp(40px,7vw,96px)] tracking-[2px] uppercase select-none">
                Shop hero
              </span>
            </div>
          </div>

          <div className="flex flex-col gap-[clamp(24px,3vw,37px)]">
            {products.map((product) => (
              <ProductCard key={product.slug} product={product} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function ProductCard({ product }: { product: Product }) {
  return (
    <Link
      href={`/shop/${product.slug}`}
      className="group block w-full max-w-[399px] mx-auto bg-[#dadada] rounded-[clamp(20px,2vw,30px)] overflow-hidden shadow-[0_4px_12px_rgba(0,0,0,0.1)] transition-transform hover:-translate-y-1 no-underline"
    >
      <article className="relative h-[445px] flex flex-col">
        <div
          className="relative flex-1 overflow-hidden"
          style={{
            backgroundImage: `linear-gradient(160deg, ${product.themeColor} 0%, #c8c8c8 60%, #909090 100%)`,
          }}
        >
          <div
            className="absolute inset-0 opacity-25 mix-blend-multiply"
            style={{
              backgroundImage:
                "repeating-linear-gradient(45deg, transparent 0 12px, rgba(0,0,0,0.06) 12px 14px)",
            }}
          />

          <span
            className="absolute top-4 right-4 font-bangers text-[#d7d7d7] text-[clamp(14px,1.5vw,20px)] leading-[1.4] px-3 py-1 whitespace-pre"
            style={{ backgroundColor: "rgba(0,0,0,0.6)" }}
          >
            {`$ ${product.price.toFixed(2)}  ${product.shipping}`}
          </span>

          <div className="absolute inset-0 flex items-center justify-center">
            <span className="font-bangers text-dark/30 text-[clamp(28px,4vw,48px)] tracking-[1.5px] uppercase select-none">
              {product.name}
            </span>
          </div>
        </div>

        <div className="bg-white h-[200px] rounded-t-[clamp(20px,2vw,30px)] -mt-[24px] relative px-[34px] py-[42px] flex items-end gap-[24px]">
          <div className="flex flex-col gap-[11px] flex-1 min-w-0">
            <h3 className="font-bangers text-[#303030] text-[clamp(28px,3vw,36px)] leading-tight tracking-[1.08px] m-0 uppercase">
              {product.name}
            </h3>
            <p className="font-inter text-dark text-[16px] leading-[20px] tracking-[0.48px] m-0 line-clamp-2">
              {product.description}
            </p>
          </div>
          <FaArrowRight className="text-dark text-[24px] shrink-0 transition-transform group-hover:translate-x-1" />
        </div>
      </article>
    </Link>
  );
}
