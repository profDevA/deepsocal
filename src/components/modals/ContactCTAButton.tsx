"use client";

import { useModal } from "./ModalProvider";

export default function ContactCTAButton({
  label = "Book a call",
  className,
}: {
  label?: string;
  className?: string;
}) {
  const { openModal } = useModal();

  return (
    <button
      type="button"
      onClick={() => openModal("contact")}
      className={
        className ??
        "font-bangers bg-dark text-white text-[16px] sm:text-[18px] md:text-[20px] tracking-wide uppercase h-[48px] px-8 inline-flex items-center justify-center cursor-pointer transition-colors hover:bg-[#333] border-none"
      }
    >
      {label}
    </button>
  );
}
