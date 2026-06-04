"use client";

import { useModal } from "@/components/modals/ModalProvider";

// Two vertical rails 15px from each viewport edge (all breakpoints) + rotated
// CONTACT US button (desktop only, Figma node 12:308). Z-100000 sits above the
// header (z-9999) so rails aren't clipped by the header bg; `pointer-events-none`
// everywhere except the button so links beneath stay clickable.
export default function PageFrame() {
  const { openModal } = useModal();

  return (
    <div
      aria-hidden="false"
      className="pointer-events-none fixed inset-0 z-100000 block"
    >
      <span
        aria-hidden="true"
        className="absolute top-0 bottom-0 left-[10px] md:left-[15px] w-px bg-dark/40"
      />
      <span
        aria-hidden="true"
        className="absolute top-0 bottom-0 right-[10px] md:right-[15px] w-px bg-dark/40"
      />

      {/* Rotated CONTACT US tab — desktop only (no room on mobile rails) */}
      <button
        type="button"
        onClick={() => openModal("contact")}
        aria-label="Open contact form"
        className="hidden md:flex items-center justify-center pointer-events-auto absolute right-0 top-1/2 -translate-y-1/2 h-[165px] font-acumin-condensed bg-[#1e1e1e] text-[#d7d7d7] text-[16px] leading-[1.4] uppercase px-[45px] py-[4px] whitespace-nowrap cursor-pointer border-none hover:bg-[#333] transition-colors"
        style={{ writingMode: "vertical-rl", transform: "translateY(-50%) rotate(180deg)" }}
      >
        Contact us
      </button>
    </div>
  );
}
