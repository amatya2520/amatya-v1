import { motion } from 'framer-motion';
import { useShopifyTaggedProducts } from '@/hooks/useShopify';
import ProductCard from '../product/ProductCard';

const BESTSELLER_TAGS = ['best-seller', 'bestseller', 'Bestseller', 'Best Seller'];

const BestsellersSection = () => {
  const { data: products = [], isLoading } = useShopifyTaggedProducts(BESTSELLER_TAGS);

  if (!isLoading && products.length === 0) {
    return (
      <section className="py-16 md:py-24">
        <div className="container px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <h2 className="font-serif text-3xl md:text-4xl font-bold text-foreground mb-3">Bestsellers</h2>
            <p className="text-muted-foreground max-w-xl mx-auto mb-10">
              Currently out of stock. Check back soon for customer favorites.
            </p>
            <div className="flex min-h-[160px] items-center justify-center rounded-2xl border border-dashed border-border/60 bg-secondary/20 text-muted-foreground">
              No products available
            </div>
          </motion.div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-16 md:py-24">
      <div className="container px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-10"
        >
          <h2 className="font-serif text-3xl md:text-4xl font-bold text-foreground mb-3">Bestsellers</h2>
          <p className="text-muted-foreground max-w-xl mx-auto">
            Discover the products our customers keep coming back for.
          </p>
        </motion.div>

        {isLoading ? (
          <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-3 md:gap-6">
            {Array.from({ length: 8 }).map((_, index) => (
              <div key={index} className="aspect-square rounded-2xl bg-secondary animate-pulse" />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-3 md:gap-6">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default BestsellersSection;
