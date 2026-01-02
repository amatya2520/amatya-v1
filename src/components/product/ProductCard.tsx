import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Heart, ShoppingBag } from 'lucide-react';
import type { Product } from '@/data/products';
import { useCart } from '@/context/CartContext';
import { useWishlist } from '@/context/WishlistContext';

interface ProductCardProps {
  product: Product;
}

const ProductCard = ({ product }: ProductCardProps) => {
  const [selectedVariant, setSelectedVariant] = useState(0);
  const { addToCart, setIsOpen } = useCart();
  const { isInWishlist, toggleWishlist } = useWishlist();

  const inWishlist = isInWishlist(product.id);

  const getBadgeStyle = (badge: string) => {
    if (badge === 'best-seller') return 'bg-golden text-foreground';
    if (badge === 'new-launch') return 'bg-primary text-primary-foreground';
    if (badge === 'trending') return 'bg-accent text-accent-foreground';
    return 'bg-secondary text-foreground';
  };

  const displayBadge = product.badges[0];

  const handleQuickAdd = (e: React.MouseEvent) => {
    e.preventDefault();
    addToCart(product, selectedVariant, 1);
    setIsOpen(true);
  };

  const handleWishlist = (e: React.MouseEvent) => {
    e.preventDefault();
    toggleWishlist(product);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4 }}
      className="product-card group bg-card rounded-2xl overflow-hidden shadow-soft hover:shadow-hover"
    >
      {/* Image Container */}
      <Link to={`/product/${product.slug}`} className="relative block aspect-square overflow-hidden">
        {/* Main Image */}
        <img
          src={product.images[0]}
          alt={product.name}
          className="product-image-main w-full h-full object-cover transition-opacity duration-500"
        />
        {/* Hover Image */}
        {product.images[1] && (
          <img
            src={product.images[1]}
            alt={product.name}
            className="product-image-hover absolute inset-0 w-full h-full object-cover opacity-0 transition-opacity duration-500"
          />
        )}

        {/* Badge */}
        {displayBadge && (
          <span className={`product-badge ${getBadgeStyle(displayBadge)}`}>
            {displayBadge === 'best-seller' && 'Best Seller'}
            {displayBadge === 'new-launch' && 'New'}
            {displayBadge === 'trending' && 'Trending'}
            {!['best-seller', 'new-launch', 'trending'].includes(displayBadge) && displayBadge}
          </span>
        )}

        {/* Action Buttons */}
        <div className="product-overlay absolute inset-x-0 bottom-0 p-4 bg-gradient-to-t from-foreground/80 to-transparent opacity-0 translate-y-4 transition-all duration-300">
          <div className="flex gap-2">
            <button
              className="flex-1 flex items-center justify-center gap-2 py-2.5 bg-cream text-foreground text-sm font-medium rounded-full hover:bg-golden transition-colors"
              onClick={handleQuickAdd}
            >
              <ShoppingBag className="w-4 h-4" />
              Quick Add
            </button>
            <button
              className={`p-2.5 rounded-full transition-colors ${
                inWishlist
                  ? 'bg-accent text-accent-foreground'
                  : 'bg-cream/80 text-foreground hover:bg-cream'
              }`}
              onClick={handleWishlist}
              aria-label={inWishlist ? 'Remove from wishlist' : 'Add to wishlist'}
            >
              <Heart className={`w-4 h-4 ${inWishlist ? 'fill-current' : ''}`} />
            </button>
          </div>
        </div>
      </Link>

      {/* Content */}
      <div className="p-4">
        <Link to={`/product/${product.slug}`}>
          <h3 className="font-medium text-foreground group-hover:text-accent transition-colors line-clamp-1">
            {product.name}
          </h3>
        </Link>
        <p className="text-sm text-muted-foreground mb-3">{product.shortDescription}</p>

        {/* Variant Selector */}
        {product.variants.length > 1 && (
          <div className="flex flex-wrap gap-2 mb-3">
            {product.variants.map((variant, index) => (
              <button
                key={variant.weight}
                onClick={() => setSelectedVariant(index)}
                className={`px-3 py-1 text-xs font-medium rounded-full transition-colors ${
                  selectedVariant === index
                    ? 'bg-primary text-primary-foreground'
                    : 'bg-secondary text-foreground hover:bg-secondary/80'
                }`}
              >
                {variant.weight}
              </button>
            ))}
          </div>
        )}

        {/* Price */}
        <div className="flex items-center gap-2">
          <span className="font-serif text-xl font-bold text-foreground">
            ₹{product.variants[selectedVariant]?.price || product.price}
          </span>
          {product.comparePrice && (
            <span className="text-sm text-muted-foreground line-through">
              ₹{product.comparePrice}
            </span>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default ProductCard;
