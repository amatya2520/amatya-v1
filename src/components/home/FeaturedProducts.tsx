import { motion } from 'framer-motion';
import { getFeaturedProducts } from '@/data/products';
import ProductCard from '../product/ProductCard';

const FeaturedProducts = () => {
  const featuredProducts = getFeaturedProducts();

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
            Bestsellers & Trending
          </h2>
          <p className="text-muted-foreground max-w-md mx-auto">
            Our most loved products, chosen by customers across India
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedProducts;
