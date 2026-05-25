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
      <section className="w-full px-[clamp(20px,4vw,80px)] pt-[clamp(40px,6vw,80px)] pb-[clamp(20px,3vw,40px)]">
        <div className="max-w-[1380px] mx-auto flex flex-col items-center gap-[10px] text-center">
          <h2 className="font-quintessential text-dark text-[clamp(20px,2.5vw,32px)] leading-[1.4] tracking-[-1.4px] m-0">
            How We work with SoCal Builders
          </h2>
          <WorkFilterDropdown current={service.id} />
        </div>
      </section>

      {service.heroImage && (
        <section className="w-full px-[clamp(20px,4vw,80px)] pb-[clamp(20px,3vw,40px)]">
          <div className="max-w-[1380px] mx-auto relative aspect-1380/600 rounded-[clamp(20px,2.5vw,30px)] overflow-hidden bg-[#1f1f1f]">
            <Image
              src={service.heroImage}
              alt={`${service.name} — DeepSoCal`}
              fill
              priority
              sizes="(max-width: 1380px) 100vw, 1380px"
              className="object-cover"
            />
            <div className="absolute inset-0 bg-linear-to-t from-black/40 via-transparent to-transparent" />
            <div className="absolute left-[clamp(20px,4%,52px)] bottom-[clamp(20px,4%,40px)]">
              <span
                className="font-bangers text-dark text-[clamp(14px,1.6vw,20px)] leading-[1.4] px-[13px] py-1 inline-block uppercase tracking-wide"
                style={{ backgroundColor: service.themeColor }}
              >
                {service.description}
              </span>
            </div>
          </div>
        </section>
      )}

      <section className="w-full px-[clamp(20px,4vw,80px)] py-[clamp(40px,5vw,60px)]">
        <div className="max-w-[1380px] mx-auto border-t border-b border-dark py-[clamp(40px,5vw,60px)] grid grid-cols-1 md:grid-cols-[447px_1fr] gap-[clamp(24px,4vw,60px)] md:divide-x md:divide-dark">
          <div className="md:pr-12">
            <h1 className="font-bangers text-dark text-[clamp(36px,5vw,52px)] leading-[1.04] tracking-[1.44px] uppercase m-0">
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

      <section className="w-full px-[clamp(20px,4vw,80px)] pb-[clamp(60px,8vw,120px)]">
        <div className="max-w-[1380px] mx-auto flex flex-col gap-[clamp(40px,5vw,60px)]">
          <h2 className="font-bangers text-dark text-[clamp(28px,3.5vw,40px)] leading-[1.04] tracking-[1.2px] uppercase m-0">
            Selected work
          </h2>
          {filtered.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-[clamp(24px,4vw,57px)] w-full">
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

      <section className="w-full px-[clamp(20px,4vw,80px)] pb-[clamp(60px,8vw,120px)]">
        <div className="max-w-[1380px] mx-auto border-t border-dark pt-[clamp(40px,5vw,60px)] flex flex-col items-center gap-[clamp(20px,3vw,32px)] text-center">
          <h3 className="font-bangers text-dark text-[clamp(28px,4vw,48px)] leading-[1.04] tracking-[1.44px] uppercase m-0">
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
