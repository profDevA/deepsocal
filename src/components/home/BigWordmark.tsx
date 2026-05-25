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
      <span
        aria-hidden="true"
        className="font-bangers text-dark whitespace-nowrap leading-none tracking-[2px] md:tracking-[4px] lg:tracking-[8px] text-[80px] md:text-[200px] lg:text-[368px] select-none"
      >
        DeepSocal
      </span>

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
