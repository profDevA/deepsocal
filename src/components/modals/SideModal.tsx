"use client";

import { useEffect, type ReactNode } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";

interface SideModalProps {
  open: boolean;
  onClose: () => void;
  children: ReactNode;
}

export default function SideModal({ open, onClose, children }: SideModalProps) {
  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[999999] bg-black/50 flex items-center justify-center">
      <div className="absolute inset-0" onClick={onClose} />
      <div className="fixed top-0 right-0 m-0 h-full w-[453px] max-w-full p-0 bg-brand rounded-[62px_0_0_62px] overflow-y-auto shadow-[0px_5px_15px_rgba(0,0,0,0.25)] animate-slide-in max-[1025px]:max-w-[90%] flex flex-col">
        <div className="rounded-none border-none bg-transparent px-[46px] pr-[34px] pt-[88px] pb-[50px] flex-1 flex flex-col relative">
          <button onClick={onClose} className="w-10 h-10 bg-black text-white opacity-100 rounded-full inline-flex no-underline items-center justify-center text-[22px] absolute top-7 right-7 z-[2] border-none cursor-pointer">
            <FontAwesomeIcon icon={faXmark} />
          </button>
          {children}
        </div>
      </div>
    </div>
  );
}
