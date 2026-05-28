import localFont from "next/font/local";
import {
  Zilla_Slab,
  Instrument_Serif,
  Inter,
  Quintessential,
  Bangers,
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

export const bangers = Bangers({
  subsets: ["latin"],
  weight: "400",
  variable: "--nf-bangers",
  display: "swap",
});

// Acumin Pro Condensed — headlines / titles / wordmark. Israel's one .woff2
// from onlinewebfonts.com is visually Bold (matches Figma's
// `Acumin Pro Condensed: Bold` spec). Declared as the 400–700 range so the
// same file serves any weight request in that band without faux-bolding;
// swap in the full licensed family later without touching components.
export const acuminCondensed = localFont({
  src: "../fonts/AcuminProCondensed.woff2",
  weight: "400 700",
  style: "normal",
  variable: "--nf-acumin-condensed",
  display: "swap",
});

// Acumin Pro — body / italic / bold. Regular + Italic + Bold + Bold
// Italic OTFs from Israel.
export const acuminPro = localFont({
  src: [
    { path: "../fonts/AcuminPro-Regular.otf", weight: "400", style: "normal" },
    { path: "../fonts/AcuminPro-Italic.otf", weight: "400", style: "italic" },
    { path: "../fonts/AcuminPro-Bold.otf", weight: "700", style: "normal" },
    { path: "../fonts/AcuminPro-BoldItalic.otf", weight: "700", style: "italic" },
  ],
  variable: "--nf-acumin",
  display: "swap",
});

// Overpass Mono — accent / numeric / mono text. Variable font (single
// file, full 300-700 weight range).
export const overpassMono = localFont({
  src: "../fonts/OverpassMono.ttf",
  weight: "300 700",
  style: "normal",
  variable: "--nf-overpass-mono",
  display: "swap",
});
