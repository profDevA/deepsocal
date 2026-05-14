import Hero from "@/components/home/Hero";
import CompaniesMarquee from "@/components/home/CompaniesMarquee";
import WhyAreWeDifferent from "@/components/home/WhyAreWeDifferent";
import WorkGrid from "@/components/home/WorkGrid";
import Testimonials from "@/components/home/Testimonials";

export default function Home() {
  return (
    <>
      <Hero />
      <CompaniesMarquee />
      <WhyAreWeDifferent />
      <WorkGrid />
      <Testimonials />
    </>
  );
}
