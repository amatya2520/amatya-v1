import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { createPortal } from 'react-dom';
import { useEffect, useState } from 'react';
import { useCollection } from '@/hooks/useShopify';
import type { NormalizedProduct } from '@/lib/shopify';

interface MegaMenuProps {
  collectionSlug: string;
  anchorRect?: DOMRect | null;
  onOpen?: () => void;
  onClose?: () => void;
}

const MegaMenu = ({ collectionSlug, anchorRect, onOpen, onClose }: MegaMenuProps) => {
  const { data: collection } = useCollection(collectionSlug);
  const [portalRoot, setPortalRoot] = useState<HTMLElement | null>(null);

  useEffect(() => {
    setPortalRoot(document.body);
  }, []);

  if (!collection || !portalRoot) return null;

  const products = collection.products.slice(0, 8);

  const rect = anchorRect;
  const left = rect ? rect.left + rect.width / 2 : window.innerWidth / 2;
  // place slightly below the anchor
  const top = rect ? rect.bottom + 8 : 88;

  return createPortal(
    <div
      onMouseEnter={() => onOpen && onOpen()}
      onMouseLeave={() => onClose && onClose()}
      style={{
        position: 'fixed',
        left: left,
        top: top,
        transform: 'translateX(-50%)',
        zIndex: 44,
        pointerEvents: 'auto',
      }}
    >
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 10 }}
        transition={{ duration: 0.2 }}
        className="bg-popover border border-border shadow-card rounded-xl overflow-hidden mt-4 max-w-[calc(100vw-1rem)] w-auto"
        style={{
          width: 'max-content',
          maxWidth: 'min(900px, calc(100vw - 1rem))',
          minWidth: '320px',
        }}
      >
      {/* SVG Background Pattern */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden max-w-full">
        <svg viewBox="0 0 800 300" className="absolute bottom-0 w-full h-auto opacity-5 max-w-full" preserveAspectRatio="xMidYMax slice">
          <path
            d="M0,200 Q200,150 400,180 T800,160 L800,300 L0,300 Z"
            fill="currentColor"
            className="text-primary"
          />
          <ellipse cx="150" cy="260" rx="40" ry="20" fill="currentColor" className="text-primary" opacity="0.3" />
          <ellipse cx="650" cy="270" rx="50" ry="22" fill="currentColor" className="text-primary" opacity="0.3" />
        </svg>
      </div>

      <div className="relative p-4 md:p-6 max-w-full overflow-x-hidden">
        <div className="flex flex-col md:flex-row gap-4 md:gap-6">
          {/* Category Info */}
          <div className="flex-shrink-0 w-full md:w-48">
            <h3 className="font-serif text-lg md:text-xl font-semibold mb-2">{collection.name}</h3>
            <p className="text-xs md:text-sm text-muted-foreground mb-3 md:mb-4 line-clamp-2 md:line-clamp-3">{collection.description}</p>
            <Link
              to={`/category/${collectionSlug}`}
              className="text-xs md:text-sm font-medium text-accent hover:underline"
            >
              View All ({collection.productCount}) →
            </Link>
          </div>

          {/* Products Carousel */}
          <div className="flex-1 relative min-w-0 max-w-full overflow-hidden">
            {products.length === 0 ? (
              <div className="flex items-center justify-center w-full min-h-[160px] text-sm text-muted-foreground">
                Currently out of stock
              </div>
            ) : (
              <div
                className="flex gap-3 md:gap-4 overflow-x-auto scrollbar-hide snap-x snap-mandatory"
                style={{
                  scrollbarWidth: 'none',
                  msOverflowStyle: 'none',
                  WebkitOverflowScrolling: 'touch',
                  maxWidth: '100%',
                  minWidth: '0',
                }}
                tabIndex={-1}
              >
                {products.map((product: NormalizedProduct) => (
                  <Link
                    key={product.id}
                    to={`/product/${product.slug}`}
                    className="group flex-shrink-0 w-28 md:w-40 snap-start"
                    style={{ maxWidth: '100%' }}
                  >
                    <div className="aspect-square rounded-lg overflow-hidden bg-secondary mb-2">
                      <img
                        src={product.images[0]}
                        alt={product.name}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                    </div>
                    <h4 className="font-medium text-xs md:text-sm group-hover:text-accent transition-colors line-clamp-1">
                      {product.name}
                    </h4>
                    <p className="text-xs md:text-sm font-semibold mt-0.5">₹{product.price}</p>
                  </Link>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </motion.div>
    </div>,
    portalRoot
  );
};

export default MegaMenu;
