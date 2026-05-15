import Link from "next/link";
import { FaCaretDown } from "react-icons/fa6";
import { services } from "@/data/services";
import type { ServiceId } from "@/data/case-studies";

const ALL_LABEL = "All Works";

export default function WorkFilterDropdown({
  current,
}: {
  current?: ServiceId;
}) {
  const currentLabel =
    current ? services.find((s) => s.id === current)?.name ?? ALL_LABEL : ALL_LABEL;

  return (
    <details className="group relative w-[clamp(240px,30vw,293px)]">
      <summary
        className="bg-dark border border-[#bdbdbd] flex items-center justify-between w-full h-[53px] px-6 text-brand cursor-pointer list-none [&::-webkit-details-marker]:hidden"
        aria-label={`Filter by service — currently ${currentLabel}`}
      >
        <span className="font-bangers text-[clamp(20px,2vw,28px)] leading-none">
          {currentLabel}
        </span>
        <FaCaretDown className="text-base transition-transform group-open:rotate-180" aria-hidden="true" />
      </summary>

      <ul className="absolute z-50 left-0 right-0 top-full mt-1 bg-dark border border-[#bdbdbd] list-none p-0 m-0 shadow-lg">
        <li>
          <Link
            href="/#work"
            className={`block w-full text-left px-6 py-3 font-bangers text-brand text-[clamp(16px,1.6vw,20px)] leading-none no-underline hover:bg-[#222] transition-colors ${
              !current ? "bg-[#222]" : ""
            }`}
          >
            {ALL_LABEL}
          </Link>
        </li>
        {services.map((s) => (
          <li key={s.id}>
            <Link
              href={`/services/${s.slug}`}
              className={`block w-full text-left px-6 py-3 font-bangers text-brand text-[clamp(16px,1.6vw,20px)] leading-none no-underline hover:bg-[#222] transition-colors ${
                current === s.id ? "bg-[#222]" : ""
              }`}
            >
              {s.name}
            </Link>
          </li>
        ))}
      </ul>
    </details>
  );
}
