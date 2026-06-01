"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { FaBars } from "react-icons/fa6";
import Drawer, { type DrawerNavItem } from "./Drawer";

const navItems: DrawerNavItem[] = [
  { label: "Our Work", href: "/#work" },
  { label: "Our Difference", href: "/about" },
  { label: "The Shop", href: "/shop" },
];

// Hover = black background with white text (Figma prototype).
const NAV_PILL_CLASS =
  "font-acumin-condensed text-black text-[16px] uppercase leading-[1.4] px-4 py-1 no-underline whitespace-nowrap inline-flex items-center justify-center transition-colors hover:bg-black hover:text-white";

function getMobilePageLabel(pathname: string): string {
  if (pathname.startsWith("/about")) return "Our Difference";
  if (pathname.startsWith("/shop")) return "The Shop";
  if (pathname.startsWith("/works") || pathname.startsWith("/services"))
    return "Our Work";
  return "";
}

export default function Header() {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const pathname = usePathname();

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
        className="fixed top-0 left-0 right-0 z-9999 bg-white border-b border-dark"
      >
        {/* Desktop nav */}
        <div className="hidden md:block w-full px-[80px]">
          <nav className="flex items-center justify-between h-[82px]">
            <Link
              href="/"
              aria-label="deepSoCal home"
              className="inline-flex items-center no-underline shrink-0"
            >
              <Image
                src="/images/deepsocal-wordmark.svg"
                alt="deepSoCal"
                width={182}
                height={41}
                priority
                className="h-[30px] w-auto select-none"
              />
            </Link>

            {/* Per Figma node 632:5209 — Book a call sits between
                Our Difference and The Shop (3rd of 4), not at the end. */}
            <ul className="flex items-center gap-[16px] list-none m-0 p-0">
              {navItems.slice(0, 2).map((item) => (
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
              {navItems.slice(2).map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className={NAV_PILL_CLASS}>
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        {/* Mobile nav — logo mark | page name | hamburger */}
        <div className="flex md:hidden w-full px-[20px]">
          <nav className="flex items-center justify-between h-[64px] w-full relative">
            <Link
              href="/"
              aria-label="deepSoCal home"
              className="inline-flex items-center no-underline shrink-0"
            >
              <Image
                src="/images/deepsocal-mark.png"
                alt="deepSoCal"
                width={37}
                height={35}
                priority
                className="h-[35px] w-auto select-none"
              />
            </Link>

            {getMobilePageLabel(pathname) && (
              <span className="absolute left-1/2 -translate-x-1/2 font-acumin-condensed font-bold text-dark text-[24px] uppercase leading-[1.4] whitespace-nowrap pointer-events-none">
                {getMobilePageLabel(pathname)}
              </span>
            )}

            <button
              type="button"
              className="flex p-2 items-center justify-center cursor-pointer"
              onClick={() => setDrawerOpen(true)}
              aria-label="Open menu"
              aria-expanded={drawerOpen}
            >
              <FaBars className="text-[20px] text-dark" />
            </button>
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
