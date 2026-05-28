import Image from "next/image";
import { companies } from "@/data/companies";

// Infinite-loop trick: render the logo list twice in a `width: max-content`
// track, then translate by -50%. The second copy lands where the first
// started, so the snap back to 0% is invisible.
export default function CompaniesMarquee() {
  return (
    <section
      id="companies"
      aria-label="Companies we've worked with"
      className="bg-[#e6e6e6] overflow-hidden"
    >
      <div className="mx-[25px] border-t border-b border-dark py-9">
        <div
          className="flex items-center gap-[36px] sm:gap-[42px] md:gap-[48px] lg:gap-[54px] whitespace-nowrap animate-marquee"
          style={{ width: "max-content" }}
        >
          {[...companies, ...companies].map((company, i) => (
            <div
              key={`${company.name}-${i}`}
              className="flex items-center justify-center shrink-0"
              aria-hidden={i >= companies.length ? "true" : undefined}
            >
              {company.logo ? (
                <Image
                  src={company.logo}
                  alt={i >= companies.length ? "" : company.name}
                  width={140}
                  height={40}
                  style={{ width: "auto", height: "auto" }}
                  className="h-10 max-w-[180px] object-contain"
                  unoptimized
                />
              ) : (
                <span className="font-acumin-condensed text-dark text-[20px] sm:text-[24px] md:text-[28px] tracking-[1px] leading-none uppercase">
                  {company.name}
                </span>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
