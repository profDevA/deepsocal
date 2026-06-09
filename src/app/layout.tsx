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
import SiteChrome from "./SiteChrome";

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
  // TODO: add a dedicated 1200×630 share image (openGraph.images / twitter.images)
  // once brand provides one.
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://deepsocal.com",
    siteName: "DeepSoCal",
    title: "DeepSoCal",
    description:
      "DeepSoCal is a regional strategic design agency building transformative experiences for Southern California's brands.",
  },
  twitter: {
    card: "summary_large_image",
    title: "DeepSoCal",
    description:
      "DeepSoCal is a regional strategic design agency building transformative experiences for Southern California's brands.",
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
          <SiteChrome>{children}</SiteChrome>
          <Modals />
        </ModalProvider>
      </body>
    </html>
  );
}
