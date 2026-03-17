import Layout from '@/components/layout/Layout';
import { motion } from 'framer-motion';
import HeroCarousel from '@/components/home/HeroCarousel';
import CategoryCircles from '@/components/home/CategoryCircles';
import CategoryFilter from '@/components/home/CategoryFilter';
import BrandStory from '@/components/home/BrandStory';
import FeaturedProducts from '@/components/home/FeaturedProducts';
import BestsellersSection from '@/components/home/BestsellersSection';
import TrendingSection from '@/components/home/TrendingSection';
import Testimonials from '@/components/home/Testimonials';

const Index = () => {
  return (
    <Layout>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.5 }}
      >
        <HeroCarousel />
        <CategoryCircles />
        <CategoryFilter />
        <BrandStory />
        <FeaturedProducts />
        <BestsellersSection />
        <TrendingSection />
        <Testimonials />
      </motion.div>
    </Layout>
  );
};

export default Index;
