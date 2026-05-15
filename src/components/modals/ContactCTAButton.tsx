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
        "font-bangers bg-dark text-white text-[clamp(16px,1.6vw,20px)] tracking-wide uppercase h-[48px] px-8 inline-flex items-center justify-center cursor-pointer transition-colors hover:bg-[#333] border-none"
      }
    >
      {label}
    </button>
  );
}
