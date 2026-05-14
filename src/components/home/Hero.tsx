import { FaArrowDown } from "react-icons/fa6";

export default function Hero() {
  return (
    <section
      id="hero"
      className="bg-[#e6e6e6] w-full flex flex-col items-center px-6 pt-[clamp(60px,12vw,180px)] pb-[clamp(40px,8vw,120px)]"
    >
      <div className="w-full max-w-[1071px] flex flex-col items-center gap-[clamp(20px,3vw,40px)] text-center">
        <h1 className="font-bangers tracking-[clamp(1.5px,0.2vw,3px)] leading-[0.94] text-[clamp(40px,8vw,96px)] m-0">
          <span className="text-[rgba(17,17,17,0.2)]">designing useful </span>
          <span className="text-dark">futures for southern California</span>
        </h1>

        <p className="font-inter text-[16px] leading-[20px] tracking-[0.48px] text-dark max-w-[564px] m-0">
          We work with local businesses, startups, and communities to turn real
          regional challenges into lasting solutions from the coastline to the
          culture to the commerce.
        </p>
      </div>

      <div className="mt-[clamp(40px,7vw,90px)] w-full max-w-[924px] flex flex-col items-center gap-[clamp(32px,5vw,64px)]">
        <div
          className="relative w-full max-w-[535px] aspect-535/271 overflow-hidden rounded-[clamp(8px,1vw,16px)] bg-dark animate-hero-glow bg-[length:200%_200%]"
          style={{
            backgroundImage:
              "linear-gradient(120deg, #111 0%, #1f1f1f 25%, #FF8126 50%, #1f1f1f 75%, #111 100%)",
          }}
          aria-hidden="true"
        >
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="font-bangers text-white/30 text-[clamp(24px,4vw,48px)] tracking-[2px] uppercase">
              Hero video
            </span>
          </div>
          <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />
        </div>

        <a
          href="#companies"
          aria-label="Scroll to next section"
          className="flex items-center justify-center w-10 h-10 rounded-full border border-dark text-dark hover:bg-dark hover:text-white transition-colors animate-bounce"
          style={{ animationDuration: "2.4s" }}
        >
          <FaArrowDown className="text-[18px]" />
        </a>
      </div>
    </section>
  );
}
