import { useRef, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useCollections } from '@/hooks/useShopify';

const CategoryCircles = () => {
  const { data: categories = [] } = useCollections();
  const scrollRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);

  const checkScroll = () => {
    const container = scrollRef.current;
    if (container) {
      setCanScrollLeft(container.scrollLeft > 0);
      setCanScrollRight(container.scrollLeft < container.scrollWidth - container.clientWidth - 5);
    }
  };

  useEffect(() => {
    checkScroll();
    const container = scrollRef.current;
    if (container) {
      container.addEventListener('scroll', checkScroll);
      window.addEventListener('resize', checkScroll);
    }
    return () => {
      if (container) container.removeEventListener('scroll', checkScroll);
      window.removeEventListener('resize', checkScroll);
    };
  }, [categories]);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const scrollAmount = 200;
      scrollRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth',
      });
    }
  };

  if (categories.length === 0) {
    return null;
  }

  return (
    <section className="py-16 md:py-10 bg-gradient-cream w-full overflow-x-hidden">
      <div className="container px-4 max-w-full">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="font-serif text-3xl md:text-4xl font-bold text-foreground mb-3">
            Shop By Category
          </h2>
          <p className="text-muted-foreground max-w-md mx-auto">
            Explore our range of pure, natural products crafted with traditional methods
          </p>
        </motion.div>

        <div className="relative pt-8 pb-8">
          {/* Left Arrow */}
          {canScrollLeft && (
            <button
              onClick={() => scroll('left')}
              className="absolute left-[30%] top-[95%] -translate-y-1/2 z-10 w-10 h-10 flex items-center justify-center bg-background/90 shadow-md rounded-full md:hidden"
              aria-label="Scroll left"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
          )}

          <div
            ref={scrollRef}
            className="flex gap-6 md:gap-8 lg:gap-12 overflow-x-auto py-4 scrollbar-hide justify-start md:justify-center px-2"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            {categories.map((category, index) => (
              <motion.div
                key={category.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="flex-shrink-0"
              >
                <Link
                  to={`/category/${category.slug}`}
                  className="group flex flex-col items-center"
                >
                  {/* Container with extra padding to prevent hover scale clipping */}
                  <div className="p-4 -m-4">
                    <div className="category-circle w-24 h-24 md:w-32 md:h-32 lg:w-40 lg:h-40 border-4 border-primary/20 group-hover:border-golden shadow-soft overflow-visible transition-transform duration-500 group-hover:scale-110">
                      <div className="w-full h-full rounded-full overflow-hidden">
                        <img
                          src={category.image}
                          alt={category.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    </div>
                  </div>
                  <span className="mt-4 font-medium text-foreground group-hover:text-accent transition-colors">
                    {category.name}
                  </span>
                  <span className="text-sm text-muted-foreground">
                    {category.productCount} Products
                  </span>
                </Link>
              </motion.div>
            ))}
          </div>

          {/* Right Arrow */}
          {canScrollRight && (
            <button
              onClick={() => scroll('right')}
              className="absolute right-[30%] top-[95%] -translate-y-1/2 z-10 w-10 h-10 flex items-center justify-center bg-background/90 shadow-md rounded-full md:hidden"
              aria-label="Scroll right"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          )}
        </div>
      </div>
    </section>
  );
};

export default CategoryCircles;
