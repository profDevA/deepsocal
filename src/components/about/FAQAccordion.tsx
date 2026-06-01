"use client";

import * as Accordion from "@radix-ui/react-accordion";
import { faqs } from "@/data/faqs";

export default function FAQAccordion() {
  return (
    <Accordion.Root type="single" collapsible className="flex flex-col">
      {faqs.map((faq, i) => (
        <Accordion.Item
          key={i}
          value={`item-${i}`}
          className="border-t border-white first:border-t-0"
        >
          <Accordion.Header className="mb-0">
            <Accordion.Trigger className="group w-full flex items-center justify-between gap-4 pt-[13px] pb-[14px] text-left bg-transparent border-none cursor-pointer hover:opacity-80 transition-opacity">
              <span className="font-inter text-white text-[14px] lg:text-[16px] leading-[20px] tracking-[0.42px] lg:tracking-[0.48px] m-0">
                {faq.question}
              </span>
              <span
                aria-hidden="true"
                className="w-[35px] h-[38px] flex items-center justify-center shrink-0 bg-[#1e1e1e]"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="18"
                  height="16"
                  viewBox="0 0 18 16"
                  fill="none"
                  className="transition-transform duration-200 group-data-[state=open]:rotate-90"
                >
                  <path
                    d="M9.25 0.189453C10.45 4.78945 15.0833 7.27279 17.25 7.93945H0M17.25 7.93945C15.4167 7.93945 11.25 9.43945 9.25 15.4395"
                    stroke="white"
                    strokeWidth="1.5"
                  />
                </svg>
              </span>
            </Accordion.Trigger>
          </Accordion.Header>
          <Accordion.Content className="overflow-hidden data-[state=open]:animate-[accordionDown_220ms_ease-out] data-[state=closed]:animate-[accordionUp_180ms_ease-in]">
            <p className="font-inter text-white/90 text-[16px] leading-[24px] tracking-[0.3px] pb-[14px] pr-12 m-0">
              {faq.answer}
            </p>
          </Accordion.Content>
        </Accordion.Item>
      ))}
    </Accordion.Root>
  );
}
