import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import Layout from '@/components/layout/Layout';

import { useCollection, useCollectionBanners } from '@/hooks/useShopify';
import ProductCard from '@/components/product/ProductCard';
import HeroCarousel, { SlideData } from '@/components/home/HeroCarousel';

const CollectionPage = () => {
  const { slug } = useParams<{ slug: string }>();

  const { data: collection, isLoading } = useCollection(slug || '');
  const { data: collectionBanners = [] } = useCollectionBanners(slug || '');

  // Transform collectionBanners to SlideData[] for HeroCarousel
  const bannerSlides: SlideData[] = collectionBanners.map((banner, i) => ({
    id: banner.id,
    src: banner.image,
    alt: `Collection banner ${i + 1}`,
  }));


  return (
    <Layout>
      {/* Render collection banner carousel if banners exist */}
      {bannerSlides.length > 0 && <HeroCarousel slides={bannerSlides} />}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.5 }}
      >
        {isLoading ? (
          <div className="container py-16">
            <div className="animate-pulse space-y-8">
              <div className="h-8 w-48 bg-secondary rounded" />
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
                {Array.from({ length: 8 }).map((_, i) => (
                  <div key={i} className="aspect-square bg-secondary rounded-2xl" />
                ))}
              </div>
            </div>
          </div>
        ) : !collection ? (
          <div className="min-h-[60vh] flex flex-col items-center justify-center">
            <p className="text-xl text-muted-foreground mb-4">Collection not found</p>
            <Link to="/" className="text-accent hover:underline">
              ← Back to Home
            </Link>
          </div>
        ) : (
          <div className="container py-16">
            <h1 className="font-serif text-2xl md:text-3xl font-bold mb-6">
              {collection.name}
            </h1>
            <p className="text-muted-foreground mb-8 max-w-2xl">
              {collection.description}
            </p>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
              {collection.products.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </div>
        )}
      </motion.div>
    </Layout>
  );
};

export default CollectionPage;
