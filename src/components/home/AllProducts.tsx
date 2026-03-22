import { useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import { useCollections } from '@/hooks/useShopify';
import type { NormalizedCollection, NormalizedProduct } from '@/lib/shopify';
import ProductCard from '@/components/product/ProductCard';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

const ALL_FILTER = '__all__';

type SortOption = 'default' | 'price-asc' | 'price-desc';

function mergeUniqueProducts(collections: NormalizedCollection[]): NormalizedProduct[] {
  const map = new Map<string, NormalizedProduct>();
  for (const collection of collections) {
    for (const product of collection.products ?? []) {
      if (!map.has(product.id)) {
        map.set(product.id, product);
      }
    }
  }
  return Array.from(map.values());
}

function sortProducts(products: NormalizedProduct[], sort: SortOption): NormalizedProduct[] {
  if (sort === 'default') {
    return products;
  }
  const copy = [...products];
  copy.sort((a, b) => {
    const pa = a.price ?? 0;
    const pb = b.price ?? 0;
    return sort === 'price-asc' ? pa - pb : pb - pa;
  });
  return copy;
}

const AllProducts = () => {
  const { data: collections = [], isLoading } = useCollections();
  const [activeFilter, setActiveFilter] = useState<string>(ALL_FILTER);
  const [sort, setSort] = useState<SortOption>('default');

  const allProductsMerged = useMemo(() => mergeUniqueProducts(collections), [collections]);

  const displayedProducts = useMemo(() => {
    if (activeFilter === ALL_FILTER) {
      return allProductsMerged;
    }
    const collection = collections.find((c) => c.slug === activeFilter);
    return collection?.products ?? [];
  }, [activeFilter, allProductsMerged, collections]);

  const sortedProducts = useMemo(
    () => sortProducts(displayedProducts, sort),
    [displayedProducts, sort],
  );

  if (collections.length === 0 && !isLoading) {
    return null;
  }

  return (
    <section className="py-16 md:py-24">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-10 text-center md:mb-12"
        >
          <h2 className="mb-3 font-serif text-3xl font-bold text-foreground md:text-4xl">
            Explore Our Collection
          </h2>
          <p className="mx-auto max-w-xl text-muted-foreground">
            Browse all our handcrafted, natural products
          </p>
        </motion.div>

        <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="-mx-4 flex gap-2 overflow-x-auto px-4 pb-1 scrollbar-hide sm:mx-0 sm:flex-wrap sm:overflow-visible sm:px-0 sm:pb-0">
            <button
              type="button"
              onClick={() => setActiveFilter(ALL_FILTER)}
              className={`flex-shrink-0 rounded-lg px-4 py-2 text-sm font-medium transition-all ${
                activeFilter === ALL_FILTER
                  ? 'bg-primary text-primary-foreground shadow-soft'
                  : 'bg-secondary text-foreground hover:bg-secondary/80'
              }`}
            >
              All Products
            </button>
            {collections.map((collection) => (
              <button
                key={collection.slug}
                type="button"
                onClick={() => setActiveFilter(collection.slug)}
                className={`flex-shrink-0 whitespace-nowrap rounded-lg px-4 py-2 text-sm font-medium transition-all ${
                  activeFilter === collection.slug
                    ? 'bg-primary text-primary-foreground shadow-soft'
                    : 'bg-secondary text-foreground hover:bg-secondary/80'
                }`}
              >
                {collection.name}
              </button>
            ))}
          </div>

          <div className="w-full shrink-0 sm:w-56">
            <Select
              value={sort}
              onValueChange={(v) => setSort(v as SortOption)}
            >
              <SelectTrigger className="border-border bg-background">
                <SelectValue placeholder="Sort" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="default">Default</SelectItem>
                <SelectItem value="price-asc">Price: Low to High</SelectItem>
                <SelectItem value="price-desc">Price: High to Low</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {isLoading ? (
          <div className="grid grid-cols-2 gap-4 md:grid-cols-3 md:gap-6 lg:grid-cols-4">
            {Array.from({ length: 8 }).map((_, i) => (
              <div key={i} className="aspect-square animate-pulse rounded-2xl bg-secondary" />
            ))}
          </div>
        ) : sortedProducts.length === 0 ? (
          <p className="py-12 text-center text-muted-foreground">No products in this collection yet.</p>
        ) : (
          <div className="grid grid-cols-2 gap-4 md:grid-cols-3 md:gap-6 lg:grid-cols-4">
            {sortedProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default AllProducts;
