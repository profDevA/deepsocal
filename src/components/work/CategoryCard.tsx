import Image from "next/image";
import { type Category } from "@/data/categories";

// Editorial card colors per Figma 566:1642 (5/28 pivot): cream bg + border.
const EDITORIAL_BG = "#EDECE1";
const EDITORIAL_BORDER = "#B0B0B0";

// Category card in the work grid. Display-only (categories aren't pages), so it
// renders as a div rather than a link — visually identical to the old card.
export default function CategoryCard({ category }: { category: Category }) {
  const badgeImage = category.badgeImage || "/images/badges/ocean-environment.svg";

  return (
    <div
      className="block w-full max-w-[406px] mx-auto overflow-hidden border no-underline"
      style={{ backgroundColor: EDITORIAL_BG, borderColor: EDITORIAL_BORDER }}
    >
      <article className="relative h-[453px] p-[31px] flex flex-col">
        <div className="relative w-[94px] h-[96px] rounded-full overflow-hidden">
          <Image
            src={badgeImage}
            alt=""
            fill
            sizes="96px"
            className="object-cover"
          />
        </div>

        <h3 className="font-acumin-condensed text-[#1e1e1e] text-[40px] leading-[42px] uppercase m-0 max-w-[329px] mt-auto">
          {category.name}
        </h3>
        <p className="font-acumin font-normal text-[#1e1e1e] text-[16px] leading-[20px] tracking-[0.48px] m-0 max-w-[321px] mt-4">
          {category.subtitle}
        </p>
      </article>
    </div>
  );
}
