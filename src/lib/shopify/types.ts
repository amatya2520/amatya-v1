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
  tags?: string[];
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
  productSections?: ShopifyProductSectionsMetafield | null;
}

export interface ShopifyMetaobjectField {
  value?: string | null;
}

export interface ShopifyProductSectionMetaobject {
  id: string;
  type?: string | null;
  title?: ShopifyMetaobjectField;
  heading?: ShopifyMetaobjectField;
  body?: ShopifyMetaobjectField;
  content?: ShopifyMetaobjectField;
  sectionType?: ShopifyMetaobjectField;
  typeField?: ShopifyMetaobjectField;
  items?: ShopifyMetaobjectField;
  listItems?: ShopifyMetaobjectField;
  bullets?: ShopifyMetaobjectField;
  order?: ShopifyMetaobjectField;
}

export interface ShopifyProductSectionsMetafield {
  type?: string | null;
  reference?: ShopifyProductSectionMetaobject | null;
  references?: {
    edges: { node: ShopifyProductSectionMetaobject }[];
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
  text?: { value: string };
  is_active?: { value: string };
  order?: { value: string };
}

export interface ShopifyHeroBanner {
  id: string;
  background_image?: { reference?: { image?: ShopifyImage } };
  badge_text?: { value: string };
  heading?: { value: string };
  description?: { value: string };
  cta_text?: { value: string };
  cta_link?: { value: string };
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
export interface NormalizedProductVariant {
  id: string;
  weight: string;
  price: number;
  compareAtPrice?: number;
}

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
  variants: NormalizedProductVariant[];
  badges: string[];
  benefits: string[];
  ingredients?: string;
  inStock: boolean;
  sections: NormalizedProductSection[];
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
  order: number;
  isActive: boolean;
}

export interface NormalizedHeroBanner {
  id: string;
  image?: string;
  badge?: string;
  heading?: string;
  subheading?: string;
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
  videoUrl?: string;
  videoMimeType?: string;
  videoPreviewImage?: string;
}

export interface NormalizedProductSection {
  id: string;
  title: string;
  type: 'text' | 'list';
  body?: string;
  items?: string[];
  order: number;
}
