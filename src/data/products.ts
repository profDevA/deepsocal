export type Product = {
  slug: string;
  name: string;
  tagline: string;
  description: string;
  longDescription: string;
  price: number;
  currency: "usd";
  shipping: string;
  images: string[];
  details: string[];
  stripePriceId: string;
  related: string[];
  inStock: boolean;
  themeColor: string;
};

export const products: Product[] = [
  {
    slug: "the-t-shirt",
    name: "The T-Shirt",
    tagline: "",
    description: "",
    longDescription: "",
    price: 30,
    currency: "usd",
    shipping: "+ Shipping",
    images: ["/images/01 Free Folded T-Shirt Mockup 4.png"],
    details: [],
    stripePriceId: "",
    related: ["the-hoodie", "the-tote", "the-cap"],
    inStock: true,
    themeColor: "#D9DDD1",
  },
  {
    slug: "the-hoodie",
    name: "The Hoodie",
    tagline: "",
    description: "",
    longDescription: "",
    price: 65,
    currency: "usd",
    shipping: "+ Shipping",
    images: ["/images/services/marketing-shirt.png"],
    details: [],
    stripePriceId: "",
    related: ["the-t-shirt", "the-tote", "the-crewneck"],
    inStock: true,
    themeColor: "#1F1F1F",
  },
  {
    slug: "the-tote",
    name: "The Tote",
    tagline: "",
    description: "",
    longDescription: "",
    price: 25,
    currency: "usd",
    shipping: "+ Shipping",
    images: [],
    details: [],
    stripePriceId: "",
    related: ["the-t-shirt", "the-bottle", "the-cap"],
    inStock: true,
    themeColor: "#EDE6D4",
  },
  {
    slug: "the-bottle",
    name: "The Bottle",
    tagline: "",
    description: "",
    longDescription: "",
    price: 22,
    currency: "usd",
    shipping: "+ Shipping",
    images: [],
    details: [],
    stripePriceId: "",
    related: ["the-tote", "the-cap", "the-t-shirt"],
    inStock: true,
    themeColor: "#CCDCDB",
  },
  {
    slug: "the-crewneck",
    name: "The Crewneck",
    tagline: "",
    description: "",
    longDescription: "",
    price: 55,
    currency: "usd",
    shipping: "+ Shipping",
    images: [],
    details: [],
    stripePriceId: "",
    related: ["the-hoodie", "the-t-shirt", "the-tote"],
    inStock: true,
    themeColor: "#DBD3E7",
  },
  {
    slug: "the-cap",
    name: "The Cap",
    tagline: "",
    description: "",
    longDescription: "",
    price: 28,
    currency: "usd",
    shipping: "+ Shipping",
    images: [],
    details: [],
    stripePriceId: "",
    related: ["the-t-shirt", "the-tote", "the-bottle"],
    inStock: true,
    themeColor: "#F3D4C4",
  },
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
