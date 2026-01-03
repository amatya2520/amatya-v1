import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import Layout from '@/components/layout/Layout';
import { useCollection } from '@/hooks/useShopify';
import ProductCard from '@/components/product/ProductCard';

const CollectionPage = () => {
  const { slug } = useParams<{ slug: string }>();
  const { data: collection, isLoading } = useCollection(slug || '');

  if (isLoading) {
    return (
      <Layout>
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
      </Layout>
    );
  }

  if (!collection) {
    return (
      <Layout>
        <div className="min-h-[60vh] flex flex-col items-center justify-center">
          <p className="text-xl text-muted-foreground mb-4">Collection not found</p>
          <Link to="/" className="text-accent hover:underline">
            ← Back to Home
          </Link>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      {/* Breadcrumb */}
      <div className="container mx-auto px-4 py-4">
        <nav className="flex items-center gap-2 text-sm text-muted-foreground">
          <Link to="/" className="hover:text-foreground transition-colors">Home</Link>
          <span>/</span>
          <span className="text-foreground">{collection.name}</span>
        </nav>
      </div>

      {/* Collection Header */}
      <section className="container mx-auto px-4 pb-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center max-w-2xl mx-auto"
        >
          <h1 className="font-serif text-3xl md:text-4xl font-bold text-foreground mb-4">
            {collection.name}
          </h1>
          {collection.description && (
            <p className="text-muted-foreground">
              {collection.description}
            </p>
          )}
          <p className="text-sm text-muted-foreground mt-2">
            {collection.productCount} {collection.productCount === 1 ? 'Product' : 'Products'}
          </p>
        </motion.div>
      </section>

      {/* Products Grid */}
      <section className="container mx-auto px-4 pb-16">
        {collection.products.length > 0 ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
            {collection.products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <p className="text-muted-foreground italic text-lg">
              Bringing the Amrit Essence to you soon—check back shortly.
            </p>
          </div>
        )}
      </section>
    </Layout>
  );
};

export default CollectionPage;
