import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { getProductsByCategory, categories } from '@/data/products';

interface MegaMenuProps {
  categorySlug: string;
}

const MegaMenu = ({ categorySlug }: MegaMenuProps) => {
  const categoryProducts = getProductsByCategory(categorySlug).slice(0, 4);
  const category = categories.find((c) => c.slug === categorySlug);

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 10 }}
      transition={{ duration: 0.2 }}
      className="absolute top-full left-1/2 -translate-x-1/2 w-screen max-w-5xl bg-popover border border-border shadow-card rounded-xl overflow-hidden z-50"
    >
      {/* SVG Background Pattern */}
      <div className="absolute inset-0 opacity-5 pointer-events-none">
        <svg viewBox="0 0 800 400" className="w-full h-full">
          <path
            d="M0,300 Q200,250 400,280 T800,260 L800,400 L0,400 Z"
            fill="currentColor"
            className="text-primary"
          />
          <ellipse cx="150" cy="350" rx="60" ry="30" fill="currentColor" className="text-primary" opacity="0.3" />
          <ellipse cx="650" cy="360" rx="80" ry="35" fill="currentColor" className="text-primary" opacity="0.3" />
        </svg>
      </div>

      <div className="relative p-8">
        <div className="grid grid-cols-5 gap-6">
          {/* Category Info */}
          <div className="col-span-1">
            <h3 className="font-serif text-xl font-semibold mb-2">{category?.name}</h3>
            <p className="text-sm text-muted-foreground mb-4">{category?.description}</p>
            <Link
              to={`/category/${categorySlug}`}
              className="text-sm font-medium text-accent hover:underline"
            >
              View All →
            </Link>
          </div>

          {/* Products Grid */}
          <div className="col-span-4 grid grid-cols-4 gap-4">
            {categoryProducts.map((product) => (
              <Link
                key={product.id}
                to={`/product/${product.slug}`}
                className="group"
              >
                <div className="aspect-square rounded-lg overflow-hidden bg-secondary mb-3">
                  <img
                    src={product.images[0]}
                    alt={product.name}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
                <h4 className="font-medium text-sm group-hover:text-accent transition-colors">
                  {product.name}
                </h4>
                <p className="text-sm text-muted-foreground">{product.shortDescription}</p>
                <p className="text-sm font-semibold mt-1">₹{product.price}</p>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default MegaMenu;
