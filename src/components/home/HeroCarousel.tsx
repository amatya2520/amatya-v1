import { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence, PanInfo } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useHeroBanners } from '@/hooks/useShopify';
import heroBanner1 from '@/assets/hero-banner-1.jpg';
import heroBanner2 from '@/assets/hero-banner-2.jpg';
import heroBanner3 from '@/assets/hero-banner-3.jpg';

// Image map for fallback local images
const imageMap: Record<string, string> = {
  '/hero-banner-1.jpg': heroBanner1,
  '/hero-banner-2.jpg': heroBanner2,
  '/hero-banner-3.jpg': heroBanner3,
};

const HeroCarousel = () => {
  const { data: slides = [] } = useHeroBanners();
  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState(0);

  useEffect(() => {
    if (slides.length === 0) return;
    const timer = setInterval(() => {
      setDirection(1);
      setCurrent((prev) => (prev + 1) % slides.length);
    }, 6000);
    return () => clearInterval(timer);
  }, [slides.length]);

  const goTo = useCallback((index: number) => {
    setDirection(index > current ? 1 : -1);
    setCurrent(index);
  }, [current]);

  const goPrev = useCallback(() => {
    if (slides.length === 0) return;
    setDirection(-1);
    setCurrent((prev) => (prev - 1 + slides.length) % slides.length);
  }, [slides.length]);

  const goNext = useCallback(() => {
    if (slides.length === 0) return;
    setDirection(1);
    setCurrent((prev) => (prev + 1) % slides.length);
  }, [slides.length]);

  // Handle swipe on mobile
  const handleDragEnd = (_: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
    const threshold = 50;
    if (info.offset.x > threshold) {
      goPrev();
    } else if (info.offset.x < -threshold) {
      goNext();
    }
  };

  if (slides.length === 0) {
    return <div className="h-[70vh] md:h-[85vh] bg-secondary animate-pulse" />;
  }

  const currentSlide = slides[current];
  // Resolve image - check if it's a local path or Shopify URL
  const resolvedImage = imageMap[currentSlide.image] || currentSlide.image;

  return (
    <section className="relative h-[70vh] md:h-[85vh] overflow-hidden">
      <AnimatePresence mode="wait" custom={direction}>
        <motion.div
          key={current}
          custom={direction}
          initial={{ opacity: 0, scale: 1.1 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          transition={{ duration: 0.8, ease: 'easeInOut' }}
          className="absolute inset-0"
          drag="x"
          dragConstraints={{ left: 0, right: 0 }}
          dragElastic={0.1}
          onDragEnd={handleDragEnd}
        >
          <img
            src={resolvedImage}
            alt={currentSlide.heading}
            className="w-full h-full object-cover pointer-events-none"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-foreground/60 via-foreground/30 to-transparent" />
        </motion.div>
      </AnimatePresence>

      {/* Content */}
      <div className="relative container h-full flex items-center px-4 md:px-6">
        <AnimatePresence mode="wait">
          <motion.div
            key={current}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="max-w-xl pr-12 md:pr-0"
          >
            {currentSlide.badge && (
              <span className="inline-block px-4 py-1.5 bg-golden/90 text-foreground text-sm font-medium rounded-full mb-6">
                {currentSlide.badge}
              </span>
            )}
            <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-cream mb-4 leading-tight">
              {currentSlide.heading}
            </h1>
            <p className="text-base sm:text-lg md:text-xl text-cream/90 mb-8">
              {currentSlide.subheading}
            </p>
            <Link
              to={currentSlide.cta.link}
              className="inline-flex items-center gap-2 px-6 sm:px-8 py-3 sm:py-4 bg-cream text-foreground font-medium rounded-full hover:bg-golden transition-colors duration-300"
            >
              {currentSlide.cta.text}
              <ChevronRight className="w-5 h-5" />
            </Link>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Navigation Arrows - Desktop Only */}
      <button
        onClick={goPrev}
        className="hidden md:flex absolute left-4 top-1/2 -translate-y-1/2 p-3 bg-background/20 backdrop-blur-sm rounded-full text-cream hover:bg-background/40 transition-colors"
        aria-label="Previous slide"
      >
        <ChevronLeft className="w-6 h-6" />
      </button>
      <button
        onClick={goNext}
        className="hidden md:flex absolute right-4 top-1/2 -translate-y-1/2 p-3 bg-background/20 backdrop-blur-sm rounded-full text-cream hover:bg-background/40 transition-colors"
        aria-label="Next slide"
      >
        <ChevronRight className="w-6 h-6" />
      </button>

      {/* Dots */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-3">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => goTo(index)}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              index === current
                ? 'bg-golden w-8'
                : 'bg-cream/50 hover:bg-cream/80'
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </section>
  );
};

export default HeroCarousel;
