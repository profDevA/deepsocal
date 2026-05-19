"use client";

import Image from "next/image";
import Link from "next/link";
import { type CaseStudy } from "@/data/case-studies";
import { getThemeById } from "@/data/socal-themes";
import { themeIcons } from "@/data/theme-icons";

export type CardVariant = "image" | "editorial";

export function pickVariant(caseStudy: CaseStudy): CardVariant {
  return caseStudy.thumbnailImage ? "image" : "editorial";
}

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
  const theme = getThemeById(caseStudy.editorialTheme);
  const hoverBg = theme?.bgColor ?? "#ffffff";

  return (
    <Link
      href={`/works/${caseStudy.slug}`}
      className="group block w-full max-w-[406px] mx-auto rounded-[24px] overflow-hidden shadow-[0_5px_37px_rgba(0,0,0,0.18)] bg-[#dadada] transition-transform hover:-translate-y-1 no-underline"
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

        <div
          className="card-bottom-panel h-[204px] rounded-t-[24px] -mt-[24px] relative px-[34px] pt-[16px] pb-[34px] flex flex-col z-10 transition-colors duration-300"
          style={{ backgroundColor: "white", "--hover-bg": hoverBg } as React.CSSProperties}
        >
          <span
            className="self-end font-bangers text-white text-[16px] leading-[1.4] px-[13px] py-0.5 whitespace-nowrap uppercase"
            style={{ backgroundColor: "rgba(17,17,17,0.8)" }}
          >
            {caseStudy.tag}
          </span>

          <div className="flex items-end gap-[30px] mt-auto">
            <div className="flex flex-col gap-[11px] flex-1 min-w-0">
              <h3 className="font-bangers text-[#303030] text-[36px] leading-[45px] tracking-[1.08px] m-0 uppercase">
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
  const bgColor = theme?.bgColor ?? "#dadada";
  const iconPath = themeIcons[caseStudy.editorialTheme] ?? themeIcons.culture;

  return (
    <Link
      href={`/works/${caseStudy.slug}`}
      className="group block w-full max-w-[406px] mx-auto rounded-[24px] overflow-hidden shadow-[0_5px_37px_rgba(0,0,0,0.18)] border border-[#b0b0b0] transition-transform hover:-translate-y-1 no-underline"
      style={{ backgroundColor: bgColor }}
    >
      <article className="relative h-[453px] p-[31px] flex flex-col">
        <div className="w-[94px] h-[96px] rounded-full bg-white/40 flex items-center justify-center">
          <svg
            viewBox="0 0 24 24"
            width="40"
            height="40"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="text-dark/70"
          >
            <path d={iconPath} />
          </svg>
        </div>

        <h3 className="font-bangers text-dark text-[60px] leading-[60px] tracking-[1.8px] uppercase m-0 max-w-[329px] mt-auto">
          {caseStudy.title}
        </h3>
        <p className="font-inter text-dark text-[16px] leading-[20px] tracking-[0.48px] m-0 max-w-[321px] mt-4">
          {caseStudy.subtitle}
        </p>
      </article>
    </Link>
  );
}
