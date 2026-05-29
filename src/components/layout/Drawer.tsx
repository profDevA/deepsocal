"use client";

import * as Dialog from "@radix-ui/react-dialog";
import Link from "next/link";
import { FaXmark } from "react-icons/fa6";

export type DrawerNavItem = {
  label: string;
  href: string;
};

interface DrawerProps {
  open: boolean;
  onClose: () => void;
  navItems: DrawerNavItem[];
  onBookCall: () => void;
}

const DRAWER_PILL_CLASS =
  "font-acumin-condensed bg-[#111] text-[#d7d7d7] text-[20px] leading-[1.4] px-5 py-2 no-underline inline-flex items-center justify-center transition-colors hover:bg-[#333]";

export default function Drawer({ open, onClose, navItems, onBookCall }: DrawerProps) {
  return (
    <Dialog.Root open={open} onOpenChange={(v) => !v && onClose()}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-99998 bg-black/50" />
        <Dialog.Content
          aria-describedby={undefined}
          className="fixed top-0 right-0 z-99999 h-full w-[85vw] max-w-[453px] bg-[#e6e6e6] overflow-y-auto shadow-[0_5px_15px_rgba(0,0,0,0.25)] animate-slide-in flex flex-col p-12 max-[1025px]:p-8"
        >
          <div className="flex items-center justify-between mb-12">
            <Dialog.Title className="font-acumin-condensed text-dark text-[32px] leading-none m-0">
              Menu
            </Dialog.Title>
            <Dialog.Close
              aria-label="Close menu"
              className="w-10 h-10 bg-dark text-white rounded-full inline-flex items-center justify-center text-[22px] cursor-pointer border-none"
            >
              <FaXmark />
            </Dialog.Close>
          </div>
          <nav className="flex-1">
            {/* Order matches the desktop Header: Our Work / Our Difference /
                Book a call / The Shop (Figma node 632:5209). */}
            <ul className="flex flex-col gap-4 list-none m-0 p-0 items-start">
              {navItems.slice(0, 2).map((item) => (
                <li key={item.href}>
                  <Link href={item.href} onClick={onClose} className={DRAWER_PILL_CLASS}>
                    {item.label}
                  </Link>
                </li>
              ))}
              <li>
                <button
                  type="button"
                  onClick={onBookCall}
                  className={`${DRAWER_PILL_CLASS} border-none`}
                >
                  Book a call
                </button>
              </li>
              {navItems.slice(2).map((item) => (
                <li key={item.href}>
                  <Link href={item.href} onClick={onClose} className={DRAWER_PILL_CLASS}>
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
