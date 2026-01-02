import { motion } from 'framer-motion';
import { Star, Quote } from 'lucide-react';

const testimonials = [
  {
    id: 1,
    name: 'Priya Sharma',
    location: 'Delhi',
    rating: 5,
    text: 'The A2 Ghee from Amatya is the best I\'ve ever tasted. You can truly feel the purity and the traditional Bilona method makes all the difference. My family loves it!',
    product: 'A2 Gir Cow Ghee',
  },
  {
    id: 2,
    name: 'Rahul Verma',
    location: 'Mumbai',
    rating: 5,
    text: 'The Raw Forest Honey is incredible. It\'s so pure and natural, unlike anything from supermarkets. I use it every morning and my health has improved significantly.',
    product: 'Raw Forest Honey',
  },
  {
    id: 3,
    name: 'Anita Joshi',
    location: 'Bangalore',
    rating: 5,
    text: 'Switching to Khaand Shree was the best decision. Natural sweetness without any chemicals. Perfect for my daily chai and cooking.',
    product: 'Khaand Shree Muscovado',
  },
];

const Testimonials = () => {
  return (
    <section className="py-16 md:py-24 bg-primary text-primary-foreground overflow-hidden">
      <div className="container">
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

        <div className="grid md:grid-cols-3 gap-6">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="relative p-6 bg-primary-foreground/10 backdrop-blur-sm rounded-2xl"
            >
              <Quote className="absolute top-4 right-4 w-8 h-8 opacity-20" />
              
              {/* Stars */}
              <div className="flex gap-1 mb-4">
                {Array.from({ length: testimonial.rating }).map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-golden text-golden" />
                ))}
              </div>

              {/* Text */}
              <p className="text-sm leading-relaxed opacity-90 mb-6">
                "{testimonial.text}"
              </p>

              {/* Author */}
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">{testimonial.name}</p>
                  <p className="text-xs opacity-70">{testimonial.location}</p>
                </div>
                <span className="text-xs px-3 py-1 bg-primary-foreground/10 rounded-full">
                  {testimonial.product}
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
