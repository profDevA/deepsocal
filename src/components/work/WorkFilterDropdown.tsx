"use client";

import { useState, useRef, useEffect } from "react";
import { services } from "@/data/services";
import type { ServiceId } from "@/data/case-studies";

const ALL_LABEL = "All Works";

export default function WorkFilterDropdown({
  current,
  onChange,
}: {
  current?: ServiceId;
  onChange?: (serviceId: ServiceId | null) => void;
}) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  const currentLabel =
    current
      ? services.find((s) => s.id === current)?.name ?? ALL_LABEL
      : ALL_LABEL;

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  const select = (id: ServiceId | null) => {
    onChange?.(id);
    setOpen(false);
  };

  return (
    <div ref={ref} className="relative w-[240px] sm:w-[260px] md:w-[280px] lg:w-[293px]">
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="bg-dark border border-[#bdbdbd] flex items-center justify-between w-full h-[53px] px-6 text-brand cursor-pointer"
      >
        <span className="font-bangers text-[20px] sm:text-[24px] md:text-[28px] leading-none">
          {currentLabel}
        </span>
        <svg
          width="23"
          height="24"
          viewBox="0 0 23 24"
          fill="none"
          className={`transition-transform duration-300 ${open ? "rotate-[-90deg]" : "rotate-90"}`}
        >
          <path
            d="M8.5 4.5L15.5 12L8.5 19.5"
            stroke="#e3dfdc"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>

      <div
        className={`absolute z-50 left-1/2 -translate-x-1/2 top-[calc(100%+15px)] w-[343px] bg-[#e6e6e6] border border-[#8e8e8e] rounded-[23px] shadow-[0_4px_28px_rgba(0,0,0,0.1)] overflow-hidden transition-all duration-300 origin-top ${
          open
            ? "opacity-100 scale-y-100 pointer-events-auto"
            : "opacity-0 scale-y-0 pointer-events-none"
        }`}
      >
        <div className="flex flex-col items-center py-[30px] px-[14px]">
          <button
            type="button"
            onClick={() => select(null)}
            className={`w-full py-[20px] border-b border-[#c8c8c8] font-inter font-light italic text-[22px] tracking-[-0.66px] text-[#1f1c06] text-center cursor-pointer bg-transparent hover:bg-black/5 transition-colors ${
              !current ? "font-medium" : ""
            }`}
          >
            All Works
          </button>
          {services.map((s) => (
            <button
              key={s.id}
              type="button"
              onClick={() => select(s.id)}
              className={`w-full py-[20px] font-inter font-light italic text-[22px] tracking-[-0.66px] text-[#1f1c06] text-center cursor-pointer bg-transparent hover:bg-black/5 transition-colors ${
                s.id === services[services.length - 1].id ? "" : "border-b border-[#c8c8c8]"
              } ${current === s.id ? "font-medium" : ""}`}
            >
              {s.name}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
