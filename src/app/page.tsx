import Hero from "@/components/home/Hero";
import CompaniesMarquee from "@/components/home/CompaniesMarquee";
import WhyAreWeDifferent from "@/components/home/WhyAreWeDifferent";
import WorkGrid from "@/components/home/WorkGrid";
import Testimonials from "@/components/home/Testimonials";
import PageFrame from "@/components/layout/PageFrame";
import { fetchAllCaseStudies } from "@/sanity/lib/fetch";

export default async function Home() {
  const caseStudies = await fetchAllCaseStudies();

  return (
    <>
      <PageFrame />
      <Hero />
      <WhyAreWeDifferent />
      <WorkGrid caseStudies={caseStudies} />
      <Testimonials />
      <CompaniesMarquee />
    </>
  );
}
