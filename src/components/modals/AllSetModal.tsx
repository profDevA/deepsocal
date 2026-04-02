"use client";

import { useModal } from "./ModalProvider";
import CenterModal from "./CenterModal";

export default function AllSetModal() {
  const { activeModal, closeModal } = useModal();

  return (
    <CenterModal open={activeModal === "allset"} onClose={closeModal}>
      <div className="text-center py-[60px] px-10 max-w-[723px] mx-auto">
        <h2 className="font-[Arial,sans-serif] font-bold text-[clamp(48px,4.7vw,68px)] leading-[1.17] tracking-[-1.37px] uppercase mb-11 text-black">You&apos;re All Set!</h2>
        <p className="font-[Arial,sans-serif] font-normal text-[clamp(22px,2.4vw,35px)] leading-[1.44] tracking-[-1.05px] max-w-[723px] mx-auto mb-11 text-black">
          You&apos;ve successfully registered for our free scoping workshop.
        </p>
        <div className="flex gap-[38px] justify-center items-center flex-wrap">
          <button onClick={closeModal} className="bg-black text-white uppercase rounded-none font-[Arial,sans-serif] text-base font-normal tracking-[-0.44px] px-6 py-3 min-h-[43px] inline-flex items-center justify-center no-underline border-none cursor-pointer w-[190px] h-[57px]">
            Got it, thanks
          </button>
          <a
            href="https://calendar.google.com"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-transparent border-[1.3px] border-black text-black inline-flex items-center justify-center uppercase font-[Arial,sans-serif] font-normal text-base tracking-[-0.58px] rounded-none p-0 w-[190px] h-[57px] cursor-pointer no-underline hover:bg-black hover:text-[#E3DFDC]"
          >
            Add to calendar
          </a>
        </div>
      </div>
    </CenterModal>
  );
}
