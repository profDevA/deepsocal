"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { FaBars } from "react-icons/fa6";
import { useModal } from "@/components/modals/ModalProvider";
import Drawer, { type DrawerNavItem } from "./Drawer";

const navItems: DrawerNavItem[] = [
  { label: "Our Work", href: "/#work" },
  { label: "Our Difference", href: "/about" },
  // Shop hidden per Fas (5/22) — not a priority for launch, can re-enable later
  // { label: "The Shop", href: "/shop" },
];

const NAV_PILL_CLASS =
  "font-bangers bg-[#111] text-[#d7d7d7] text-[16px] leading-[1.4] px-4 py-1 no-underline whitespace-nowrap inline-flex items-center justify-center transition-colors hover:bg-[#333]";

export default function Header() {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const { openModal } = useModal();

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

  const handleBookCall = () => {
    setDrawerOpen(false);
    openModal("contact");
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
              aria-label="DeepSocal home"
              className="font-bangers text-dark text-[38.905px] leading-none tracking-[1px] no-underline"
            >
              DeepSocal
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
