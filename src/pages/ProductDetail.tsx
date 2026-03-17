import { useState, useMemo } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, ShoppingBag, Minus, Plus, Check, Truck, Shield, Leaf } from 'lucide-react';
import Layout from '@/components/layout/Layout';
import { useProduct, useCollections, useProductRecommendations } from '@/hooks/useShopify';
import type { NormalizedProduct } from '@/lib/shopify';
import { useCart, type CartProduct } from '@/context/CartContext';
import { useWishlist } from '@/context/WishlistContext';
import ProductCard from '@/components/product/ProductCard';
import { Button } from '@/components/ui/button';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';

const ProductDetail = () => {
  const { slug } = useParams<{ slug: string }>();
  const { data: product, isLoading } = useProduct(slug || '');
  const { data: collections = [] } = useCollections();
  const { data: recommendations = [], isLoading: recommendationsLoading } = useProductRecommendations(product?.id);
  const { addToCart, setIsOpen } = useCart();
  const { isInWishlist, toggleWishlist } = useWishlist();
  const [selectedVariant, setSelectedVariant] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [activeImage, setActiveImage] = useState(0);
  const [adding, setAdding] = useState(false);
  const isShopifyProduct = Boolean(product?.id?.startsWith('gid://shopify/Product/'));

  const shopifyRecommendations = useMemo(() => {
    if (!product || !isShopifyProduct) return [] as typeof recommendations;

    if (recommendations && recommendations.length > 0) {
      return recommendations.filter((p) => p.id !== product.id).slice(0, 4);
    }

    const collection = collections.find((c) => c.slug === product.categorySlug);
    if (!collection) return [];

    return collection.products
      .filter((p) => p.id !== product.id)
      .slice(0, 4);
  }, [collections, isShopifyProduct, product, recommendations]);

  const fallbackRecommendations = useMemo<NormalizedProduct[]>(() => {
    if (!product || isShopifyProduct) return [];

    const collection = collections.find(c => c.slug === product.categorySlug);
    const related = collection
      ? collection.products.filter((p) => p.id !== product.id).slice(0, 4)
      : [];

    if (related.length >= 4) {
      return related;
    }

    const allProducts = collections.flatMap(c => c.products);
    const others = allProducts.filter((p) => p.id !== product.id && !related.find((r) => r.id === p.id));

    return [...related, ...others].slice(0, 4);
  }, [collections, isShopifyProduct, product]);

  const youMayLike = isShopifyProduct ? shopifyRecommendations : fallbackRecommendations;

  if (isLoading) {
    return (
      <Layout>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} transition={{ duration: 0.5 }}>
          <div className="container py-16">
            <div className="grid lg:grid-cols-2 gap-8 lg:gap-16">
              <div className="aspect-square bg-secondary rounded-2xl animate-pulse" />
              <div className="space-y-4">
                <div className="h-8 w-3/4 bg-secondary rounded animate-pulse" />
                <div className="h-6 w-1/2 bg-secondary rounded animate-pulse" />
                <div className="h-10 w-1/3 bg-secondary rounded animate-pulse" />
              </div>
            </div>
          </div>
        </motion.div>
      </Layout>
    );
  }

  if (!product) {
    return (
      <Layout>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} transition={{ duration: 0.5 }}>
          <div className="min-h-[60vh] flex flex-col items-center justify-center">
            <p className="text-xl text-muted-foreground mb-4">Product not found</p>
            <Link to="/" className="text-accent hover:underline">
              ← Back to Home
            </Link>
          </div>
        </motion.div>
      </Layout>
    );
  }

  const selectedVariantData = product.variants[selectedVariant] ?? product.variants[0];
  const currentPrice = Number(selectedVariantData?.price ?? product.price ?? 0);
  const comparePrice = selectedVariantData?.compareAtPrice ?? product.comparePrice;
  const comparePriceNum = typeof comparePrice === 'number' ? comparePrice :
                          (typeof comparePrice === 'string' ? Number(comparePrice) : undefined);
  const showDiscount = typeof comparePriceNum === 'number' && comparePriceNum > currentPrice;
  const discountPercent = showDiscount ? Math.round((1 - currentPrice / comparePriceNum!) * 100) : null;
  const inWishlist = isInWishlist(product.id, selectedVariant);
  const typedProduct: CartProduct = product;

  const handleAddToCart = async () => {
    if (!typedProduct) return;
    setAdding(true);
    try {
      await Promise.resolve(addToCart(typedProduct, selectedVariant, quantity));
      setIsOpen(true);
    } catch (err) {
      // Error handled in context, but ensure no white screen
    } finally {
      setAdding(false);
    }
  };

  return (
    <Layout>
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} transition={{ duration: 0.5 }}>
        {/* Breadcrumb */}
        <div className="container mx-auto px-4 py-4">
          <nav className="flex items-center gap-2 text-sm text-muted-foreground">
            <Link to="/" className="hover:text-foreground transition-colors">Home</Link>
            <span>/</span>
            <Link to={`/category/${product.categorySlug}`} className="hover:text-foreground transition-colors">
              {product.category}
            </Link>
            <span>/</span>
            <span className="text-foreground line-clamp-1">{product.name}</span>
          </nav>
        </div>

        {/* Product Section */}
        <section className="container mx-auto px-4 pb-16">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-16">
            {/* Image Gallery */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="space-y-4"
            >
              {/* Main Image */}
              <div className="relative aspect-square rounded-2xl overflow-hidden bg-secondary/30">
                <AnimatePresence mode="wait">
                  <motion.img
                    key={activeImage}
                    src={product.images[activeImage]}
                    alt={product.name}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="w-full h-full object-cover"
                  />
                </AnimatePresence>

                {/* Badges */}
                {product.badges.length > 0 && (
                  <div className="absolute top-4 left-4 flex flex-wrap gap-2">
                    {product.badges.slice(0, 2).map((badge) => (
                      <span
                        key={badge}
                        className={`px-3 py-1.5 text-sm font-medium rounded-full ${
                          badge.toLowerCase().includes('best') || badge.toLowerCase().includes('seller')
                            ? 'bg-golden text-foreground'
                            : badge.toLowerCase().includes('new')
                            ? 'bg-primary text-primary-foreground'
                            : badge.toLowerCase().includes('trending')
                            ? 'bg-accent text-accent-foreground'
                            : 'bg-secondary text-foreground'
                        }`}
                      >
                        {badge.toLowerCase() === 'best-seller' ? 'Best Seller' : 
                         badge.toLowerCase() === 'new-launch' ? 'New' : 
                         badge.toLowerCase() === 'trending' ? 'Trending' : badge}
                      </span>
                    ))}
                  </div>
                )}
              </div>

              {/* Thumbnail Gallery */}
              {product.images.length > 1 && (
                <div className="flex gap-3">
                  {product.images.map((img, idx) => (
                    <button
                      key={idx}
                      onClick={() => setActiveImage(idx)}
                      className={`w-16 h-16 rounded-xl overflow-hidden border-2 ${activeImage === idx ? 'border-accent' : 'border-transparent'}`}
                    >
                      <img src={img} alt={`Thumbnail ${idx + 1}`} className="w-full h-full object-cover" />
                    </button>
                  ))}
                </div>
              )}
            </motion.div>

            {/* Product Info */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 }}
              className="space-y-6"
            >
              <div>
                <p className="text-sm text-accent font-medium uppercase tracking-wider mb-2">
                  {product.category}
                </p>
                <h1 className="font-serif text-3xl md:text-4xl font-bold text-foreground mb-2">
                  {product.name}
                </h1>
                <p className="text-lg text-muted-foreground">{product.shortDescription}</p>
              </div>

              {/* Price */}
              <div className="flex items-baseline gap-3">
                <span className="font-sans text-4xl font-bold text-foreground">
                  ₹{currentPrice.toLocaleString('en-IN')}
                </span>
                {showDiscount && comparePriceNum && (
                  <>
                    <span className="text-xl text-muted-foreground line-through">
                      ₹{comparePriceNum.toLocaleString('en-IN')}
                    </span>
                    {discountPercent && (
                      <span className="px-2 py-1 bg-accent/20 text-accent text-sm font-medium rounded">
                        {discountPercent}% OFF
                      </span>
                    )}
                  </>
                )}
              </div>

              {/* Variant Selector */}
              {product.variants.length > 1 && (
                <div className="space-y-3">
                  <label className="text-sm font-medium text-foreground">
                    Size: <span className="text-muted-foreground">{product.variants[selectedVariant].weight}</span>
                  </label>
                  <div className="flex flex-wrap gap-3">
                    {product.variants.map((variant, idx) => (
                      <button
                        key={variant.id || idx}
                        onClick={() => setSelectedVariant(idx)}
                        className={`relative px-6 py-3 rounded-xl font-medium transition-all ${
                          selectedVariant === idx
                            ? 'bg-primary text-primary-foreground ring-2 ring-primary ring-offset-2 ring-offset-background'
                            : 'bg-secondary text-foreground hover:bg-secondary/80'
                        }`}
                      >
                        {variant.weight}
                        <span className="block text-sm opacity-80">₹{Number(variant.price).toLocaleString('en-IN')}
                        </span>
                        {variant.compareAtPrice && Number(variant.compareAtPrice) > Number(variant.price) && (
                          <span className="block text-xs text-muted-foreground line-through">
                            ₹{Number(variant.compareAtPrice).toLocaleString('en-IN')}
                          </span>
                        )}
                        {selectedVariant === idx && (
                          <motion.div
                            layoutId="variant-check"
                            className="absolute -top-1 -right-1 w-5 h-5 bg-accent text-accent-foreground rounded-full flex items-center justify-center"
                          >
                            <Check className="w-3 h-3" />
                          </motion.div>
                        )}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Quantity & Add to Cart */}
              <div className="flex flex-col sm:flex-row gap-4">
                <div className="flex items-center justify-between bg-secondary rounded-xl p-1">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    disabled={quantity <= 1}
                    className="w-12 h-12 flex items-center justify-center rounded-lg hover:bg-background transition-colors disabled:opacity-50"
                  >
                    <Minus className="w-5 h-5" />
                  </button>
                  <span className="w-12 text-center text-lg font-medium">{quantity}</span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="w-12 h-12 flex items-center justify-center rounded-lg hover:bg-background transition-colors"
                  >
                    <Plus className="w-5 h-5" />
                  </button>
                </div>

                <Button
                  onClick={handleAddToCart}
                  size="lg"
                  className="flex-1 py-6 text-lg font-semibold gap-3"
                  disabled={adding}
                >
                  {adding ? (
                    <>
                      <svg className="animate-spin h-5 w-5 mr-2 inline-block" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
                      </svg>
                      Adding...
                    </>
                  ) : (
                    <>
                      <ShoppingBag className="w-5 h-5" />
                      Add to Cart — ₹{(currentPrice * quantity).toLocaleString('en-IN')}
                    </>
                  )}
                </Button>

                <Button
                  variant="outline"
                  size="lg"
                  onClick={() => toggleWishlist(typedProduct, selectedVariant)}
                  className={`py-6 px-6 ${inWishlist ? 'text-accent border-accent' : ''}`}
                >
                  <Heart className={`w-5 h-5 ${inWishlist ? 'fill-current' : ''}`} />
                </Button>
              </div>

              {/* Trust Badges */}
              <div className="grid grid-cols-3 gap-4 py-6 border-y border-border">
                <div className="flex flex-col items-center text-center gap-2">
                  <Truck className="w-6 h-6 text-primary" />
                  <span className="text-sm font-medium">Free Delivery</span>
                  <span className="text-xs text-muted-foreground">Above ₹2500</span>
                </div>
                <div className="flex flex-col items-center text-center gap-2">
                  <Shield className="w-6 h-6 text-primary" />
                  <span className="text-sm font-medium">100% Authentic</span>
                  <span className="text-xs text-muted-foreground">Guaranteed Pure</span>
                </div>
                <div className="flex flex-col items-center text-center gap-2">
                  <Leaf className="w-6 h-6 text-primary" />
                  <span className="text-sm font-medium">Chemical-Free</span>
                  <span className="text-xs text-muted-foreground">No Additives</span>
                </div>
              </div>

              {/* Accordion Details */}
              <Accordion type="single" collapsible className="w-full" defaultValue="description">
                <AccordionItem value="description">
                  <AccordionTrigger className="text-base font-medium">Description</AccordionTrigger>
                  <AccordionContent>
                    <div className="prose prose-sm text-muted-foreground whitespace-pre-line">
                      {product.description}
                    </div>
                  </AccordionContent>
                </AccordionItem>

                {product.benefits.length > 0 && (
                  <AccordionItem value="benefits">
                    <AccordionTrigger className="text-base font-medium">Benefits</AccordionTrigger>
                    <AccordionContent>
                      <ul className="space-y-2">
                        {product.benefits.map((benefit, idx) => (
                          <li key={idx} className="flex items-center gap-2 text-muted-foreground">
                            <Check className="w-4 h-4 text-primary flex-shrink-0" />
                            {benefit}
                          </li>
                        ))}
                      </ul>
                    </AccordionContent>
                  </AccordionItem>
                )}

                {product.sections.map((section) => (
                  <AccordionItem key={section.id} value={`section-${section.id}`}>
                    <AccordionTrigger className="text-base font-medium">
                      {section.title}
                    </AccordionTrigger>
                    <AccordionContent>
                      {section.type === 'list' && section.items ? (
                        <ul className="space-y-2">
                          {section.items.map((item, index) => (
                            <li key={index} className="flex items-center gap-2 text-muted-foreground">
                              <Check className="w-4 h-4 text-primary flex-shrink-0" />
                              {item}
                            </li>
                          ))}
                        </ul>
                      ) : (
                        <div className="prose prose-sm text-muted-foreground whitespace-pre-line">
                          {section.body}
                        </div>
                      )}
                    </AccordionContent>
                  </AccordionItem>
                ))}

                {product.ingredients && (
                  <AccordionItem value="ingredients">
                    <AccordionTrigger className="text-base font-medium">Ingredients</AccordionTrigger>
                    <AccordionContent>
                      <p className="text-muted-foreground">{product.ingredients}</p>
                    </AccordionContent>
                  </AccordionItem>
                )}

                <AccordionItem value="shipping">
                  <AccordionTrigger className="text-base font-medium">Shipping & Returns</AccordionTrigger>
                  <AccordionContent>
                    <div className="space-y-3 text-muted-foreground">
                      <p>• Free delivery on orders above ₹2500</p>
                      <p>• Standard delivery: 5-7 business days</p>
                      <p>• Express delivery available in select cities</p>
                      <p>• 7-day return policy for unopened products</p>
                    </div>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </motion.div>
          </div>
        </section>

        {/* Related Products */}
        {isShopifyProduct && recommendationsLoading && (
          <section className="bg-secondary/20 py-16">
            <div className="container mx-auto px-4">
              <div className="text-center text-muted-foreground">Loading recommendations...</div>
            </div>
          </section>
        )}

        {!recommendationsLoading && youMayLike.length > 0 ? (
          <section className="bg-secondary/20 py-16">
            <div className="container mx-auto px-4">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="text-center mb-10"
              >
                <h2 className="font-serif text-3xl font-bold text-foreground mb-3">
                  You May Also Like
                </h2>
                <p className="text-muted-foreground">
                  More products from our collection
                </p>
              </motion.div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
                {youMayLike.map((relatedProduct) => (
                  <ProductCard key={relatedProduct.id} product={relatedProduct} />
                ))}
              </div>
            </div>
          </section>
        ) : !recommendationsLoading ? (
          <section className="bg-secondary/20 py-16">
            <div className="container mx-auto px-4 text-center text-muted-foreground">
              {isShopifyProduct
                ? 'No related products available at the moment.'
                : 'Explore our collections for more products you may like.'}
            </div>
          </section>
        ) : null}
      </motion.div>
    </Layout>
  );
};

export default ProductDetail;
