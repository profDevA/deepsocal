"use client";

import { useEffect, useState, type ReactNode } from "react";
import { usePathname } from "next/navigation";

export default function LayoutShell({ children }: { children: ReactNode }) {
  const [paddingTop, setPaddingTop] = useState(0);
  const pathname = usePathname();

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
    body.classList.remove("home", "service-page");
    if (pathname === "/") {
      body.classList.add("home");
    } else if (pathname.startsWith("/services")) {
      body.classList.add("service-page");
    }
  }, [pathname]);

  return (
    <main
      id="page-wrapper"
      className="mx-[1.1vw] border-l border-r border-black max-[1025px]:mx-[15px]"
      style={{ paddingTop }}
    >
      {children}
    </main>
  );
}
