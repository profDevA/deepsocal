"use client";

import Image from "next/image";
import Link from "next/link";
import { type CaseStudy } from "@/data/case-studies";

export default function CaseStudyCard({
  caseStudy,
  priority = false,
}: {
  caseStudy: CaseStudy;
  /** Set true for cards likely to be above the fold (improves LCP). */
  priority?: boolean;
}) {
  return (
    <Link
      href={`/works/${caseStudy.slug}`}
      className="group block w-full max-w-[406px] mx-auto overflow-hidden bg-[#dadada] border border-[#b0b0b0] transition-transform hover:-translate-y-1 no-underline isolate"
    >
      <article className="relative h-[453px] flex flex-col">
        <div className="relative flex-1 overflow-hidden">
          {caseStudy.thumbnailImage ? (
            <Image
              src={caseStudy.thumbnailImage}
              alt={caseStudy.title}
              fill
              sizes="(max-width: 768px) 100vw, 406px"
              className="object-cover"
              priority={priority}
            />
          ) : (
            // No thumbnail set in Sanity — neutral placeholder instead of a
            // crashing empty <Image src="">.
            <div
              aria-hidden="true"
              className="absolute inset-0 bg-linear-to-br from-[#cfcfcf] to-[#9a9a9a]"
            />
          )}
          {caseStudy.tag && (
            <span
              className="absolute top-[30px] right-[15px] font-acumin-condensed text-white text-[14px] leading-[1.4] px-[10px] py-[4px] whitespace-nowrap uppercase z-10"
              style={{ backgroundColor: "rgba(51,51,51,0.8)" }}
            >
              {caseStudy.tag}
            </span>
          )}
        </div>

        <div className="card-bottom-panel h-[204px] -mt-[24px] relative px-[34px] pt-[17px] pb-[34px] flex flex-col z-10 bg-white">
          <div className="flex items-end gap-[30px] mt-auto">
            <div className="flex flex-col gap-[11px] flex-1 min-w-0">
              <h3 className="font-acumin-condensed text-[#1e1e1e] text-[32px] leading-[28px] m-0 uppercase">
                {caseStudy.title}
              </h3>
              <p className="font-acumin font-normal text-[#1e1e1e] text-[16px] leading-[20px] tracking-[0.48px] m-0">
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
