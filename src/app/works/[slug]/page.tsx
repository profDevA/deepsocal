import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { FaArrowRight } from "react-icons/fa6";
import PageFrame from "@/components/layout/PageFrame";
import {
  caseStudies,
  getCaseStudyBySlug,
  getNextCaseStudy,
  getPreviousCaseStudy,
  type CaseStudy,
} from "@/data/case-studies";

export function generateStaticParams() {
  return caseStudies.map((cs) => ({ slug: cs.slug }));
}

type Params = Promise<{ slug: string }>;

export async function generateMetadata({
  params,
}: {
  params: Params;
}): Promise<Metadata> {
  const { slug } = await params;
  const cs = getCaseStudyBySlug(slug);
  if (!cs) return { title: "Case study not found" };
  return {
    title: cs.title,
    description: cs.summary,
  };
}

export default async function CaseStudyPage({ params }: { params: Params }) {
  const { slug } = await params;
  const cs = getCaseStudyBySlug(slug);
  if (!cs) notFound();

  const next = getNextCaseStudy(cs.order);
  const prev = getPreviousCaseStudy(cs.order);

  return (
    <div className="bg-[#e6e6e6] w-full">
      <PageFrame />

      {/* HERO + META — bordered card wrapping the hero image, with meta block below */}
      <section className="w-full px-[28px] pt-[44px] pb-[40px]">
        <div className="max-w-[1384px] mx-auto">
          <CaseStudyHero caseStudy={cs} />
          <CaseStudyMeta caseStudy={cs} />
        </div>
      </section>

      {/* LARGE PARALLAX IMAGES — two full-bleed cards stacked vertically */}
      <CaseStudyGallery caseStudy={cs} />

      {/* VIDEO + IMPACT/SERVICES — split panel with horizontal dividers */}
      <CaseStudyVideoBlock caseStudy={cs} />

      {/* PREV / NEXT NAV */}
      <CaseStudyNav prevSlug={prev?.slug} nextSlug={next?.slug} />
    </div>
  );
}

function CaseStudyHero({ caseStudy }: { caseStudy: CaseStudy }) {
  const heroSrc = caseStudy.heroImage || caseStudy.thumbnailImage;
  return (
    <div className="relative w-full aspect-1384/764 rounded-[30px] overflow-hidden bg-[#1f1f1f] border border-[#c4c4c4]">
      {heroSrc ? (
        <Image
          src={heroSrc}
          alt={caseStudy.title}
          fill
          priority
          sizes="(max-width: 1384px) 100vw, 1384px"
          className="object-cover"
        />
      ) : (
        <div className="absolute inset-0 bg-linear-to-br from-[#444] via-[#888] to-[#1f1f1f]" />
      )}

      {/* Warm orange overlay per Figma — rgba(223,136,73,0.2) */}
      <div
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none"
        style={{ backgroundColor: "rgba(223,136,73,0.2)" }}
      />

      {/* Tag pills row, anchored to bottom-left of hero */}
      {caseStudy.tags.length > 0 && (
        <div className="absolute left-[64px] bottom-[64px] flex flex-wrap gap-[37px] items-center">
          {caseStudy.tags.map((t, i) => (
            <span
              key={`${t}-${i}`}
              className="font-bangers text-[#d7d7d7] text-[20px] leading-[1.4] px-[13px] py-[2px] whitespace-nowrap"
              style={{ backgroundColor: "rgba(0,0,0,0.6)" }}
            >
              {t}
            </span>
          ))}
        </div>
      )}
    </div>
  );
}

function CaseStudyMeta({ caseStudy }: { caseStudy: CaseStudy }) {
  return (
    <div className="bg-[#e6e6e6] px-[64px] pt-[88px] pb-[64px]">
      {/* Title + subtitle — sits above the content grid */}
      <div className="flex flex-col gap-[15px] max-w-[533px] mb-[52px]">
        <h1 className="font-bangers text-dark text-[48px] leading-[50px] tracking-[1.44px] uppercase m-0">
          {caseStudy.title}
        </h1>
        <p className="font-inter text-dark text-[16px] leading-[20px] tracking-[0.48px] m-0">
          {caseStudy.subtitle}
        </p>
      </div>

      {/* Content row: client info | summary | summary */}
      <div className="grid grid-cols-1 md:grid-cols-[1fr_1fr_1fr] gap-[80px]">
        <dl className="font-inter text-dark text-[16px] leading-[20px] tracking-[0.48px] m-0 flex flex-col gap-[2px]">
          {caseStudy.client && (
            <div className="flex flex-wrap gap-1">
              <dt className="m-0">( client )</dt>
              <dd className="m-0">{caseStudy.client}</dd>
            </div>
          )}
          {caseStudy.industry && (
            <div className="flex flex-wrap gap-1">
              <dt className="m-0">( industry )</dt>
              <dd className="m-0">{caseStudy.industry}</dd>
            </div>
          )}
          {caseStudy.scope && (
            <div className="flex flex-wrap gap-1">
              <dt className="m-0">( scope )</dt>
              <dd className="m-0">{caseStudy.scope}</dd>
            </div>
          )}
          {caseStudy.teamLabel && (
            <div className="flex flex-wrap gap-1">
              <dt className="m-0">( team )</dt>
              <dd className="m-0">{caseStudy.teamLabel}</dd>
            </div>
          )}
        </dl>

        {/* Summary 1 */}
        {caseStudy.summary && (
          <div className="flex flex-col gap-[16px]">
            <h2 className="font-inter text-dark text-[16px] leading-[20px] tracking-[0.48px] m-0">
              Summary
            </h2>
            <p className="font-inter text-dark text-[16px] leading-[20px] tracking-[0.48px] m-0">
              {caseStudy.summary}
            </p>
          </div>
        )}

        {/* Summary 2 */}
        {caseStudy.summary2 && (
          <div className="flex flex-col gap-[16px]">
            <h2 className="font-inter text-dark text-[16px] leading-[20px] tracking-[0.48px] m-0">
              Summary
            </h2>
            <p className="font-inter text-dark text-[16px] leading-[20px] tracking-[0.48px] m-0">
              {caseStudy.summary2}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

function CaseStudyGallery({ caseStudy }: { caseStudy: CaseStudy }) {
  const images = caseStudy.gallery.filter(Boolean);
  if (images.length === 0) return null;

  return (
    <section className="w-full px-[28px] pb-[60px] flex flex-col gap-[40px]">
      {images.slice(0, 2).map((src, i) => (
        <div
          key={src}
          className="max-w-[1380px] mx-auto w-full aspect-1380/728 rounded-[30px] overflow-hidden relative bg-[#eee]"
        >
          <Image
            src={src}
            alt={`${caseStudy.title} — gallery image ${i + 1}`}
            fill
            sizes="(max-width: 1380px) 100vw, 1380px"
            className="object-cover"
          />
          <div
            aria-hidden="true"
            className={`absolute inset-0 ${
              i === 1 ? "bg-[rgba(0,0,0,0.2)]" : "bg-[rgba(0,0,0,0.05)]"
            }`}
          />
        </div>
      ))}
    </section>
  );
}

function CaseStudyVideoBlock({ caseStudy }: { caseStudy: CaseStudy }) {
  const posterSrc = caseStudy.gallery[0] || caseStudy.heroImage;

  return (
    <section className="w-full px-[28px] pb-[60px]">
      <div className="max-w-[1381px] mx-auto border-t border-b border-dark py-[20px]">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-0 md:gap-[28px] md:divide-x md:divide-dark">
          {/* Left — video poster + pagination dots */}
          <div className="flex flex-col gap-[24px] md:pr-[28px]">
            <div className="relative aspect-642/399 rounded-[30px] overflow-hidden bg-[#828282]">
              {posterSrc ? (
                <Image
                  src={posterSrc}
                  alt={`${caseStudy.title} — video preview`}
                  fill
                  sizes="(max-width: 768px) 100vw, 642px"
                  className="object-cover"
                />
              ) : (
                <div className="absolute inset-0 bg-linear-to-br from-[#444] via-[#666] to-[#222]" />
              )}

              {/* Next-slide arrow button anchored to right edge */}
              <button
                type="button"
                aria-label="Next slide"
                className="absolute right-0 top-1/2 -translate-y-1/2 h-[38px] w-[45px] flex items-center justify-center cursor-pointer border-none transition-colors hover:bg-black"
                style={{ backgroundColor: "rgba(2,2,2,0.8)" }}
              >
                <FaArrowRight className="text-white text-[14px]" />
              </button>
            </div>

            {/* Pagination dots — 7 dots, first one filled */}
            <div className="flex items-center justify-center gap-[15px]">
              {Array.from({ length: 7 }, (_, i) => (
                <span
                  key={i}
                  className={`size-[9.184px] rounded-full border border-dark ${
                    i === 0 ? "bg-dark" : "bg-transparent"
                  }`}
                />
              ))}
            </div>
          </div>

          {/* Right — Impact Metrics + Services */}
          <div className="flex flex-col gap-[30px] md:pl-[28px] pt-[20px] md:pt-0">
            <div className="flex flex-col gap-[15px]">
              <h2 className="font-inter text-dark text-[16px] leading-[20px] tracking-[0.48px] m-0">
                Impact Metrics
              </h2>
              <p className="font-inter text-dark text-[16px] leading-[20px] tracking-[0.48px] m-0">
                {caseStudy.impactMetrics}
              </p>
            </div>
            <div className="flex flex-col gap-[15px]">
              <h2 className="font-inter text-dark text-[16px] leading-[20px] tracking-[0.48px] m-0">
                Services
              </h2>
              <p className="font-inter text-dark text-[16px] leading-[20px] tracking-[0.48px] m-0">
                {caseStudy.servicesLabel}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function CaseStudyNav({
  prevSlug,
  nextSlug,
}: {
  prevSlug?: string;
  nextSlug?: string;
}) {
  return (
    <section className="w-full px-[28px] pb-[40px]">
      <div className="max-w-[1411px] mx-auto border-b-[0.75px] border-dark py-[28px]">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <Link
            href={prevSlug ? `/works/${prevSlug}` : "/#work"}
            className="font-inter font-medium text-dark text-[24px] leading-none tracking-[-2.4px] uppercase underline decoration-solid no-underline-hover:no-underline hover:opacity-70 transition-opacity"
            style={{ textDecorationLine: "underline" }}
          >
            Back to Work
          </Link>
          <Link
            href={nextSlug ? `/works/${nextSlug}` : "/#work"}
            className="font-inter font-medium text-dark text-[24px] leading-none tracking-[-2.4px] uppercase hover:opacity-70 transition-opacity"
            style={{ textDecorationLine: "underline" }}
          >
            {nextSlug ? "Next project" : "Back to Work"}
          </Link>
        </div>
      </div>
    </section>
  );
}
