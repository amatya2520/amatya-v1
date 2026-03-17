import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Heart, ShoppingBag } from 'lucide-react';
import type { NormalizedProduct } from '@/lib/shopify';
import { useCart } from '@/context/CartContext';
import { useWishlist } from '@/context/WishlistContext';

interface ProductCardProps {
  product: NormalizedProduct;
}

const ProductCard = ({ product }: ProductCardProps) => {
  const [selectedVariant, setSelectedVariant] = useState(0);
  const { addToCart, setIsOpen } = useCart();
  const { isInWishlist, toggleWishlist } = useWishlist();

  const inWishlist = isInWishlist(product.id, selectedVariant);

  const getBadgeStyle = (badge: string) => {
    const lowerBadge = badge.toLowerCase();
    if (lowerBadge === 'best-seller' || lowerBadge === 'best seller' || lowerBadge === 'bestseller') {
      return 'bg-golden text-foreground';
    }
    if (lowerBadge === 'new-launch' || lowerBadge === 'new') {
      return 'bg-primary text-primary-foreground';
    }
    if (lowerBadge === 'trending') {
      return 'bg-accent text-accent-foreground';
    }
    return 'bg-secondary text-foreground';
  };

  const getBadgeLabel = (badge: string) => {
    const lowerBadge = badge.toLowerCase();
    if (lowerBadge === 'best-seller' || lowerBadge === 'bestseller') return 'Best Seller';
    if (lowerBadge === 'new-launch') return 'New';
    if (lowerBadge === 'trending') return 'Trending';
    // For badge:XYZ format, return XYZ
    if (badge.toLowerCase().startsWith('badge:')) return badge.substring(6);
    return badge;
  };

  const displayBadge = product.badges[0];

  const handleQuickAdd = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product, selectedVariant, 1);
    setIsOpen(true);
  };

  const handleWishlist = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    toggleWishlist(product, selectedVariant);
  };

  const selectedVariantData = product.variants[selectedVariant] ?? product.variants[0];
  const currentPrice = Number(selectedVariantData?.price ?? product.price ?? 0);
  const comparePrice = selectedVariantData?.compareAtPrice ?? product.comparePrice;
  const comparePriceNum = typeof comparePrice === 'number' ? comparePrice :
                          (typeof comparePrice === 'string' ? Number(comparePrice) : undefined);
  const showDiscount = typeof comparePriceNum === 'number' && comparePriceNum > currentPrice;
  const discountPercent = showDiscount ? Math.round((1 - currentPrice / comparePriceNum!) * 100) : null;

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
            {getBadgeLabel(displayBadge)}
          </span>
        )}

        {/* Action Buttons */}
        <div className="product-overlay absolute inset-x-0 bottom-0 p-3 md:p-4 bg-gradient-to-t from-foreground/80 to-transparent opacity-0 translate-y-4 transition-all duration-300">
          <div className="flex gap-2">
            <button
              className="flex-1 flex items-center justify-center gap-1 md:gap-2 py-2 md:py-2.5 bg-cream text-foreground text-xs md:text-sm font-medium rounded-full hover:bg-golden transition-colors"
              onClick={handleQuickAdd}
            >
              <ShoppingBag className="w-3 h-3 md:w-4 md:h-4" />
              <span className="hidden sm:inline">Quick Add</span>
              <span className="sm:hidden">Add</span>
            </button>
            <button
              className={`p-2 md:p-2.5 rounded-full transition-colors ${
                inWishlist
                  ? 'bg-accent text-accent-foreground'
                  : 'bg-cream/80 text-foreground hover:bg-cream'
              }`}
              onClick={handleWishlist}
              aria-label={inWishlist ? 'Remove from wishlist' : 'Add to wishlist'}
            >
              <Heart className={`w-3 h-3 md:w-4 md:h-4 ${inWishlist ? 'fill-current' : ''}`} />
            </button>
          </div>
        </div>
      </Link>

      {/* Content */}
      <div className="p-3 md:p-4">
        <Link to={`/product/${product.slug}`}>
          <h3 className="font-sans text-sm md:text-base font-semibold text-foreground group-hover:text-accent transition-colors line-clamp-1">
            {product.name}
          </h3>
        </Link>
        <p className="text-xs md:text-sm text-muted-foreground mb-2 md:mb-3 line-clamp-1">{product.shortDescription}</p>

        {/* Variant Selector */}
        {product.variants.length > 1 && (
          <div className="flex flex-wrap gap-1 md:gap-2 mb-2 md:mb-3">
            {product.variants.slice(0, 3).map((variant, index) => (
              <button
                key={variant.id || index}
                onClick={(e) => {
                  e.preventDefault();
                  setSelectedVariant(index);
                }}
                className={`px-2 md:px-3 py-0.5 md:py-1 text-[10px] md:text-xs font-medium rounded-full transition-colors ${
                  selectedVariant === index
                    ? 'bg-primary text-primary-foreground'
                    : 'bg-secondary text-foreground hover:bg-secondary/80'
                }`}
              >
                {variant.weight}
                {/* <span className="block text-[9px] md:text-[11px] font-normal opacity-80">
                  ₹{variant.price.toLocaleString('en-IN')}
                </span>
                {variant.compareAtPrice && variant.compareAtPrice > variant.price && (
                  <span className="block text-[9px] md:text-[11px] text-muted-foreground line-through">
                    ₹{variant.compareAtPrice.toLocaleString('en-IN')}
                  </span>
                )} */}
              </button>
            ))}
          </div>
        )}

        {/* Price */}
        <div className="flex items-center gap-2">
          <span className="font-sans text-lg md:text-xl font-bold text-foreground">
            ₹{currentPrice.toLocaleString('en-IN')}
          </span>
          {showDiscount && comparePriceNum && (
            <span className="text-xs md:text-sm text-muted-foreground line-through">
              ₹{comparePriceNum.toLocaleString('en-IN')}
            </span>
          )}
          {discountPercent && (
            <span className="px-2 py-0.5 bg-accent/10 text-accent text-[10px] md:text-xs font-semibold rounded-full">
              {discountPercent}% OFF
            </span>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default ProductCard;
