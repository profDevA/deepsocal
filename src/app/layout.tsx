import type { Metadata } from "next";
import "./globals.css";

import {
  druk,
  esAllianz,
  zillaSlab,
  instrumentSerif,
  inter,
  quintessential,
  bangers,
  acuminCondensed,
  acuminPro,
  overpassMono,
} from "./fonts";
import { ModalProvider } from "@/components/modals/ModalProvider";
import Modals from "@/components/modals/Modals";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import BigWordmark from "@/components/home/BigWordmark";
import LayoutShell from "./LayoutShell";
import SmoothScroll from "@/components/animation/SmoothScroll";

const fontVars = [
  druk,
  esAllianz,
  zillaSlab,
  instrumentSerif,
  inter,
  quintessential,
  bangers,
  acuminCondensed,
  acuminPro,
  overpassMono,
]
  .map((f) => f.variable)
  .join(" ");

export const metadata: Metadata = {
  metadataBase: new URL("https://deepsocal.com"),
  title: {
    default: "DeepSoCal",
    template: "%s | DeepSoCal",
  },
  description:
    "DeepSoCal is a regional strategic design agency building transformative experiences for Southern California's brands.",
  icons: {
    icon: "/images/DeepSoCal-Favicon.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={fontVars}>
      <head />
      <body>
        <ModalProvider>
          <SmoothScroll />
          <Header />
          <LayoutShell>{children}</LayoutShell>
          <BigWordmark />
          <Footer />
          <Modals />
        </ModalProvider>
      </body>
    </html>
  );
}
