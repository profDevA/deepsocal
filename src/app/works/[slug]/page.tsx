import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";

export const metadata: Metadata = {
  title: "Forever a Surfer",
  description: "A case study exploring surf culture and brand strategy in Southern California.",
};

export default function WorkDetailPage() {
  return (
    <>
      {/* Title */}
      <section className="pt-3 pb-2 font-druk px-[1.1vw]! max-[1025px]:px-[15px]!">
        <div className="w-full px-0">
          <div className="flex flex-wrap border-b border-dark gap-0">
            <div className="w-full">
              <div className="mb-[1.5vw] uppercase">
                <h1 className="text-[5vw] relative before:content-[''] before:absolute before:w-px before:h-full before:right-[15%] before:top-0 before:bg-dark max-[767px]:before:content-none max-[575px]:text-[45px]">Forever a Surfer</h1>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Hero */}
      <section className="px-[1.1vw]! max-[1025px]:px-[15px]!">
        <div className="w-full px-0 pb-[4vw] max-[1025px]:pb-[60px] border-b border-dark">
          <div className="flex flex-wrap mb-3 items-center justify-between">
            <div className="w-[20%] flex items-center justify-between max-[991px]:w-[30%] max-[767px]:w-full max-[767px]:justify-start max-[767px]:gap-[100px]">
              <span className="text-[65%]">01</span>
              <span className="text-[65%]">Campaign Strategy</span>
            </div>
            <div className="hidden md:block w-[30%]">
              <Image src="/images/icons/arrow-down.svg" alt="" width={20} height={20} unoptimized />
              <Image src="/images/icons/arrow-down.svg" alt="" width={20} height={20} unoptimized />
              <Image src="/images/icons/arrow-down.svg" alt="" width={20} height={20} unoptimized />
            </div>
          </div>
          <div className="flex flex-wrap gap-0">
            <div className="w-full">
              <div>
                <Image src="/images/works/surfer-1.jpg" className="w-full" alt="Forever a Surfer" width={1400} height={700} style={{ width: "100%", height: "auto" }} />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Summary */}
      <section className="px-[1.1vw]! max-[1025px]:px-[15px]! pt-3">
        <div className="w-full px-0 border-b border-dark">
          <div className="flex flex-wrap py-4 md:py-0">
            <div className="w-full md:w-1/2">
              <div className="relative before:content-[''] before:bg-dark before:absolute before:top-0 before:right-[-12px] before:w-px before:h-full max-[767px]:before:w-full max-[767px]:before:h-px max-[767px]:before:top-auto max-[767px]:before:bottom-0 max-[767px]:before:left-0 max-[767px]:before:right-auto max-[767px]:pb-6 max-[767px]:mb-10">
                <h6>Overview</h6>
                <p>Forever a Surfer captures the spirit of Southern California&apos;s surf culture through a strategic campaign that blends storytelling, visual identity, and community engagement. Our team worked closely with local surfers, shapers, and coastal communities to create an authentic narrative that resonates with both lifelong wave riders and newcomers to the scene.</p>
              </div>
            </div>
            <div className="w-full md:w-1/2">
              <div className="relative before:content-[''] before:bg-dark before:absolute before:top-0 before:right-[-12px] before:w-px before:h-full max-[767px]:before:content-none max-[767px]:mb-0 max-[767px]:pb-0">
                <h6>Summary</h6>
                <p>DeepSoCal used surf culture to connect California communities with global humanitarian causes. Documentary crews captured community stories that reflected local identity. Influencer partnerships expanded their reach, while community events turned narratives into action. These efforts built advocacy systems that delivered measurable engagement and ongoing participation in global humanitarian efforts.</p>
                <div className="mt-4">
                  <h6>Impact Metrics</h6>
                  <p>We helped position the U.S. Surf Open as a platform for lasting community connection. Our research-driven storytelling and strategic engagement strengthened ties within California surf culture and secured the brand&apos;s presence in the community.</p>
                </div>
                <div className="mt-4">
                  <h6>Services</h6>
                  <p>Strategy + Branding + Content</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Gallery */}
      <section className="px-[1.1vw]! max-[1025px]:px-[15px]!">
        <div className="w-full px-0 pb-5 border-b border-dark">
          <div className="flex flex-wrap">
            <div className="w-full">
              <div>
                <Image src="/images/works/surfer-2.jpg" className="w-full mt-3 pb-3 border-b border-dark" alt="Forever a Surfer" width={1400} height={700} style={{ width: "100%", height: "auto" }} />
                <Image src="/images/works/surfer-3.jpg" className="w-full mt-3 border-b border-dark" alt="Forever a Surfer" width={1400} height={700} style={{ width: "100%", height: "auto" }} />
                <Image src="/images/works/surfer-4.jpg" className="w-full mt-3" alt="Forever a Surfer" width={1400} height={700} style={{ width: "100%", height: "auto" }} />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Conclusion */}
      <section className="px-[1.1vw]! max-[1025px]:px-[15px]! pt-3">
        <div className="w-full px-0 border-b border-dark">
          <div className="flex flex-wrap py-4 md:py-0">
            <div className="w-full md:w-1/2">
              <div className="relative before:content-[''] before:bg-dark before:absolute before:top-0 before:right-[-12px] before:w-px before:h-full max-[767px]:before:w-full max-[767px]:before:h-px max-[767px]:before:top-auto max-[767px]:before:bottom-0 max-[767px]:before:left-0 max-[767px]:before:right-auto max-[767px]:pb-6 max-[767px]:mb-10">
                <h6>Conclusion</h6>
              </div>
            </div>
            <div className="w-full md:w-1/2">
              <div className="relative before:content-[''] before:bg-dark before:absolute before:top-0 before:right-[-12px] before:w-px before:h-full max-[767px]:before:content-none max-[767px]:mb-0 max-[767px]:pb-0">
                <p>The Forever a Surfer campaign reinforced the deep connection between Southern California&apos;s identity and its surf heritage. By grounding our strategy in real community voices and local culture, we delivered a campaign that felt authentic — not manufactured. The result was increased brand awareness, stronger community ties, and a visual identity that truly represents the soul of SoCal surfing.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Discover More */}
      <section className="px-[1.1vw]! max-[1025px]:px-[15px]! pt-5 pb-5">
        <div className="w-full px-0">
          <div className="flex flex-wrap">
            <div className="w-full">
              <h2 className="font-druk uppercase mb-4">Discover more Works</h2>
            </div>
          </div>
          <div className="flex flex-wrap gap-6">
            <div className="w-full md:w-[calc(50%-12px)]">
              <Link href="/works">
                <Image src="/images/works-5.jpg" className="w-full" alt="Portfolio item" width={700} height={500} style={{ width: "100%", height: "auto" }} />
              </Link>
            </div>
            <div className="w-full md:w-[calc(50%-12px)]">
              <Link href="/works">
                <Image src="/images/works-9.jpg" className="w-full" alt="Portfolio item" width={700} height={500} style={{ width: "100%", height: "auto" }} />
              </Link>
            </div>
          </div>
          <div className="flex flex-wrap mt-4">
            <div className="w-full text-center">
              <Link href="/works" className="bg-black text-white uppercase rounded-none font-[Arial,sans-serif] text-xs font-normal tracking-[-0.44px] px-6 py-3 min-h-[43px] inline-flex items-center justify-center no-underline border-none cursor-pointer">All Works</Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
