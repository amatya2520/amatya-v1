import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { getProductsByCategory, categories } from '@/data/products';
import ProductCard from '../product/ProductCard';

const CategoryFilter = () => {
  const [activeCategory, setActiveCategory] = useState('ghee');
  const categoryProducts = getProductsByCategory(activeCategory);

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
          {/* Video & Tabs Section */}
          <div className="lg:col-span-1">
            {/* Category Tabs */}
            <div className="flex lg:flex-col gap-2 overflow-x-auto lg:overflow-visible pb-4 lg:pb-0 mb-6 lg:mb-8">
              {categories.map((category) => (
                <button
                  key={category.slug}
                  onClick={() => setActiveCategory(category.slug)}
                  className={`px-5 py-3 text-left font-medium rounded-lg whitespace-nowrap transition-all ${
                    activeCategory === category.slug
                      ? 'bg-primary text-primary-foreground shadow-soft'
                      : 'bg-secondary text-foreground hover:bg-secondary/80'
                  }`}
                >
                  {category.name}
                </button>
              ))}
            </div>

            {/* Category Description */}
            <motion.div
              key={activeCategory}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
              className="hidden lg:block p-6 bg-secondary rounded-xl"
            >
              <h3 className="font-serif text-xl font-semibold mb-2">
                {categories.find((c) => c.slug === activeCategory)?.name}
              </h3>
              <p className="text-sm text-muted-foreground mb-4">
                {categories.find((c) => c.slug === activeCategory)?.description}
              </p>
              <Link
                to={`/category/${activeCategory}`}
                className="text-sm font-medium text-accent hover:underline"
              >
                View All Products →
              </Link>
            </motion.div>
          </div>

          {/* Products Grid */}
          <div className="lg:col-span-3">
            <motion.div
              key={activeCategory}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6"
            >
              {categoryProducts.length > 0 ? (
                categoryProducts.map((product) => (
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
