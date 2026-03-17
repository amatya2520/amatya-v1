import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Trash2, ShoppingBag, Heart } from 'lucide-react';
import Layout from '@/components/layout/Layout';
import { useWishlist } from '@/context/WishlistContext';
import { useCart } from '@/context/CartContext';
import { Button } from '@/components/ui/button';

const WishlistPage = () => {
  const { items, removeFromWishlist, clearWishlist } = useWishlist();
  const { addToCart, setIsOpen } = useCart();

  const handleAddToCart = (item: { product: any; variantIndex: number }) => {
    addToCart(item.product, item.variantIndex, 1);
    setIsOpen(true);
  };

  const handleAddAllToCart = () => {
    items.forEach((item) => {
      handleAddToCart(item);
    });
  };

  return (
    <Layout>
      {/* Breadcrumb */}
      <div className="container mx-auto px-4 py-4">
        <nav className="flex items-center gap-2 text-sm text-muted-foreground">
          <Link to="/" className="hover:text-foreground transition-colors">Home</Link>
          <span>/</span>
          <span className="text-foreground">Wishlist</span>
        </nav>
      </div>

      <section className="container mx-auto px-4 pb-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <div className="flex items-center justify-between">
            <div>
              <h1 className="font-serif text-3xl md:text-4xl font-bold text-foreground mb-2">
                My Wishlist
              </h1>
              <p className="text-muted-foreground">
                {items.length} {items.length === 1 ? 'item' : 'items'} saved
              </p>
            </div>
            {items.length > 0 && (
              <div className="flex gap-2">
                <Button variant="outline" size="sm" onClick={clearWishlist}>
                  Clear All
                </Button>
                <Button size="sm" onClick={handleAddAllToCart}>
                  <ShoppingBag className="w-4 h-4 mr-2" />
                  Add All to Cart
                </Button>
              </div>
            )}
          </div>
        </motion.div>

        {items.length > 0 ? (
          <div className="grid gap-4">
            {items.map((item, index) => {
              // Get the selected variant; fallback to first variant if index out of bounds
              const variant = item.product.variants && item.variantIndex >= 0 && item.variantIndex < item.product.variants.length
                ? item.product.variants[item.variantIndex]
                : item.product.variants?.[0];
              
              // Extract numeric price explicitly; ensure it's always a number, never a string
              const variantPrice = Math.max(
                0,
                Number(variant?.price ?? item.product.price ?? 0)
              );
              
              // Extract compare price - handle both NormalizedProduct (with compareAtPrice on variant) and Product (without it)
              const variantCompareAtPrice = (variant as any)?.compareAtPrice;
              const comparePrice = typeof variantCompareAtPrice === 'number' 
                ? variantCompareAtPrice
                : (typeof item.product.comparePrice === 'number' ? item.product.comparePrice : undefined);

              return (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                className="flex gap-4 p-4 bg-card rounded-xl border border-border"
              >
                {/* Product Image */}
                <Link
                  to={`/product/${item.product.slug}`}
                  className="flex-shrink-0 w-24 h-24 md:w-32 md:h-32 rounded-lg overflow-hidden bg-secondary"
                >
                  <img
                    src={item.product.images[0]}
                    alt={item.product.name}
                    className="w-full h-full object-cover"
                  />
                </Link>

                {/* Product Info */}
                <div className="flex-1 min-w-0">
                  <Link
                    to={`/product/${item.product.slug}`}
                    className="font-medium text-foreground hover:text-accent transition-colors line-clamp-1"
                  >
                    {item.product.name}
                  </Link>
                  <p className="text-sm text-muted-foreground mb-2 line-clamp-1">
                    {item.product.shortDescription}
                  </p>
                  <p className="font-semibold text-foreground">
                    ₹{variantPrice > 0 ? variantPrice.toLocaleString('en-IN') : '0'}
                    {comparePrice && typeof comparePrice === 'number' && comparePrice > variantPrice && (
                      <span className="ml-2 text-sm text-muted-foreground line-through">
                        ₹{comparePrice.toLocaleString('en-IN')}
                      </span>
                    )}
                  </p>

                  {/* Selected variant label (explicit) */}
                  {item.product.variants && item.product.variants[item.variantIndex] && (
                    <div className="text-sm text-muted-foreground mt-2">
                      Variant: {item.product.variants[item.variantIndex].weight}
                    </div>
                  )}
                </div>

                {/* Actions */}
                <div className="flex flex-col gap-2">
                  <Button
                    size="sm"
                    onClick={() => handleAddToCart(item)}
                    className="whitespace-nowrap"
                  >
                    <ShoppingBag className="w-4 h-4 mr-1" />
                    Add
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => removeFromWishlist(item.id)}
                    className="text-muted-foreground hover:text-destructive"
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </motion.div>
            )})}
          </div>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-16"
          >
            <Heart className="w-16 h-16 text-muted-foreground/30 mx-auto mb-4" />
            <h2 className="font-serif text-2xl font-bold text-foreground mb-2">
              Your wishlist is empty
            </h2>
            <p className="text-muted-foreground mb-6">
              Save items you love to your wishlist and find them here anytime.
            </p>
            <Button asChild>
              <Link to="/">Start Shopping</Link>
            </Button>
          </motion.div>
        )}
      </section>
    </Layout>
  );
};

export default WishlistPage;
