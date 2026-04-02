import localFont from "next/font/local";
import {
  Zilla_Slab,
  Instrument_Serif,
  Inter,
  Quintessential,
} from "next/font/google";

export const druk = localFont({
  src: [
    {
      path: "../../public/fonts/Druk-Medium-Web.woff2",
      weight: "500",
      style: "normal",
    },
    {
      path: "../../public/fonts/Druk-Medium-Web.woff",
      weight: "500",
      style: "normal",
    },
  ],
  variable: "--font-druk",
  display: "swap",
});

export const esAllianz = localFont({
  src: [
    {
      path: "../../public/fonts/ESAllianz-Regular.woff2",
      weight: "400",
      style: "normal",
    },
    {
      path: "../../public/fonts/ESAllianz-Regular.woff",
      weight: "400",
      style: "normal",
    },
    {
      path: "../../public/fonts/ESAllianz-Italic.woff2",
      weight: "400",
      style: "italic",
    },
    {
      path: "../../public/fonts/ESAllianz-Italic.woff",
      weight: "400",
      style: "italic",
    },
    {
      path: "../../public/fonts/ESAllianz-Medium.woff2",
      weight: "500",
      style: "normal",
    },
    {
      path: "../../public/fonts/ESAllianz-Medium.woff",
      weight: "500",
      style: "normal",
    },
    {
      path: "../../public/fonts/ESAllianz-MediumItalic.woff2",
      weight: "500",
      style: "italic",
    },
    {
      path: "../../public/fonts/ESAllianz-MediumItalic.woff",
      weight: "500",
      style: "italic",
    },
  ],
  variable: "--font-es-allianz",
  display: "swap",
});

export const zillaSlab = Zilla_Slab({
  subsets: ["latin"],
  weight: "700",
  style: ["normal", "italic"],
  variable: "--font-zilla-slab",
  display: "swap",
});

export const instrumentSerif = Instrument_Serif({
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
  variable: "--font-instrument-serif",
  display: "swap",
});

export const inter = Inter({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  style: ["normal"],
  variable: "--font-inter",
  display: "swap",
});

export const quintessential = Quintessential({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-quintessential",
  display: "swap",
});
