"use client";

import { useState } from "react";

const industries = [
  {
    name: "Culture & Community",
    items: ["Action Sports", "Lifestyle", "Event Planning", "Influencers/Personal Branding"],
  },
  {
    name: "Business & Growth",
    items: ["Financial Planning", "Finance & Trading", "E-Commerce", "Retail & Consumer Goods", "Real Estate & Development"],
  },
  {
    name: "Innovation & Sustainability",
    items: ["Tech Startups", "SaaS", "Environmental Services", "Clean Energy & Renewables", "Education & EdTech"],
  },
];

export default function IndustryAccordion() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <div className="mt-[19px] flex flex-col gap-[7px]">
      {industries.map((cat, i) => (
        <div key={cat.name}>
          <button
            type="button"
            className="flex h-[28px] w-full cursor-pointer items-center justify-between border-t border-b border-dashed border-dark bg-transparent p-0"
            onClick={() => setOpenIndex(openIndex === i ? null : i)}
          >
            <span className="font-inter text-[14px] font-medium uppercase leading-[15.548px] text-black">
              {cat.name}
            </span>
            <span className="text-[14px] font-medium text-black">
              [{openIndex === i ? "−" : "+"}]
            </span>
          </button>
          {openIndex === i && (
            <ul className="list-none pl-0 pb-3 pt-2">
              {cat.items.map((item) => (
                <li key={item} className="py-1 font-inter text-[13px] text-dark">
                  {item}
                </li>
              ))}
            </ul>
          )}
        </div>
      ))}
    </div>
  );
}
