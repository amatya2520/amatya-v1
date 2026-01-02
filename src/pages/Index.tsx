import Layout from '@/components/layout/Layout';
import HeroCarousel from '@/components/home/HeroCarousel';
import CategoryCircles from '@/components/home/CategoryCircles';
import CategoryFilter from '@/components/home/CategoryFilter';
import BrandStory from '@/components/home/BrandStory';
import FeaturedProducts from '@/components/home/FeaturedProducts';
import Testimonials from '@/components/home/Testimonials';

const Index = () => {
  return (
    <Layout>
      <HeroCarousel />
      <CategoryCircles />
      <CategoryFilter />
      <BrandStory />
      <FeaturedProducts />
      <Testimonials />
    </Layout>
  );
};

export default Index;
