import { fetchCollectionBanners } from '@/lib/shopify';
// Hook to fetch collection banners for a given collection handle
export function useCollectionBanners(collectionHandle?: string) {
  return useQuery({
    queryKey: ['shopify-collection-banners', collectionHandle],
    queryFn: async () => {
      if (!collectionHandle) return [];
      return await fetchCollectionBanners(collectionHandle);
    },
    enabled: Boolean(collectionHandle),
    staleTime: 1000 * 60 * 5,
  });
}
// Custom hooks for Shopify data fetching with React Query

import { useQuery } from '@tanstack/react-query';
import {
  fetchCollections,
  fetchCollectionByHandle,
  fetchProductByHandle,
  fetchProductRecommendations,
  fetchProductsByTag,
  fetchAnnouncements,
  fetchHeroBanners,
  fetchReviews,
  isShopifyConfigured,
} from '@/lib/shopify';
import { categories, products, announcements as fallbackAnnouncements, getProductBySlug, getProductsByCategory, getFeaturedProducts } from '@/data/products';
import type {
  NormalizedCollection,
  NormalizedProduct,
  NormalizedAnnouncement,
  NormalizedHeroBanner,
  NormalizedReview,
  NormalizedProductSection,
} from '@/lib/shopify';

// Fallback hero slides
const fallbackHeroSlides = [
  {
    id: '1',
    image: '/hero-banner-1.jpg',
    badge: 'AMATYA - The Amrit Essence',
    heading: 'From The Heart Land Of India',
    subheading: 'Experience the purity of rural traditions in every product',
    cta: { text: 'Shop Now', link: '/category/ghee' },
  },
  {
    id: '2',
    image: '/hero-banner-2.jpg',
    badge: 'Vedic Bilona Method',
    heading: 'A2 Gir Cow Ghee',
    subheading: 'Crafted using ancient Vedic Bilona method',
    cta: { text: 'Explore Ghee', link: '/product/a2-gir-cow-ghee' },
  },
  {
    id: '3',
    image: '/hero-banner-3.jpg',
    badge: 'Raw & Unprocessed',
    heading: 'Raw Forest Honey',
    subheading: 'Pure, unprocessed honey from untouched forests',
    cta: { text: 'Discover Honey', link: '/category/honey' },
  },
];

// Fallback reviews
const fallbackReviews: NormalizedReview[] = [
  {
    id: '1',
    name: 'Priya Sharma',
    location: 'Delhi',
    rating: 5,
    text: "The A2 Ghee from Amatya is the best I've ever tasted. You can truly feel the purity and the traditional Bilona method makes all the difference. My family loves it!",
  },
  {
    id: '2',
    name: 'Rahul Verma',
    location: 'Mumbai',
    rating: 5,
    text: "The Raw Forest Honey is incredible. It's so pure and natural, unlike anything from supermarkets. I use it every morning and my health has improved significantly.",
  },
  {
    id: '3',
    name: 'Anita Joshi',
    location: 'Bangalore',
    rating: 5,
    text: 'Switching to Khaand Shree was the best decision. Natural sweetness without any chemicals. Perfect for my daily chai and cooking.',
  },
];

const normalizeLocalSections = (sections?: {
  id?: string;
  title?: string;
  type?: 'text' | 'list';
  body?: string;
  items?: string[];
  order?: number;
}[]): NormalizedProductSection[] => {
  if (!sections || sections.length === 0) {
    return [];
  }

  return sections
    .map((section, index) => ({
      id: section.id || `local-section-${index}`,
      title: section.title || 'Details',
      type: section.type ?? (section.items && section.items.length > 0 ? 'list' : 'text'),
      body: section.body,
      items: section.type === 'list' || !section.type ? section.items?.filter(Boolean) : undefined,
      order: section.order ?? index,
    }))
    .sort((a, b) => a.order - b.order);
};

// Hook to fetch collections
export function useCollections() {
  return useQuery({
    queryKey: ['shopify-collections'],
    queryFn: async () => {
      const shopifyCollections = await fetchCollections();
      
      // If Shopify has data, use ONLY Shopify data
      if (shopifyCollections && shopifyCollections.length > 0) {
        return shopifyCollections;
      }

      // Fallback to local data
      return categories.map(cat => ({
        id: cat.id,
        name: cat.name,
        slug: cat.slug,
        description: cat.description,
        image: cat.image,
        productCount: cat.productCount,
        products: getProductsByCategory(cat.slug).map(p => ({
          ...p,
          variants: p.variants.map((v, i) => ({
            ...v,
            id: `${p.id}-${i}`,
            compareAtPrice: p.comparePrice && p.comparePrice > v.price ? p.comparePrice : undefined,
          })),
          sections: normalizeLocalSections(p.sections),
        })),
      })) as NormalizedCollection[];
    },
    staleTime: 1000 * 60 * 5, // 5 minutes
  });
}

// Hook to fetch single collection
export function useCollection(handle: string) {
  return useQuery({
    queryKey: ['shopify-collection', handle],
    queryFn: async () => {
      const shopifyCollection = await fetchCollectionByHandle(handle);
      
      if (shopifyCollection) {
        return shopifyCollection;
      }
      
      // Fallback
      const cat = categories.find(c => c.slug === handle);
      if (!cat) return null;
      
      return {
        id: cat.id,
        name: cat.name,
        slug: cat.slug,
        description: cat.description,
        image: cat.image,
        productCount: cat.productCount,
        products: getProductsByCategory(cat.slug).map(p => ({
          ...p,
          variants: p.variants.map((v, i) => ({
            ...v,
            id: `${p.id}-${i}`,
            compareAtPrice: p.comparePrice && p.comparePrice > v.price ? p.comparePrice : undefined,
          })),
          sections: normalizeLocalSections(p.sections),
        })),
      } as NormalizedCollection;
    },
    staleTime: 1000 * 60 * 5,
    enabled: Boolean(handle),
  });
}

// Hook to fetch single product
export function useProduct(handle: string) {
  return useQuery({
    queryKey: ['shopify-product', handle],
    queryFn: async () => {
      const shopifyProduct = await fetchProductByHandle(handle);
      
      if (shopifyProduct) {
        return shopifyProduct;
      }
      
      // Fallback
      const product = getProductBySlug(handle);
      if (!product) return null;
      
      return {
        ...product,
        variants: product.variants.map((v, i) => ({
          ...v,
          id: `${product.id}-${i}`,
          compareAtPrice: product.comparePrice && product.comparePrice > v.price ? product.comparePrice : undefined,
        })),
        sections: normalizeLocalSections(product.sections),
      } as NormalizedProduct;
    },
    staleTime: 1000 * 60 * 5,
    enabled: Boolean(handle),
  });
}

// Hook to fetch products by tag
export function useProductsByTag(tag: string) {
  return useQuery({
    queryKey: ['shopify-products-tag', tag],
    queryFn: async () => {
      const shopifyProducts = await fetchProductsByTag(tag);
      
      if (shopifyProducts && shopifyProducts.length > 0) {
        return shopifyProducts;
      }
      
      // Fallback - filter by tag
      return products
        .filter(p => p.badges.includes(tag))
        .map(p => ({
          ...p,
          variants: p.variants.map((v, i) => ({
            ...v,
            id: `${p.id}-${i}`,
            compareAtPrice: p.comparePrice && p.comparePrice > v.price ? p.comparePrice : undefined,
          })),
        })) as NormalizedProduct[];
    },
    staleTime: 1000 * 60 * 5,
  });
}

export function useProductRecommendations(productId?: string) {
  const isShopifyId = Boolean(productId && productId.startsWith('gid://shopify/Product/'));

  return useQuery({
    queryKey: ['shopify-product-recommendations', productId],
    queryFn: async () => {
      if (!productId) {
        return [] as NormalizedProduct[];
      }

      const shopifyRecommendations = await fetchProductRecommendations(productId);

      if (shopifyRecommendations && shopifyRecommendations.length > 0) {
        return shopifyRecommendations;
      }

      return [] as NormalizedProduct[];
    },
    enabled: isShopifyId,
    staleTime: 1000 * 60 * 5,
  });
}

// Hook to fetch featured products
export function useFeaturedProducts() {
  return useQuery({
    queryKey: ['shopify-featured-products'],
    queryFn: async () => {
      // Try to get best-sellers and trending from Shopify
      const [bestSellers, trending] = await Promise.all([
        fetchProductsByTag('best-seller'),
        fetchProductsByTag('trending'),
      ]);
      
      const combined = [...(bestSellers || []), ...(trending || [])];
      
      if (combined.length > 0) {
        // Remove duplicates
        const unique = combined.filter((p, i, arr) => arr.findIndex(x => x.id === p.id) === i);
        return unique;
      }
      
      // Fallback
      return getFeaturedProducts().map(p => ({
        ...p,
        variants: p.variants.map((v, i) => ({
          ...v,
          id: `${p.id}-${i}`,
          compareAtPrice: p.comparePrice && p.comparePrice > v.price ? p.comparePrice : undefined,
        })),
      })) as NormalizedProduct[];
    },
    staleTime: 1000 * 60 * 5,
  });
}

// Hook to fetch announcements
export function useAnnouncements() {
  return useQuery({
    queryKey: ['shopify-announcements'],
    queryFn: async () => {
      const shopifyAnnouncements = await fetchAnnouncements();
      
      // If Shopify has at least one announcement, use ONLY Shopify data
      if (shopifyAnnouncements && shopifyAnnouncements.length > 0) {
        return shopifyAnnouncements;
      }
      
      // Fallback to local announcements
      return fallbackAnnouncements.map((text, i) => ({ id: `${i}`, text })) as NormalizedAnnouncement[];
    },
    staleTime: 1000 * 60 * 5,
  });
}

// Hook to fetch hero banners
export function useHeroBanners() {
  return useQuery({
    queryKey: ['shopify-hero-banners'],
    queryFn: async () => {
      const shopifyBanners = await fetchHeroBanners();
      
      if (shopifyBanners && shopifyBanners.length > 0) {
        return shopifyBanners;
      }
      
      return fallbackHeroSlides as NormalizedHeroBanner[];
    },
    staleTime: 1000 * 60 * 5,
  });
}

// Hook to fetch reviews
export function useReviews() {
  return useQuery({
    queryKey: ['shopify-reviews'],
    queryFn: async () => {
      const shopifyReviews = await fetchReviews();
      
      if (shopifyReviews && shopifyReviews.length > 0) {
        return shopifyReviews;
      }
      
      return fallbackReviews;
    },
    staleTime: 1000 * 60 * 5,
  });
}

// Export utility to check if Shopify is configured
export { isShopifyConfigured };

// Shopify-only tagged products helper (no local fallback)
export function useShopifyTaggedProducts(tags: string[]) {
  return useQuery({
    queryKey: ['shopify-products-tag-only', ...tags],
    queryFn: async () => {
      const results = await Promise.all(tags.map((tag) => fetchProductsByTag(tag)));

      const combined = results
        .filter((list): list is NormalizedProduct[] => Array.isArray(list) && list.length > 0)
        .flat();

      if (combined.length === 0) {
        return [] as NormalizedProduct[];
      }

      const seen = new Set<string>();
      const unique: NormalizedProduct[] = [];

      for (const product of combined) {
        if (!seen.has(product.id)) {
          seen.add(product.id);
          unique.push(product);
        }
      }

      return unique;
    },
    staleTime: 1000 * 60 * 5,
  });
}
