"use client";

import * as Dialog from "@radix-ui/react-dialog";
import Link from "next/link";
import { FaXmark } from "react-icons/fa6";
import { useModal } from "./ModalProvider";

export default function ThankYouModal() {
  const { activeModal, closeModal } = useModal();
  const open = activeModal === "thankyou";

  return (
    <Dialog.Root open={open} onOpenChange={(v) => !v && closeModal()}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-99998 bg-black/50" />
        <Dialog.Content
          aria-describedby="thankyou-modal-description"
          className="fixed inset-0 z-99999 bg-[#e6e6e6] flex items-center justify-center overflow-y-auto"
        >
          <Dialog.Close
            aria-label="Close"
            className="absolute top-7 right-7 w-10 h-10 bg-dark text-white rounded-full inline-flex items-center justify-center text-[22px] cursor-pointer border-none z-10"
          >
            <FaXmark />
          </Dialog.Close>

          <div className="flex flex-col gap-11 items-center text-center max-w-[723px] w-full px-6 py-16">
            <Dialog.Title className="font-bangers text-black uppercase m-0 text-[48px] sm:text-[64px] md:text-[80px] lg:text-[96px] leading-[0.83] tracking-[-1.37px]">
              Thank You!
            </Dialog.Title>
            <p
              id="thankyou-modal-description"
              className="font-inter font-light text-black text-[20px] sm:text-[24px] md:text-[28px] lg:text-[32px] leading-[1.18] tracking-[-1.05px] m-0"
            >
              Your message has been successfully submitted. We appreciate you
              reaching out to us!
            </p>

            <div className="flex gap-[38px] items-center flex-wrap justify-center max-[600px]:gap-4">
              <button
                type="button"
                onClick={closeModal}
                className="font-bangers bg-black text-white text-[16px] tracking-[0.24px] uppercase w-[190px] h-[57px] inline-flex items-center justify-center border-none cursor-pointer transition-colors hover:bg-[#333]"
              >
                Got it, thanks
              </button>
              <Link
                href="/#services"
                onClick={closeModal}
                className="font-bangers bg-transparent border border-black text-black text-[16px] tracking-[0.24px] uppercase w-[190px] h-[57px] inline-flex items-center justify-center no-underline cursor-pointer transition-colors hover:bg-black hover:text-white"
              >
                Browse Services
              </Link>
            </div>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
