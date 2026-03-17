import { useState, useEffect, useMemo } from 'react';
import { createPortal } from 'react-dom';
import { motion } from 'framer-motion';
import { X, Search, TrendingUp } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { fetchCollections } from '@/lib/shopify';
import type { NormalizedProduct } from '@/lib/shopify';

interface SearchOverlayProps {
  onClose: () => void;
}

const placeholders = [
  'Search for A2 Ghee...',
  'Search for Raw Honey...',
  'Search for Muscovado...',
  'Search for Chia Seeds...',
];

const SearchOverlay = ({ onClose }: SearchOverlayProps) => {
  const [query, setQuery] = useState('');
  const [placeholderIndex, setPlaceholderIndex] = useState(0);
  const [displayPlaceholder, setDisplayPlaceholder] = useState('');
  const [isTyping, setIsTyping] = useState(true);
  const [mounted, setMounted] = useState(false);

  const { data: shopifyCollections = [], isLoading } = useQuery({
    queryKey: ['search-shopify-collections'],
    queryFn: async () => (await fetchCollections()) ?? [],
    staleTime: 1000 * 60 * 5,
  });

  const shopifyProducts = useMemo<NormalizedProduct[]>(() => {
    const unique = new Map<string, NormalizedProduct>();

    shopifyCollections.forEach((collection) => {
      collection.products?.forEach((product) => {
        if (!unique.has(product.id)) {
          unique.set(product.id, product);
        }
      });
    });

    return Array.from(unique.values());
  }, [shopifyCollections]);

  const trendingCollections = useMemo(() => {
    const seen = new Set<string>();
    const result: typeof shopifyCollections = [];

    for (const collection of shopifyCollections) {
      if (!seen.has(collection.id)) {
        seen.add(collection.id);
        result.push(collection);
      }
      if (result.length === 8) {
        break;
      }
    }

    return result;
  }, [shopifyCollections]);

  // Typewriter effect
  useEffect(() => {
    const currentPlaceholder = placeholders[placeholderIndex];
    let charIndex = 0;
    
    if (isTyping) {
      const typeInterval = setInterval(() => {
        if (charIndex <= currentPlaceholder.length) {
          setDisplayPlaceholder(currentPlaceholder.slice(0, charIndex));
          charIndex++;
        } else {
          setIsTyping(false);
          clearInterval(typeInterval);
        }
      }, 80);
      return () => clearInterval(typeInterval);
    } else {
      const pauseTimeout = setTimeout(() => {
        setPlaceholderIndex((prev) => (prev + 1) % placeholders.length);
        setIsTyping(true);
      }, 2000);
      return () => clearTimeout(pauseTimeout);
    }
  }, [placeholderIndex, isTyping]);

  useEffect(() => {
    setMounted(true);
    return () => setMounted(false);
  }, []);

  const normalizedQuery = query.trim().toLowerCase();

  const filteredProducts = normalizedQuery
    ? shopifyProducts.filter((product) => {
        const nameMatch = product.name.toLowerCase().includes(normalizedQuery);
        const descriptionMatch = product.description?.toLowerCase().includes(normalizedQuery);
        const collectionMatch = product.category?.toLowerCase().includes(normalizedQuery);
        return nameMatch || descriptionMatch || collectionMatch;
      })
    : [];

  const filteredCollections = normalizedQuery
    ? shopifyCollections.filter((collection) => {
        const nameMatch = collection.name.toLowerCase().includes(normalizedQuery);
        const descriptionMatch = collection.description?.toLowerCase().includes(normalizedQuery);
        return nameMatch || descriptionMatch;
      })
    : [];

  const noResults = normalizedQuery.length > 0 && filteredProducts.length === 0 && filteredCollections.length === 0;

  if (!mounted || typeof document === 'undefined') {
    return null;
  }

  return createPortal(
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="search-overlay flex flex-col"
    >
      <div className="container py-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <span className="font-serif text-2xl font-bold">Search</span>
          <button
            onClick={onClose}
            className="p-2 hover:bg-secondary rounded-full transition-colors"
            aria-label="Close search"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Search Input */}
        <div className="relative max-w-2xl mx-auto mb-12">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={displayPlaceholder}
            autoFocus
            className="w-full pl-12 pr-4 py-4 text-lg bg-secondary border-0 rounded-full focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </div>

        {/* Results or Trending */}
        {normalizedQuery ? (
          <div className="max-w-2xl mx-auto space-y-6">
            <p className="text-sm text-muted-foreground">
              Showing {filteredProducts.length} product{filteredProducts.length !== 1 ? 's' : ''}
              {filteredCollections.length > 0 && ` and ${filteredCollections.length} collection${filteredCollections.length !== 1 ? 's' : ''}`} for "{query}"
            </p>

            {noResults && (
              <div className="rounded-2xl border border-dashed border-muted-foreground/40 p-8 text-center text-muted-foreground">
                No results found. Try a different search term.
              </div>
            )}

            {filteredProducts.length > 0 && (
              <div className="space-y-4">
                {filteredProducts.map((product) => (
                  <Link
                    key={product.id}
                    to={`/product/${product.slug}`}
                    onClick={onClose}
                    className="flex items-center gap-4 p-4 bg-card rounded-lg hover:shadow-card transition-shadow"
                  >
                    <img
                      src={product.images[0]}
                      alt={product.name}
                      className="w-16 h-16 object-cover rounded-lg"
                    />
                    <div>
                      <h3 className="font-medium">{product.name}</h3>
                      <p className="text-sm text-muted-foreground">{product.category}</p>
                      <p className="text-sm font-semibold text-accent">₹{product.price.toLocaleString('en-IN')}</p>
                    </div>
                  </Link>
                ))}
              </div>
            )}

            {filteredCollections.length > 0 && (
              <div className="space-y-3">
                <h4 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">Collections</h4>
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                  {filteredCollections.map((collection) => (
                    <Link
                      key={collection.id}
                      to={`/category/${collection.slug}`}
                      onClick={onClose}
                      className="group relative overflow-hidden rounded-2xl bg-card"
                    >
                      <img
                        src={collection.image}
                        alt={collection.name}
                        className="h-32 w-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                      <div className="p-4">
                        <h3 className="font-medium">{collection.name}</h3>
                        {collection.description && (
                          <p className="text-sm text-muted-foreground line-clamp-2">{collection.description}</p>
                        )}
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>
        ) : (
          <div className="max-w-2xl mx-auto space-y-6">
            <div className="flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-accent" />
              <span className="font-medium">Trending Categories</span>
            </div>

            {isLoading ? (
              <div className="rounded-2xl border border-dashed border-muted-foreground/40 p-8 text-center text-muted-foreground">
                Loading collections...
              </div>
            ) : shopifyCollections.length === 0 ? (
              <div className="rounded-2xl border border-dashed border-muted-foreground/40 p-8 text-center text-muted-foreground">
                No collections available.
              </div>
            ) : (
              <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
                {trendingCollections.slice(0, 4).map((collection) => (
                  <Link
                    key={collection.id}
                    to={`/category/${collection.slug}`}
                    onClick={onClose}
                    className="group relative aspect-square overflow-hidden rounded-2xl"
                  >
                    <img
                      src={collection.image}
                      alt={collection.name}
                      className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 flex items-end bg-gradient-to-t from-foreground/80 to-transparent p-4">
                      <span className="text-primary-foreground font-medium">{collection.name}</span>
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </motion.div>,
    document.body
  );
};

export default SearchOverlay;
