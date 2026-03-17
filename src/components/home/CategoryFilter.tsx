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

        {/* Category Tabs - Mobile/Tablet: Centered, smaller buttons with carousel and dots */}
        <div className="mb-8 lg:hidden">
          <div className="flex justify-center px-0">
            <div className="relative w-full max-w-full">
              {/* Fade mask left */}
              <div className="pointer-events-none absolute left-0 top-0 h-full w-6 z-10" style={{background: 'linear-gradient(to right, rgba(249,247,242,1), rgba(249,247,242,0))'}} />
              {/* Fade mask right */}
              <div className="pointer-events-none absolute right-0 top-0 h-full w-6 z-10" style={{background: 'linear-gradient(to left, rgba(249,247,242,1), rgba(249,247,242,0))'}} />
              <div
                ref={tabScrollRef}
                className="flex gap-2 overflow-x-auto scrollbar-hide pb-4 snap-x snap-mandatory justify-start px-4"
                style={{ scrollbarWidth: 'none', msOverflowStyle: 'none', WebkitOverflowScrolling: 'touch', paddingLeft: 12, paddingRight: 12 }}
              >
                {/* Spacer for left padding */}
                <div className="flex-shrink-0 w-2" />
                {collections.map((collection, index) => (
                  <button
                    key={collection.slug}
                    onClick={() => setActiveIndex(index)}
                    className={`px-3 py-2 text-xs md:text-sm font-medium rounded-lg whitespace-nowrap transition-all flex-shrink-0 snap-start ${
                      activeIndex === index
                        ? 'bg-primary text-primary-foreground shadow-soft'
                        : 'bg-secondary text-foreground hover:bg-secondary/80'
                    }`}
                  >
                    {collection.name}
                  </button>
                ))}
                {/* Spacer for right padding */}
                <div className="flex-shrink-0 w-2" />
              </div>
              {/* Dots Indicator */}
              <div className="flex justify-center gap-1.5 mt-2">
                {collections.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => {
                      setActiveIndex(index);
                      if (tabScrollRef.current) {
                        const button = tabScrollRef.current.children[index+1] as HTMLElement;
                        button?.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
                      }
                    }}
                    className={`w-2 h-2 rounded-full transition-all duration-300 ${
                      activeIndex === index 
                        ? 'bg-primary w-4' 
                        : 'bg-muted-foreground/30'
                    }`}
                    aria-label={`Go to ${collections[index].name}`}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-4 gap-8">
          {/* Tabs & Description Section */}
          <div className="lg:col-span-1 hidden lg:block">
            {/* Category Tabs - Desktop */}
            <div className="flex flex-col gap-2 mb-8">
              {collections.map((collection, index) => (
                <button
                  key={collection.slug}
                  onClick={() => setActiveIndex(index)}
                  className={`px-5 py-3 text-left font-medium rounded-lg whitespace-nowrap transition-all ${
                    activeIndex === index
                      ? 'bg-primary text-primary-foreground shadow-soft'
                      : 'bg-secondary text-foreground hover:bg-secondary/80'
                  }`}
                >
                  {collection.name}
                </button>
              ))}
            </div>

            {/* Category Description - Desktop */}
            {activeCollection && (
              <motion.div
                key={activeCollection.slug}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
                className="p-6 bg-secondary rounded-xl"
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

          {/* Category Description - Mobile/Tablet */}
          {activeCollection && (
            <div className="lg:hidden mb-6">
              <motion.div
                key={activeCollection.slug}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
                className="p-6 bg-secondary rounded-xl"
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
            </div>
          )}

          {/* Products Grid */}
          <div className="lg:col-span-3">
            <motion.div
              key={activeCollection?.slug}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="grid grid-cols-2 lg:grid-cols-3 gap-3 md:gap-6"
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
