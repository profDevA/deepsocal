"use client";

import { useEffect, useRef, type ReactNode } from "react";

type Props = {
  children: ReactNode;
  className?: string;
  /** ms to delay the entrance after intersection (default 0) */
  delay?: number;
  /** intersection threshold 0-1 (default 0.15) */
  threshold?: number;
  /** "0px 0px -10% 0px" — pull trigger up so reveal fires before fully in view */
  rootMargin?: string;
  /** if true, only reveal once and stop observing (default true) */
  once?: boolean;
};

export default function RevealOnScroll({
  children,
  className = "",
  delay = 0,
  threshold = 0.15,
  rootMargin = "0px 0px -10% 0px",
  once = true,
}: Props) {
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    if (typeof IntersectionObserver === "undefined") {
      node.classList.add("is-visible");
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            const reveal = () => entry.target.classList.add("is-visible");
            if (delay) window.setTimeout(reveal, delay);
            else reveal();
            if (once) observer.unobserve(entry.target);
          } else if (!once) {
            entry.target.classList.remove("is-visible");
          }
        }
      },
      { threshold, rootMargin }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [delay, threshold, rootMargin, once]);

  return (
    <div ref={ref} className={`reveal ${className}`}>
      {children}
    </div>
  );
}
