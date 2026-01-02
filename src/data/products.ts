import gheeImg from '@/assets/products/ghee.jpg';
import honeyImg from '@/assets/products/honey.jpg';
import muscovadoImg from '@/assets/products/muscovado.jpg';
import chiaImg from '@/assets/products/chia-seeds.jpg';
import tulsiHoneyImg from '@/assets/products/tulsi-honey.jpg';
import ajwainHoneyImg from '@/assets/products/ajwain-honey.jpg';

export interface Product {
  id: string;
  name: string;
  slug: string;
  shortDescription: string;
  description: string;
  price: number;
  comparePrice?: number;
  images: string[];
  category: string;
  categorySlug: string;
  variants: { weight: string; price: number }[];
  badges: string[];
  benefits: string[];
  ingredients?: string;
  inStock: boolean;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  description: string;
  image: string;
  productCount: number;
}

export const categories: Category[] = [
  {
    id: '1',
    name: 'Ghee',
    slug: 'ghee',
    description: 'A2 Gir Cow Ghee made using traditional Bilona method',
    image: gheeImg,
    productCount: 3,
  },
  {
    id: '2',
    name: 'Honey',
    slug: 'honey',
    description: 'Raw, unprocessed honey from the forests of India',
    image: honeyImg,
    productCount: 5,
  },
  {
    id: '3',
    name: 'Natural Sweeteners',
    slug: 'sweeteners',
    description: 'Traditional jaggery and muscovado sugar',
    image: muscovadoImg,
    productCount: 4,
  },
  {
    id: '4',
    name: 'Seeds',
    slug: 'seeds',
    description: 'Nutrient-rich superfoods for daily wellness',
    image: chiaImg,
    productCount: 3,
  },
];

export const products: Product[] = [
  {
    id: '1',
    name: 'A2 Gir Cow Ghee',
    slug: 'a2-gir-cow-ghee',
    shortDescription: 'Vedic Bilona Method',
    description: `Crafted from the rich, nutritious milk of indigenous Gir cows, our A2 Ghee is prepared using the ancient Vedic Bilona method, a traditional process that preserves purity, aroma, and natural goodness. Fresh A2 milk is cultured into curd, hand-churned slowly to extract makkhan (butter), and then simmered on a low flame to produce golden, aromatic ghee-free from preservatives, chemicals, and additives.

Every batch is made in small quantities to maintain authenticity, ensuring a product that is rich in A2 protein, omega fatty acids, antioxidants, and essential nutrients. Known as Vedic Ghee, it supports digestion, boosts immunity, improves brain function, enhances energy levels, and is suitable for daily wellness and cooking.

With its superior quality, traditional preparation, and wholesome benefits, our A2 Gir Cow Ghee delivers the true essence of purity-exactly as nature intended.`,
    price: 1299,
    comparePrice: 1599,
    images: [gheeImg, gheeImg],
    category: 'Ghee',
    categorySlug: 'ghee',
    variants: [
      { weight: '250g', price: 649 },
      { weight: '500g', price: 1299 },
      { weight: '1kg', price: 2499 },
    ],
    badges: ['best-seller', 'Bilona Method'],
    benefits: ['Supports digestion', 'Boosts immunity', 'Brain function', 'Energy levels'],
    ingredients: '100% Pure A2 Gir Cow Milk',
    inStock: true,
  },
  {
    id: '2',
    name: 'Raw Forest Honey',
    slug: 'raw-forest-honey',
    shortDescription: 'Pure, Unprocessed, Wild Harvest',
    description: `Our Raw Forest Honey is collected from deep, untouched forest regions where bees feed on a diverse range of wild flowers, medicinal herbs, and natural flora. This gives the honey its rich flavor, deep aroma, and powerful nutritional profile.

Harvested using sustainable methods, the honey is unheated, unprocessed, and unfiltered, preserving all natural enzymes, pollens, antioxidants, and wellness-boosting nutrients. Its naturally bold taste and darker color reflect the purity of the wild environment it comes from.

Known for its immunity-boosting properties, digestive support, and natural healing benefits, our Raw Forest Honey is a perfect addition to your daily wellness routine. Whether used as a natural sweetener, in warm water, or enjoyed directly, it brings you the true, untouched goodness of the forest-just as nature intended.`,
    price: 549,
    comparePrice: 699,
    images: [honeyImg, honeyImg],
    category: 'Honey',
    categorySlug: 'honey',
    variants: [
      { weight: '250g', price: 349 },
      { weight: '500g', price: 549 },
      { weight: '1kg', price: 999 },
    ],
    badges: ['trending', 'Raw & Unprocessed'],
    benefits: ['Immunity boosting', 'Digestive support', 'Natural healing', 'Energy boost'],
    inStock: true,
  },
  {
    id: '3',
    name: 'Raw Tulsi Honey',
    slug: 'raw-tulsi-honey',
    shortDescription: 'Pure, Healing & Naturally Enriched',
    description: `Our Raw Tulsi Honey is collected from bees that thrive on the nectar of holy basil (tulsi) flowers, resulting in a honey rich in natural healing properties and a soothing herbal aroma. Known in Ayurveda as the "Queen of Herbs," tulsi infuses this honey with powerful antioxidants, immunity-boosting compounds, and calming benefits.

Unprocessed, unheated, and free from any additives, our Raw Tulsi Honey preserves all essential enzymes, pollens, and nutrients-ensuring purity in every spoonful. Its gentle herbal sweetness supports respiratory health, aids digestion, reduces stress, and promotes overall wellness.

With its refreshing taste and therapeutic qualities, Raw Tulsi Honey is ideal for warm drinks, morning routines, home remedies, and natural sweetening-offering a perfect blend of nature's purity and traditional wellness.`,
    price: 599,
    images: [tulsiHoneyImg, tulsiHoneyImg],
    category: 'Honey',
    categorySlug: 'honey',
    variants: [
      { weight: '250g', price: 399 },
      { weight: '500g', price: 599 },
      { weight: '1kg', price: 1099 },
    ],
    badges: ['new-launch'],
    benefits: ['Respiratory health', 'Stress relief', 'Digestive aid', 'Immunity boost'],
    inStock: true,
  },
  {
    id: '4',
    name: 'Raw Ajwain Honey',
    slug: 'raw-ajwain-honey',
    shortDescription: 'Pure, Potent & Naturally Medicinal',
    description: `Our Raw Ajwain Honey is derived from the nectar of ajwain (carom) flowers, giving it a uniquely strong, herbal flavor with remarkable therapeutic benefits. Ajwain has been celebrated for centuries in Ayurveda for its digestive, antibacterial, and immunity-enhancing properties—and this honey carries all of that natural goodness.

Unheated, unprocessed, and free from any artificial additives, our Raw Ajwain Honey retains its active enzymes, antioxidants, pollens, and essential nutrients. Known for supporting digestion, relieving acidity, improving metabolism, and promoting respiratory health, it serves as a natural remedy for everyday wellness.

With its warm aroma and bold medicinal taste, Raw Ajwain Honey is perfect for morning detox, warm water, home remedies, or daily sweetening - bringing you powerful purity straight from nature's own healing blossoms.`,
    price: 649,
    images: [ajwainHoneyImg, ajwainHoneyImg],
    category: 'Honey',
    categorySlug: 'honey',
    variants: [
      { weight: '250g', price: 449 },
      { weight: '500g', price: 649 },
      { weight: '1kg', price: 1199 },
    ],
    badges: [],
    benefits: ['Digestive support', 'Acidity relief', 'Metabolism boost', 'Respiratory health'],
    inStock: true,
  },
  {
    id: '5',
    name: 'Khaand Shree Muscovado',
    slug: 'khaand-shree-muscovado',
    shortDescription: 'Pure, Unrefined & Traditionally Crafted',
    description: `Khaand Shree is a naturally unrefined sweetener made using the traditional process of slow-boiling sugarcane juice, preserving its original minerals, nutrients, and earthy richness. Unlike white sugar, it undergoes no bleaching, no chemicals, and no sulphur, keeping it pure, wholesome, and nutritionally superior.

Rich in iron, calcium, magnesium, and antioxidants, Khaand Shree supports better digestion, sustained energy, and overall wellness. Its soft texture and caramel-like flavor make it perfect for everyday tea, coffee, milk, desserts, and traditional Indian recipes.

A healthier and more authentic alternative to refined sugar, Khaand Shree brings you the natural sweetness of pure sugarcane—exactly as nature intended, with all its goodness intact.`,
    price: 299,
    images: [muscovadoImg, muscovadoImg],
    category: 'Natural Sweeteners',
    categorySlug: 'sweeteners',
    variants: [
      { weight: '500g', price: 299 },
      { weight: '1kg', price: 549 },
    ],
    badges: ['best-seller'],
    benefits: ['Rich in minerals', 'Better digestion', 'Sustained energy', 'No chemicals'],
    inStock: true,
  },
  {
    id: '6',
    name: 'Organic Chia Seeds',
    slug: 'organic-chia-seeds',
    shortDescription: 'Pure, Nutrient-Dense & Naturally Energizing',
    description: `Our Chia Seeds are rich, clean, and naturally packed with essential nutrients to support a healthier lifestyle. Known as a modern superfood, chia seeds contain high levels of Omega-3 fatty acids, fiber, protein, antioxidants, and essential minerals, making them an excellent addition to daily nutrition.

These tiny seeds help improve digestion, support weight management, boost energy levels, and keep you fuller for longer. When soaked, chia seeds form a natural gel that aids hydration and enhances nutrient absorption.

Perfect for smoothies, detox drinks, puddings, salads, yogurt, or daily wellness routines, our Chia Seeds bring you pure plant-based nourishment - simple, versatile, and naturally energizing.`,
    price: 349,
    images: [chiaImg, chiaImg],
    category: 'Seeds',
    categorySlug: 'seeds',
    variants: [
      { weight: '200g', price: 249 },
      { weight: '400g', price: 349 },
    ],
    badges: ['trending'],
    benefits: ['Omega-3 rich', 'Weight management', 'Energy boost', 'Hydration support'],
    inStock: true,
  },
];

export const announcements = [
  'Free Delivery on Orders Above ₹2500',
  '100% Pure & Chemical-Free Products',
  'From The Heart Land of India - Madhya Pradesh',
  'Traditional Bilona Method Ghee',
];

export const getProductBySlug = (slug: string) => products.find(p => p.slug === slug);
export const getProductsByCategory = (categorySlug: string) => products.filter(p => p.categorySlug === categorySlug);
export const getFeaturedProducts = () => products.filter(p => p.badges.includes('best-seller') || p.badges.includes('trending'));
