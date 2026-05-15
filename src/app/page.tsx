import Hero from "@/components/home/Hero";
import CompaniesMarquee from "@/components/home/CompaniesMarquee";
import WhyAreWeDifferent from "@/components/home/WhyAreWeDifferent";
import WorkGrid from "@/components/home/WorkGrid";
import Testimonials from "@/components/home/Testimonials";
import RevealOnScroll from "@/components/animation/RevealOnScroll";

export default function Home() {
  return (
    <>
      <Hero />
      <RevealOnScroll>
        <CompaniesMarquee />
      </RevealOnScroll>
      <RevealOnScroll>
        <WhyAreWeDifferent />
      </RevealOnScroll>
      <RevealOnScroll>
        <WorkGrid />
      </RevealOnScroll>
      <RevealOnScroll>
        <Testimonials />
      </RevealOnScroll>
    </>
  );
}
