import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const BrandStory = () => {
  return (
    <section className="py-16 md:py-24 bg-secondary/50 overflow-hidden">
      <div className="container">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <span className="inline-block px-4 py-1.5 bg-primary/10 text-primary text-sm font-medium rounded-full mb-6">
              Our Story
            </span>
            <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-6 leading-tight">
              The Amrit Essence
            </h2>
            <div className="space-y-4 text-muted-foreground leading-relaxed">
              <p>
                At Amatya we bring the purity of rural traditions to your modern kitchen. 
                Rooted in authenticity, our brand is committed to delivering natural, 
                chemical-free products straight from the farm.
              </p>
              <p>
                Every item—from our Bilona method Gir cow Ghee, to different raw Honey, 
                and traditional Jaggery and Muscovado (Khaand)—is a reflection of India's 
                rich agricultural heritage.
              </p>
              <p>
                We believe in preserving the village legacy by empowering farmers and 
                promoting time-tested methods of food production, ensuring you get 
                wholesome nutrition in every spoonful.
              </p>
            </div>
            <div className="mt-8 flex flex-wrap gap-4">
              <Link
                to="/about"
                className="inline-flex items-center px-6 py-3 bg-primary text-primary-foreground font-medium rounded-full hover:bg-primary/90 transition-colors"
              >
                Read Our Story
              </Link>
              <Link
                to="/quality"
                className="inline-flex items-center px-6 py-3 border-2 border-primary text-primary font-medium rounded-full hover:bg-primary hover:text-primary-foreground transition-colors"
              >
                Quality Promise
              </Link>
            </div>
          </motion.div>

          {/* Stats/Features Grid */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="grid grid-cols-2 gap-4"
          >
            {[
              { number: '100%', label: 'Pure & Natural', icon: '🌿' },
              { number: 'Zero', label: 'Chemicals Added', icon: '🚫' },
              { number: 'Farm', label: 'Fresh Products', icon: '🌾' },
              { number: 'Vedic', label: 'Traditional Methods', icon: '🕉️' },
            ].map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="p-6 bg-background rounded-2xl shadow-soft hover:shadow-card transition-shadow"
              >
                <span className="text-3xl mb-3 block">{stat.icon}</span>
                <span className="font-serif text-2xl font-bold text-foreground block">
                  {stat.number}
                </span>
                <span className="text-sm text-muted-foreground">{stat.label}</span>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default BrandStory;
