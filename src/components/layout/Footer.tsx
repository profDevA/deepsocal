"use client";

import Link from "next/link";

const COL_TITLE = "font-inter font-semibold text-[#d7d7d7] text-[18px] leading-[28px] uppercase m-0";
const COL_LINK = "font-inter text-[#d7d7d7] text-[16px] leading-[20px] tracking-[0.48px] no-underline hover:opacity-80";

export default function Footer() {
  const handleBackToTop = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="bg-dark w-full">
      <div className="px-[clamp(20px,5vw,80px)] py-[clamp(40px,5vw,60px)]">
        <div className="max-w-[1380px] mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-[clamp(30px,4vw,60px)]">
            <div className="flex flex-col gap-2">
              <span className="font-bangers text-[#d7d7d7] text-[clamp(28px,3vw,38px)] leading-none tracking-[1px]">
                DeepSocal
              </span>
              <span className="font-inter text-[#d7d7d7] text-[14px] leading-[18px] tracking-[0.42px]">
                Your embedded ally across Southern California.
              </span>
            </div>

            <div className="flex flex-col gap-3">
              <h3 className={COL_TITLE}>Contact Us</h3>
              <a href="mailto:create@deepsocal.com" className={COL_LINK}>create@deepsocal.com</a>
              <a href="mailto:careers@deepsocal.com" className={COL_LINK}>careers@deepsocal.com</a>
            </div>

            <div className="flex flex-col gap-3">
              <h3 className={COL_TITLE}>Visit Us</h3>
              <span className={COL_LINK}>Southern California</span>
              <span className={COL_LINK}>Orange County, CA</span>
            </div>

            <div className="flex flex-col gap-3">
              <h3 className={COL_TITLE}>Follow Us</h3>
              <Link href="#" className={COL_LINK}>Instagram</Link>
              <Link href="#" className={COL_LINK}>LinkedIn</Link>
            </div>
          </div>

          <div className="border-t border-[#c5c5c5] mt-[clamp(30px,4vw,50px)] pt-[18px] flex flex-col sm:flex-row items-center justify-between gap-3">
            <p className="font-inter text-[#d7d7d7] text-[16px] leading-[20px] tracking-[0.48px] m-0">
              Copyright &copy; {new Date().getFullYear()} | All rights reserved.
            </p>
            <a
              href="#"
              onClick={handleBackToTop}
              className="font-inter text-[#d7d7d7] text-[16px] leading-[20px] tracking-[0.48px] no-underline hover:opacity-80"
            >
              Back to top &uarr;
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
