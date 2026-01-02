import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import heroBanner1 from '@/assets/hero-banner-1.jpg';
import heroBanner2 from '@/assets/hero-banner-2.jpg';
import heroBanner3 from '@/assets/hero-banner-3.jpg';

const slides = [
  {
    image: heroBanner1,
    heading: 'From The Heart Land Of India',
    subheading: 'Experience the purity of rural traditions in every product',
    cta: { text: 'Shop Now', link: '/category/ghee' },
  },
  {
    image: heroBanner2,
    heading: 'A2 Gir Cow Ghee',
    subheading: 'Crafted using ancient Vedic Bilona method',
    cta: { text: 'Explore Ghee', link: '/product/a2-gir-cow-ghee' },
  },
  {
    image: heroBanner3,
    heading: 'Raw Forest Honey',
    subheading: 'Pure, unprocessed honey from untouched forests',
    cta: { text: 'Discover Honey', link: '/category/honey' },
  },
];

const HeroCarousel = () => {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  const goTo = (index: number) => {
    setCurrent(index);
  };

  const goPrev = () => {
    setCurrent((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const goNext = () => {
    setCurrent((prev) => (prev + 1) % slides.length);
  };

  return (
    <section className="relative h-[70vh] md:h-[85vh] overflow-hidden">
      <AnimatePresence mode="wait">
        <motion.div
          key={current}
          initial={{ opacity: 0, scale: 1.1 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          transition={{ duration: 0.8, ease: 'easeInOut' }}
          className="absolute inset-0"
        >
          <img
            src={slides[current].image}
            alt={slides[current].heading}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-foreground/60 via-foreground/30 to-transparent" />
        </motion.div>
      </AnimatePresence>

      {/* Content */}
      <div className="relative container h-full flex items-center">
        <AnimatePresence mode="wait">
          <motion.div
            key={current}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="max-w-xl"
          >
            <span className="inline-block px-4 py-1.5 bg-golden/90 text-foreground text-sm font-medium rounded-full mb-6">
              AMATYA - The Amrit Essence
            </span>
            <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl font-bold text-cream mb-4 leading-tight">
              {slides[current].heading}
            </h1>
            <p className="text-lg md:text-xl text-cream/90 mb-8">
              {slides[current].subheading}
            </p>
            <Link
              to={slides[current].cta.link}
              className="inline-flex items-center gap-2 px-8 py-4 bg-cream text-foreground font-medium rounded-full hover:bg-golden transition-colors duration-300"
            >
              {slides[current].cta.text}
              <ChevronRight className="w-5 h-5" />
            </Link>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Navigation Arrows */}
      <button
        onClick={goPrev}
        className="absolute left-4 top-1/2 -translate-y-1/2 p-3 bg-background/20 backdrop-blur-sm rounded-full text-cream hover:bg-background/40 transition-colors"
        aria-label="Previous slide"
      >
        <ChevronLeft className="w-6 h-6" />
      </button>
      <button
        onClick={goNext}
        className="absolute right-4 top-1/2 -translate-y-1/2 p-3 bg-background/20 backdrop-blur-sm rounded-full text-cream hover:bg-background/40 transition-colors"
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
