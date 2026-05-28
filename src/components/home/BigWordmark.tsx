import Image from "next/image";
import Link from "next/link";
import {
  FaInstagram,
  FaDribbble,
  FaThreads,
  FaXTwitter,
} from "react-icons/fa6";

const socialLinks = [
  { href: "#", label: "Instagram", Icon: FaInstagram },
  { href: "#", label: "Dribbble", Icon: FaDribbble },
  { href: "#", label: "Threads", Icon: FaThreads },
  { href: "#", label: "X (Twitter)", Icon: FaXTwitter },
];

export default function BigWordmark() {
  return (
    <section data-bigwordmark className="bg-[#e6e6e6] w-full overflow-hidden relative flex items-center justify-center py-[40px] md:py-[80px] lg:py-[120px] px-[25px]">
      {/* Big `deepSoCal` wordmark — dedicated large-size variant Fas exported
          from Figma specifically for this surface (5/28). Distinct from the
          smaller `deepsocal-wordmark.svg` used in the Header:
            - viewBox 1379×393 (~3.51:1 aspect, fill #1E1E1E)
            - no trailing `(*)` mark (asterisk would look misplaced at this
              scale; it lives only on the small header logo)
            - higher-resolution source path geometry for sharp rendering
              at full-viewport width */}
      <Image
        src="/images/deepsocal-wordmark-large.svg"
        alt="deepSoCal"
        width={1379}
        height={393}
        priority
        className="w-full max-w-[1280px] h-auto select-none pointer-events-none"
      />

      <ul className="absolute right-[20px] md:right-[40px] lg:right-[80px] bottom-[20px] md:bottom-[40px] lg:bottom-[60px] flex items-center gap-[10px] list-none p-0 m-0">
        {socialLinks.map(({ href, label, Icon }) => (
          <li key={label}>
            <Link
              href={href}
              aria-label={label}
              className="w-[36px] h-[36px] rounded-full bg-dark text-white flex items-center justify-center no-underline transition-opacity hover:opacity-80"
            >
              <Icon className="text-[18px]" />
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
