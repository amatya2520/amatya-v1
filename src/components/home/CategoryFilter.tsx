import { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useCollections } from '@/hooks/useShopify';
import ProductCard from '../product/ProductCard';

const CategoryFilter = () => {
  const { data: collections = [] } = useCollections();
  const [activeIndex, setActiveIndex] = useState(0);
  const tabScrollRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);

  const activeCollection = collections[activeIndex];
  const categoryProducts = activeCollection?.products || [];

  // Check tab scroll
  const checkScroll = () => {
    const container = tabScrollRef.current;
    if (container) {
      setCanScrollLeft(container.scrollLeft > 0);
      setCanScrollRight(container.scrollLeft < container.scrollWidth - container.clientWidth - 5);
    }
  };

  useEffect(() => {
    checkScroll();
    const container = tabScrollRef.current;
    if (container) {
      container.addEventListener('scroll', checkScroll);
      window.addEventListener('resize', checkScroll);
    }
    return () => {
      if (container) container.removeEventListener('scroll', checkScroll);
      window.removeEventListener('resize', checkScroll);
    };
  }, [collections]);

  const scrollTabs = (direction: 'left' | 'right') => {
    if (tabScrollRef.current) {
      const scrollAmount = 150;
      tabScrollRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth',
      });
    }
  };

  if (collections.length === 0) {
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
          className="text-center mb-12"
        >
          <h2 className="font-serif text-3xl md:text-4xl font-bold text-foreground mb-3">
            Featured Products
          </h2>
          <p className="text-muted-foreground max-w-lg mx-auto">
            Discover our handpicked selection of pure, traditional products
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-4 gap-8">
          {/* Tabs & Description Section */}
          <div className="lg:col-span-1">
            {/* Category Tabs - Mobile Carousel */}
            <div className="relative lg:relative-auto">
              {canScrollLeft && (
                <button
                  onClick={() => scrollTabs('left')}
                  className="absolute left-0 top-1/2 -translate-y-1/2 z-10 w-8 h-8 flex items-center justify-center bg-background/90 shadow-md rounded-full lg:hidden"
                  aria-label="Scroll left"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
              )}

              <div
                ref={tabScrollRef}
                className="flex lg:flex-col gap-2 overflow-x-auto lg:overflow-visible pb-4 lg:pb-0 mb-6 lg:mb-8 scrollbar-hide"
                style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
              >
                {collections.map((collection, index) => (
                  <button
                    key={collection.slug}
                    onClick={() => setActiveIndex(index)}
                    className={`px-5 py-3 text-left font-medium rounded-lg whitespace-nowrap transition-all flex-shrink-0 ${
                      activeIndex === index
                        ? 'bg-primary text-primary-foreground shadow-soft'
                        : 'bg-secondary text-foreground hover:bg-secondary/80'
                    }`}
                  >
                    {collection.name}
                  </button>
                ))}
              </div>

              {canScrollRight && (
                <button
                  onClick={() => scrollTabs('right')}
                  className="absolute right-0 top-1/2 -translate-y-1/2 z-10 w-8 h-8 flex items-center justify-center bg-background/90 shadow-md rounded-full lg:hidden"
                  aria-label="Scroll right"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              )}
            </div>

            {/* Category Description - Shows below tabs on mobile */}
            {activeCollection && (
              <motion.div
                key={activeCollection.slug}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
                className="p-6 bg-secondary rounded-xl mb-6 lg:mb-0"
              >
                <h3 className="font-serif text-xl font-semibold mb-2">
                  {activeCollection.name}
                </h3>
                <p className="text-sm text-muted-foreground mb-4">
                  {activeCollection.description}
                </p>
                <Link
                  to={`/category/${activeCollection.slug}`}
                  className="text-sm font-medium text-accent hover:underline"
                >
                  View All Products →
                </Link>
              </motion.div>
            )}
          </div>

          {/* Products Grid */}
          <div className="lg:col-span-3">
            <motion.div
              key={activeCollection?.slug}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="grid grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6"
            >
              {categoryProducts.length > 0 ? (
                categoryProducts.slice(0, 6).map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))
              ) : (
                <div className="col-span-full text-center py-12">
                  <p className="text-muted-foreground italic">
                    Bringing the Amrit Essence to you soon—check back shortly.
                  </p>
                </div>
              )}
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CategoryFilter;
