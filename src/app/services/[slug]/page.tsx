import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { services, getServiceById } from "@/data/services";
import type { ServiceId } from "@/data/case-studies";
import { fetchCaseStudiesByService } from "@/sanity/lib/fetch";
import CaseStudyCard from "@/components/work/CaseStudyCard";
import WorkFilterDropdown from "@/components/work/WorkFilterDropdown";
import ContactCTAButton from "@/components/modals/ContactCTAButton";

export function generateStaticParams() {
  return services.map((s) => ({ slug: s.slug }));
}

type Params = Promise<{ slug: string }>;

export async function generateMetadata({
  params,
}: {
  params: Params;
}): Promise<Metadata> {
  const { slug } = await params;
  const service = getServiceById(slug as ServiceId);
  if (!service) return { title: "Service not found" };
  return {
    title: service.name,
    description: service.description,
  };
}

export default async function ServiceDetailPage({ params }: { params: Params }) {
  const { slug } = await params;
  const service = getServiceById(slug as ServiceId);
  if (!service) notFound();

  const filtered = await fetchCaseStudiesByService(service.id);

  return (
    <div className="bg-[#e6e6e6] w-full">
      <section className="w-full px-[20px] sm:px-[40px] md:px-[60px] lg:px-[80px] pt-[40px] sm:pt-[56px] md:pt-[68px] lg:pt-[80px] pb-[20px] sm:pb-[28px] md:pb-[34px] lg:pb-[40px]">
        <div className="max-w-[1380px] mx-auto flex flex-col items-center gap-[10px] text-center">
          <h2 className="font-quintessential text-dark text-[20px] sm:text-[24px] md:text-[28px] lg:text-[32px] leading-[1.4] tracking-[-1.4px] m-0">
            How We work with SoCal Builders
          </h2>
          <WorkFilterDropdown current={service.id} />
        </div>
      </section>

      {service.heroImage && (
        <section className="w-full px-[20px] sm:px-[40px] md:px-[60px] lg:px-[80px] pb-[20px] sm:pb-[28px] md:pb-[34px] lg:pb-[40px]">
          <div className="max-w-[1380px] mx-auto relative aspect-1380/600 rounded-[20px] sm:rounded-[24px] md:rounded-[30px] overflow-hidden bg-[#1f1f1f]">
            <Image
              src={service.heroImage}
              alt={`${service.name} — DeepSoCal`}
              fill
              priority
              sizes="(max-width: 1380px) 100vw, 1380px"
              className="object-cover"
            />
            <div className="absolute inset-0 bg-linear-to-t from-black/40 via-transparent to-transparent" />
            <div className="absolute left-[20px] sm:left-[32px] md:left-[42px] lg:left-[52px] bottom-[20px] sm:bottom-[28px] md:bottom-[34px] lg:bottom-[40px]">
              <span
                className="font-bangers text-dark text-[14px] sm:text-[16px] md:text-[18px] lg:text-[20px] leading-[1.4] px-[13px] py-1 inline-block uppercase tracking-wide"
                style={{ backgroundColor: service.themeColor }}
              >
                {service.description}
              </span>
            </div>
          </div>
        </section>
      )}

      <section className="w-full px-[20px] sm:px-[40px] md:px-[60px] lg:px-[80px] py-[40px] sm:py-[48px] md:py-[54px] lg:py-[60px]">
        <div className="max-w-[1380px] mx-auto border-t border-b border-dark py-[40px] sm:py-[48px] md:py-[54px] lg:py-[60px] grid grid-cols-1 md:grid-cols-[447px_1fr] gap-[24px] sm:gap-[36px] md:gap-[48px] lg:gap-[60px] md:divide-x md:divide-dark">
          <div className="md:pr-12">
            <h1 className="font-bangers text-dark text-[36px] sm:text-[42px] md:text-[48px] lg:text-[52px] leading-[1.04] tracking-[1.44px] uppercase m-0">
              {service.name}
            </h1>
          </div>
          <div className="md:pl-12 flex flex-col gap-3">
            <p className="font-inter text-dark text-[16px] leading-[20px] tracking-[0.48px] max-w-[742px] m-0">
              {service.longDescription}
            </p>
            {!service.heroImage && (
              <span
                className="self-start font-bangers text-[#d7d7d7] text-[14px] leading-[1.4] px-3 py-1 mt-3 uppercase tracking-wide"
                style={{ backgroundColor: service.themeColor, color: "#1f1c06" }}
              >
                {service.description}
              </span>
            )}
          </div>
        </div>
      </section>

      <section className="w-full px-[20px] sm:px-[40px] md:px-[60px] lg:px-[80px] pb-[60px] sm:pb-[80px] md:pb-[100px] lg:pb-[120px]">
        <div className="max-w-[1380px] mx-auto flex flex-col gap-[40px] sm:gap-[48px] md:gap-[54px] lg:gap-[60px]">
          <h2 className="font-bangers text-dark text-[28px] sm:text-[32px] md:text-[36px] lg:text-[40px] leading-[1.04] tracking-[1.2px] uppercase m-0">
            Selected work
          </h2>
          {filtered.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-[24px] sm:gap-[36px] md:gap-[48px] lg:gap-[57px] w-full">
              {filtered.map((cs) => (
                <CaseStudyCard key={cs.slug} caseStudy={cs} />
              ))}
            </div>
          ) : (
            <p className="font-inter text-dark/70 text-[16px] leading-[20px] tracking-[0.48px] m-0">
              Case studies for this service are coming soon.
            </p>
          )}
        </div>
      </section>

      <section className="w-full px-[20px] sm:px-[40px] md:px-[60px] lg:px-[80px] pb-[60px] sm:pb-[80px] md:pb-[100px] lg:pb-[120px]">
        <div className="max-w-[1380px] mx-auto border-t border-dark pt-[40px] sm:pt-[48px] md:pt-[54px] lg:pt-[60px] flex flex-col items-center gap-[20px] sm:gap-[24px] md:gap-[28px] lg:gap-[32px] text-center">
          <h3 className="font-bangers text-dark text-[28px] sm:text-[36px] md:text-[42px] lg:text-[48px] leading-[1.04] tracking-[1.44px] uppercase m-0">
            Ready to get started?
          </h3>
          <p className="font-inter text-dark text-[16px] leading-[20px] tracking-[0.48px] max-w-[480px] m-0">
            We embed alongside your team to translate {service.name.toLowerCase()} into outcomes your community can feel.
          </p>
          <ContactCTAButton label={service.ctaLabel} />
        </div>
      </section>
    </div>
  );
}
