export type Product = {
  slug: string;
  name: string;
  tagline: string;
  description: string;
  longDescription: string;
  price: number;
  currency: "usd";
  shipping: string;
  /** Hero/gallery photos. First image renders as the main view, others as thumbnails. */
  images: string[];
  details: string[];
  stripePriceId: string;
  related: string[];
  inStock: boolean;
  themeColor: string;
};

const placeholderDescription =
  "This notebook is what we use to write down all of our big ideas. Whether you're thoughtfully strategizing your grocery list, brainstorming the meaning of life, or jotting down ways to create legendary social media content, this is the little black book for you.";

const seed = (overrides: Partial<Product>): Product => ({
  slug: "tbd",
  name: "TBD",
  tagline: "Public-interest systems design",
  description: placeholderDescription.slice(0, 110) + "…",
  longDescription: placeholderDescription,
  price: 25,
  currency: "usd",
  shipping: "+ Shipping",
  images: [],
  details: [
    "Heavyweight cotton",
    "Made in California",
    "Color: Charcoal",
    "Size: S, M, L, XL",
    "Embroidered logo",
    "Limited run",
  ],
  stripePriceId: "",
  related: [],
  inStock: true,
  themeColor: "#D9DDD1",
  ...overrides,
});

export const products: Product[] = [
  seed({
    slug: "the-t-shirt",
    name: "The T-Shirt",
    price: 30,
    themeColor: "#D9DDD1",
    related: ["the-hoodie", "the-tote", "the-cap"],
    images: ["/images/01 Free Folded T-Shirt Mockup 4.png"],
  }),
  seed({
    slug: "the-hoodie",
    name: "The Hoodie",
    price: 65,
    themeColor: "#1F1F1F",
    related: ["the-t-shirt", "the-tote", "the-crewneck"],
    images: ["/images/services/marketing-shirt.png"],
  }),
  seed({
    slug: "the-tote",
    name: "The Tote",
    price: 25,
    themeColor: "#EDE6D4",
    related: ["the-t-shirt", "the-bottle", "the-cap"],
  }),
  seed({
    slug: "the-bottle",
    name: "The Bottle",
    price: 22,
    themeColor: "#CCDCDB",
    related: ["the-tote", "the-cap", "the-t-shirt"],
  }),
  seed({
    slug: "the-crewneck",
    name: "The Crewneck",
    price: 55,
    themeColor: "#DBD3E7",
    related: ["the-hoodie", "the-t-shirt", "the-tote"],
  }),
  seed({
    slug: "the-cap",
    name: "The Cap",
    price: 28,
    themeColor: "#F3D4C4",
    related: ["the-t-shirt", "the-tote", "the-bottle"],
  }),
];

export const getProductBySlug = (slug: string): Product | undefined =>
  products.find((p) => p.slug === slug);

export const getRelatedProducts = (slug: string): Product[] => {
  const product = getProductBySlug(slug);
  if (!product) return [];
  return product.related
    .map(getProductBySlug)
    .filter((p): p is Product => p !== undefined);
};
