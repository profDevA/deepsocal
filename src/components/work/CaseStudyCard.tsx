"use client";

import Image from "next/image";
import Link from "next/link";
import { type CaseStudy } from "@/data/case-studies";
import { getThemeById } from "@/data/socal-themes";

export type CardVariant = "image" | "editorial";

export function pickVariant(caseStudy: CaseStudy): CardVariant {
  return caseStudy.thumbnailImage ? "image" : "editorial";
}

// Editorial card colors per Figma 566:1642 (5/28 pivot). Image cards keep
// a white bottom panel; only editorial cards get the cream + border.
const EDITORIAL_BG = "#EDECE1";
const EDITORIAL_BORDER = "#B0B0B0";

export default function CaseStudyCard({
  caseStudy,
  variant = pickVariant(caseStudy),
  priority = false,
}: {
  caseStudy: CaseStudy;
  variant?: CardVariant;
  /** Set true for cards likely to be above the fold (improves LCP). */
  priority?: boolean;
}) {
  if (variant === "editorial") return <EditorialCard caseStudy={caseStudy} />;
  return <ImageCard caseStudy={caseStudy} priority={priority} />;
}

function ImageCard({
  caseStudy,
  priority,
}: {
  caseStudy: CaseStudy;
  priority: boolean;
}) {
  return (
    <Link
      href={`/works/${caseStudy.slug}`}
      className="group block w-full max-w-[406px] mx-auto overflow-hidden shadow-[0_5.42px_37.4px_rgba(0,0,0,0.25)] bg-[#dadada] transition-transform hover:-translate-y-1 no-underline isolate"
    >
      <article className="relative h-[453px] flex flex-col">
        <div className="relative flex-1 overflow-hidden">
          <Image
            src={caseStudy.thumbnailImage}
            alt={caseStudy.title}
            fill
            sizes="(max-width: 768px) 100vw, 406px"
            className="object-cover"
            priority={priority}
          />
        </div>

        <div className="card-bottom-panel h-[204px] -mt-[24px] relative px-[34px] pt-[17px] pb-[34px] flex flex-col z-10 bg-white">
          <span
            className="self-end font-acumin-condensed text-white text-[20px] leading-[1.4] px-[13px] py-0.5 whitespace-nowrap uppercase"
            style={{ backgroundColor: "rgba(17,17,17,0.8)" }}
          >
            {caseStudy.tag}
          </span>

          <div className="flex items-end gap-[30px] mt-auto">
            <div className="flex flex-col gap-[11px] flex-1 min-w-0">
              <h3 className="font-acumin-condensed text-dark text-[36px] leading-[45px] tracking-[1.08px] m-0 uppercase">
                {caseStudy.title}
              </h3>
              <p className="font-inter text-[#3a3a3a] text-[16px] leading-[20px] tracking-[0.48px] m-0">
                {caseStudy.subtitle}
              </p>
            </div>
            <Image
              src="/images/icons/arrow-right-down.svg"
              alt=""
              width={35}
              height={31}
              className="shrink-0 transition-transform group-hover:translate-x-1"
            />
          </div>
        </div>
      </article>
    </Link>
  );
}

function EditorialCard({ caseStudy }: { caseStudy: CaseStudy }) {
  const theme = getThemeById(caseStudy.editorialTheme);
  const badgeImage = theme?.badgeImage ?? "/images/badges/ocean-environment.png";

  return (
    <Link
      href={`/works/${caseStudy.slug}`}
      className="group block w-full max-w-[406px] mx-auto overflow-hidden shadow-[0_5px_37px_rgba(0,0,0,0.18)] border transition-transform hover:-translate-y-1 no-underline"
      style={{ backgroundColor: EDITORIAL_BG, borderColor: EDITORIAL_BORDER }}
    >
      <article className="relative h-[453px] p-[31px] flex flex-col">
        <div className="relative w-[94px] h-[96px] rounded-full overflow-hidden">
          <Image
            src={badgeImage}
            alt=""
            fill
            sizes="96px"
            className="object-cover"
          />
        </div>

        <h3 className="font-acumin-condensed text-dark text-[40px] leading-[42px] tracking-[1.2px] uppercase m-0 max-w-[329px] mt-auto">
          {caseStudy.title}
        </h3>
        <p className="font-inter text-dark text-[16px] leading-[20px] tracking-[0.48px] m-0 max-w-[321px] mt-4">
          {caseStudy.subtitle}
        </p>
      </article>
    </Link>
  );
}
