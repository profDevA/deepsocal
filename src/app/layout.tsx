import type { Metadata } from "next";
import "./globals.css";
import { config } from "@fortawesome/fontawesome-svg-core";
import "@fortawesome/fontawesome-svg-core/styles.css";
config.autoAddCss = false;

import { ModalProvider } from "@/components/modals/ModalProvider";
import Modals from "@/components/modals/Modals";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import LayoutShell from "./LayoutShell";

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
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Zilla+Slab:ital,wght@0,700;1,700&family=Instrument+Serif:ital@0;1&family=Inter:ital,wght@0,300;0,400;0,500;0,600;1,300&family=Quintessential&display=swap"
          rel="stylesheet"
        />
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.7.2/css/all.min.css"
          integrity="sha512-Evv84Mr4kqVGRNSgIGL/F/aIDqQb7xQ2vcrdIwxfjThSH8CSR7PBEakCr51Ck+w+/U6swU2Im1vVX0SVk9ABhg=="
          crossOrigin="anonymous"
          referrerPolicy="no-referrer"
        />
      </head>
      <body>
        <ModalProvider>
          <Header />
          <LayoutShell>{children}</LayoutShell>
          <Footer />
          <Modals />
        </ModalProvider>
      </body>
    </html>
  );
}
