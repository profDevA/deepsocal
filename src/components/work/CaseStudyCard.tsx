import Image from "next/image";
import Link from "next/link";
import { FaArrowRight } from "react-icons/fa6";
import { type CaseStudy } from "@/data/case-studies";
import { getThemeById } from "@/data/socal-themes";

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

          <span
            className="absolute top-4 right-4 font-bangers text-white text-[14px] leading-[1.4] px-3 py-1 whitespace-nowrap uppercase tracking-wide z-10"
            style={{ backgroundColor: "rgba(17,17,17,0.85)" }}
          >
            {caseStudy.tag}
          </span>
        </div>

        <div className="bg-white h-[204px] rounded-t-[24px] -mt-[24px] relative px-[34px] py-[42px] flex items-end gap-[20px] z-10">
          <div className="flex flex-col gap-[11px] flex-1 min-w-0">
            <h3 className="font-bangers text-[#303030] text-[clamp(28px,3vw,36px)] leading-[1.05] tracking-[1.08px] m-0 uppercase">
              {caseStudy.title}
            </h3>
            <p className="font-inter text-[#3a3a3a] text-[16px] leading-[20px] tracking-[0.48px] m-0">
              {caseStudy.subtitle}
            </p>
          </div>
          <FaArrowRight className="text-dark text-[24px] shrink-0 transition-transform group-hover:translate-x-1" />
        </div>
      </article>
    </Link>
  );
}

function EditorialCard({ caseStudy }: { caseStudy: CaseStudy }) {
  const theme = getThemeById(caseStudy.editorialTheme);
  const bgColor = theme?.bgColor ?? "#dadada";
  return (
    <Link
      href={`/works/${caseStudy.slug}`}
      className="group block w-full max-w-[406px] mx-auto rounded-[24px] overflow-hidden shadow-[0_5px_37px_rgba(0,0,0,0.18)] border border-[#b0b0b0] transition-transform hover:-translate-y-1 no-underline"
      style={{ backgroundColor: bgColor }}
    >
      <article className="relative h-[453px] p-[clamp(24px,4%,32px)] flex flex-col justify-between">
        <div className="relative w-[clamp(80px,18%,96px)] h-[clamp(80px,18%,96px)] rounded-full overflow-hidden bg-white/40">
          <Image
            src="/images/icons/editorial-thumb.png"
            alt=""
            fill
            sizes="96px"
            className="object-cover"
          />
        </div>

        <div className="flex flex-col gap-3">
          <h3 className="font-bangers text-dark text-[clamp(40px,5vw,60px)] leading-none tracking-[1.8px] uppercase m-0 max-w-[300px]">
            {caseStudy.title}
          </h3>
          <p className="font-inter text-dark text-[16px] leading-[20px] tracking-[0.48px] m-0 max-w-[303px]">
            {caseStudy.subtitle}
          </p>
        </div>
      </article>
    </Link>
  );
}
