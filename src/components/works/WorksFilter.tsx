"use client";

import { useState, useRef, useEffect } from "react";
import { FaChevronDown } from "react-icons/fa6";

const categories = [
  "Show All",
  "Marketing",
  "Deep Research",
  "Branding",
  "Design",
  "Development",
];

export default function WorksFilter() {
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState("Marketing");
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, []);

  return (
    <div className="flex items-end justify-between pb-3 md:hidden">
      <span className="font-inter text-[16px] font-normal leading-[22.696px] tracking-[-0.324px] text-black uppercase">
        Featured
      </span>
      <div className="relative" ref={ref}>
        <button
          type="button"
          className="flex items-center gap-1.5 bg-transparent border-none p-0 font-inter text-[16px] font-normal leading-[22.696px] tracking-[-0.324px] text-black uppercase cursor-pointer"
          onClick={() => setOpen(!open)}
        >
          {selected}
          <FaChevronDown className="text-[0.6em]" />
        </button>
        {open && (
          <div className="absolute right-0 top-full mt-2 min-w-[200px] rounded-[10px] border border-black/20 bg-brand px-[17px] py-[23px] shadow-[0px_4px_14.1px_0px_rgba(0,0,0,0.25)] z-50">
            <div className="flex flex-col gap-[32px]">
            {categories.map((cat) => (
              <button
                key={cat}
                type="button"
                className="block w-full cursor-pointer border-none bg-transparent p-0 text-left text-[12px] font-normal leading-[13.35px] uppercase text-[#090909] hover:text-black"
                style={{ fontFamily: "Arial, sans-serif" }}
                onClick={() => {
                  setSelected(cat);
                  setOpen(false);
                }}
              >
                {cat}
              </button>
            ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
