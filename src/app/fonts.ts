import localFont from "next/font/local";
import {
  Zilla_Slab,
  Instrument_Serif,
  Inter,
  Quintessential,
} from "next/font/google";

export const druk = localFont({
  src: "../fonts/Druk-Medium-Web.woff2",
  weight: "500",
  style: "normal",
  variable: "--nf-druk",
  display: "swap",
});

export const esAllianz = localFont({
  src: [
    { path: "../fonts/ESAllianz-Regular.woff2", weight: "400", style: "normal" },
    { path: "../fonts/ESAllianz-Italic.woff2", weight: "400", style: "italic" },
    { path: "../fonts/ESAllianz-Medium.woff2", weight: "500", style: "normal" },
    { path: "../fonts/ESAllianz-MediumItalic.woff2", weight: "500", style: "italic" },
  ],
  variable: "--nf-esallianz",
  display: "swap",
});

export const zillaSlab = Zilla_Slab({
  subsets: ["latin"],
  weight: "700",
  style: ["normal", "italic"],
  variable: "--nf-zilla",
  display: "swap",
});

export const instrumentSerif = Instrument_Serif({
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
  variable: "--nf-instrument",
  display: "swap",
});

export const inter = Inter({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  style: ["normal"],
  variable: "--nf-inter",
  display: "swap",
});

export const quintessential = Quintessential({
  subsets: ["latin"],
  weight: "400",
  variable: "--nf-quintessential",
  display: "swap",
});
