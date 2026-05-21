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
    <section className="bg-[#e6e6e6] w-full overflow-hidden relative flex items-center justify-center py-[clamp(40px,8vw,120px)]">
      <span
        aria-hidden="true"
        className="font-bangers text-dark whitespace-nowrap leading-none tracking-[clamp(2px,0.6vw,8px)] text-[clamp(80px,28vw,368px)] select-none"
      >
        DeepSocal
      </span>

      <ul className="absolute right-[clamp(20px,4vw,80px)] bottom-[clamp(20px,4vw,60px)] flex items-center gap-[10px] list-none p-0 m-0">
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
