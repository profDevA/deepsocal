"use client";

import { createContext, useContext, useState, useCallback, type ReactNode } from "react";

export type ModalName = "partner" | "contact" | "scoping" | "allset" | "thankyou" | null;

interface ModalContextType {
  activeModal: ModalName;
  openModal: (name: ModalName) => void;
  closeModal: () => void;
  switchModal: (to: ModalName) => void;
}

const ModalContext = createContext<ModalContextType | null>(null);

export function ModalProvider({ children }: { children: ReactNode }) {
  const [activeModal, setActiveModal] = useState<ModalName>(null);

  const openModal = useCallback((name: ModalName) => {
    setActiveModal(name);
  }, []);

  const closeModal = useCallback(() => {
    setActiveModal(null);
  }, []);

  const switchModal = useCallback((to: ModalName) => {
    setActiveModal(null);
    setTimeout(() => setActiveModal(to), 400);
  }, []);

  return (
    <ModalContext.Provider value={{ activeModal, openModal, closeModal, switchModal }}>
      {children}
    </ModalContext.Provider>
  );
}

export function useModal() {
  const ctx = useContext(ModalContext);
  if (!ctx) throw new Error("useModal must be used within ModalProvider");
  return ctx;
}
