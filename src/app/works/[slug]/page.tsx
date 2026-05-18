import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { FaArrowLeft, FaArrowRight, FaPlay } from "react-icons/fa6";
import {
  caseStudies,
  getCaseStudyBySlug,
  getNextCaseStudy,
  getPreviousCaseStudy,
} from "@/data/case-studies";
import { getThemeById } from "@/data/socal-themes";

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

  const theme = getThemeById(cs.editorialTheme);
  const next = getNextCaseStudy(cs.order);
  const prev = getPreviousCaseStudy(cs.order);
  const heroBg = theme?.bgColor ?? "#dadada";

  return (
    <div className="bg-[#e6e6e6] w-full pt-[clamp(20px,3vw,32px)] pb-[clamp(40px,6vw,80px)] px-[clamp(16px,2vw,28px)]">
      <div className="max-w-[1384px] mx-auto">
        <article className="bg-[#e6e6e6] rounded-[clamp(20px,2.5vw,30px)] border border-[#c4c4c4] overflow-hidden">
          <CaseStudyHero caseStudy={cs} heroBg={heroBg} />
          <CaseStudyMeta caseStudy={cs} />
        </article>

        <CaseStudyGalleryImage caseStudy={cs} heroBg={heroBg} />
        <CaseStudyVideoBlock caseStudy={cs} />
        <CaseStudyNav prevSlug={prev?.slug} nextSlug={next?.slug} />
      </div>
    </div>
  );
}

function CaseStudyHero({
  caseStudy,
  heroBg,
}: {
  caseStudy: ReturnType<typeof getCaseStudyBySlug> & object;
  heroBg: string;
}) {
  const heroSrc = caseStudy.heroImage || caseStudy.thumbnailImage;
  return (
    <div className="relative w-full aspect-1416/764 overflow-hidden bg-[#1f1f1f]">
      {heroSrc ? (
        <Image
          src={heroSrc}
          alt={caseStudy.title}
          fill
          priority
          sizes="(max-width: 1416px) 100vw, 1416px"
          className="object-cover"
        />
      ) : (
        <>
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: `linear-gradient(135deg, ${heroBg} 0%, #1f1f1f 60%, #111 100%)`,
            }}
          />
          <div
            className="absolute inset-0 mix-blend-overlay opacity-30"
            style={{
              backgroundImage:
                "repeating-linear-gradient(45deg, transparent 0 18px, rgba(255,255,255,0.08) 18px 20px)",
            }}
          />
        </>
      )}
      <div className="absolute inset-0 bg-linear-to-t from-black/60 via-black/10 to-transparent" />

      <div className="absolute bottom-[clamp(20px,4%,40px)] left-[clamp(20px,4%,52px)] flex flex-wrap gap-[clamp(12px,2vw,37px)] items-center">
        {caseStudy.tags.map((t, i) => (
          <span
            key={`${t}-${i}`}
            className="font-bangers text-[#d7d7d7] text-[clamp(14px,1.6vw,20px)] leading-[1.4] px-[13px] py-1 whitespace-nowrap"
            style={{ backgroundColor: "rgba(0,0,0,0.6)" }}
          >
            {t}
          </span>
        ))}
      </div>
    </div>
  );
}

function CaseStudyMeta({
  caseStudy,
}: {
  caseStudy: ReturnType<typeof getCaseStudyBySlug> & object;
}) {
  return (
    <div className="bg-[#e6e6e6] px-[clamp(20px,4%,64px)] py-[clamp(40px,6%,80px)] grid grid-cols-1 md:grid-cols-[2fr_1.4fr_1.4fr] gap-[clamp(32px,4vw,60px)]">
      <div className="flex flex-col gap-[clamp(20px,3vw,32px)]">
        <div className="flex flex-col gap-[15px]">
          <h1 className="font-bangers text-dark text-[clamp(36px,5vw,52px)] leading-[1.04] tracking-[1.44px] uppercase m-0">
            {caseStudy.title}
          </h1>
          <p className="font-inter text-dark text-[16px] leading-[20px] tracking-[0.48px] m-0">
            {caseStudy.subtitle}
          </p>
        </div>

        <dl className="font-inter text-dark text-[16px] leading-[20px] tracking-[0.48px] m-0 flex flex-col gap-[2px]">
          <div className="flex gap-2">
            <dt className="m-0">( client )</dt>
            <dd className="m-0">{caseStudy.client}</dd>
          </div>
          <div className="flex gap-2">
            <dt className="m-0">( industry )</dt>
            <dd className="m-0">{caseStudy.industry}</dd>
          </div>
          <div className="flex gap-2">
            <dt className="m-0">( scope )</dt>
            <dd className="m-0">{caseStudy.scope}</dd>
          </div>
          <div className="flex gap-2">
            <dt className="m-0">( team )</dt>
            <dd className="m-0">{caseStudy.teamLabel}</dd>
          </div>
        </dl>
      </div>

      <div className="flex flex-col gap-4">
        <h2 className="font-inter text-dark text-[16px] leading-[20px] tracking-[0.48px] m-0">
          Summary
        </h2>
        <p className="font-inter text-dark text-[16px] leading-[20px] tracking-[0.48px] m-0">
          {caseStudy.summary}
        </p>
      </div>

      <div className="flex flex-col gap-4">
        <h2 className="font-inter text-dark text-[16px] leading-[20px] tracking-[0.48px] m-0">
          Summary
        </h2>
        <p className="font-inter text-dark text-[16px] leading-[20px] tracking-[0.48px] m-0">
          {caseStudy.summary2}
        </p>
      </div>
    </div>
  );
}

function CaseStudyGalleryImage({
  caseStudy,
  heroBg,
}: {
  caseStudy: ReturnType<typeof getCaseStudyBySlug> & object;
  heroBg: string;
}) {
  const gallerySrc =
    caseStudy.gallery[0] || caseStudy.heroImage || caseStudy.thumbnailImage;
  return (
    <div className="max-w-[1384px] mx-auto mt-[clamp(40px,5vw,52px)]">
      <div className="w-full aspect-1380/728 rounded-[clamp(20px,2.5vw,30px)] overflow-hidden relative bg-[#1f1f1f]">
        {gallerySrc ? (
          <Image
            src={gallerySrc}
            alt={`${caseStudy.title} — gallery`}
            fill
            sizes="(max-width: 1384px) 100vw, 1384px"
            className="object-cover"
          />
        ) : (
          <>
            <div
              className="absolute inset-0"
              style={{
                backgroundImage: `linear-gradient(160deg, ${heroBg} 0%, #c8c8c8 50%, #909090 100%)`,
              }}
            />
            <div
              className="absolute inset-0 opacity-30 mix-blend-multiply"
              style={{
                backgroundImage:
                  "repeating-linear-gradient(45deg, transparent 0 14px, rgba(0,0,0,0.06) 14px 16px)",
              }}
            />
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="font-bangers text-dark/30 text-[clamp(40px,6vw,72px)] tracking-[2px] uppercase select-none">
                {caseStudy.title}
              </span>
            </div>
          </>
        )}
      </div>

      {caseStudy.gallery.length > 1 && (
        <div className="mt-[clamp(20px,3vw,40px)] grid grid-cols-2 gap-[clamp(16px,2vw,28px)]">
          {caseStudy.gallery.slice(1, 3).map((src, i) => (
            <div
              key={src}
              className="relative aspect-square sm:aspect-4/3 rounded-[clamp(16px,2vw,24px)] overflow-hidden bg-[#1f1f1f]"
            >
              <Image
                src={src}
                alt={`${caseStudy.title} — image ${i + 2}`}
                fill
                sizes="(max-width: 1384px) 50vw, 690px"
                className="object-cover"
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

function CaseStudyVideoBlock({
  caseStudy,
}: {
  caseStudy: ReturnType<typeof getCaseStudyBySlug> & object;
}) {
  return (
    <div className="max-w-[1384px] mx-auto mt-[clamp(40px,5vw,52px)] border-t border-b border-dark py-[clamp(24px,3vw,40px)]">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-[clamp(24px,3vw,40px)] md:divide-x md:divide-dark">
        <div className="flex flex-col gap-[clamp(20px,3vw,30px)] md:pr-[clamp(20px,3vw,40px)]">
          <div className="relative aspect-642/399 rounded-[clamp(20px,2.5vw,30px)] overflow-hidden bg-[#828282]">
            <div className="absolute inset-0 bg-linear-to-br from-[#444] via-[#666] to-[#222]" />
            <div className="absolute inset-0 bg-black/20" />
            <button
              type="button"
              aria-label="Play video"
              className="absolute right-[clamp(12px,3%,24px)] top-1/2 -translate-y-1/2 bg-black/80 size-[44px] flex items-center justify-center cursor-pointer hover:bg-black transition-colors"
            >
              <FaPlay className="text-white text-sm ml-[2px]" />
            </button>
          </div>

          <div className="flex items-center justify-center gap-[15px]">
            {[0, 1, 2, 3, 4, 5, 6].map((i) => (
              <span
                key={i}
                className={`size-[9px] rounded-full border border-dark ${
                  i === 0 ? "bg-dark" : "bg-transparent"
                }`}
              />
            ))}
          </div>
        </div>

        <div className="flex flex-col gap-[clamp(20px,3vw,30px)] md:pl-[clamp(20px,3vw,40px)]">
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
    <div className="max-w-[1384px] mx-auto mt-[clamp(40px,5vw,52px)] border-b border-dark py-[clamp(24px,3vw,40px)]">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <Link
          href={prevSlug ? `/works/${prevSlug}` : "/#work"}
          className="font-inter font-medium text-dark text-[clamp(18px,2.4vw,24px)] leading-none tracking-[-1.5px] uppercase no-underline inline-flex items-center gap-3 hover:opacity-70 transition-opacity"
        >
          <FaArrowLeft className="text-[18px]" />
          {prevSlug ? "Previous" : "Back to Work"}
        </Link>
        <Link
          href={nextSlug ? `/works/${nextSlug}` : "/#work"}
          className="font-inter font-medium text-dark text-[clamp(18px,2.4vw,24px)] leading-none tracking-[-1.5px] uppercase no-underline inline-flex items-center gap-3 hover:opacity-70 transition-opacity"
        >
          {nextSlug ? "Next project" : "Back to Work"}
          <FaArrowRight className="text-[18px]" />
        </Link>
      </div>
    </div>
  );
}
