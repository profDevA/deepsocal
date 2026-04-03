"use client";

import { useState } from "react";

const faqs = [
  {
    q: "What separates DeepSoCal from other agencies?",
    a: "We're not a remote agency parachuting in with generic playbooks. We're embedded in Southern California — we live here, we understand the culture, the neighborhoods, and the economic landscape. Our approach combines Ph.D.-level research methodologies with practical AI tools and transition design to create strategies that are genuinely rooted in this region.",
  },
  {
    q: "What industries do you specialize in?",
    a: "We work across a range of Southern California industries including action sports, lifestyle brands, e-commerce, real estate, healthcare, education, and community organizations. Our strength lies in adapting our research-driven approach to any sector that values authentic connection with SoCal audiences.",
  },
  {
    q: "What's the process for working together?",
    a: "It starts with a free scoping workshop where we understand your goals, challenges, and market context. From there, we develop a strategic roadmap tailored to your needs. Throughout the engagement, we work as your embedded allies — collaborating closely with your team rather than operating at arm's length.",
  },
  {
    q: "Do you work with businesses outside of Southern California?",
    a: "Our expertise is deeply rooted in Southern California, and that's where we deliver the most impact. However, we do work with brands outside the region that want to establish or strengthen their presence in SoCal markets. Our deep local knowledge becomes your competitive advantage.",
  },
  {
    q: "How do your AI-powered solutions work?",
    a: "We identify high-impact AI opportunities tailored to your operations, then build phased roadmaps to integrate tools like automation agents, generative AI for content, and predictive analytics — all without disrupting your day-to-day. We focus on practical outcomes, not hype, ensuring AI delivers measurable business value.",
  },
  {
    q: "Who are your services best suited for?",
    a: "Our services are ideal for mid-size to enterprise brands operating in or targeting Southern California. Whether you're a lifestyle brand looking to deepen community ties, a healthcare organization seeking better regional engagement, or a business ready to integrate AI into your operations — we're built for you.",
  },
  {
    q: "Can your services be customized to specific industry needs?",
    a: "Absolutely. Every engagement is tailored to your industry, audience, and regional context. We don't use cookie-cutter frameworks. Our research-first approach means we start by understanding your specific ecosystem before designing any solution.",
  },
  {
    q: "How do I get started with rebranding my social media?",
    a: "The easiest way is to book a free scoping workshop through our website. In this session, we'll clarify your goals, answer your questions, and outline potential next steps. You can also reach us directly at create@deepsocal.com.",
  },
];

export default function AboutFaqClient() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section className="px-[1.1vw]! max-[1025px]:px-[15px]! bg-dark text-brand pt-16 pb-20">
      <div className="w-full px-0 border-t border-brand pt-8">
        <div className="flex flex-wrap">
          <div className="w-full md:w-1/3">
            <div className="relative h-full flex flex-col justify-between after:content-[''] after:absolute after:w-px after:h-[115%] after:right-0 after:top-0 after:bg-brand">
              <h2 className="font-druk uppercase text-[9vw] leading-[0.95] max-[767px]:text-[15vw]">FAQS</h2>
              <p className="text-[65%] uppercase w-1/2">Need-to-knows, nice-to-knows, and everything in between.</p>
            </div>
          </div>
          <div className="w-full md:w-2/3 md:pl-3">
            <div>
              {faqs.map((faq, i) => {
                const isOpen = openIndex === i;
                return (
                  <div className="pt-3 not-last:border-b not-last:border-brand" key={i}>
                    <h4
                      className="flex justify-between items-center font-normal mb-3 cursor-pointer pl-6"
                      onClick={() => setOpenIndex(isOpen ? null : i)}
                    >
                      {faq.q} <span className="text-[0.8em]">[{isOpen ? "−" : "+"}]</span>
                    </h4>
                    <div
                      className="grid transition-[grid-template-rows] duration-400 ease-in-out"
                      style={{ gridTemplateRows: isOpen ? "1fr" : "0fr" }}
                    >
                      <div className="overflow-hidden">
                        <div className="text-[0.8em] px-6 pb-4">
                          <p>{faq.a}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
