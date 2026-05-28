"use client";

import { useModal } from "@/components/modals/ModalProvider";

// Two vertical rails 15px from each viewport edge + rotated CONTACT US
// button (Figma node 12:308). Z-100000 sits above the header (z-9999) so
// rails aren't clipped by the header bg; `pointer-events-none` everywhere
// except the button so links beneath stay clickable.
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
        className="pointer-events-auto absolute right-[15px] top-1/2 -translate-y-1/2 translate-x-1/2 rotate-90 origin-center font-acumin-condensed bg-dark text-white text-[13px] tracking-[2px] uppercase px-5 py-[6px] leading-none whitespace-nowrap cursor-pointer transition-colors hover:bg-[#333] border-none shadow-[0_4px_14px_rgba(0,0,0,0.25)]"
      >
        Contact us
      </button>
    </div>
  );
}
