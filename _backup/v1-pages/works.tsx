import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import WorksFilter from "@/components/works/WorksFilter";
import IndustryAccordion from "@/components/works/IndustryAccordion";

export const metadata: Metadata = {
  title: "Work",
  description: "Explore our portfolio of strategic design work across Southern California.",
};

const columns = [
  {
    items: [
      { logo: "/images/logo-1.webp", type: "Campaign Strategy", image: "/images/works-1.jpg" },
      { logo: "/images/logo-4.webp", type: "Campaign Strategy", image: "/images/works-2.jpg" },
      { logo: "/images/logo-4.webp", type: "Campaign Strategy", image: "/images/works-3.jpg" },
      { logo: "/images/logo-4.webp", type: "Campaign Strategy", image: "/images/works-4.jpg" },
    ],
  },
  {
    items: [
      { logo: "/images/logo-2.webp", type: "Strategy + Content + Influencers", image: "/images/works-5.jpg" },
      { logo: "/images/logo-5.webp", type: "Strategy + Influencers", image: "/images/works-6.jpg" },
      { logo: "/images/logo-5.webp", type: "Strategy + Influencers", image: "/images/works-7.jpg" },
      { logo: "/images/logo-5.webp", type: "Strategy + Influencers", image: "/images/works-8.jpg" },
    ],
  },
  {
    items: [
      { logo: "/images/logo-3.webp", type: "Strategy + Content", image: "/images/works-9.jpg" },
      { logo: "/images/logo-6.webp", type: "Strategy + Content Production", image: "/images/works-10.jpg" },
      { logo: "/images/logo-6.webp", type: "Strategy + Content Production", image: "/images/works-11.jpg" },
      { logo: "/images/logo-6.webp", type: "Strategy + Content Production", image: "/images/works-12.jpg" },
    ],
  },
];

export default function WorksPage() {
  return (
    <>
      <section className="pt-3 pb-5 font-druk px-[1.1vw]! max-[1025px]:px-[15px]!">
        <div className="w-full px-0">
          <div className="flex flex-wrap gap-0">
            <div className="w-full">
              <div className="mb-[2.5vw] uppercase">
                <h1 className="text-[5vw] max-[575px]:text-[45px]">Work</h1>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="px-[1.1vw]! max-[1025px]:px-[15px]! mb-6 md:hidden">
        <WorksFilter />
      </section>

      <section className="px-[1.1vw]! max-[1025px]:px-[15px]!">
        <div className="grid w-full grid-cols-1 md:grid-cols-3">
          {columns.map((col, index) => (
            <div
              key={index}
              className="min-w-0 border-dark md:border-r md:border-dark md:last:border-r-0 md:px-[12px] lg:px-[15px] max-md:border-b max-md:border-dark max-md:last:border-b-0"
            >
              <div
                className={`border-t border-dark pt-4 md:pt-5 ${index > 0 ? "max-md:border-t-0" : ""}`}
              >
              {col.items.map((item, ii) => (
                <div className="border-b border-dark" key={ii}>
                  <div className="pt-[clamp(40px,7.25vw,104px)]">
                    <div className="relative aspect-441/221 w-full overflow-hidden">
                      <Link href="/works/forever-a-surfer" className="absolute inset-0 block">
                        <Image
                          src={item.image}
                          alt={item.type}
                          fill
                          className="object-cover"
                          sizes="(max-width: 767px) 100vw, 33vw"
                        />
                      </Link>
                    </div>
                  </div>
                  <div className="flex flex-col items-center gap-2 pb-10 pt-3 max-[575px]:pb-12 max-[575px]:pt-4">
                    <Image
                      src={item.logo}
                      alt={`${item.type} client mark`}
                      width={200}
                      height={30}
                      style={{ width: "auto", height: "auto", maxHeight: "30px" }}
                    />
                    <p className="m-0 text-center font-inter font-medium text-xs uppercase leading-tight text-dark">
                      {item.type}
                    </p>
                  </div>
                </div>
              ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Mobile: stacked heading + accordion rows */}
      <section className="w-full px-[1.1vw]! max-[1025px]:px-[15px]! pt-8 md:hidden">
        <div className="border-t border-b border-dark py-5">
          <h2 className="font-druk text-[48px] uppercase leading-[54.83px] text-dark max-[375px]:text-[36px] max-[375px]:leading-[42px]">
            Our roots are in lifestyle and action sports, but our systems thinking expands across industries
          </h2>
        </div>
        <IndustryAccordion />
      </section>

      {/* Desktop: side-by-side heading + category lists */}
      <section className="hidden md:block w-full pt-12">
        <div className="w-full border-b border-dark">
          <div className="px-[1.1vw]! max-[1025px]:px-[15px]! pb-24 pt-6">
            <div className="flex flex-wrap">
              <div className="w-full lg:w-2/3 md:w-7/12 uppercase">
                <div className="md:pr-6 md:pt-7">
                  <h2 className="font-druk text-[4.25vw] max-w-[82%] leading-none">
                    Our roots are in lifestyle and action sports, but our systems thinking expands across industries
                  </h2>
                </div>
              </div>
              <div className="w-full lg:w-1/3 md:w-5/12">
                <div className="flex flex-wrap">
                  <div className="w-1/2 px-3">
                    <div className="border-t border-dark pt-8">
                      <h6 className="uppercase text-[0.9rem] mb-4">Culture &amp; Community</h6>
                      <ul className="list-none pl-0 text-[70%]">
                        <li className="my-2">Action Sports</li>
                        <li className="my-2">Lifestyle</li>
                        <li className="my-2">Event Planning</li>
                        <li className="my-2">Influencers/Personal Branding</li>
                      </ul>
                      <div className="mt-14 lg:mt-16">
                        <h6 className="uppercase text-[0.9rem] mb-4">Innovation &amp; Sustainability</h6>
                        <ul className="list-none pl-0 text-[70%]">
                          <li className="my-2">Tech Startups</li>
                          <li className="my-2">SaaS</li>
                          <li className="my-2">Environmental Services</li>
                          <li className="my-2">Clean Energy &amp; Renewables</li>
                          <li className="my-2">Education &amp; EdTech</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                  <div className="w-1/2 px-3">
                    <div className="border-t border-dark pt-8">
                      <h6 className="uppercase text-[0.9rem] mb-4">Business &amp; Growth</h6>
                      <ul className="list-none pl-0 text-[70%]">
                        <li className="my-2">Financial Planning</li>
                        <li className="my-2">Finance &amp; Trading</li>
                        <li className="my-2">E-Commerce</li>
                        <li className="my-2">Retail &amp; Consumer Goods</li>
                        <li className="my-2">Real Estate &amp; Development</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
