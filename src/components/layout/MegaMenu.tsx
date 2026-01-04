import { useRef } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useCollection } from '@/hooks/useShopify';
import type { NormalizedProduct } from '@/lib/shopify';

interface MegaMenuProps {
  collectionSlug: string;
}

const MegaMenu = ({ collectionSlug }: MegaMenuProps) => {
  const { data: collection } = useCollection(collectionSlug);
  const scrollRef = useRef<HTMLDivElement>(null);

  if (!collection) return null;

  const products = collection.products.slice(0, 8);
  const showArrows = products.length > 4;

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const scrollAmount = 280;
      scrollRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth',
      });
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 10 }}
      transition={{ duration: 0.2 }}
      className="absolute top-full left-1/2 -translate-x-1/2 bg-popover border border-border shadow-card rounded-xl overflow-hidden z-50"
      style={{ width: 'min(90vw, 900px)', maxWidth: 'calc(100vw - 2rem)' }}
    >
      {/* SVG Background Pattern */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <svg viewBox="0 0 800 300" className="absolute bottom-0 w-full h-auto opacity-5" preserveAspectRatio="xMidYMax slice">
          <path
            d="M0,200 Q200,150 400,180 T800,160 L800,300 L0,300 Z"
            fill="currentColor"
            className="text-primary"
          />
          <ellipse cx="150" cy="260" rx="40" ry="20" fill="currentColor" className="text-primary" opacity="0.3" />
          <ellipse cx="650" cy="270" rx="50" ry="22" fill="currentColor" className="text-primary" opacity="0.3" />
        </svg>
      </div>

      <div className="relative p-6">
        <div className="flex gap-6">
          {/* Category Info */}
          <div className="flex-shrink-0 w-48">
            <h3 className="font-serif text-xl font-semibold mb-2">{collection.name}</h3>
            <p className="text-sm text-muted-foreground mb-4 line-clamp-3">{collection.description}</p>
            <Link
              to={`/category/${collectionSlug}`}
              className="text-sm font-medium text-accent hover:underline"
            >
              View All ({collection.productCount}) →
            </Link>
          </div>

          {/* Products Carousel */}
          <div className="flex-1 relative min-w-0">
            {showArrows && (
              <button
                onClick={() => scroll('left')}
                className="absolute left-0 top-1/2 -translate-y-1/2 z-10 w-8 h-8 flex items-center justify-center bg-background/90 shadow-md rounded-full hover:bg-background transition-colors"
                aria-label="Scroll left"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
            )}

            <div
              ref={scrollRef}
              className="flex gap-4 overflow-x-auto scrollbar-hide px-1"
              style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
            >
              {products.map((product: NormalizedProduct) => (
                <Link
                  key={product.id}
                  to={`/product/${product.slug}`}
                  className="group flex-shrink-0 w-40"
                >
                  <div className="aspect-square rounded-lg overflow-hidden bg-secondary mb-2">
                    <img
                      src={product.images[0]}
                      alt={product.name}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>
                  <h4 className="font-medium text-sm group-hover:text-accent transition-colors line-clamp-1">
                    {product.name}
                  </h4>
                  <p className="text-sm font-semibold mt-0.5">₹{product.price}</p>
                </Link>
              ))}
            </div>

            {showArrows && (
              <button
                onClick={() => scroll('right')}
                className="absolute right-0 top-1/2 -translate-y-1/2 z-10 w-8 h-8 flex items-center justify-center bg-background/90 shadow-md rounded-full hover:bg-background transition-colors"
                aria-label="Scroll right"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default MegaMenu;
