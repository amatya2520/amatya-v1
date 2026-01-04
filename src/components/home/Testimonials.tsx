import { useRef, useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Star, Quote, ChevronLeft, ChevronRight, Heart, ShoppingBag } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useReviews } from '@/hooks/useShopify';
import { useCart } from '@/context/CartContext';

const Testimonials = () => {
  const { data: testimonials = [] } = useReviews();
  const { addToCart, setIsOpen } = useCart();
  const scrollRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);

  const checkScroll = () => {
    const container = scrollRef.current;
    if (container) {
      setCanScrollLeft(container.scrollLeft > 0);
      setCanScrollRight(container.scrollLeft < container.scrollWidth - container.clientWidth - 5);
      
      // Calculate active index for mobile dots
      if (testimonials.length > 0) {
        const cardWidth = container.scrollWidth / testimonials.length;
        const newIndex = Math.round(container.scrollLeft / cardWidth);
        setActiveIndex(Math.min(newIndex, testimonials.length - 1));
      }
    }
  };

  useEffect(() => {
    checkScroll();
    const container = scrollRef.current;
    if (container) {
      container.addEventListener('scroll', checkScroll);
      window.addEventListener('resize', checkScroll);
    }
    return () => {
      if (container) container.removeEventListener('scroll', checkScroll);
      window.removeEventListener('resize', checkScroll);
    };
  }, [testimonials]);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const scrollAmount = 380;
      scrollRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth',
      });
    }
  };

  const handleAddToCart = (product: typeof testimonials[0]['product']) => {
    if (product) {
      // Create a minimal product for cart
      addToCart(product as any, 0, 1);
      setIsOpen(true);
    }
  };

  if (testimonials.length === 0) {
    return null;
  }

  return (
    <section className="py-16 md:py-24 bg-primary text-primary-foreground w-full overflow-x-hidden">
      <div className="container px-4 max-w-full">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="font-serif text-3xl md:text-4xl font-bold mb-3">
            What Our Customers Say
          </h2>
          <p className="opacity-80 max-w-md mx-auto">
            Real stories from our valued customers who trust Amatya
          </p>
        </motion.div>

        <div className="relative">
          {/* Left Arrow - Desktop Only */}
          {canScrollLeft && (
            <button
              onClick={() => scroll('left')}
              className="hidden md:flex absolute left-0 top-1/2 -translate-y-1/2 z-10 w-10 h-10 items-center justify-center bg-primary-foreground/20 backdrop-blur-sm rounded-full hover:bg-primary-foreground/30 transition-colors"
              aria-label="Scroll left"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
          )}

          <div
            ref={scrollRef}
            className="flex gap-4 md:gap-6 overflow-x-auto pb-4 scrollbar-hide px-1 snap-x snap-mandatory md:snap-none"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={testimonial.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="relative flex-shrink-0 w-[85vw] max-w-[320px] md:w-[360px] md:max-w-none p-4 md:p-6 bg-primary-foreground/10 backdrop-blur-sm rounded-2xl snap-center md:snap-none"
              >
                <Quote className="absolute top-4 right-4 w-8 h-8 opacity-20" />
                
                {/* Stars */}
                <div className="flex gap-1 mb-4">
                  {Array.from({ length: testimonial.rating }).map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-golden text-golden" />
                  ))}
                </div>

                {/* Review Image */}
                {testimonial.image && (
                  <div className="mb-4 rounded-lg overflow-hidden aspect-video">
                    <img
                      src={testimonial.image}
                      alt="Review"
                      className="w-full h-full object-cover"
                    />
                  </div>
                )}

                {/* Text */}
                <p className="text-sm leading-relaxed opacity-90 mb-6 line-clamp-4">
                  "{testimonial.text}"
                </p>

                {/* Author */}
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <p className="font-medium">{testimonial.name}</p>
                    {testimonial.location && (
                      <p className="text-xs opacity-70">{testimonial.location}</p>
                    )}
                  </div>
                </div>

                {/* Attached Product Card */}
                {testimonial.product && (
                  <div className="mt-4 pt-4 border-t border-primary-foreground/20">
                    <div className="flex gap-3">
                      <Link
                        to={`/product/${testimonial.product.slug}`}
                        className="flex-shrink-0 w-16 h-16 rounded-lg overflow-hidden bg-primary-foreground/10"
                      >
                        <img
                          src={testimonial.product.images[0]}
                          alt={testimonial.product.name}
                          className="w-full h-full object-cover"
                        />
                      </Link>
                      <div className="flex-1 min-w-0">
                        <Link
                          to={`/product/${testimonial.product.slug}`}
                          className="block font-medium text-sm line-clamp-1 hover:opacity-80 transition-opacity"
                        >
                          {testimonial.product.name}
                        </Link>
                        <p className="text-sm font-semibold">₹{testimonial.product.price}</p>
                        <div className="flex gap-2 mt-1">
                          <button
                            onClick={() => handleAddToCart(testimonial.product)}
                            className="flex items-center gap-1 px-2 py-1 text-xs bg-primary-foreground text-primary rounded-full hover:bg-golden transition-colors"
                          >
                            <ShoppingBag className="w-3 h-3" />
                            Add
                          </button>
                          <Link
                            to={`/product/${testimonial.product.slug}`}
                            className="flex items-center gap-1 px-2 py-1 text-xs bg-primary-foreground/20 rounded-full hover:bg-primary-foreground/30 transition-colors"
                          >
                            View
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </motion.div>
            ))}
          </div>

          {/* Right Arrow - Desktop Only */}
          {canScrollRight && (
            <button
              onClick={() => scroll('right')}
              className="hidden md:flex absolute right-0 top-1/2 -translate-y-1/2 z-10 w-10 h-10 items-center justify-center bg-primary-foreground/20 backdrop-blur-sm rounded-full hover:bg-primary-foreground/30 transition-colors"
              aria-label="Scroll right"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          )}

          {/* Pagination Dots - Mobile Only */}
          <div className="flex md:hidden justify-center gap-2 mt-4">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => {
                  if (scrollRef.current) {
                    const cardWidth = scrollRef.current.scrollWidth / testimonials.length;
                    scrollRef.current.scrollTo({
                      left: index * cardWidth,
                      behavior: 'smooth'
                    });
                  }
                }}
                className={`h-2.5 rounded-full transition-all duration-300 ${
                  index === activeIndex
                    ? 'bg-primary-foreground w-5' 
                    : 'bg-primary-foreground/30 w-2.5'
                }`}
                aria-label={`Go to review ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
