import { Helmet } from 'react-helmet-async';
import { Leaf, Droplets, Sun, Shield, CheckCircle, Award } from 'lucide-react';
import Footer from '@/components/layout/Footer';

export default function Quality() {
  return (
    <>
      <Helmet>
        <title>Quality & Process - AMATYA | Bilona Method & Traditional Extraction</title>
        <meta name="description" content="Learn about AMATYA's traditional Bilona method for ghee preparation and raw honey extraction processes. Discover how we maintain purity and quality in every product." />
      </Helmet>

      {/* Hero */}
      <section className="py-3 md:py-10 bg-cream">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-3xl mx-auto text-center">
            <span className="text-sm font-medium text-accent tracking-wider uppercase">Quality & Process</span>
            <h1 className="font-heading text-4xl md:text-5xl font-bold text-foreground mt-4">
              Traditional Methods, Authentic Quality
            </h1>
            <p className="text-muted-foreground mt-6 text-lg">
              Discover the ancient processes and meticulous care that goes into every AMATYA product.
            </p>
          </div>
        </div>
      </section>

      {/* Bilona Method */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-5xl mx-auto">
            <div className="grid md:grid-cols-2 gap-12 items-center mb-16">
              <div>
                <span className="text-sm font-medium text-accent tracking-wider uppercase">The Bilona Method</span>
                <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground mt-2 mb-6">
                  Ancient Vedic Ghee Preparation
                </h2>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  The Bilona method is an ancient Vedic process that has been used for thousands of years to produce the purest form of ghee. This traditional method preserves the natural goodness, aroma, and nutritional benefits that modern processes often destroy.
                </p>
                <p className="text-muted-foreground leading-relaxed">
                  Fresh A2 milk from indigenous Gir cows is cultured into curd, hand-churned slowly to extract makkhan (butter), and then simmered on a low flame to produce golden, aromatic ghee—free from preservatives, chemicals, and additives.
                </p>
              </div>
              <div className="bg-card rounded-3xl p-8 shadow-lg">
                <Award className="h-12 w-12 text-primary mb-6" />
                <h3 className="font-heading text-xl font-semibold text-foreground mb-4">The Process</h3>
                <ol className="space-y-4">
                  {[
                    { step: '1', title: 'Fresh A2 Milk', desc: 'Collected from indigenous Gir cows' },
                    { step: '2', title: 'Curd Culture', desc: 'Milk is cultured into natural curd' },
                    { step: '3', title: 'Hand Churning', desc: 'Slow churning to extract makkhan' },
                    { step: '4', title: 'Low Flame Simmer', desc: 'Butter simmered to create ghee' },
                    { step: '5', title: 'Pure Ghee', desc: 'Golden, aromatic, nutrient-rich' },
                  ].map((item) => (
                    <li key={item.step} className="flex gap-4">
                      <span className="w-8 h-8 bg-primary/10 text-primary rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0">
                        {item.step}
                      </span>
                      <div>
                        <h4 className="text-foreground font-bold ">{item.title}</h4>
                        <p className="text-sm text-muted-foreground">{item.desc}</p>
                      </div>
                    </li>
                  ))}
                </ol>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Honey Extraction */}
      <section className="py-20 bg-gradient-warm">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-5xl mx-auto">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div className="order-2 md:order-1 bg-card rounded-3xl p-8 shadow-lg">
                <Droplets className="h-12 w-12 text-primary mb-6" />
                <h3 className="font-heading text-xl font-semibold text-foreground mb-4">Raw Honey Qualities</h3>
                <ul className="space-y-3">
                  {[
                    'Unheated - preserves natural enzymes',
                    'Unprocessed - retains all nutrients',
                    'Unfiltered - keeps beneficial pollens',
                    'Wild harvested - sustainable methods',
                    'Single-origin varieties - unique benefits',
                  ].map((item, idx) => (
                    <li key={idx} className="flex items-center gap-3 text-muted-foreground">
                      <CheckCircle className="h-5 w-5 text-accent flex-shrink-0" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="order-1 md:order-2">
                <span className="text-sm font-medium text-accent tracking-wider uppercase">Raw Honey Extraction</span>
                <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground mt-2 mb-6">
                  Natural Harvesting Methods
                </h2>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  Our raw honey is collected from deep, untouched forest regions and fields where bees feed on diverse wild flowers, medicinal herbs, and natural flora. This gives each honey variety its unique flavor, aroma, and nutritional profile.
                </p>
                <p className="text-muted-foreground leading-relaxed">
                  Harvested using sustainable methods, our honey is unheated, unprocessed, and unfiltered, preserving all natural enzymes, pollens, antioxidants, and wellness-boosting nutrients.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Quality Standards */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center mb-12">
            <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground">
              Quality Assurance Policy
            </h2>
            <p className="text-muted-foreground mt-4 max-w-2xl mx-auto">
              At Amatya, we ensure every product is 100% pure, natural, and free from chemicals, additives, and adulteration.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {[
              {
                icon: Shield,
                title: 'Quality Checks',
                desc: 'All batches undergo strict quality, hygiene, and safety checks before packing.',
              },
              {
                icon: Leaf,
                title: 'Traditional Methods',
                desc: 'We follow traditional, authentic methods like Bilona ghee preparation and raw honey extraction.',
              },
              {
                icon: Sun,
                title: 'Ethical Sourcing',
                desc: 'Raw materials are sourced ethically from trusted farmers, forest regions, and sustainable suppliers.',
              },
              {
                icon: Award,
                title: 'FSSAI Compliant',
                desc: 'All products are packed in food-grade, FSSAI-compliant, hygienic packaging.',
              },
              {
                icon: CheckCircle,
                title: 'Transparency',
                desc: 'We maintain total transparency in ingredients, sourcing, processes, and pricing.',
              },
              {
                icon: Droplets,
                title: 'Small Batches',
                desc: 'Every batch is made in small quantities to maintain authenticity and quality.',
              },
            ].map((item) => (
              <div key={item.title} className="bg-card rounded-2xl p-6 shadow-soft">
                <item.icon className="h-10 w-10 text-primary mb-4" />
                <h3 className="font-heading text-lg font-semibold text-foreground mb-2">{item.title}</h3>
                <p className="text-muted-foreground text-sm">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>

      </section>
      <Footer/>
    </>
  );
}