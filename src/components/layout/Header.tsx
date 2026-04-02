"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { useModal } from "@/components/modals/ModalProvider";

export default function Header() {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLLIElement>(null);
  const { openModal } = useModal();

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, []);

  return (
    <header id="header" className="fixed top-0 left-0 right-0 z-9999 bg-brand">
      <div className="w-full px-[1.1vw] max-[1025px]:px-[15px]">
        <nav className="flex flex-wrap gap-[30px] border-l border-r border-b border-black px-[1.1vw] max-[1025px]:px-[15px] min-h-[60px]">
          <div className="flex items-center">
            <Link className="w-[65px] h-[25px] flex p-0" href="/">
              <img src="/images/logo.svg" alt="logo" className="w-[65px] h-[25px] object-contain" />
            </Link>
          </div>
          <div className="flex-1 py-[0.55vw]">
            <button
              className="hidden max-md:block ml-auto p-2"
              type="button"
              onClick={() => {
                const el = document.getElementById("collapsibleNavbar");
                el?.classList.toggle("max-md:hidden");
              }}
            >
              <span className="block w-5 h-0.5 bg-black mb-1"></span>
              <span className="block w-5 h-0.5 bg-black mb-1"></span>
              <span className="block w-5 h-0.5 bg-black"></span>
            </button>
            <div id="collapsibleNavbar" className="flex justify-end max-md:hidden">
              <ul className="flex items-center gap-0 list-none m-0 p-0">
                <li>
                  <Link className="text-[0.9vw] leading-[1.4] py-[0.5vw] px-0 mx-[1.6vw] no-underline text-black max-[1025px]:text-base max-[1025px]:whitespace-nowrap" href="/about">About</Link>
                </li>
                <li>
                  <Link className="text-[0.9vw] leading-[1.4] py-[0.5vw] px-0 mx-[1.6vw] no-underline text-black max-[1025px]:text-base max-[1025px]:whitespace-nowrap" href="/works">Work</Link>
                </li>
                <li className="relative" ref={dropdownRef}>
                  <a
                    className="text-[0.9vw] leading-[1.4] py-[0.5vw] px-0 mx-[1.6vw] no-underline text-black max-[1025px]:text-base max-[1025px]:whitespace-nowrap cursor-pointer"
                    href="#"
                    role="button"
                    onClick={(e) => {
                      e.preventDefault();
                      setDropdownOpen(!dropdownOpen);
                    }}
                  >
                    Services <i className="fa-solid fa-chevron-down text-[0.55em] ml-0.5 align-middle"></i>
                  </a>
                  {dropdownOpen && (
                    <div className="absolute list-none top-full border border-dark border-t-0 rounded-none m-0 bg-brand z-99999 p-0 min-w-[240px] shadow-[0_8px_24px_rgba(0,0,0,0.08)] max-[1025px]:min-w-[220px]">
                      <ul className="flex flex-col gap-0 p-0 m-0 list-none">
                        <li><Link className="font-inter tracking-[-0.01em] text-[clamp(12px,0.82vw,13px)] font-normal leading-none no-underline py-[14px] px-6 text-dark bg-transparent block whitespace-nowrap transition-[background,color] duration-150 ease hover:bg-dark hover:text-brand max-[1025px]:text-[13px] max-[1025px]:py-3 max-[1025px]:px-5" href="/services/marketing-branding" onClick={() => setDropdownOpen(false)}>Marketing + Branding</Link></li>
                        <li className="border-t border-black/12"><Link className="font-inter tracking-[-0.01em] text-[clamp(12px,0.82vw,13px)] font-normal leading-none no-underline py-[14px] px-6 text-dark bg-transparent block whitespace-nowrap transition-[background,color] duration-150 ease hover:bg-dark hover:text-brand max-[1025px]:text-[13px] max-[1025px]:py-3 max-[1025px]:px-5" href="/services/research" onClick={() => setDropdownOpen(false)}>Research</Link></li>
                        <li className="border-t border-black/12"><Link className="font-inter tracking-[-0.01em] text-[clamp(12px,0.82vw,13px)] font-normal leading-none no-underline py-[14px] px-6 text-dark bg-transparent block whitespace-nowrap transition-[background,color] duration-150 ease hover:bg-dark hover:text-brand max-[1025px]:text-[13px] max-[1025px]:py-3 max-[1025px]:px-5" href="/services/design" onClick={() => setDropdownOpen(false)}>Design</Link></li>
                        <li className="border-t border-black/12"><Link className="font-inter tracking-[-0.01em] text-[clamp(12px,0.82vw,13px)] font-normal leading-none no-underline py-[14px] px-6 text-dark bg-transparent block whitespace-nowrap transition-[background,color] duration-150 ease hover:bg-dark hover:text-brand max-[1025px]:text-[13px] max-[1025px]:py-3 max-[1025px]:px-5" href="/services/ai-strategy" onClick={() => setDropdownOpen(false)}>AI Strategy + Integration</Link></li>
                        <li className="border-t border-black/12"><Link className="font-inter tracking-[-0.01em] text-[clamp(12px,0.82vw,13px)] font-normal leading-none no-underline py-[14px] px-6 text-dark bg-transparent block whitespace-nowrap transition-[background,color] duration-150 ease hover:bg-dark hover:text-brand max-[1025px]:text-[13px] max-[1025px]:py-3 max-[1025px]:px-5" href="/services/training-education" onClick={() => setDropdownOpen(false)}>Training &amp; Education</Link></li>
                      </ul>
                    </div>
                  )}
                </li>
                <li>
                  <a className="text-[0.9vw] leading-[1.4] py-[0.5vw] px-0 mx-[1.6vw] no-underline text-black max-[1025px]:text-base max-[1025px]:whitespace-nowrap" href="#">Shop</a>
                </li>
                <li>
                  <a
                    className="text-[0.9vw] text-black px-[1.5vw] py-[0.5vw] leading-none border border-black rounded-none no-underline mr-0 inline-block bg-[linear-gradient(to_top,#000_50%,transparent_50%)] bg-size-[100%_200%] bg-top transition-[background-position,color] duration-400 ease-in-out hover:text-white hover:bg-bottom max-[1025px]:px-[15px] max-[1025px]:py-2 max-[1025px]:text-base"
                    href="#"
                    onClick={(e) => {
                      e.preventDefault();
                      openModal("partner");
                    }}
                  >
                    Work With Us
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </nav>
      </div>
    </header>
  );
}
