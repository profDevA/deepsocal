import { caseStudies } from "@/data/case-studies";
import CaseStudyCard from "@/components/work/CaseStudyCard";
import WorkFilterDropdown from "@/components/work/WorkFilterDropdown";

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
          <WorkFilterDropdown />
        </div>

        <div className="work-grid-hover grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-[clamp(24px,4vw,57px)] w-full">
          {caseStudies.slice(0, 12).map((cs) => (
            <CaseStudyCard key={cs.slug} caseStudy={cs} />
          ))}
        </div>
      </div>
    </section>
  );
}
