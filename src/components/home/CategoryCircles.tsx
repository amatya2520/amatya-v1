import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { categories } from '@/data/products';

const CategoryCircles = () => {
  return (
    <section className="py-16 bg-gradient-cream overflow-hidden">
      <div className="container">
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

        <div className="flex gap-6 md:gap-8 lg:gap-12 overflow-x-auto pb-4 scrollbar-hide justify-start md:justify-center">
          {categories.map((category, index) => (
            <motion.div
              key={category.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Link
                to={`/category/${category.slug}`}
                className="group flex flex-col items-center"
              >
                <div className="category-circle w-24 h-24 md:w-32 md:h-32 lg:w-40 lg:h-40 border-4 border-primary/20 group-hover:border-golden shadow-soft">
                  <img
                    src={category.image}
                    alt={category.name}
                    className="w-full h-full object-cover"
                  />
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
      </div>
    </section>
  );
};

export default CategoryCircles;
