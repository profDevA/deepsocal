export type LookBookCategory = "community" | "growth" | "impact";

export type LookBookImage = {
  src: string;
  alt: string;
  category?: LookBookCategory;
};

// Static fallback for the About page "WE'RE SOCAL-LOCAL" look book grid, used
// when Sanity has no `lookBookImage` documents yet (or is unreachable). Once
// images are uploaded in the Studio, those take over. This replaces the old
// Instagram-feed concept — the grid is now a Sanity-managed look book.
export const lookBookImages: LookBookImage[] = [
  { src: "/images/about/grid-community-1.png", alt: "" },
  { src: "/images/about/grid-instagram-slide.png", alt: "" },
  { src: "/images/about/grid-community-2.png", alt: "" },
  { src: "/images/about/grid-handsome-man.png", alt: "" },
  { src: "/images/about/grid-malibu.png", alt: "" },
  { src: "/images/about/grid-community-3.png", alt: "" },
];
