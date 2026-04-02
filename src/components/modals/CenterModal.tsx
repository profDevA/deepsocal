"use client";

import { useEffect, type ReactNode } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";

interface CenterModalProps {
  open: boolean;
  onClose: () => void;
  children: ReactNode;
}

export default function CenterModal({ open, onClose, children }: CenterModalProps) {
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
      <div className="max-w-[1134px] w-full relative mx-4">
        <div className="bg-brand border-none rounded-none min-h-[829px] relative flex items-center justify-center">
          <button onClick={onClose} className="w-10 h-10 bg-black text-white opacity-100 rounded-full inline-flex no-underline items-center justify-center text-[22px] absolute top-7 right-7 z-[2] border-none cursor-pointer">
            <FontAwesomeIcon icon={faXmark} />
          </button>
          {children}
        </div>
      </div>
    </div>
  );
}
