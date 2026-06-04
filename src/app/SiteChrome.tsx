"use client";

import { type ReactNode } from "react";
import { usePathname } from "next/navigation";

import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import BigWordmark from "@/components/home/BigWordmark";
import SmoothScroll from "@/components/animation/SmoothScroll";
import LayoutShell from "./LayoutShell";

export default function SiteChrome({ children }: { children: ReactNode }) {
  const pathname = usePathname();

  // Sanity Studio renders its own full-screen app. Skip the marketing chrome
  // (header / footer / wordmark) and — crucially — Lenis smooth scroll, which
  // hijacks the mouse wheel and breaks Studio's internal scroll containers.
  if (pathname?.startsWith("/studio")) {
    return <>{children}</>;
  }

  return (
    <>
      <SmoothScroll />
      <Header />
      <LayoutShell>{children}</LayoutShell>
      <BigWordmark />
      <Footer />
    </>
  );
}
