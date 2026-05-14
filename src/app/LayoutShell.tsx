"use client";

import { useEffect, useState, type ReactNode } from "react";
import { usePathname } from "next/navigation";

export default function LayoutShell({ children }: { children: ReactNode }) {
  const [paddingTop, setPaddingTop] = useState(0);
  const pathname = usePathname();
  const isHome = pathname === "/";

  useEffect(() => {
    function setPageWrapperPadding() {
      const header = document.getElementById("header");
      if (header) {
        setPaddingTop(header.offsetHeight);
      }
    }
    setPageWrapperPadding();
    window.addEventListener("load", setPageWrapperPadding);
    window.addEventListener("resize", setPageWrapperPadding);
    return () => {
      window.removeEventListener("load", setPageWrapperPadding);
      window.removeEventListener("resize", setPageWrapperPadding);
    };
  }, []);

  useEffect(() => {
    const body = document.body;
    body.classList.remove("home");
    if (isHome) {
      body.classList.add("home");
    }
  }, [isHome]);

  return (
    <main id="page-wrapper" style={{ marginTop: paddingTop }}>
      {children}
    </main>
  );
}
