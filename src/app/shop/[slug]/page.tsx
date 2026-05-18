import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { FaArrowLeft, FaArrowRight, FaCircleCheck } from "react-icons/fa6";
import {
  products,
  getProductBySlug,
  getRelatedProducts,
  type Product,
} from "@/data/products";

export function generateStaticParams() {
  return products.map((p) => ({ slug: p.slug }));
}

type Params = Promise<{ slug: string }>;

export async function generateMetadata({
  params,
}: {
  params: Params;
}): Promise<Metadata> {
  const { slug } = await params;
  const product = getProductBySlug(slug);
  if (!product) return { title: "Product not found" };
  return {
    title: product.name,
    description: product.description,
  };
}

export default async function ProductDetailPage({ params }: { params: Params }) {
  const { slug } = await params;
  const product = getProductBySlug(slug);
  if (!product) notFound();

  const related = getRelatedProducts(slug);

  return (
    <div className="bg-[#e6e6e6] w-full pt-[clamp(20px,3vw,32px)] pb-[clamp(40px,6vw,80px)] px-[clamp(16px,2vw,28px)]">
      <div className="max-w-[1384px] mx-auto">
        <article className="bg-[#e6e6e6] rounded-[clamp(20px,2.5vw,30px)] border border-[#c4c4c4] overflow-hidden">
          <ProductHero product={product} />
          <ProductMeta product={product} />
        </article>

        {related.length > 0 && (
          <RelatedProducts products={related} />
        )}

        <BackToShop />
      </div>
    </div>
  );
}

function ProductHero({ product }: { product: Product }) {
  const cover = product.images[0];
  const thumbs = product.images.length > 0 ? product.images : [];
  return (
    <div className="relative grid grid-cols-1 md:grid-cols-[1fr_215px] gap-[clamp(20px,3vw,40px)] p-[clamp(20px,4%,80px)]">
      <div
        className="relative aspect-831/743 rounded-[clamp(20px,2.5vw,30px)] overflow-hidden"
        style={{
          backgroundColor: product.themeColor,
          backgroundImage: cover
            ? undefined
            : `linear-gradient(140deg, ${product.themeColor} 0%, #c8c8c8 50%, #909090 100%)`,
        }}
      >
        {cover ? (
          <Image
            src={cover}
            alt={product.name}
            fill
            priority
            sizes="(max-width: 768px) 100vw, 60vw"
            className="object-contain p-[clamp(20px,4%,60px)] mix-blend-multiply"
          />
        ) : (
          <>
            <div
              className="absolute inset-0 opacity-25 mix-blend-multiply"
              style={{
                backgroundImage:
                  "repeating-linear-gradient(45deg, transparent 0 16px, rgba(0,0,0,0.06) 16px 18px)",
              }}
            />
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="font-bangers text-dark/30 text-[clamp(48px,7vw,96px)] tracking-[2px] uppercase select-none">
                {product.name}
              </span>
            </div>
          </>
        )}

        <button
          type="button"
          aria-label="Previous image"
          className="absolute left-[clamp(12px,2%,24px)] top-1/2 -translate-y-1/2 bg-white/90 size-[44px] flex items-center justify-center cursor-pointer hover:bg-white transition-colors rounded-sm"
        >
          <FaArrowLeft className="text-dark text-sm" />
        </button>
        <button
          type="button"
          aria-label="Next image"
          className="absolute right-[clamp(12px,2%,24px)] top-1/2 -translate-y-1/2 bg-white/90 size-[44px] flex items-center justify-center cursor-pointer hover:bg-white transition-colors rounded-sm"
        >
          <FaArrowRight className="text-dark text-sm" />
        </button>

        <div className="absolute right-[clamp(16px,3%,32px)] bottom-[clamp(16px,3%,32px)]">
          <span
            className="font-bangers text-white text-[clamp(16px,2vw,24px)] leading-none px-4 py-2 inline-block"
            style={{ backgroundColor: "rgba(0,0,0,0.6)" }}
          >
            {`$ ${product.price.toFixed(2)}  ${product.shipping}`}
          </span>
        </div>
      </div>

      <div className="flex md:flex-col gap-3 md:gap-4 overflow-x-auto md:overflow-visible no-scrollbar -mx-2 px-2 md:mx-0 md:px-0">
        {[0, 1, 2].map((i) => {
          const src = thumbs[i] ?? cover;
          return (
            <button
              key={i}
              type="button"
              aria-label={`Image ${i + 1}`}
              className="relative shrink-0 size-[88px] sm:size-[clamp(96px,12vw,180px)] md:w-full md:h-auto md:aspect-square rounded-[clamp(12px,1.5vw,20px)] overflow-hidden cursor-pointer border border-[#c4c4c4] hover:border-dark transition-colors"
              style={{
                backgroundColor: product.themeColor,
                backgroundImage: src
                  ? undefined
                  : `linear-gradient(${135 + i * 20}deg, ${product.themeColor} 0%, #c8c8c8 50%, #909090 100%)`,
              }}
            >
              {src && (
                <Image
                  src={src}
                  alt={`${product.name} thumbnail ${i + 1}`}
                  fill
                  sizes="180px"
                  className="object-contain p-2 mix-blend-multiply"
                />
              )}
              <span className="sr-only">Thumbnail {i + 1}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}

function ProductMeta({ product }: { product: Product }) {
  return (
    <div className="bg-[#e6e6e6] px-[clamp(20px,4%,64px)] py-[clamp(40px,5%,60px)] grid grid-cols-1 md:grid-cols-[1fr_1fr_300px] gap-[clamp(32px,4vw,60px)]">
      <div className="flex flex-col gap-[15px]">
        <h1 className="font-bangers text-dark text-[clamp(32px,4vw,48px)] leading-[1.04] tracking-[1.44px] uppercase m-0">
          {product.name}
        </h1>
        <p className="font-inter text-dark text-[16px] leading-[20px] tracking-[0.48px] m-0">
          {product.tagline}
        </p>
        <p className="font-inter text-dark text-[16px] leading-[20px] tracking-[0.48px] m-0 mt-4">
          {product.longDescription}
        </p>
      </div>

      <div className="flex flex-col gap-4">
        <h2 className="font-inter text-dark text-[16px] leading-[20px] tracking-[0.48px] m-0">
          Details
        </h2>
        <ul className="flex flex-col gap-2 list-none p-0 m-0">
          {product.details.map((d) => (
            <li
              key={d}
              className="flex items-start gap-3 font-inter text-dark text-[16px] leading-[20px] tracking-[0.48px]"
            >
              <FaCircleCheck className="text-dark/60 text-[14px] shrink-0 mt-[3px]" />
              <span>{d}</span>
            </li>
          ))}
        </ul>
      </div>

      <AddToCartForm product={product} />
    </div>
  );
}

function AddToCartForm({ product }: { product: Product }) {
  return (
    <div className="flex flex-col gap-4 self-start">
      <label
        htmlFor={`qty-${product.slug}`}
        className="font-inter text-dark text-[12px] leading-none tracking-[0.36px] uppercase m-0"
      >
        Quantity
      </label>
      <input
        id={`qty-${product.slug}`}
        name="quantity"
        type="number"
        min={1}
        max={99}
        defaultValue={1}
        className="bg-white border border-[#c4c4c4] h-[43px] px-4 font-inter text-dark text-[16px] focus:outline-none focus:border-dark"
      />

      <button
        type="button"
        disabled={!product.inStock}
        className="bg-dark text-white font-bangers text-[clamp(18px,2vw,24px)] tracking-wide uppercase h-[44px] px-6 inline-flex items-center justify-center cursor-pointer transition-colors hover:bg-[#333] disabled:opacity-50 disabled:cursor-not-allowed border-none"
        aria-label={`Add ${product.name} to cart — Stripe checkout coming soon`}
      >
        {product.inStock ? "Add to Cart" : "Sold out"}
      </button>

      <p className="font-inter text-dark/70 text-[12px] leading-[16px] tracking-[0.36px] m-0">
        {`$${product.price.toFixed(2)} ${product.shipping.toLowerCase()}. Stripe checkout coming soon.`}
      </p>
    </div>
  );
}

function RelatedProducts({ products }: { products: Product[] }) {
  return (
    <section className="mt-[clamp(40px,5vw,52px)] border-t border-b border-dark py-[clamp(24px,3vw,40px)]">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-[clamp(20px,3vw,40px)]">
        {products.map((p) => (
          <Link
            key={p.slug}
            href={`/shop/${p.slug}`}
            className="group block bg-[#dadada] rounded-[clamp(16px,2vw,26px)] overflow-hidden shadow-[0_4px_10px_rgba(0,0,0,0.1)] transition-transform hover:-translate-y-1 no-underline"
          >
            <article className="flex flex-col h-[clamp(360px,28vw,470px)]">
              <div
                className="relative flex-1"
                style={{
                  backgroundColor: p.themeColor,
                  backgroundImage: p.images[0]
                    ? undefined
                    : `linear-gradient(160deg, ${p.themeColor} 0%, #c8c8c8 60%, #909090 100%)`,
                }}
              >
                {p.images[0] ? (
                  <Image
                    src={p.images[0]}
                    alt={p.name}
                    fill
                    sizes="(max-width: 768px) 100vw, 400px"
                    className="object-contain p-6 mix-blend-multiply"
                  />
                ) : (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="font-bangers text-dark/30 text-[clamp(28px,4vw,48px)] tracking-[1.5px] uppercase select-none">
                      {p.name}
                    </span>
                  </div>
                )}
                <span
                  className="absolute top-4 right-4 font-bangers text-white text-[14px] leading-[1.4] px-3 py-1 whitespace-pre"
                  style={{ backgroundColor: "rgba(0,0,0,0.6)" }}
                >
                  {`$ ${p.price.toFixed(2)}`}
                </span>
              </div>
              <div className="bg-white h-[200px] px-[28px] py-[36px] flex items-end gap-4">
                <div className="flex flex-col gap-2 flex-1 min-w-0">
                  <h3 className="font-bangers text-[#303030] text-[clamp(24px,2.5vw,32px)] leading-tight tracking-[1px] m-0 uppercase">
                    {p.name}
                  </h3>
                  <p className="font-inter text-dark text-[14px] leading-[18px] tracking-[0.4px] m-0 line-clamp-2">
                    {p.description}
                  </p>
                </div>
                <FaArrowRight className="text-dark text-[20px] shrink-0 transition-transform group-hover:translate-x-1" />
              </div>
            </article>
          </Link>
        ))}
      </div>
    </section>
  );
}

function BackToShop() {
  return (
    <div className="mt-[clamp(40px,5vw,52px)] border-b border-dark py-[clamp(24px,3vw,40px)]">
      <Link
        href="/shop"
        className="font-inter font-medium text-dark text-[clamp(18px,2.4vw,24px)] leading-none tracking-[-1.5px] uppercase no-underline inline-flex items-center gap-3 hover:opacity-70 transition-opacity"
      >
        <FaArrowLeft className="text-[18px]" />
        Back to shop
      </Link>
    </div>
  );
}
