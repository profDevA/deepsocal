"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { FaBars } from "react-icons/fa6";
import { useModal } from "@/components/modals/ModalProvider";
import Drawer, { type DrawerNavItem } from "./Drawer";

const navItems: DrawerNavItem[] = [
  { label: "Our Work", href: "/#work" },
  { label: "Our Difference", href: "/about" },
  { label: "The Shop", href: "/shop" },
];

const NAV_PILL_CLASS =
  "font-acumin-condensed text-black text-[16px] uppercase leading-[1.4] px-4 py-1 no-underline whitespace-nowrap inline-flex items-center justify-center hover:underline underline-offset-[5px] decoration-1";

export default function Header() {
  const [drawerOpen, setDrawerOpen] = useState(false);

  useEffect(() => {
    if (drawerOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [drawerOpen]);

  const calUrl = "https://cal.com/deepsocal/discovery";

  const handleBookCall = () => {
    setDrawerOpen(false);
    window.open(calUrl, "_blank", "noopener,noreferrer");
  };

  return (
    <>
      <header
        id="header"
        className="fixed top-0 left-0 right-0 z-9999 bg-[#e6e6e6] border-b border-dark"
      >
        <div className="w-full px-[80px] max-[1025px]:px-[20px]">
          <nav className="flex items-center justify-between min-h-[64px]">
            <Link
              href="/"
              aria-label="deepSoCal home"
              className="inline-flex items-center no-underline shrink-0"
            >
              {/* Original `deepsocal.com` wordmark (per 5/27 brand pivot).
                  Uses the bespoke SVG so casing + kerning match the brand
                  mark exactly. SVG viewBox is 182×41 (~4.44:1 aspect, fill
                  #333333, includes the trailing `(*)` mark Fas referenced
                  in the meeting). Height 30px gives ~133px wide. */}
              <Image
                src="/images/deepsocal-wordmark.svg"
                alt="deepSoCal"
                width={182}
                height={41}
                priority
                className="h-[30px] w-auto select-none"
              />
            </Link>

            <button
              type="button"
              className="hidden max-md:flex p-2 items-center justify-center cursor-pointer"
              onClick={() => setDrawerOpen(true)}
              aria-label="Open menu"
              aria-expanded={drawerOpen}
            >
              <FaBars className="text-xl text-dark" />
            </button>

            <ul className="flex items-center gap-[25px] list-none m-0 p-0 max-md:hidden">
              {navItems.map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className={NAV_PILL_CLASS}>
                    {item.label}
                  </Link>
                </li>
              ))}
              <li>
                <button
                  type="button"
                  onClick={handleBookCall}
                  className={`${NAV_PILL_CLASS} border-none cursor-pointer`}
                >
                  Book a call
                </button>
              </li>
            </ul>
          </nav>
        </div>
      </header>

      <Drawer
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        navItems={navItems}
        onBookCall={handleBookCall}
      />
    </>
  );
}
