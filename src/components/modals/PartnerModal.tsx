"use client";

import { useModal } from "./ModalProvider";
import SideModal from "./SideModal";

export default function PartnerModal() {
  const { activeModal, closeModal, switchModal } = useModal();

  return (
    <SideModal open={activeModal === "partner"} onClose={closeModal}>
      <div className="flex flex-col justify-between min-h-full">
        <h4 className="font-druk text-[58px] leading-[0.9] tracking-normal uppercase text-black">
          Partner with us and build your brand!
        </h4>
        <ul className="list-none p-0 flex flex-col gap-6 w-[345px] max-w-full pb-[50px]">
          <li className="border-b border-[#C8C8C8]">
            <a
              href="https://cal.com/deepsocal/discovery"
              target="_blank"
              rel="noopener noreferrer"
              className="font-druk text-[25px] no-underline text-dark-text py-5 flex w-full tracking-[1px] leading-[1.96] cursor-pointer bg-none border-none text-left"
            >
              Book a Call
            </a>
          </li>
          <li className="border-b border-[#C8C8C8]">
            <button
              onClick={() => switchModal("scoping")}
              className="font-druk text-[25px] no-underline text-dark-text py-5 flex w-full tracking-[1px] leading-[1.96] cursor-pointer bg-none border-none text-left"
            >
              Free Scoping Workshop
            </button>
          </li>
          <li className="border-b border-[#C8C8C8]">
            <button
              onClick={() => switchModal("contact")}
              className="font-druk text-[25px] no-underline text-dark-text py-5 flex w-full tracking-[1px] leading-[1.96] cursor-pointer bg-none border-none text-left"
            >
              Start Building
            </button>
          </li>
        </ul>
      </div>
    </SideModal>
  );
}
