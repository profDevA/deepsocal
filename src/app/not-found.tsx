import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Page not found",
};

const BUTTON =
  "font-acumin-condensed text-[16px] sm:text-[18px] tracking-wide uppercase h-[48px] px-8 inline-flex items-center justify-center no-underline transition-colors";

export default function NotFound() {
  return (
    <section className="w-full bg-white">
      <div className="mx-[20px] lg:mx-[25px] min-h-[70vh] flex flex-col items-center justify-center text-center py-[96px]">
        <p className="font-acumin-condensed text-[#1e1e1e] text-[96px] lg:text-[160px] leading-none m-0">
          404
        </p>
        <h1 className="font-acumin-condensed text-[#1e1e1e] text-[32px] lg:text-[42px] leading-[1.2] uppercase mt-[16px] mb-0">
          Page not found
        </h1>
        <p className="font-acumin text-[#1e1e1e] text-[16px] leading-[1.5] max-w-[440px] mt-[16px] mb-0">
          The page you&apos;re looking for doesn&apos;t exist or has moved.
        </p>
        <div className="mt-[40px] flex flex-col sm:flex-row gap-[16px]">
          <Link href="/" className={`${BUTTON} bg-dark text-white hover:bg-[#333]`}>
            Back to home
          </Link>
          <Link
            href="/#work"
            className={`${BUTTON} border border-dark text-dark hover:bg-dark hover:text-white`}
          >
            See our work
          </Link>
        </div>
      </div>
    </section>
  );
}
