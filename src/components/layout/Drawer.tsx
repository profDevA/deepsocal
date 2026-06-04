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

const LINK_CLASS =
  "font-acumin-condensed font-bold text-black text-[26px] sm:text-[32px] leading-[1.4] uppercase whitespace-nowrap px-[24px] py-[6px] no-underline inline-block transition-opacity hover:opacity-60";
 
export default function Drawer({ open, onClose, navItems, onBookCall }: DrawerProps) {
  return (
    <Dialog.Root open={open} onOpenChange={(v) => !v && onClose()}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-999998 bg-black/40 data-[state=open]:animate-[overlayFadeIn_0.4s_ease] data-[state=closed]:animate-[overlayFadeOut_0.3s_ease]" />
        <Dialog.Content
          aria-describedby={undefined}
          className="fixed inset-y-0 right-0 z-999999 w-[72%] max-w-[340px] bg-white shadow-[-8px_0_24px_rgba(0,0,0,0.12)] data-[state=open]:animate-[drawerSlideIn_0.4s_ease] data-[state=closed]:animate-[drawerSlideOut_0.3s_ease]"
        >
          <Dialog.Title className="sr-only">Navigation menu</Dialog.Title>

          {/* X close button — top right, matches Figma top:40px right:~24px */}
          <Dialog.Close
            aria-label="Close menu"
            className="absolute top-[40px] right-[24px] w-[21px] h-[20px] flex items-center justify-center cursor-pointer border-none bg-transparent text-black text-[20px]"
          >
            <FaXmark />
          </Dialog.Close>

          {/* Nav links — left-aligned, starting 160px from top */}
          <nav className="pt-[160px] pl-[27px]">
            <ul className="flex flex-col gap-[20px] list-none m-0 p-0 items-start">
              <li>
                <Link href="/#work" onClick={onClose} className={LINK_CLASS}>
                  Our Work
                </Link>
              </li>
              <li>
                <Link href="/about" onClick={onClose} className={LINK_CLASS}>
                  Our Difference
                </Link>
              </li>
              <li>
                <button
                  type="button"
                  onClick={onBookCall}
                  className={`${LINK_CLASS} border-none cursor-pointer p-0 px-[24px] py-[6px]`}
                >
                  Book a call
                </button>
              </li>
              <li>
                <Link href="/shop" onClick={onClose} className={LINK_CLASS}>
                  The Shop
                </Link>
              </li>
            </ul>
          </nav>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
