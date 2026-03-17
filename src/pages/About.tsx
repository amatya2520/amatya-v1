import { Helmet } from 'react-helmet-async';
import { Leaf, Heart, Award, Users } from 'lucide-react';
import Footer from '@/components/layout/Footer';

export default function About() {
  return (
    <>
      <Helmet>
        <title>About AMATYA - The Amrit Essence | Our Story</title>
        <meta name="description" content="Learn about AMATYA's journey - bringing the purity of rural traditions to your modern kitchen. Our commitment to natural, chemical-free products from Madhya Pradesh." />
      </Helmet>

      {/* Hero */}
      <section className="py-10 md:py-22">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-4xl mx-auto text-center">
            <span className="text-sm font-medium text-accent tracking-wider uppercase">About Us</span>
            <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mt-4">
              The Amrit Essence
            </h1>
            <p className="text-xl text-muted-foreground mt-6">
              In the heart of rural India, where the rhythm of life still beats to the hum of nature and the wisdom of age-old traditions, a quiet revolution was born — Amatya.
            </p>
          </div>
        </div>
      </section>

      {/* Story */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-4xl mx-auto space-y-12">
            <div className="prose prose-lg max-w-none">
              <h2 className="font-heading text-3xl font-bold text-foreground">The Journey Began</h2>
              <p className="text-muted-foreground leading-relaxed">
                The journey began with a simple yet powerful vision: <strong>To bring the purity of the village to every urban kitchen.</strong>
              </p>
              <p className="text-muted-foreground leading-relaxed">
                For generations, our families nurtured cows with care. These were not just products — they were symbols of a lifestyle rooted in wellness, honesty, and sustainability.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                As cities grow and markets changed, we saw the soul of food being lost to mass production. That's when we decided to bridge the gap — fusing the authenticity of farm life with the needs of the modern world. Thus, Amatya was born.
              </p>
            </div>

            <div className="bg-card rounded-3xl p-8 md:p-12 shadow-card">
              <h2 className="font-heading text-2xl md:text-3xl font-bold text-foreground mb-6">
                Meaning of "The Amrit Essence"
              </h2>
              <p className="text-muted-foreground leading-relaxed text-lg">
                "The Amrit Essence embodies our dedication to delivering nature's finest purity with unmatched authenticity. Inspired by the sacred concept of 'Amrit'— the eternal symbol of nourishment and wellness—our brand captures this timeless essence in every product we craft. With an unwavering focus on quality, transparency, and traditional values, we ensure that every drop reflects the true essence of Amrit, offering a refined experience rooted in nature's untouched goodness."
              </p>
            </div>

            <div className="prose prose-lg max-w-none">
              <h2 className="font-heading text-3xl font-bold text-foreground">Our Process</h2>
              <p className="text-muted-foreground leading-relaxed">
                At Amatya we bring the purity of rural traditions to your modern kitchen. Rooted in authenticity, our brand is committed to delivering natural, chemical-free products straight from the farm. Every item—from our Bilona method Gir cow Ghee, to different raw Honey, and traditional Jaggery and Muscovado (Khaand)—is a reflection of India's rich agricultural heritage.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                We believe in preserving the village legacy by empowering farmers and promoting time-tested methods of food production, ensuring you get wholesome nutrition in every spoonful.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-20 bg-gradient-warm">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center mb-12">
            <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground">
              Mission, Vision & Values
            </h2>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
            {[
              {
                icon: Leaf,
                title: 'Purity',
                desc: 'Every product is 100% pure, natural, and free from chemicals, additives, and adulteration.',
              },
              {
                icon: Award,
                title: 'Authenticity',
                desc: 'We follow traditional, authentic methods like Bilona ghee preparation and raw honey extraction.',
              },
              {
                icon: Heart,
                title: 'Sustainability',
                desc: 'We support local communities and encourage eco-friendly, cruelty-free practices.',
              },
              {
                icon: Users,
                title: 'Transparency',
                desc: 'We maintain total transparency in ingredients, sourcing, processes, and pricing.',
              },
            ].map((value) => (
              <div key={value.title} className="bg-card rounded-2xl p-6 shadow-soft text-center">
                <value.icon className="h-10 w-10 text-primary mx-auto mb-4" />
                <h3 className="font-heading text-xl font-semibold text-foreground mb-2">{value.title}</h3>
                <p className="text-muted-foreground text-sm">{value.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Origin */}
      <section className="py-20 bg-earth text-primary">
        <div className="container mx-auto px-4 md:px-6 text-center">
          <div className="max-w-3xl mx-auto">
            <h2 className="font-heading text-3xl md:text-4xl font-bold text-honey-light mb-6">
              From The Heart Land Of India
            </h2>
            <p className="text-primary/80 text-lg mb-4">(Madhya Pradesh)</p>
            <p className="text-primary/70 leading-relaxed">
              Our products come directly from the rich agricultural lands of Madhya Pradesh, 
              where traditional farming practices have been preserved for generations. 
              Each product carries the essence of this fertile land and the dedication of our farmers.
            </p>
          </div>
        </div>
      </section>
      <Footer/>
    </>
  );
}