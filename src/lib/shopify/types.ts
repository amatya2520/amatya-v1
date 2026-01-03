// Shopify Storefront API Types

export interface ShopifyImage {
  url: string;
  altText?: string;
  width?: number;
  height?: number;
}

export interface ShopifyMoney {
  amount: string;
  currencyCode: string;
}

export interface ShopifyProductVariant {
  id: string;
  title: string;
  availableForSale: boolean;
  price: ShopifyMoney;
  compareAtPrice?: ShopifyMoney;
  selectedOptions: {
    name: string;
    value: string;
  }[];
}

export interface ShopifyProduct {
  id: string;
  handle: string;
  title: string;
  description: string;
  descriptionHtml: string;
  tags: string[];
  images: {
    edges: { node: ShopifyImage }[];
  };
  priceRange: {
    minVariantPrice: ShopifyMoney;
    maxVariantPrice: ShopifyMoney;
  };
  compareAtPriceRange?: {
    minVariantPrice: ShopifyMoney;
    maxVariantPrice: ShopifyMoney;
  };
  variants: {
    edges: { node: ShopifyProductVariant }[];
  };
  collections?: {
    edges: { node: { handle: string; title: string } }[];
  };
}

export interface ShopifyCollection {
  id: string;
  handle: string;
  title: string;
  description: string;
  image?: ShopifyImage;
  products: {
    edges: { node: ShopifyProduct }[];
  };
  metafield?: {
    value: string;
    type: string;
  };
}

export interface ShopifyAnnouncement {
  id: string;
  text: { value: string };
}

export interface ShopifyHeroBanner {
  id: string;
  backgroundImage?: { reference?: { image?: ShopifyImage } };
  badgeText?: { value: string };
  heading?: { value: string };
  description?: { value: string };
  ctaText?: { value: string };
  ctaLink?: { value: string };
}

export interface ShopifyReview {
  id: string;
  rating?: { value: string };
  reviewText?: { value: string };
  customerName?: { value: string };
  customerCity?: { value: string };
  product?: { reference?: ShopifyProduct };
  image?: { reference?: { image?: ShopifyImage } };
}

// Normalized types for use in components
export interface NormalizedProduct {
  id: string;
  name: string;
  slug: string;
  shortDescription: string;
  description: string;
  price: number;
  comparePrice?: number;
  images: string[];
  category: string;
  categorySlug: string;
  variants: { weight: string; price: number; id: string }[];
  badges: string[];
  benefits: string[];
  ingredients?: string;
  inStock: boolean;
}

export interface NormalizedCollection {
  id: string;
  name: string;
  slug: string;
  description: string;
  image: string;
  productCount: number;
  products: NormalizedProduct[];
}

export interface NormalizedAnnouncement {
  id: string;
  text: string;
}

export interface NormalizedHeroBanner {
  id: string;
  image: string;
  badge?: string;
  heading: string;
  subheading: string;
  cta: { text: string; link: string };
}

export interface NormalizedReview {
  id: string;
  name: string;
  location: string;
  rating: number;
  text: string;
  product?: NormalizedProduct;
  image?: string;
}
