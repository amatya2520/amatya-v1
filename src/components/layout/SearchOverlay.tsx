import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { X, Search, TrendingUp } from 'lucide-react';
import { Link } from 'react-router-dom';
import { categories, products } from '@/data/products';

interface SearchOverlayProps {
  onClose: () => void;
}

const placeholders = [
  'Search for A2 Ghee...',
  'Search for Raw Honey...',
  'Search for Muscovado...',
  'Search for Chia Seeds...',
];

const SearchOverlay = ({ onClose }: SearchOverlayProps) => {
  const [query, setQuery] = useState('');
  const [placeholderIndex, setPlaceholderIndex] = useState(0);
  const [displayPlaceholder, setDisplayPlaceholder] = useState('');
  const [isTyping, setIsTyping] = useState(true);

  // Typewriter effect
  useEffect(() => {
    const currentPlaceholder = placeholders[placeholderIndex];
    let charIndex = 0;
    
    if (isTyping) {
      const typeInterval = setInterval(() => {
        if (charIndex <= currentPlaceholder.length) {
          setDisplayPlaceholder(currentPlaceholder.slice(0, charIndex));
          charIndex++;
        } else {
          setIsTyping(false);
          clearInterval(typeInterval);
        }
      }, 80);
      return () => clearInterval(typeInterval);
    } else {
      const pauseTimeout = setTimeout(() => {
        setPlaceholderIndex((prev) => (prev + 1) % placeholders.length);
        setIsTyping(true);
      }, 2000);
      return () => clearTimeout(pauseTimeout);
    }
  }, [placeholderIndex, isTyping]);

  const filteredProducts = query
    ? products.filter(
        (p) =>
          p.name.toLowerCase().includes(query.toLowerCase()) ||
          p.category.toLowerCase().includes(query.toLowerCase())
      )
    : [];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="search-overlay flex flex-col"
    >
      <div className="container py-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <span className="font-serif text-2xl font-bold">Search</span>
          <button
            onClick={onClose}
            className="p-2 hover:bg-secondary rounded-full transition-colors"
            aria-label="Close search"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Search Input */}
        <div className="relative max-w-2xl mx-auto mb-12">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={displayPlaceholder}
            autoFocus
            className="w-full pl-12 pr-4 py-4 text-lg bg-secondary border-0 rounded-full focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </div>

        {/* Results or Trending */}
        {query ? (
          <div className="max-w-2xl mx-auto">
            <p className="text-sm text-muted-foreground mb-4">
              {filteredProducts.length} results for "{query}"
            </p>
            <div className="space-y-4">
              {filteredProducts.map((product) => (
                <Link
                  key={product.id}
                  to={`/product/${product.slug}`}
                  onClick={onClose}
                  className="flex items-center gap-4 p-4 bg-card rounded-lg hover:shadow-card transition-shadow"
                >
                  <img
                    src={product.images[0]}
                    alt={product.name}
                    className="w-16 h-16 object-cover rounded-lg"
                  />
                  <div>
                    <h3 className="font-medium">{product.name}</h3>
                    <p className="text-sm text-muted-foreground">{product.category}</p>
                    <p className="text-sm font-semibold text-accent">₹{product.price}</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        ) : (
          <div className="max-w-2xl mx-auto">
            <div className="flex items-center gap-2 mb-6">
              <TrendingUp className="w-5 h-5 text-accent" />
              <span className="font-medium">Trending Categories</span>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {categories.map((category) => (
                <Link
                  key={category.slug}
                  to={`/category/${category.slug}`}
                  onClick={onClose}
                  className="group relative aspect-square rounded-2xl overflow-hidden"
                >
                  <img
                    src={category.image}
                    alt={category.name}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-foreground/80 to-transparent flex items-end p-4">
                    <span className="text-primary-foreground font-medium">
                      {category.name}
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default SearchOverlay;
