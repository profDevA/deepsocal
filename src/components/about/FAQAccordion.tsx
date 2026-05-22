"use client";

import * as Accordion from "@radix-ui/react-accordion";
import { FaPlus } from "react-icons/fa6";
import { faqs } from "@/data/faqs";

export default function FAQAccordion() {
  return (
    <Accordion.Root type="single" collapsible className="flex flex-col">
      {faqs.map((faq, i) => (
        <Accordion.Item
          key={i}
          value={`item-${i}`}
          className="border-t border-dark first:border-t-0"
        >
          <Accordion.Header className="mb-0">
            <Accordion.Trigger className="group w-full flex items-center justify-between gap-4 pt-[13px] pb-[14px] text-left bg-transparent border-none cursor-pointer hover:opacity-80 transition-opacity">
              <span className="font-inter text-dark text-[16px] leading-[20px] tracking-[0.48px] m-0">
                {faq.question}
              </span>
              <span
                aria-hidden="true"
                className="w-[36px] h-[30.4px] flex items-center justify-center shrink-0 transition-transform group-data-[state=open]:rotate-45"
                style={{ backgroundColor: "rgba(2,2,2,0.8)" }}
              >
                <FaPlus className="text-[#E6E6E6] text-[12px]" />
              </span>
            </Accordion.Trigger>
          </Accordion.Header>
          <Accordion.Content className="overflow-hidden data-[state=open]:animate-[accordionDown_220ms_ease-out] data-[state=closed]:animate-[accordionUp_180ms_ease-in]">
            <p className="font-inter text-dark text-[16px] leading-[24px] tracking-[0.3px] pb-[14px] pr-12 m-0">
              {faq.answer}
            </p>
          </Accordion.Content>
        </Accordion.Item>
      ))}
    </Accordion.Root>
  );
}
