import type { Metadata } from "next";
import "./globals.css";

import { druk, esAllianz, inter, acuminCondensed, acuminPro } from "./fonts";
import { ModalProvider } from "@/components/modals/ModalProvider";
import Modals from "@/components/modals/Modals";
import SiteChrome from "./SiteChrome";
import { DEFAULT_SHARE_IMAGE, SITE_DESCRIPTION, SITE_NAME } from "@/lib/metadata";

const fontVars = [druk, esAllianz, inter, acuminCondensed, acuminPro]
  .map((f) => f.variable)
  .join(" ");

// Site-wide defaults. Pages override these via `pageMetadata()` in
// src/lib/metadata.ts, which also sets each page's canonical URL and og:url.
export const metadata: Metadata = {
  metadataBase: new URL("https://deepsocal.com"),
  title: {
    default: SITE_NAME,
    template: `%s | ${SITE_NAME}`,
  },
  description: SITE_DESCRIPTION,
  // Icons come from file conventions in src/app: favicon.ico, icon.svg
  // (DeepSoCal mark, white in dark mode) and apple-icon.png.
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: SITE_NAME,
    title: SITE_NAME,
    description: SITE_DESCRIPTION,
    images: [DEFAULT_SHARE_IMAGE],
  },
  twitter: {
    card: "summary_large_image",
    title: SITE_NAME,
    description: SITE_DESCRIPTION,
    images: [DEFAULT_SHARE_IMAGE.url],
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
