export type Product = {
  slug: string;
  name: string;
  price: number;
  currency: "usd";
  images: string[];
  description: string;
  longDescription: string;
  stripePriceId: string;
  related: string[];
  inStock: boolean;
};

export const products: Product[] = [];

export const getProductBySlug = (slug: string): Product | undefined =>
  products.find((p) => p.slug === slug);

export const getRelatedProducts = (slug: string): Product[] => {
  const product = getProductBySlug(slug);
  if (!product) return [];
  return product.related
    .map(getProductBySlug)
    .filter((p): p is Product => p !== undefined);
};
