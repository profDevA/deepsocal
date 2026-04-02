"use client";

import { useModal } from "./ModalProvider";
import { useFormSubmit } from "@/hooks/useFormSubmit";
import SideModal from "./SideModal";

export default function ContactModal() {
  const { activeModal, closeModal, switchModal } = useModal();
  const { submit, isSubmitting } = useFormSubmit("/api/contact");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
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

  return (
    <SideModal open={activeModal === "contact"} onClose={closeModal}>
      <h4 className="font-druk text-[58px] leading-[0.9] tracking-normal uppercase text-black">Contact us</h4>
      <p className="font-[Arial,sans-serif] text-lg leading-[1.44] tracking-[-0.54px] text-black mt-7">
        Start building your brand through a direct conversation with your
        embedded ally. Tell us about your business goals and the challenges
        you&apos;re facing. Our team will get back to you with ways we can move
        forward.
      </p>
      <form onSubmit={handleSubmit} className="flex flex-col mt-8">
        <div className="mb-[18px]">
          <label className="font-[Arial,sans-serif] text-lg tracking-[-0.2px] leading-none mb-2.5 text-black block">Name:</label>
          <input type="text" name="name" required placeholder="Enter your name" className="font-[Arial,sans-serif] text-sm px-4 py-3 bg-[#E6E6E6] border-none rounded-none resize-none text-black w-[345px] h-[43px] placeholder:text-[#A9A9A9] placeholder:text-sm focus:border-black/60 focus:outline-none max-[1025px]:w-full" />
        </div>
        <div className="mb-[18px]">
          <label className="font-[Arial,sans-serif] text-lg tracking-[-0.2px] leading-none mb-2.5 text-black block">Email:</label>
          <input type="email" name="email" required placeholder="Enter your email" className="font-[Arial,sans-serif] text-sm px-4 py-3 bg-[#E6E6E6] border-none rounded-none resize-none text-black w-[345px] h-[43px] placeholder:text-[#A9A9A9] placeholder:text-sm focus:border-black/60 focus:outline-none max-[1025px]:w-full" />
        </div>
        <div className="mb-[18px]">
          <label className="font-[Arial,sans-serif] text-lg tracking-[-0.2px] leading-none mb-2.5 text-black block">Message:</label>
          <textarea name="message" rows={5} placeholder="Enter your message" className="font-[Arial,sans-serif] text-sm px-4 py-3 bg-[#E6E6E6] border-none rounded-none resize-none text-black w-[345px] h-[120px]! placeholder:text-[#A9A9A9] placeholder:text-sm focus:border-black/60 focus:outline-none max-[1025px]:w-full" />
        </div>
        <div>
          <button type="submit" disabled={isSubmitting} className="bg-black text-white uppercase rounded-none font-[Arial,sans-serif] text-xs font-normal tracking-[-0.44px] px-6 py-3 min-h-[43px] inline-flex items-center justify-center no-underline border-none cursor-pointer disabled:opacity-50">
            {isSubmitting ? "SENDING..." : "Send Message"}
          </button>
        </div>
      </form>
    </SideModal>
  );
}
