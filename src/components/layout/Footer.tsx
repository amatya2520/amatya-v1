import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ChevronDown, Instagram, Facebook, Youtube, Mail, Phone, MapPin } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useCollections } from '@/hooks/useShopify';

interface FooterDropdownProps {
  title: string;
  children: React.ReactNode;
  defaultOpen?: boolean;
}

const FooterDropdown = ({ title, children, defaultOpen = false }: FooterDropdownProps) => {
  const [isOpen, setIsOpen] = useState(defaultOpen);
  const [isHovered, setIsHovered] = useState(false);

  // On desktop, show on hover; on mobile, toggle on click
  const showContent = isOpen || isHovered;

  return (
    <div 
      className="border-b border-primary-foreground/20 md:border-0"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center justify-between w-full py-4 md:py-2 group"
      >
        <span className="font-serif text-lg font-semibold">{title}</span>
        <ChevronDown
          className={`w-5 h-5 transition-transform duration-300 ${showContent ? 'rotate-180' : ''} md:opacity-60 md:group-hover:opacity-100`}
        />
      </button>
      <AnimatePresence initial={false}>
        {showContent && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            className="overflow-hidden"
          >
            <div className="pb-4 md:pb-2 space-y-3">{children}</div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const Footer = () => {
  const { data: collections = [] } = useCollections();

  return (
    <footer className="relative bg-primary text-primary-foreground overflow-hidden">
      {/* SVG Landscape Background */}
      <div className="absolute inset-0 pointer-events-none">
        <svg
          viewBox="0 0 1440 400"
          className="absolute bottom-0 w-full h-auto"
          preserveAspectRatio="xMidYMax slice"
        >
          {/* Sky gradient */}
          <defs>
            <linearGradient id="skyGradient" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="hsl(150 27% 23%)" />
              <stop offset="100%" stopColor="hsl(150 20% 30%)" />
            </linearGradient>
            <linearGradient id="hillGradient" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="hsl(40 60% 50%)" stopOpacity="0.3" />
              <stop offset="100%" stopColor="hsl(35 50% 40%)" stopOpacity="0.4" />
            </linearGradient>
          </defs>
          
          {/* Mountains/Hills - Layer 1 (far) */}
          <path
            d="M0,200 Q150,120 300,180 T600,140 T900,170 T1200,130 T1440,160 L1440,400 L0,400 Z"
            fill="hsl(150 25% 18%)"
            opacity="0.6"
          />
          
          {/* Mountains/Hills - Layer 2 (mid) */}
          <path
            d="M0,250 Q200,180 400,230 T800,200 T1100,240 T1440,210 L1440,400 L0,400 Z"
            fill="hsl(150 22% 15%)"
            opacity="0.8"
          />
          
          {/* Ground - Layer 3 (close) */}
          <path
            d="M0,300 Q150,280 300,310 T600,290 T900,320 T1200,295 T1440,315 L1440,400 L0,400 Z"
            fill="hsl(150 20% 12%)"
          />
          
          {/* Trees silhouettes */}
          <g fill="hsl(150 25% 10%)" opacity="0.9">
            {/* Tree 1 */}
            <path d="M100,320 L100,290 Q90,280 85,260 Q80,240 100,230 Q120,240 115,260 Q110,280 100,290 Z" />
            <rect x="98" y="320" width="4" height="20" />
            
            {/* Tree 2 */}
            <path d="M250,300 L250,270 Q235,255 230,230 Q225,205 250,190 Q275,205 270,230 Q265,255 250,270 Z" />
            <rect x="248" y="300" width="4" height="25" />
            
            {/* Tree 3 - Pine */}
            <path d="M500,310 L500,260 L475,280 L485,280 L460,300 L500,310 L540,300 L515,280 L525,280 L500,260 Z" />
            <rect x="498" y="310" width="4" height="20" />
            
            {/* Tree 4 */}
            <path d="M750,295 L750,260 Q738,248 735,225 Q732,200 750,185 Q768,200 765,225 Q762,248 750,260 Z" />
            <rect x="748" y="295" width="4" height="22" />
            
            {/* Tree cluster 5 */}
            <path d="M1000,308 L1000,275 Q990,265 987,245 Q984,225 1000,215 Q1016,225 1013,245 Q1010,265 1000,275 Z" />
            <path d="M1030,315 L1030,290 Q1022,282 1020,268 Q1018,252 1030,245 Q1042,252 1040,268 Q1038,282 1030,290 Z" />
            
            {/* Tree 6 */}
            <path d="M1250,305 L1250,265 Q1235,250 1230,220 Q1225,190 1250,175 Q1275,190 1270,220 Q1265,250 1250,265 Z" />
            <rect x="1248" y="305" width="4" height="25" />
          </g>
          
          {/* Cow silhouettes */}
          <g fill="hsl(150 22% 12%)" opacity="0.7">
            {/* Cow 1 */}
            <ellipse cx="180" cy="345" rx="25" ry="12" />
            <ellipse cx="165" cy="340" rx="8" ry="6" />
            <rect x="160" y="348" width="3" height="12" />
            <rect x="172" y="348" width="3" height="12" />
            <rect x="188" y="348" width="3" height="12" />
            <rect x="200" y="348" width="3" height="12" />
            
            {/* Cow 2 */}
            <ellipse cx="650" cy="340" rx="22" ry="10" />
            <ellipse cx="635" cy="336" rx="7" ry="5" />
            <rect x="632" y="343" width="3" height="10" />
            <rect x="642" y="343" width="3" height="10" />
            <rect x="658" y="343" width="3" height="10" />
            <rect x="668" y="343" width="3" height="10" />
          </g>
          
          {/* Sun/Moon */}
          <circle cx="1300" cy="100" r="40" fill="hsl(40 85% 65%)" opacity="0.3" />
          
          {/* Birds */}
          <g fill="none" stroke="hsl(45 33% 90%)" strokeWidth="1.5" opacity="0.4">
            <path d="M400,80 Q410,70 420,80" />
            <path d="M420,85 Q430,75 440,85" />
            <path d="M450,70 Q460,60 470,70" />
            <path d="M465,75 Q475,65 485,75" />
          </g>
        </svg>
      </div>

      {/* Content */}
      <div className="relative container py-16 pb-24">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {/* Brand */}
          <div className="lg:col-span-1">
            <Link to="/" className="inline-block mb-6">
              <span className="font-brand-samarkan text-3xl tracking-[1px] font-bold">amatya</span>
              <span className="block text-xs tracking-[0.23em] opacity-80 mt-1">
                THE AMRIT ESSENCE
              </span>
            </Link>
            <p className="text-sm opacity-80 mb-6 leading-relaxed">
              At Amatya we bring the purity of rural traditions to your modern kitchen. 
              Rooted in authenticity, our brand is committed to delivering natural, 
              chemical-free products straight from the farm.
            </p>
            <div className="flex gap-4">
              <a href="#" className="p-2 bg-primary-foreground/10 rounded-full hover:bg-primary-foreground/20 transition-colors">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="#" className="p-2 bg-primary-foreground/10 rounded-full hover:bg-primary-foreground/20 transition-colors">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="#" className="p-2 bg-primary-foreground/10 rounded-full hover:bg-primary-foreground/20 transition-colors">
                <Youtube className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Categories */}
          <FooterDropdown title="Categories">
            {collections.map((collection) => (
              <Link
                key={collection.slug}
                to={`/category/${collection.slug}`}
                className="block text-sm opacity-80 hover:opacity-100 transition-opacity"
              >
                {collection.name}
              </Link>
            ))}
          </FooterDropdown>

          {/* Policies */}
          <FooterDropdown title="Policies">
            <Link to="/privacy-policy" className="block text-sm opacity-80 hover:opacity-100 transition-opacity">
              Privacy Policy
            </Link>
            <Link to="/terms-and-conditions" className="block text-sm opacity-80 hover:opacity-100 transition-opacity">
              Terms & Conditions
            </Link>
            <Link to="/refund-and-return-policy" className="block text-sm opacity-80 hover:opacity-100 transition-opacity">
              Refund & Return Policy
            </Link>
            <Link to="/shipping-policy" className="block text-sm opacity-80 hover:opacity-100 transition-opacity">
              Shipping Policy
            </Link>
          </FooterDropdown>

          {/* Contact */}
          <FooterDropdown title="Contact Us">
            <a href="mailto:amatya2520@gmail.com" className="flex items-center gap-2 text-sm opacity-80 hover:opacity-100 transition-opacity">
              <Mail className="w-4 h-4" />
              amatya2520@gmail.com
            </a>
            <a href="tel:+918435170623" className="flex items-center gap-2 text-sm opacity-80 hover:opacity-100 transition-opacity">
              <Phone className="w-4 h-4" />
              +91 84351 70623
            </a>
            <p className="flex items-start gap-2 text-sm opacity-80">
              <MapPin className="w-4 h-4 mt-0.5 flex-shrink-0" />
              Madhya Pradesh, India
            </p>
          </FooterDropdown>
        </div>

        {/* Bottom Bar */}
        <div className="relative mt-12 pt-8 border-t border-primary-foreground/20 flex flex-col md:flex-row items-center justify-between gap-4 text-sm opacity-80">
          <p>© 2024 Amatya. All rights reserved.</p>
          <p>From The Heart Land Of India</p>
        </div>
      </div>

      {/* End Spacer */}
      <div className="h-8 bg-primary" />
    </footer>
  );
};

export default Footer;
