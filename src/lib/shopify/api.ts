// Shopify API Functions with Normalization

import { shopifyFetch, isShopifyConfigured } from './client';
import {
  COLLECTIONS_QUERY,
  COLLECTION_BY_HANDLE_QUERY,
  PRODUCT_BY_HANDLE_QUERY,
  PRODUCTS_BY_TAG_QUERY,
  ANNOUNCEMENTS_QUERY,
  HERO_BANNERS_QUERY,
  REVIEWS_QUERY,
} from './queries';
import type {
  ShopifyCollection,
  ShopifyProduct,
  NormalizedProduct,
  NormalizedCollection,
  NormalizedAnnouncement,
  NormalizedHeroBanner,
  NormalizedReview,
} from './types';

// Helper to normalize Shopify product to our format
function normalizeProduct(product: ShopifyProduct, collectionTitle?: string, collectionHandle?: string): NormalizedProduct {
  const images = product.images.edges.map(e => e.node.url);
  const variants = product.variants.edges.map(e => ({
    id: e.node.id,
    weight: e.node.title === 'Default Title' ? 'Standard' : e.node.title,
    price: parseFloat(e.node.price.amount),
  }));

  // Extract badges from tags (format: "badge:Best Seller")
  const badges = product.tags
    .filter(tag => tag.toLowerCase().startsWith('badge:'))
    .map(tag => tag.substring(6).trim());

  // Also check for standard tags
  if (product.tags.includes('best-seller') || product.tags.includes('bestseller')) {
    badges.push('best-seller');
  }
  if (product.tags.includes('trending')) {
    badges.push('trending');
  }
  if (product.tags.includes('new-launch') || product.tags.includes('new')) {
    badges.push('new-launch');
  }

  const collection = product.collections?.edges[0]?.node;
  
  return {
    id: product.id,
    name: product.title,
    slug: product.handle,
    shortDescription: product.description.substring(0, 100) + (product.description.length > 100 ? '...' : ''),
    description: product.description,
    price: parseFloat(product.priceRange.minVariantPrice.amount),
    comparePrice: product.compareAtPriceRange?.minVariantPrice?.amount 
      ? parseFloat(product.compareAtPriceRange.minVariantPrice.amount) 
      : undefined,
    images: images.length > 0 ? images : ['/placeholder.svg'],
    category: collectionTitle || collection?.title || 'Products',
    categorySlug: collectionHandle || collection?.handle || 'all',
    variants: variants.length > 0 ? variants : [{ id: '1', weight: 'Standard', price: parseFloat(product.priceRange.minVariantPrice.amount) }],
    badges: [...new Set(badges)],
    benefits: [],
    inStock: product.variants.edges.some(e => e.node.availableForSale),
  };
}

// Fetch all collections
export async function fetchCollections(): Promise<NormalizedCollection[] | null> {
  if (!isShopifyConfigured()) return null;

  const data = await shopifyFetch<{ collections: { edges: { node: ShopifyCollection }[] } }>(COLLECTIONS_QUERY);
  
  if (!data?.collections?.edges?.length) return null;

  return data.collections.edges.map(({ node }) => ({
    id: node.id,
    name: node.title,
    slug: node.handle,
    description: node.metafield?.value || node.description || '',
    image: node.image?.url || '/placeholder.svg',
    productCount: node.products.edges.length,
    products: node.products.edges.map(({ node: product }) => normalizeProduct(product, node.title, node.handle)),
  }));
}

// Fetch single collection by handle
export async function fetchCollectionByHandle(handle: string): Promise<NormalizedCollection | null> {
  if (!isShopifyConfigured()) return null;

  const data = await shopifyFetch<{ collection: ShopifyCollection }>(COLLECTION_BY_HANDLE_QUERY, { handle });
  
  if (!data?.collection) return null;

  const { collection } = data;
  return {
    id: collection.id,
    name: collection.title,
    slug: collection.handle,
    description: collection.metafield?.value || collection.description || '',
    image: collection.image?.url || '/placeholder.svg',
    productCount: collection.products.edges.length,
    products: collection.products.edges.map(({ node }) => normalizeProduct(node, collection.title, collection.handle)),
  };
}

// Fetch single product by handle
export async function fetchProductByHandle(handle: string): Promise<NormalizedProduct | null> {
  if (!isShopifyConfigured()) return null;

  const data = await shopifyFetch<{ product: ShopifyProduct }>(PRODUCT_BY_HANDLE_QUERY, { handle });
  
  if (!data?.product) return null;

  return normalizeProduct(data.product);
}

// Fetch products by tag (e.g., best-seller, trending)
export async function fetchProductsByTag(tag: string): Promise<NormalizedProduct[] | null> {
  if (!isShopifyConfigured()) return null;

  const data = await shopifyFetch<{ products: { edges: { node: ShopifyProduct }[] } }>(
    PRODUCTS_BY_TAG_QUERY,
    { query: `tag:${tag}` }
  );
  
  if (!data?.products?.edges?.length) return null;

  return data.products.edges.map(({ node }) => normalizeProduct(node));
}

// Fetch announcements from metaobject
export async function fetchAnnouncements(): Promise<NormalizedAnnouncement[] | null> {
  if (!isShopifyConfigured()) return null;

  const data = await shopifyFetch<{ metaobjects: { edges: { node: { id: string; field: { value: string } } }[] } }>(ANNOUNCEMENTS_QUERY);
  
  if (!data?.metaobjects?.edges?.length) return null;

  return data.metaobjects.edges
    .filter(({ node }) => node.field?.value)
    .map(({ node }) => ({
      id: node.id,
      text: node.field.value,
    }));
}

// Fetch hero banners from metaobject
export async function fetchHeroBanners(): Promise<NormalizedHeroBanner[] | null> {
  if (!isShopifyConfigured()) return null;

  interface HeroBannerNode {
    id: string;
    field?: { reference?: { image?: { url: string } } };
    badge_text?: { value: string };
    heading?: { value: string };
    description?: { value: string };
    cta_text?: { value: string };
    cta_link?: { value: string };
  }

  const data = await shopifyFetch<{ metaobjects: { edges: { node: HeroBannerNode }[] } }>(HERO_BANNERS_QUERY);
  
  if (!data?.metaobjects?.edges?.length) return null;

  return data.metaobjects.edges
    .filter(({ node }) => node.heading?.value)
    .map(({ node }) => ({
      id: node.id,
      image: node.field?.reference?.image?.url || '/placeholder.svg',
      badge: node.badge_text?.value,
      heading: node.heading?.value || '',
      subheading: node.description?.value || '',
      cta: {
        text: node.cta_text?.value || 'Shop Now',
        link: node.cta_link?.value || '/',
      },
    }));
}

// Fetch customer reviews from metaobject
export async function fetchReviews(): Promise<NormalizedReview[] | null> {
  if (!isShopifyConfigured()) return null;

  interface ReviewNode {
    id: string;
    rating?: { value: string };
    review_text?: { value: string };
    customer_name?: { value: string };
    customer_city?: { value: string };
    product?: { reference?: ShopifyProduct };
    image?: { reference?: { image?: { url: string } } };
  }

  const data = await shopifyFetch<{ metaobjects: { edges: { node: ReviewNode }[] } }>(REVIEWS_QUERY);
  
  if (!data?.metaobjects?.edges?.length) return null;

  return data.metaobjects.edges
    .filter(({ node }) => node.review_text?.value)
    .map(({ node }) => ({
      id: node.id,
      name: node.customer_name?.value || 'Anonymous',
      location: node.customer_city?.value || '',
      rating: parseInt(node.rating?.value || '5'),
      text: node.review_text?.value || '',
      product: node.product?.reference ? normalizeProduct(node.product.reference) : undefined,
      image: node.image?.reference?.image?.url,
    }));
}

// Re-export utility
export { isShopifyConfigured };
