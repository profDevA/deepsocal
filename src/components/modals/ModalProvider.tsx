"use client";

import {
  createContext,
  useContext,
  useState,
  useCallback,
  useRef,
  type ReactNode,
  type RefObject,
} from "react";

export type ModalName = "partner" | "contact" | "scoping" | "allset" | "thankyou" | null;

interface ModalContextType {
  activeModal: ModalName;
  // `returnFocusTo`: where focus goes when this modal flow closes. Defaults to
  // the element focused when the modal opened (the button that opened it).
  // Pass it when that element disappears, e.g. the mobile menu's "Contact us"
  // → the menu button. (These dialogs have no Radix Trigger, so Radix itself
  // has nothing to return focus to.)
  openModal: (name: ModalName, returnFocusTo?: HTMLElement | null) => void;
  closeModal: () => void;
  switchModal: (to: ModalName) => void;
  returnFocusRef: RefObject<HTMLElement | null>;
}

const ModalContext = createContext<ModalContextType | null>(null);

export function ModalProvider({ children }: { children: ReactNode }) {
  const [activeModal, setActiveModal] = useState<ModalName>(null);
  const returnFocusRef = useRef<HTMLElement | null>(null);

  const openModal = useCallback((name: ModalName, returnFocusTo?: HTMLElement | null) => {
    const focused = document.activeElement;
    returnFocusRef.current =
      returnFocusTo ?? (focused instanceof HTMLElement && focused !== document.body ? focused : null);
    setActiveModal(name);
  }, []);

  const closeModal = useCallback(() => {
    setActiveModal(null);
  }, []);

  // Keeps returnFocusRef, so e.g. contact → thank-you still returns focus there.
  const switchModal = useCallback((to: ModalName) => {
    setActiveModal(null);
    setTimeout(() => setActiveModal(to), 400);
  }, []);

  return (
    <ModalContext.Provider value={{ activeModal, openModal, closeModal, switchModal, returnFocusRef }}>
      {children}
    </ModalContext.Provider>
  );
}

export function useModal() {
  const ctx = useContext(ModalContext);
  if (!ctx) throw new Error("useModal must be used within ModalProvider");
  return ctx;
}

// For a Radix Dialog.Content `onCloseAutoFocus`: send focus to the stored
// return target if there is one (and it's still on the page).
export function useReturnFocusOnClose() {
  const { returnFocusRef } = useModal();
  return useCallback(
    (event: Event) => {
      const el = returnFocusRef.current;
      if (el?.isConnected) {
        event.preventDefault();
        el.focus();
      }
    },
    [returnFocusRef],
  );
}
