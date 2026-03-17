// Shopify Storefront API Client

const SHOPIFY_DOMAIN = import.meta.env.VITE_SHOPIFY_DOMAIN;
const SHOPIFY_ACCESS_TOKEN = import.meta.env.VITE_SHOPIFY_STOREFRONT_ACCESS_TOKEN;
const SHOPIFY_VERSION = import.meta.env.VITE_SHOPIFY_VERSION as string | undefined;

// IMPORTANT:
// This project uses the Storefront Cart API for checkout (`cartCreate` → `checkoutUrl`).
const DEFAULT_STOREFRONT_API_VERSION = SHOPIFY_VERSION?.trim().replace(/^"+|"+$/g, '') || '2026-01';

const apiVersion = DEFAULT_STOREFRONT_API_VERSION;

const endpoint = SHOPIFY_DOMAIN ? `https://${SHOPIFY_DOMAIN}/api/${apiVersion}/graphql.json` : null;

export async function shopifyFetch<T>(query: string, variables: Record<string, unknown> = {}): Promise<T | null> {
  if (!endpoint || !SHOPIFY_ACCESS_TOKEN) {
    console.warn('Shopify credentials not configured, using fallback data');
    return null;
  }

  try {
    const response = await fetch(endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Shopify-Storefront-Access-Token': SHOPIFY_ACCESS_TOKEN,
      },
      body: JSON.stringify({ query, variables }),
    });

    if (!response.ok) {
      console.error('Shopify API error:', response.statusText);
      return null;
    }

    const json = await response.json();
    
    if (json.errors) {
      console.error('Shopify GraphQL errors:', json.errors);
      return null;
    }

    return json.data as T;
  } catch (error) {
    console.error('Shopify fetch error:', error);
    return null;
  }
}

export function isShopifyConfigured(): boolean {
  return Boolean(SHOPIFY_DOMAIN && SHOPIFY_ACCESS_TOKEN);
}
