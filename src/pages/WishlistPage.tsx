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

  const handleAddToCart = (product: typeof items[0]) => {
    addToCart(product as any, 0, 1);
    setIsOpen(true);
  };

  const handleAddAllToCart = () => {
    items.forEach((item) => {
      addToCart(item as any, 0, 1);
    });
    setIsOpen(true);
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
            {items.map((item, index) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                className="flex gap-4 p-4 bg-card rounded-xl border border-border"
              >
                {/* Product Image */}
                <Link
                  to={`/product/${item.slug}`}
                  className="flex-shrink-0 w-24 h-24 md:w-32 md:h-32 rounded-lg overflow-hidden bg-secondary"
                >
                  <img
                    src={item.images[0]}
                    alt={item.name}
                    className="w-full h-full object-cover"
                  />
                </Link>

                {/* Product Info */}
                <div className="flex-1 min-w-0">
                  <Link
                    to={`/product/${item.slug}`}
                    className="font-medium text-foreground hover:text-accent transition-colors line-clamp-1"
                  >
                    {item.name}
                  </Link>
                  <p className="text-sm text-muted-foreground mb-2 line-clamp-1">
                    {item.shortDescription}
                  </p>
                  <p className="font-semibold text-foreground">
                    ₹{item.price}
                    {item.comparePrice && item.comparePrice > item.price && (
                      <span className="ml-2 text-sm text-muted-foreground line-through">
                        ₹{item.comparePrice}
                      </span>
                    )}
                  </p>

                  {/* Variants */}
                  {item.variants.length > 1 && (
                    <div className="flex flex-wrap gap-1 mt-2">
                      {item.variants.slice(0, 3).map((variant, i) => (
                        <span
                          key={i}
                          className="px-2 py-0.5 text-xs bg-secondary rounded-full"
                        >
                          {variant.weight}
                        </span>
                      ))}
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
            ))}
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
