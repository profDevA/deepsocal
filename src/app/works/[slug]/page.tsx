import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";


import type { CaseStudy } from "@/data/case-studies";
import CaseStudyCarousel from "@/components/work/CaseStudyCarousel";
import PageFrame from "@/components/layout/PageFrame";
import {
  fetchCaseStudyBySlug,
  fetchCaseStudySlugs,
} from "@/sanity/lib/fetch";

export async function generateStaticParams() {
  const slugs = await fetchCaseStudySlugs();
  return slugs.map((slug) => ({ slug }));
}

type Params = Promise<{ slug: string }>;

export async function generateMetadata({
  params,
}: {
  params: Params;
}): Promise<Metadata> {
  const { slug } = await params;
  const cs = await fetchCaseStudyBySlug(slug);
  if (!cs) return { title: "Case study not found" };
  return {
    title: cs.title,
    description: cs.summary,
  };
}

export default async function CaseStudyPage({ params }: { params: Params }) {
  const { slug } = await params;
  const cs = await fetchCaseStudyBySlug(slug);
  if (!cs) notFound();

  return (
    <div className="bg-white w-full">
      <PageFrame />

      {/* Hero — square, border top + sides; inset from the PageFrame rails (Figma 632:6184) */}
      <div className="w-full px-[20px] pt-[24px] lg:px-[30px] lg:pt-[51px]">
        <CaseStudyHero caseStudy={cs} />
      </div>

      <div className="relative z-1 lg:px-[15px]">
        <CaseStudyMeta caseStudy={cs} />
      </div>

      <div className="pb-[40px]">
        <CaseStudyGallery caseStudy={cs} />
        <CaseStudyVideoBlock caseStudy={cs} />
      </div>
    </div>
  );
}

function CaseStudyHero({ caseStudy }: { caseStudy: CaseStudy }) {
  const heroSrc = caseStudy.heroImage || caseStudy.thumbnailImage;
  return (
    <div className="relative w-full aspect-357/290 lg:aspect-1440/764 bg-[#1f1f1f] overflow-hidden lg:border-t lg:border-x lg:border-[#c4c4c4]">
      {heroSrc ? (
        <Image
          src={heroSrc}
          alt={caseStudy.title}
          fill
          priority
          sizes="100vw"
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
    </div>
  );
}

function CaseStudyMeta({ caseStudy }: { caseStudy: CaseStudy }) {
  return (
    <div className="relative z-1 bg-white mt-[40px] px-[20px] pb-[40px] lg:-mt-[128px] lg:px-[64px] lg:pt-[88px] lg:pb-[64px]">
      {/* Title + subtitle — sits above the content grid */}
      <div className="flex flex-col gap-[5px] lg:gap-[15px] max-w-[533px] mb-[39px] lg:mb-[52px]">
        <h1 className="font-acumin-condensed text-[#1e1e1e] text-[42px] leading-[38px] lg:leading-[50px] tracking-[1.26px] uppercase m-0">
          {caseStudy.title}
        </h1>
        <p className="font-acumin font-normal text-[#1e1e1e] text-[16px] leading-[20px] tracking-[0.48px] m-0">
          {caseStudy.subtitle}
        </p>
      </div>

      {/* Content row: client info | summary | summary */}
      <div className="grid grid-cols-1 lg:grid-cols-[1fr_1fr_1fr] gap-[39px] lg:gap-[70px]">
        <dl className="font-acumin font-normal text-[#1e1e1e] text-[14px] lg:text-[16px] leading-[20px] tracking-[0.42px] lg:tracking-[0.48px] m-0 flex flex-col gap-[2px]">
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
          <div className="flex flex-col gap-[10px] lg:gap-[16px]">
            <h2 className="font-acumin-condensed text-[#1e1e1e] text-[18px] leading-[28px] uppercase m-0">
              Summary
            </h2>
            <p className="font-acumin font-normal text-[#1e1e1e] text-[14px] lg:text-[16px] leading-[20px] tracking-[0.42px] lg:tracking-[0.48px] m-0">
              {caseStudy.summary}
            </p>
          </div>
        )}

        {/* Summary 2 */}
        {caseStudy.summary2 && (
          <div className="flex flex-col gap-[10px] lg:gap-[16px]">
            <h2 className="font-acumin-condensed text-[#1e1e1e] text-[18px] leading-[28px] uppercase m-0">
              Summary
            </h2>
            <p className="font-acumin font-normal text-[#1e1e1e] text-[14px] lg:text-[16px] leading-[20px] tracking-[0.42px] lg:tracking-[0.48px] m-0">
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
    <section className="w-full px-[20px] lg:px-[28px] pb-[60px] flex flex-col gap-[40px]">
      {images.map((src, i) => (
        <div key={src} className="flex flex-col gap-[40px]">
          {/* Thin divider rule above each gallery image (Figma Vector 1147) */}
          <div className="border-t border-[#c5c5c5]" />
          <div className="w-full aspect-364/393 lg:aspect-1380/728 overflow-hidden relative bg-[#1e1e1e] lg:bg-[#eee]">
            <Image
              src={src}
              alt={`${caseStudy.title} — gallery image ${i + 1}`}
              fill
              sizes="(max-width: 1380px) 100vw, 1380px"
              className="object-cover"
            />
            {/* Alternating overlay: even = light, odd = darker (Figma) */}
            <div
              aria-hidden="true"
              className={`absolute inset-0 ${
                i % 2 === 1 ? "bg-[rgba(30,30,30,0.2)]" : "bg-[rgba(0,0,0,0.05)]"
              }`}
            />
          </div>
        </div>
      ))}
      {/* Closing divider below the last image (Figma Vector 1147) */}
      <div className="border-t border-[#c5c5c5]" />
    </section>
  );
}

function CaseStudyVideoBlock({ caseStudy }: { caseStudy: CaseStudy }) {
  // Only show the slider when Sanity actually has carousel images — no
  // hero/gallery fallback.
  const carouselSrcs = caseStudy.carouselImages.filter(Boolean);
  const hasCarousel = carouselSrcs.length > 0;

  return (
    <section className="w-full pb-[60px]">
      {/* Dark band per Figma 632:6244 — full-width, white text */}
      <div className="bg-[#1e1e1e] border-t-[0.75px] border-b-[0.75px] border-[#1e1e1e] px-[23px] py-[60px] lg:px-[41px] lg:py-[54px]">
        <div
          className={`grid grid-cols-1 gap-[41px] lg:gap-[19px] ${
            hasCarousel ? "lg:grid-cols-[642px_1fr]" : ""
          }`}
        >
          {/* Left — image carousel + pagination dots (omitted when no images) */}
          {hasCarousel && (
            <div>
              <CaseStudyCarousel
                images={carouselSrcs}
                title={caseStudy.title}
                onDark
              />
            </div>
          )}

          {/* Right — Impact Metrics + Services (vertical white divider on desktop) */}
          <div
            className={`flex flex-col gap-[18px] ${
              hasCarousel ? "lg:border-l-[0.75px] lg:border-white lg:pl-[14px]" : ""
            }`}
          >
            <div className="flex flex-col gap-[15px]">
              <h2 className="font-acumin-condensed text-white text-[16px] lg:text-[18px] leading-[20px] tracking-[0.48px] lg:tracking-[0.54px] uppercase m-0">
                Impact Metrics
              </h2>
              <p className="font-acumin font-normal text-white text-[14px] lg:text-[16px] leading-[20px] tracking-[0.42px] lg:tracking-[0.48px] m-0">
                {caseStudy.impactMetrics}
              </p>
            </div>
            <ul className="flex flex-col gap-[15px] list-none p-0 m-0">
              <li className="flex items-start gap-[10px] font-acumin font-normal text-white text-[14px] lg:text-[16px] leading-[20px] tracking-[0.42px] lg:tracking-[0.48px]">
                <span aria-hidden="true">&bull;</span>
                <span>Services</span>
              </li>
              {caseStudy.servicesLabel && (
                <li className="flex items-start gap-[10px] font-acumin font-normal text-white text-[14px] lg:text-[16px] leading-[20px] tracking-[0.42px] lg:tracking-[0.48px]">
                  <span aria-hidden="true">&bull;</span>
                  <span>{caseStudy.servicesLabel}</span>
                </li>
              )}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}

