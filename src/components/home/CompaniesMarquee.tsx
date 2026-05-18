import Image from "next/image";
import { companies } from "@/data/companies";

export default function CompaniesMarquee() {
  const loop = [...companies, ...companies];

  return (
    <section
      id="companies"
      aria-label="Companies we've worked with"
      className="bg-[#e6e6e6] border-t border-b border-dark overflow-hidden py-10"
    >
      <div
        className="flex items-center gap-[clamp(40px,5vw,80px)] whitespace-nowrap animate-marquee"
        style={{ width: "max-content" }}
      >
        {loop.map((company, i) => (
          <div
            key={`${company.name}-${i}`}
            className="flex items-center justify-center shrink-0"
          >
            {company.logo ? (
              <Image
                src={company.logo}
                alt={company.name}
                width={140}
                height={40}
                style={{ width: "auto", height: "auto" }}
                className="h-10 max-w-[180px] object-contain opacity-80"
                unoptimized
              />
            ) : (
              <span className="font-bangers text-dark/70 text-[clamp(20px,2vw,28px)] tracking-[1px] leading-none uppercase">
                {company.name}
              </span>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}
