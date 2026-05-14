import { socalThemes } from "@/data/socal-themes";
import CaliforniaMap from "./CaliforniaMap";

const themeIcons: Record<string, string> = {
  "ocean-environment": "M2 12c2-2 4-2 6 0s4 2 6 0 4-2 6 0 4 2 6 0 M2 18c2-2 4-2 6 0s4 2 6 0 4-2 6 0 4 2 6 0",
  "mental-health": "M12 21s-7-4.5-9-10c-1.5-4 1-8 5-8 2 0 3 1 4 2 1-1 2-2 4-2 4 0 6.5 4 5 8-2 5.5-9 10-9 10z",
  "local-commerce": "M3 3h18l-2 12H5L3 3zm2 14h14a2 2 0 1 1 0 4H7a2 2 0 1 1 0-4z",
  culture: "M5 12c0-4 3-7 7-7s7 3 7 7-3 7-7 7-7-3-7-7zm7-4v8 M8 12h8",
  "climate-resilience": "M5 18a4 4 0 0 1 0-8 6 6 0 0 1 12 0 4 4 0 0 1 0 8H5z",
  "ai-digital-access": "M5 4h14v6H5V4zm0 10h14v6H5v-6z M9 7h.01 M9 17h.01",
};

export default function WhyAreWeDifferent() {
  return (
    <section
      id="difference"
      className="bg-[#e6e6e6] w-full py-[clamp(40px,6vw,80px)] px-[clamp(20px,4vw,80px)]"
    >
      <div className="max-w-[1380px] mx-auto border-b border-dark">
        <div className="grid grid-cols-1 md:grid-cols-[447px_1fr] gap-[clamp(24px,4vw,60px)] py-[clamp(40px,5vw,60px)] border-b border-dark md:divide-x md:divide-dark">
          <div className="md:pr-12">
            <h2 className="font-bangers text-dark text-[clamp(32px,4vw,48px)] leading-[1.04] tracking-[1.44px] m-0">
              Why are we different?
            </h2>
          </div>
          <div className="md:pl-12">
            <p className="font-inter text-dark text-[16px] leading-[20px] tracking-[0.48px] max-w-[742px] m-0">
              We treat marketing like community-building, because that&apos;s
              what it is. Every campaign we run is shaped by how Southern
              California actually lives, moves, and connects. We blend cultural
              insight with systems thinking to create strategies that don&apos;t
              just reach people, they bring them in. The result: brands that
              communities actually trust.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-[minmax(280px,580px)_1fr] gap-[clamp(24px,3vw,50px)] py-[clamp(40px,5vw,60px)] items-center">
          <div className="bg-white border border-[#c0c0c0] rounded-[clamp(20px,2.5vw,39px)] aspect-580/421 max-w-[580px] w-full p-[clamp(20px,3vw,40px)] flex items-center justify-center">
            <CaliforniaMap className="w-auto h-full max-h-[380px]" />
          </div>

          <div className="overflow-x-auto overflow-y-hidden no-scrollbar -mx-[clamp(20px,4vw,80px)] md:mx-0 pl-[clamp(20px,4vw,80px)] md:pl-0">
            <div className="flex gap-[clamp(20px,2.5vw,44px)] items-center pr-[clamp(20px,4vw,80px)] md:pr-0">
              {socalThemes.map((theme) => (
                <ThemeCard key={theme.id} theme={theme} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function ThemeCard({ theme }: { theme: (typeof socalThemes)[number] }) {
  const iconPath = themeIcons[theme.id] ?? themeIcons.culture;
  return (
    <article
      className="shrink-0 w-[clamp(260px,28vw,328px)] aspect-square rounded-[clamp(16px,2vw,24px)] border border-[#b0b0b0] shadow-[0_5px_38px_rgba(0,0,0,0.18)] overflow-hidden p-[clamp(20px,3%,28px)] flex flex-col justify-between gap-3 relative"
      style={{ backgroundColor: theme.bgColor }}
    >
      <div
        className="w-[clamp(72px,12%,110px)] h-[clamp(72px,12%,110px)] rounded-full bg-white/50 flex items-center justify-center"
        aria-hidden="true"
      >
        <svg
          viewBox="0 0 24 24"
          width="44"
          height="44"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="text-dark/70"
        >
          <path d={iconPath} />
        </svg>
      </div>

      <div className="flex flex-col gap-3">
        <span
          className="self-start font-bangers text-[#d7d7d7] text-[clamp(16px,1.6vw,22px)] leading-[1.4] px-[14px] py-1 uppercase"
          style={{ backgroundColor: "rgba(30,30,30,0.85)" }}
        >
          {theme.name}
        </span>
        <p className="font-inter font-medium text-dark text-[clamp(16px,1.5vw,20px)] leading-[1.3] tracking-[-0.4px] m-0">
          {theme.description}
        </p>
      </div>
    </article>
  );
}
