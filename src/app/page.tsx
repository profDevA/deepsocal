import Hero from "@/components/home/Hero";
import CompaniesMarquee from "@/components/home/CompaniesMarquee";
import WhyAreWeDifferent from "@/components/home/WhyAreWeDifferent";
import WorkGrid from "@/components/home/WorkGrid";
import Testimonials from "@/components/home/Testimonials";
import PageFrame from "@/components/layout/PageFrame";
import { fetchAllCaseStudies, fetchCategories } from "@/sanity/lib/fetch";

export default async function Home() {
  const [categories, caseStudies] = await Promise.all([
    fetchCategories(),
    fetchAllCaseStudies(),
  ]);

  return (
    <>
      <PageFrame />
      <Hero />
      <WhyAreWeDifferent categories={categories} />
      <WorkGrid categories={categories} caseStudies={caseStudies} />
      <CompaniesMarquee />
      <Testimonials />
    </>
  );
}
