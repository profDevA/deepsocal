import Link from "next/link";
import { FaArrowRight, FaArrowDown } from "react-icons/fa6";
import { caseStudies, type CaseStudy } from "@/data/case-studies";
import { getThemeById } from "@/data/socal-themes";

const editorialSlugs = new Set([
  "mental-health-access",
  "salt-and-sand",
  "creative-culture",
  "climate-resilience",
  "ai-digital-access",
]);

export default function WorkGrid() {
  return (
    <section
      id="work"
      className="bg-[#e6e6e6] w-full px-[clamp(20px,4vw,80px)] py-[clamp(60px,8vw,120px)]"
    >
      <div className="max-w-[1380px] mx-auto flex flex-col items-center gap-[clamp(40px,6vw,86px)]">
        <div className="flex flex-col items-center gap-[10px] w-full max-w-[623px] text-center">
          <h2 className="font-quintessential text-dark text-[clamp(20px,2.5vw,32px)] leading-[1.4] tracking-[-1.4px] m-0">
            How We work with SoCal Builders
          </h2>
          <button
            type="button"
            className="bg-dark border border-[#bdbdbd] flex items-center justify-between w-[clamp(240px,30vw,293px)] h-[53px] px-6 text-brand cursor-pointer"
            aria-label="Filter by category — coming soon"
          >
            <span className="font-bangers text-[clamp(20px,2vw,28px)] leading-none">
              All works
            </span>
            <FaArrowDown className="text-base" aria-hidden="true" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-[clamp(24px,4vw,57px)] w-full">
          {caseStudies.slice(0, 12).map((cs) => (
            <CaseStudyCard
              key={cs.slug}
              caseStudy={cs}
              variant={editorialSlugs.has(cs.slug) ? "editorial" : "image"}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

function CaseStudyCard({
  caseStudy,
  variant,
}: {
  caseStudy: CaseStudy;
  variant: "image" | "editorial";
}) {
  if (variant === "editorial") return <EditorialCard caseStudy={caseStudy} />;
  return <ImageCard caseStudy={caseStudy} />;
}

function ImageCard({ caseStudy }: { caseStudy: CaseStudy }) {
  return (
    <Link
      href={`/works/${caseStudy.slug}`}
      className="group block w-full max-w-[406px] mx-auto rounded-[24px] overflow-hidden shadow-[0_5px_37px_rgba(0,0,0,0.18)] bg-[#dadada] transition-transform hover:-translate-y-1 no-underline"
    >
      <article className="relative h-[453px] flex flex-col">
        <div className="relative flex-1 overflow-hidden">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage:
                "radial-gradient(circle at 30% 30%, #c8c8c8 0%, #adadad 60%, #909090 100%)",
            }}
          />
          <div className="absolute inset-0 opacity-30 mix-blend-multiply" style={{
            backgroundImage:
              "repeating-linear-gradient(45deg, transparent 0 12px, rgba(0,0,0,0.06) 12px 14px)",
          }} />

          <span
            className="absolute top-4 right-4 font-bangers text-white text-[14px] leading-[1.4] px-3 py-1 whitespace-nowrap uppercase tracking-wide"
            style={{ backgroundColor: "rgba(17,17,17,0.85)" }}
          >
            {caseStudy.tag}
          </span>
        </div>

        <div className="bg-white h-[204px] rounded-t-[24px] -mt-[24px] relative px-[34px] py-[42px] flex items-end gap-[20px]">
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
        <div
          className="w-[clamp(80px,18%,96px)] h-[clamp(80px,18%,96px)] rounded-full bg-white/50"
          aria-hidden="true"
        />

        <div className="flex flex-col gap-3">
          <h3 className="font-bangers text-dark text-[clamp(40px,5vw,60px)] leading-[1] tracking-[1.8px] uppercase m-0 max-w-[300px]">
            {caseStudy.title}
          </h3>
          <p className="font-inter text-dark text-[16px] leading-[20px] tracking-[0.48px] m-0 max-w-[303px]">
            {caseStudy.subtitle}
          </p>
        </div>

        <span
          className="absolute top-4 right-4 font-bangers text-white text-[14px] leading-[1.4] px-3 py-1 whitespace-nowrap uppercase tracking-wide"
          style={{ backgroundColor: "rgba(17,17,17,0.85)" }}
        >
          {caseStudy.tag}
        </span>
      </article>
    </Link>
  );
}
