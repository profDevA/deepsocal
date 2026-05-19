"use client";

import { useModal } from "@/components/modals/ModalProvider";

/**
 * Decorative page frame for the home page:
 * - Two thin vertical rails inset 15px from the left and right viewport edges,
 *   running the full viewport height (including over the header).
 * - A vertical "CONTACT US" button anchored to the right rail, positioned near
 *   the top of the page (Figma node 12:308 reference).
 *
 * Sits above the header (z-100000 — header is z-9999) so the rails read as page
 * chrome rather than getting clipped by the header background. The whole layer
 * is `pointer-events-none` except the contact button itself, so it never blocks
 * clicks on the underlying content (header pills, page links, etc.).
 *
 * Hidden on small screens (< 768px) to avoid crowding mobile layouts.
 */
export default function PageFrame() {
  const { openModal } = useModal();

  return (
    <div
      aria-hidden="false"
      className="pointer-events-none fixed inset-0 z-100000 hidden md:block"
    >
      <span
        aria-hidden="true"
        className="absolute top-0 bottom-0 left-[15px] w-px bg-dark/40"
      />
      <span
        aria-hidden="true"
        className="absolute top-0 bottom-0 right-[15px] w-px bg-dark/40"
      />

      <button
        type="button"
        onClick={() => openModal("contact")}
        aria-label="Open contact form"
        className="pointer-events-auto absolute right-[15px] top-1/2 -translate-y-1/2 translate-x-1/2 rotate-90 origin-center font-bangers bg-dark text-white text-[13px] tracking-[2px] uppercase px-5 py-[6px] leading-none whitespace-nowrap cursor-pointer transition-colors hover:bg-primary-orange hover:text-dark border-none shadow-[0_4px_14px_rgba(0,0,0,0.25)]"
      >
        Contact us
      </button>
    </div>
  );
}
