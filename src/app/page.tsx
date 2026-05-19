import Hero from "@/components/home/Hero";
import CompaniesMarquee from "@/components/home/CompaniesMarquee";
import WhyAreWeDifferent from "@/components/home/WhyAreWeDifferent";
import WorkGrid from "@/components/home/WorkGrid";
import Testimonials from "@/components/home/Testimonials";
import RevealOnScroll from "@/components/animation/RevealOnScroll";
import PageFrame from "@/components/layout/PageFrame";

export default function Home() {
  return (
    <>
      <PageFrame />
      <Hero />
      <RevealOnScroll>
        <CompaniesMarquee />
      </RevealOnScroll>
      <WhyAreWeDifferent />
      <RevealOnScroll>
        <WorkGrid />
      </RevealOnScroll>
      <RevealOnScroll>
        <Testimonials />
      </RevealOnScroll>
    </>
  );
}
