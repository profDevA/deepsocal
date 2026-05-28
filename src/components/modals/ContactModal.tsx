"use client";

import * as Dialog from "@radix-ui/react-dialog";
import { FaXmark } from "react-icons/fa6";
import { useModal } from "./ModalProvider";
import { useFormSubmit } from "@/hooks/useFormSubmit";

export default function ContactModal() {
  const { activeModal, closeModal, switchModal } = useModal();
  const { submit, isSubmitting } = useFormSubmit("/api/contact");

  const handleSubmit = async (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const formData = new FormData(form);
    const success = await submit({
      name: formData.get("name") as string,
      email: formData.get("email") as string,
      message: formData.get("message") as string,
    });
    if (success) {
      form.reset();
      switchModal("thankyou");
    }
  };

  const open = activeModal === "contact";

  return (
    <Dialog.Root open={open} onOpenChange={(v) => !v && closeModal()}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-999998 bg-black/50" />
        <Dialog.Content
          aria-describedby="contact-modal-description"
          className="fixed top-0 bottom-0 right-0 my-auto z-999999 h-[819px] max-h-[calc(100vh-40px)] w-[453px] max-w-[90vw] bg-white overflow-y-auto shadow-[0_5px_15px_rgba(0,0,0,0.25)] animate-slide-in flex flex-col"
        >
          <Dialog.Close
            aria-label="Close"
            className="absolute top-[28px] right-[34px] w-10 h-10 bg-dark text-white rounded-full inline-flex items-center justify-center text-[22px] cursor-pointer border-none z-10"
          >
            <FaXmark />
          </Dialog.Close>

          <div className="flex flex-col gap-7 px-[46px] pt-[88px] pb-[50px] max-[600px]:px-8 max-[600px]:pt-16">
            <Dialog.Title className="font-acumin-condensed text-black text-[58px] leading-[0.9] uppercase m-0">
              Contact us
            </Dialog.Title>
            <p
              id="contact-modal-description"
              className="font-inter text-[18px] leading-[1.44] tracking-[-0.5px] text-black m-0"
            >
              Start a direct conversation with your embedded ally. Tell us about
              your business goals and the challenges you&apos;re facing. Our team
              will get back to you with ways we can move forward.
            </p>

            <form onSubmit={handleSubmit} className="flex flex-col gap-5 mt-2">
              <div className="flex flex-col gap-2">
                <label htmlFor="contact-name" className="font-inter text-[18px] tracking-[-0.2px] leading-none text-black">
                  Name:
                </label>
                <input
                  id="contact-name"
                  name="name"
                  type="text"
                  required
                  placeholder="Enter your name"
                  className="font-inter text-sm px-3 py-3 bg-[#f3f3f3] border border-[#e6e6e6] rounded-none text-black h-[46px] placeholder:text-[#a9a9a9] focus:outline-none focus:border-black/60"
                />
              </div>

              <div className="flex flex-col gap-2">
                <label htmlFor="contact-email" className="font-inter text-[18px] tracking-[-0.2px] leading-none text-black">
                  Email:
                </label>
                <input
                  id="contact-email"
                  name="email"
                  type="email"
                  required
                  placeholder="Enter your email"
                  className="font-inter text-sm px-3 py-3 bg-[#f3f3f3] border border-[#e6e6e6] rounded-none text-black h-[46px] placeholder:text-[#a9a9a9] focus:outline-none focus:border-black/60"
                />
              </div>

              <div className="flex flex-col gap-2">
                <label htmlFor="contact-message" className="font-inter text-[15px] tracking-[-0.2px] leading-none text-black">
                  Message:
                </label>
                <textarea
                  id="contact-message"
                  name="message"
                  rows={4}
                  required
                  placeholder="Enter your message"
                  className="font-inter text-sm px-3 py-3 bg-[#f3f3f3] border border-[#e6e6e6] rounded-none text-black h-[85px] resize-none placeholder:text-[#a9a9a9] focus:outline-none focus:border-black/60"
                />
              </div>

              <div className="mt-2">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="font-acumin-condensed bg-dark text-white text-[16px] tracking-[0.24px] uppercase px-8 py-3 h-[43px] min-w-[170px] inline-flex items-center justify-center border-none cursor-pointer transition-colors hover:bg-[#333] disabled:opacity-50"
                >
                  {isSubmitting ? "Sending..." : "Send Message"}
                </button>
              </div>
            </form>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
