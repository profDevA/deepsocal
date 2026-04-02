import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Work",
  description: "Explore our portfolio of strategic design work across Southern California.",
};

const columns = [
  {
    header: { left: "Featured", right: "Design" },
    items: [
      { logo: "/images/logo-1.webp", type: "Campaign Strategy", image: "/images/works-1.jpg" },
      { logo: "/images/logo-4.webp", type: "Campaign Strategy", image: "/images/works-2.jpg" },
      { logo: "/images/logo-4.webp", type: "Campaign Strategy", image: "/images/works-3.jpg" },
      { logo: "/images/logo-4.webp", type: "Campaign Strategy", image: "/images/works-4.jpg" },
    ],
  },
  {
    header: { left: "Featured", right: "Design" },
    items: [
      { logo: "/images/logo-2.webp", type: "Strategy + Content + Influencers", image: "/images/works-5.jpg" },
      { logo: "/images/logo-5.webp", type: "Strategy + Influencers", image: "/images/works-6.jpg" },
      { logo: "/images/logo-5.webp", type: "Strategy + Influencers", image: "/images/works-7.jpg" },
      { logo: "/images/logo-5.webp", type: "Strategy + Influencers", image: "/images/works-8.jpg" },
    ],
  },
  {
    header: { left: "Featured", right: "Design" },
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
                <h1 className="text-[5vw] max-[575px]:text-[45px]">Works</h1>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="px-[1.1vw]! max-[1025px]:px-[15px]!">
        <div className="w-full px-0">
          <div className="flex flex-wrap">
            {columns.map((col, ci) => (
              <div className="w-full sm:w-1/3" key={ci}>
                <div className={`uppercase relative${ci < columns.length - 1 ? " after:content-[''] after:absolute after:w-px after:h-[calc(100%-50px)] after:right-[-12px] after:bg-[#111] after:top-[40px] max-[575px]:after:content-none!" : ""}`}>
                  <div className="border-b border-[#111] pb-[5px] text-[65%] flex justify-between">
                    <p className="m-0">{col.header.left}</p>
                    <p className="m-0">{col.header.right}</p>
                  </div>
                  {col.items.map((item, ii) => (
                    <div className="border-b border-[#111] pb-[25px]" key={ii}>
                      <div className="mt-[2em] mb-[5em] max-[575px]:mt-5 max-[575px]:mb-[60px] text-center">
                        <img src={item.logo} alt="client logo" className="max-h-[30px]" />
                      </div>
                      <div className="text-[65%] mb-3">
                        <p className="m-0 text-center">{item.type}</p>
                      </div>
                      <div>
                        <Link href="/works/forever-a-surfer">
                          <img src={item.image} className="w-full" alt="project work" />
                        </Link>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="px-[1.1vw]! max-[1025px]:px-[15px]! pt-20 max-[767px]:pt-12">
        <div className="border-t border-b border-[#111] pt-4 pb-24">
          <div className="w-full px-0">
            <div className="flex flex-wrap">
              <div className="w-full lg:w-2/3 md:w-7/12 uppercase">
                <div className="relative pr-6 h-full after:content-[''] after:absolute after:w-px after:h-[110%] after:right-0 after:top-0 after:bg-[#111] max-[767px]:pb-[50px] max-[767px]:after:w-full max-[767px]:after:h-px max-[767px]:after:top-auto max-[767px]:after:bottom-5">
                  <p className="text-[65%] text-right">
                    <span>Get in touch</span>
                  </p>
                  <h2 className="font-druk text-[4.25vw] max-w-[82%] leading-none max-[767px]:text-[6vw] max-[575px]:max-w-full max-[575px]:text-[36px]">Our roots with lifestyle and action sports, but our future expands across industries</h2>
                </div>
              </div>
              <div className="w-full lg:w-1/3 md:w-5/12">
                <div className="flex flex-wrap pt-14">
                  <div className="w-full sm:w-1/2">
                    <div className="max-[575px]:pb-[5px] max-[575px]:border-t max-[575px]:border-dashed max-[575px]:border-[#111] max-[575px]:border-b max-[575px]:pt-[7px] max-[575px]:mb-2.5">
                      <h6 className="uppercase text-[0.9rem] mb-4 max-[575px]:mb-0 max-[575px]:flex max-[575px]:justify-between max-[575px]:items-center">Culture &amp; Community <span className="hidden max-[575px]:block">[+]</span></h6>
                      <ul className="list-none pl-0 text-[70%] max-[575px]:hidden">
                        <li className="my-2">Action Sports</li>
                        <li className="my-2">Lifestyle Brands</li>
                        <li className="my-2">Surf &amp; Outdoor</li>
                        <li className="my-2">Health &amp; Wellness</li>
                      </ul>
                    </div>
                    <div className="mt-5 max-[575px]:pb-[5px] max-[575px]:border-t max-[575px]:border-dashed max-[575px]:border-[#111] max-[575px]:border-b max-[575px]:pt-[7px] max-[575px]:mb-2.5">
                      <h6 className="uppercase text-[0.9rem] mb-4 max-[575px]:mb-0 max-[575px]:flex max-[575px]:justify-between max-[575px]:items-center">Innovation &amp; Sustainability <span className="hidden max-[575px]:block">[+]</span></h6>
                      <ul className="list-none pl-0 text-[70%] max-[575px]:hidden">
                        <li className="my-2">E-Commerce</li>
                        <li className="my-2">Real Estate</li>
                        <li className="my-2">Education</li>
                        <li className="my-2">Community Organizations</li>
                      </ul>
                    </div>
                  </div>
                  <div className="w-full sm:w-1/2">
                    <div className="max-[575px]:pb-[5px] max-[575px]:border-t max-[575px]:border-dashed max-[575px]:border-[#111] max-[575px]:border-b max-[575px]:pt-[7px] max-[575px]:mb-2.5">
                      <h6 className="uppercase text-[0.9rem] mb-4 max-[575px]:mb-0 max-[575px]:flex max-[575px]:justify-between max-[575px]:items-center">Business &amp; Growth <span className="hidden max-[575px]:block">[+]</span></h6>
                      <ul className="list-none pl-0 text-[70%] max-[575px]:hidden">
                        <li className="my-2">Healthcare</li>
                        <li className="my-2">Government</li>
                        <li className="my-2">Hospitality</li>
                        <li className="my-2">Food &amp; Beverage</li>
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
