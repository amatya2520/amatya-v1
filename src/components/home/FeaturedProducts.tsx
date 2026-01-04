import { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { useCollections, useFeaturedProducts } from '@/hooks/useShopify';
import ProductCard from '../product/ProductCard';
import { Button } from '@/components/ui/button';

const FeaturedProducts = () => {
  const { data: collections = [] } = useCollections();
  const { data: featuredProducts = [] } = useFeaturedProducts();
  const [activeTab, setActiveTab] = useState(0);
  const tabsRef = useRef<HTMLDivElement>(null);
  
  // Use featured products if available, otherwise use collection products
  const activeCollection = collections[activeTab];
  const displayProducts = featuredProducts.length > 0 ? featuredProducts : 
    (activeCollection?.products || []);

  if (collections.length === 0 && featuredProducts.length === 0) {
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
          <h2 className="font-serif text-3xl md:text-4xl font-bold text-foreground mb-3">
            Bestsellers & Trending
          </h2>
          <p className="text-muted-foreground max-w-md mx-auto">
            Our most loved products, chosen by customers across India
          </p>
        </motion.div>

        {/* Collection Tabs - Desktop */}
        {collections.length > 0 && (
          <div className="hidden md:flex justify-center gap-2 mb-8 flex-wrap">
            {collections.map((collection, index) => (
              <Button
                key={collection.id}
                variant={activeTab === index ? 'default' : 'outline'}
                onClick={() => setActiveTab(index)}
                className="whitespace-nowrap"
                size="sm"
              >
                {collection.name}
              </Button>
            ))}
          </div>
        )}

        {/* Collection Tabs - Mobile Carousel with Dots */}
        {collections.length > 0 && (
          <div className="md:hidden mb-6">
            <div 
              ref={tabsRef}
              className="flex gap-2 overflow-x-auto scrollbar-hide pb-2 px-1 snap-x snap-mandatory"
              style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
            >
              {collections.map((collection, index) => (
                <Button
                  key={collection.id}
                  variant={activeTab === index ? 'default' : 'outline'}
                  onClick={() => setActiveTab(index)}
                  className="whitespace-nowrap flex-shrink-0 snap-start text-xs px-3 py-1.5 h-auto"
                  size="sm"
                >
                  {collection.name}
                </Button>
              ))}
            </div>
            {/* Scroll Indicator Dots */}
            <div className="flex justify-center gap-1.5 mt-3">
              {collections.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setActiveTab(index)}
                  className={`w-2 h-2 rounded-full transition-all duration-300 ${
                    activeTab === index 
                      ? 'bg-primary w-4' 
                      : 'bg-muted-foreground/30'
                  }`}
                />
              ))}
            </div>
          </div>
        )}

        {/* Collection Description */}
        {activeCollection?.description && (
          <p className="text-center text-muted-foreground mb-6 md:mb-8 max-w-2xl mx-auto text-sm md:text-base px-4">
            {activeCollection.description}
          </p>
        )}

        {/* Product Grid - 2 cols mobile, 4 cols desktop */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-6 max-w-full">
          {displayProducts.slice(0, 8).map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        {displayProducts.length === 0 && (
          <p className="text-center text-muted-foreground py-12">
            Bringing the Amrit Essence to you soon—check back shortly.
          </p>
        )}
      </div>
    </section>
  );
};

export default FeaturedProducts;
