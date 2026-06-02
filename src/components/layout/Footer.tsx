"use client";

import { FaInstagram, FaLinkedinIn, FaFacebook, FaXTwitter } from "react-icons/fa6";

// Mobile uses larger titles (24px) / smaller body (14px); desktop 18px / 16px.
const COL_TITLE = "font-acumin-condensed text-[#d7d7d7] text-[24px] leading-[32px] lg:text-[18px] lg:leading-[28px] uppercase m-0";
const COL_BODY = "font-acumin font-normal text-[#d7d7d7] text-[14px] lg:text-[16px] leading-[20px] tracking-[0.48px] no-underline hover:opacity-70 transition-opacity";

const socialLinks = [
  { icon: FaInstagram, href: "#", label: "Instagram", bg: false },
  { icon: FaLinkedinIn, href: "#", label: "LinkedIn", bg: true },
  { icon: FaFacebook, href: "#", label: "Facebook", bg: false },
  { icon: FaXTwitter, href: "#", label: "X / Twitter", bg: false },
];

export default function Footer() {
  return (
    <footer className="bg-[#1e1e1e] w-full">

      {/* Main content — pt=41, bottom bar starts at y=174 so pb≈33 before bar */}
      <div className="px-[25px] lg:px-[88px] pt-[41px] pb-[33px]">

        {/* Desktop: tagline left + 3 columns right. Mobile: centered single column stack */}
        <div className="flex flex-col items-center lg:items-center lg:flex-row gap-[50px] lg:gap-[40px]">

          {/* Left — tagline (288px wide on desktop) */}
          <div className="flex flex-col items-start gap-0 w-full lg:w-[288px] shrink-0">
            {/* YOUR — centered above the pill */}
            <div className="w-full flex justify-center">
              <span
                className="font-acumin-condensed font-bold text-[#d7d7d7] text-[28px] lg:text-[25.614px] leading-[25.881px] whitespace-nowrap inline-block text-center"
                style={{ transform: "rotate(-3.36deg)" }}
              >
                YOUR
              </span>
            </div>
            {/* EMBEDDED ALLY pill */}
            <div className="w-full flex justify-center mt-[9px]">
              <span
                className="font-acumin-condensed font-bold text-[#d7d7d7] text-[28px] lg:text-[25.614px] leading-[25.881px] whitespace-nowrap inline-block"
                style={{ transform: "rotate(-2.27deg)" }}
              >
                EMBEDDED ALLY
              </span>
            </div>
            {/* Across Southern California */}
            <div className="w-full mt-[8px] flex justify-center">
              <span
                className="font-acumin font-normal text-[#d7d7d7] text-[13.47px] lg:text-[16px] leading-[17.242px] lg:leading-[20px] whitespace-nowrap inline-block"
                style={{ transform: "rotate(-2.54deg)" }}
              >
                Across Southern California
              </span>
            </div>
          </div>

          {/* Spacer — pushes columns to the right on desktop */}
          <div className="hidden lg:block flex-1" />

          {/* Right — 3 columns. Mobile: stacked & centered. Desktop: row, left-aligned */}
          <div className="flex flex-col items-center gap-y-[50px] w-full lg:w-auto lg:flex-row lg:flex-wrap lg:items-start lg:gap-x-[49px] lg:gap-y-[30px] shrink-0">

            {/* Contact Us */}
            <div className="flex flex-col items-center text-center gap-[14px] w-full lg:w-[207px] lg:items-start lg:text-left">
              <h3 className={COL_TITLE}>Contact Us</h3>
              <div className="flex flex-col items-center lg:items-start gap-[6px]">
                <a href="mailto:create@deepsocal.com" className={COL_BODY}>create@deepSoCol.com</a>
                <a href="mailto:careers@deepsocal.com" className={COL_BODY}>careers@deepsocal.com</a>
              </div>
            </div>

            {/* Visit Us */}
            <div className="flex flex-col items-center text-center gap-[14px] w-full lg:w-[206px] lg:items-start lg:text-left">
              <h3 className={COL_TITLE}>Visit Us</h3>
              <div className="flex flex-col items-center lg:items-start gap-[6px]">
                <a href="https://behance.com/deepSoCal" target="_blank" rel="noopener noreferrer" className={COL_BODY}>Behance.com/deepSoCal/</a>
                <a href="https://dribbble.com/deepSoCal" target="_blank" rel="noopener noreferrer" className={COL_BODY}>Dribble.com/deepSoCal/</a>
              </div>
            </div>

            {/* Follow Us */}
            <div className="flex flex-col items-center text-center gap-[14px] w-full lg:w-[179px] lg:items-start lg:text-left">
              <h3 className={COL_TITLE}>Follow Us</h3>
              <div className="flex items-center gap-[10px]">
                {socialLinks.map(({ icon: Icon, href, label, bg }) => (
                  <a
                    key={label}
                    href={href}
                    aria-label={label}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center hover:opacity-70 transition-opacity"
                  >
                    {bg ? (
                      <span className="bg-white rounded-[4px] w-[18px] h-[18px] flex items-center justify-center">
                        <Icon size={14} color="#000" />
                      </span>
                    ) : (
                      <Icon size={18} color="#ffffff" />
                    )}
                  </a>
                ))}
              </div>
            </div>

          </div>
        </div>
      </div>

      {/* Bottom bar — nearly full-width (24px margin each side matching Figma x=24, w=1402).
          Mobile: copyright + back-to-top stacked & centered. Desktop: spaced apart on one row. */}
      <div className="mx-[24px] border-t border-[#c5c5c5]">
        <div className="lg:mx-[36px] py-[19px] flex flex-col items-center gap-[16px] text-center lg:flex-row lg:justify-between lg:gap-3">
          <p className="font-acumin font-normal text-[#d7d7d7] text-[16px] leading-[20px] tracking-[0.48px] m-0">
            Copyright &copy; {new Date().getFullYear()} | All rights reserved.
          </p>
          <a
            href="#top"
            className="font-acumin font-normal text-[#d7d7d7] text-[16px] leading-[20px] tracking-[0.48px] no-underline hover:opacity-70 transition-opacity"
          >
            Back to top ↑
          </a>
        </div>
      </div>

    </footer>
  );
}
