import { useEffect, useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import { useCollections, useFeaturedProducts } from '@/hooks/useShopify';
import ProductCard from '../product/ProductCard';

const SHOPIFY_ID_PREFIX = 'gid://shopify/collection/';

const FeaturedProducts = () => {
  const {
    data: collections = [],
    isLoading: collectionsLoading,
  } = useCollections();
  const { data: fallbackFeatured = [] } = useFeaturedProducts();

  const shopifyCollections = useMemo(
    () =>
      collections.filter((collection) => {
        const normalizedId = collection.id?.toLowerCase();
        return normalizedId ? normalizedId.startsWith(SHOPIFY_ID_PREFIX) : false;
      }),
    [collections],
  );

  const isUsingShopifyCollections = shopifyCollections.length > 0;
  const [activeSlug, setActiveSlug] = useState<string | null>(null);

  useEffect(() => {
    if (!isUsingShopifyCollections) {
      setActiveSlug(null);
      return;
    }

    setActiveSlug((current) => {
      if (current && shopifyCollections.some((collection) => collection.slug === current)) {
        return current;
      }
      return shopifyCollections[0]?.slug ?? null;
    });
  }, [isUsingShopifyCollections, shopifyCollections]);

  const activeCollection = useMemo(() => {
    if (!isUsingShopifyCollections || !activeSlug) return null;
    return shopifyCollections.find((collection) => collection.slug === activeSlug) ?? null;
  }, [activeSlug, isUsingShopifyCollections, shopifyCollections]);

  if (!isUsingShopifyCollections) {
    if (fallbackFeatured.length === 0) {
      return null;
    }

    return (
      <section className="py-16 md:py-24 w-full overflow-x-hidden">
        <div className="container px-4 max-w-full">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-8 md:mb-12"
          >
            <h2 className="font-serif text-3xl md:text-4xl font-bold text-foreground mb-3">Bestsellers & Trending</h2>
            <p className="text-muted-foreground max-w-md mx-auto">
              Our most loved products, chosen by customers across India
            </p>
          </motion.div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-6 max-w-full">
            {fallbackFeatured.slice(0, 8).map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>
    );
  }

  if (collectionsLoading && !activeCollection) {
    return (
      <section className="py-16 md:py-24">
        <div className="container px-4">
          <div className="animate-pulse space-y-6">
            <div className="h-10 w-48 bg-secondary rounded" />
            <div className="grid grid-cols-1 lg:grid-cols-[240px_1fr] gap-6">
              <div className="h-64 bg-secondary rounded-xl" />
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {Array.from({ length: 6 }).map((_, index) => (
                  <div key={index} className="aspect-square bg-secondary rounded-2xl" />
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  const products = activeCollection?.products ?? [];

  return (
    <section className="py-16 md:py-24 w-full overflow-x-hidden">
      <div className="container px-4 max-w-full">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-10"
        >
          <h2 className="font-serif text-3xl md:text-4xl font-bold text-foreground mb-3">Featured Collections</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Explore curated collections crafted with Amrit Essence. Select a category to see the products available right now.
          </p>
        </motion.div>

        <div className="grid gap-8 lg:grid-cols-[260px_1fr]">
          <aside className="space-y-6">
            <div className="rounded-2xl border border-border bg-background/80 p-4 shadow-sm">
              <h3 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground mb-3">Collections</h3>
              <ul className="space-y-2">
                {shopifyCollections.map((collection) => {
                  const isActive = collection.slug === activeSlug;
                  return (
                    <li key={collection.id}>
                      <button
                        type="button"
                        onClick={() => setActiveSlug(collection.slug)}
                        className={`w-full rounded-xl border px-4 py-3 text-left transition-all ${
                          isActive
                            ? 'border-primary bg-primary text-primary-foreground shadow-sm'
                            : 'border-border bg-background hover:border-primary/60 hover:bg-secondary/60'
                        }`}
                      >
                        <div className="flex items-center justify-between gap-3">
                          <span className="font-medium line-clamp-1">{collection.name}</span>
                          <span className={`text-xs font-medium ${isActive ? 'text-primary-foreground/80' : 'text-muted-foreground'}`}>
                            {collection.productCount}
                          </span>
                        </div>
                      </button>
                    </li>
                  );
                })}
              </ul>
            </div>

            <div className="rounded-2xl border border-dashed border-border/60 bg-secondary/20 p-5 text-sm text-muted-foreground">
              {activeCollection?.description ? (
                <p className="leading-relaxed whitespace-pre-line">{activeCollection.description}</p>
              ) : (
                <p className="italic text-muted-foreground/80">No description available for this collection.</p>
              )}
            </div>
          </aside>

          <div className="min-w-0">
            {products.length === 0 ? (
              <div className="flex min-h-[240px] items-center justify-center rounded-2xl border border-dashed border-border/60 bg-secondary/20 text-muted-foreground">
                No products available
              </div>
            ) : (
              <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-3 md:gap-6">
                {products.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturedProducts;
