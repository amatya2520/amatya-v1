import { COLLECTION_BANNERS_QUERY } from './queries';
// Fetch collection banners from metaobject
export async function fetchCollectionBanners(collectionHandle: string): Promise<{ id: string; image: string }[]> {
  if (!isShopifyConfigured()) return [];

  try {
    const data = await shopifyFetch<{ metaobjects: { edges: { node: any }[] } }>(COLLECTION_BANNERS_QUERY);
    if (!data?.metaobjects?.edges?.length) return [];

    // Flatten and filter for matching collection handle
    const banners = data.metaobjects.edges
      .map(({ node }) => {
        let collectionHandleField = node.fields.find((f: any) => f.key === 'collection');
        let imageField = node.fields.find((f: any) => f.key === 'image');
        let orderField = node.fields.find((f: any) => f.key === 'order');

        const handle = collectionHandleField?.reference?.handle;
        const image = imageField?.reference?.image?.url;
        const order = orderField?.value ? parseInt(orderField.value, 10) : 999;

        if (handle !== collectionHandle || !image) return null;

        return {
          id: node.id,
          image,
          order,
        };
      })
      .filter(Boolean) as { id: string; image: string; order: number }[];

    // Sort by order ascending
    return banners.sort((a, b) => a.order - b.order).map(({ id, image }) => ({ id, image }));
  } catch (error) {
    console.error('Failed to fetch collection banners:', error);
    return [];
  }
}
// Shopify API Functions with Normalization

import { shopifyFetch, isShopifyConfigured } from './client';
import {
  COLLECTIONS_QUERY,
  COLLECTION_BY_HANDLE_QUERY,
  PRODUCT_BY_HANDLE_QUERY,
  PRODUCT_RECOMMENDATIONS_QUERY,
  PRODUCTS_BY_TAG_QUERY,
  ANNOUNCEMENTS_QUERY,
  HERO_BANNERS_QUERY,
  REVIEWS_QUERY,
  CART_CREATE_MUTATION,
} from './queries';
import type {
  ShopifyCollection,
  ShopifyProduct,
  ShopifyAnnouncement,
  ShopifyProductSectionsMetafield,
  ShopifyProductSectionMetaobject,
  ShopifyMetaobjectField,
  NormalizedProduct,
  NormalizedCollection,
  NormalizedAnnouncement,
  NormalizedHeroBanner,
  NormalizedReview,
  NormalizedProductSection,
} from './types';

function getMetaFieldValue(field?: ShopifyMetaobjectField | null): string | undefined {
  const value = field?.value?.trim();
  return value ? value : undefined;
}

function parseMetaobjectItems(raw?: string): string[] | undefined {
  if (!raw) return undefined;

  try {
    const parsed = JSON.parse(raw);
    if (Array.isArray(parsed)) {
      const items = parsed
        .map((item) => (typeof item === 'string' ? item.trim() : String(item).trim()))
        .filter(Boolean);
      return items.length > 0 ? items : undefined;
    }
  } catch {
    // Not JSON, fall through to delimiter parsing
  }

  const items = raw
    .split(/\r?\n|•|\u2022/)
    .map((item) => item.trim())
    .filter(Boolean);

  return items.length > 0 ? items : undefined;
}

function normalizeProductSections(meta?: ShopifyProductSectionsMetafield | null): NormalizedProductSection[] {
  if (!meta) {
    return [];
  }

  const nodes: ShopifyProductSectionMetaobject[] = [];

  if (meta.reference) {
    nodes.push(meta.reference);
  }

  if (meta.references?.edges?.length) {
    nodes.push(...meta.references.edges.map(({ node }) => node).filter(Boolean));
  }

  const seen = new Set<string>();
  const sections: NormalizedProductSection[] = [];

  nodes.forEach((node, index) => {
    if (!node) return;

    const id = node.id || `product-section-${index}`;
    if (seen.has(id)) return;
    seen.add(id);

    const title = getMetaFieldValue(node.title) || getMetaFieldValue(node.heading) || '';
    const body = getMetaFieldValue(node.body) || getMetaFieldValue(node.content);
    const rawItems =
      getMetaFieldValue(node.items) ||
      getMetaFieldValue(node.listItems) ||
      getMetaFieldValue(node.bullets);
    const items = parseMetaobjectItems(rawItems);

    const typeValue = (getMetaFieldValue(node.sectionType) || getMetaFieldValue(node.typeField) || '').toLowerCase();
    let type: 'text' | 'list' = 'text';

    if (typeValue.includes('list')) {
      type = 'list';
    } else if (items && items.length > 0) {
      type = 'list';
    }

    const parsedOrder = parseInt(getMetaFieldValue(node.order) || '', 10);
    const order = Number.isFinite(parsedOrder) ? parsedOrder : index;

    if (!title && !body && (!items || items.length === 0)) {
      return;
    }

    sections.push({
      id,
      title: title || 'Details',
      type,
      body: body || undefined,
      items: type === 'list' ? items : undefined,
      order,
    });
  });

  return sections.sort((a, b) => a.order - b.order);
}

// Helper to normalize Shopify product to our format
function normalizeProduct(product: ShopifyProduct, collectionTitle?: string, collectionHandle?: string): NormalizedProduct {
  const images = product.images.edges.map(e => e.node.url);
  const variants = product.variants.edges.map(({ node }) => {
    const price = parseFloat(node.price.amount);
    const compareAtPrice = node.compareAtPrice?.amount ? parseFloat(node.compareAtPrice.amount) : undefined;
    return {
      id: node.id,
      weight: node.title === 'Default Title' ? 'Standard' : node.title,
      price: Number.isNaN(price) ? 0 : price,
      compareAtPrice: compareAtPrice && !Number.isNaN(compareAtPrice) ? compareAtPrice : undefined,
    };
  });

  const minCompareAt = variants
    .map((variant) => variant.compareAtPrice)
    .filter((value): value is number => typeof value === 'number' && !Number.isNaN(value));

  // Extract badges from tags (format: "badge:Best Seller") - tags may be undefined
  const tags = product.tags || [];
  const badges = tags
    .filter(tag => tag.toLowerCase().startsWith('badge:'))
    .map(tag => tag.substring(6).trim());

  // Also check for standard tags
  if (tags.includes('best-seller') || tags.includes('bestseller')) {
    badges.push('best-seller');
  }
  if (tags.includes('trending')) {
    badges.push('trending');
  }
  if (tags.includes('new-launch') || tags.includes('new')) {
    badges.push('new-launch');
  }

  const collection = product.collections?.edges[0]?.node;
  const sections = normalizeProductSections(product.productSections);
  
  const mainPrice = parseFloat(product.priceRange.minVariantPrice.amount);
  const comparePriceValue = product.compareAtPriceRange?.minVariantPrice?.amount 
    ? parseFloat(product.compareAtPriceRange.minVariantPrice.amount) 
    : undefined;
  
  const description = product.description || '';
  const shortDescription = description.length > 100 ? description.substring(0, 100) + '...' : description;
  
  return {
    id: product.id,
    name: product.title,
    slug: product.handle,
    shortDescription,
    description,
    price: Number.isNaN(mainPrice) ? 0 : mainPrice,
    comparePrice:
      minCompareAt.length > 0
        ? Math.min(...minCompareAt)
        : comparePriceValue && !Number.isNaN(comparePriceValue)
        ? comparePriceValue
        : undefined,
    images: images.length > 0 ? images : ['/placeholder.svg'],
    category: collectionTitle || collection?.title || 'Products',
    categorySlug: collectionHandle || collection?.handle || 'all',
    variants: variants.length > 0 ? variants : [{ 
      id: '1', 
      weight: 'Standard', 
      price: Number.isNaN(mainPrice) ? 0 : mainPrice 
    }],
    badges: [...new Set(badges)],
    benefits: [],
    inStock: product.variants.edges.some(e => e.node.availableForSale),
    sections,
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

export async function fetchProductRecommendations(productId: string): Promise<NormalizedProduct[] | null> {
  if (!isShopifyConfigured()) return null;

  const data = await shopifyFetch<{ productRecommendations: ShopifyProduct[] }>(
    PRODUCT_RECOMMENDATIONS_QUERY,
    { productId }
  );

  if (!data?.productRecommendations?.length) return null;

  return data.productRecommendations
    .filter(Boolean)
    .map((product) => normalizeProduct(product));
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

  try {
    const data = await shopifyFetch<{ metaobjects: { edges: { node: ShopifyAnnouncement }[] } }>(ANNOUNCEMENTS_QUERY);
    
    if (!data?.metaobjects?.edges?.length) return null;

    return data.metaobjects.edges
      .map(({ node }) => {
        try {
          const text = node.text?.value || '';
          const isActiveValue = node.is_active?.value?.toLowerCase() === 'true';
          const orderValue = parseInt(node.order?.value || '999', 10);
          const order = Number.isFinite(orderValue) ? orderValue : 999;
          
          return {
            id: node.id,
            text,
            order,
            isActive: isActiveValue,
          };
        } catch (e) {
          console.error(`Failed to parse announcement ${node.id}:`, e);
          return null;
        }
      })
      .filter((item): item is NormalizedAnnouncement => {
        return item !== null && item.text.length > 0 && item.isActive;
      })
      .sort((a, b) => a.order - b.order);
  } catch (error) {
    console.error('Failed to fetch announcements:', error);
    return null;
  }
}

// Fetch hero banners from metaobject
export async function fetchHeroBanners(): Promise<NormalizedHeroBanner[] | null> {
  if (!isShopifyConfigured()) return null;

  interface HeroBannerNode {
    id: string;
    background_image?: { reference?: { image?: { url: string } } };
    badge_text?: { value: string };
    heading?: { value: string };
    description?: { value: string };
    cta_text?: { value: string };
    cta_link?: { value: string };
  }

  try {
    const data = await shopifyFetch<{ metaobjects: { edges: { node: HeroBannerNode }[] } }>(HERO_BANNERS_QUERY);
    
    if (!data?.metaobjects?.edges?.length) return null;

    return data.metaobjects.edges
      .map(({ node }) => {
        try {
          const image = node.background_image?.reference?.image?.url;
          if (!image) {
            return null;
          }

          const banner: NormalizedHeroBanner = {
            id: node.id,
            image,
            badge: node.badge_text?.value,
            heading: node.heading?.value,
            subheading: node.description?.value,
            cta: {
              text: node.cta_text?.value || 'Shop Now',
              link: node.cta_link?.value || '/',
            },
          };

          return banner;
        } catch (e) {
          console.error(`Failed to parse hero banner ${node.id}:`, e);
          return null;
        }
      })
      .filter((item): item is NormalizedHeroBanner => item !== null);
  } catch (error) {
    console.error('Failed to fetch hero banners:', error);
    return null;
  }
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
    video?: {
      reference?: {
        sources?: { url: string; mimeType: string }[];
        previewImage?: { url: string };
      };
    };
  }

  try {
    const data = await shopifyFetch<{ metaobjects: { edges: { node: ReviewNode }[] } }>(REVIEWS_QUERY);
    
    if (!data?.metaobjects?.edges?.length) return null;

    return data.metaobjects.edges
      .map(({ node }) => {
        try {
          const reviewText = node.review_text?.value;
          if (!reviewText) {
            return null;
          }

          let mediaUrl: string | undefined;
          let mediaType: 'image' | 'video' | undefined;
          let videoMimeType: string | undefined;
          let videoPreviewImage: string | undefined;

          if (node.video?.reference?.sources?.[0]?.url) {
            mediaUrl = node.video.reference.sources[0].url;
            videoMimeType = node.video.reference.sources[0].mimeType;
            videoPreviewImage = node.video.reference.previewImage?.url;
            mediaType = 'video';
          } else if (node.image?.reference?.image?.url) {
            mediaUrl = node.image.reference.image.url;
            mediaType = 'image';
          }

          const review: NormalizedReview = {
            id: node.id,
            name: node.customer_name?.value || 'Anonymous',
            location: node.customer_city?.value || '',
            rating: parseInt(node.rating?.value || '5'),
            text: reviewText,
            product: node.product?.reference ? normalizeProduct(node.product.reference) : undefined,
            image: mediaType === 'image' ? mediaUrl : undefined,
            videoUrl: mediaType === 'video' ? mediaUrl : undefined,
            videoMimeType,
            videoPreviewImage,
          };

          return review;
        } catch (e) {
          console.error(`Failed to parse review ${node.id}:`, e);
          return null;
        }
      })
      .filter((item): item is NormalizedReview => item !== null);
  } catch (error) {
    console.error('Failed to fetch reviews:', error);
    return null;
  }
}

// Create cart and return checkout URL
export async function createCartCheckout(
  lines: Array<{ merchandiseId: string; quantity: number }>
): Promise<string | null> {
  if (!isShopifyConfigured()) return null;

  try {
    const data = await shopifyFetch<{
      cartCreate: {
        cart: { id: string; checkoutUrl: string } | null;
        userErrors: Array<{ message: string }>;
      };
    }>(CART_CREATE_MUTATION, { lines });

    if (data?.cartCreate?.userErrors?.length > 0) {
      const error = data.cartCreate.userErrors[0];
      console.error('Cart create error:', error?.message);
      return null;
    }

    return data?.cartCreate?.cart?.checkoutUrl || null;
  } catch (error) {
    console.error('Failed to create cart checkout:', error);
    return null;
  }
}

// Re-export utility
export { isShopifyConfigured };
