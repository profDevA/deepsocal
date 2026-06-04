"use client";

import { useEffect, useRef } from "react";
import Lenis from "lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function SmoothScroll() {
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.4,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      wheelMultiplier: 1.2,
      touchMultiplier: 2,
      infinite: false,
    });

    lenisRef.current = lenis;

    lenis.on("scroll", ScrollTrigger.update);

    gsap.ticker.add((time) => {
      lenis.raf(time * 1000);
    });
    gsap.ticker.lagSmoothing(0);

    function handleAnchorClick(e: MouseEvent) {
      const link = (e.target as HTMLElement).closest<HTMLAnchorElement>("a[href]");
      if (!link) return;
      const href = link.getAttribute("href");
      if (!href) return;

      // Pull the hash out of links like "#work" or "/#work".
      const hashIndex = href.indexOf("#");
      if (hashIndex === -1) return;
      const hash = href.slice(hashIndex);
      if (hash === "#") return;

      // "#top" = smooth scroll to the very top (used by the footer's "Back to top").
      if (hash === "#top") {
        e.preventDefault();
        lenis.scrollTo(0, { duration: 1.8 });
        return;
      }

      // Only hijack the click when the target lives on the current page —
      // e.g. "/#work" clicked while already on "/". Cross-page links (like
      // "/#work" from /about) fall through so Next can navigate first.
      const path = href.slice(0, hashIndex);
      const samePage =
        path === "" || path === window.location.pathname;
      if (!samePage) return;

      const target = document.querySelector(hash);
      if (!target) return;
      e.preventDefault();
      lenis.scrollTo(target as HTMLElement, { duration: 1.8, offset: 0 });
    }

    document.addEventListener("click", handleAnchorClick);

    return () => {
      document.removeEventListener("click", handleAnchorClick);
      lenis.destroy();
      lenisRef.current = null;
    };
  }, []);

  return null;
}
