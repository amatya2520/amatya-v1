import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Search, ShoppingBag, Heart, Menu, X, ChevronDown } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { categories } from '@/data/products';
import SearchOverlay from './SearchOverlay';
import MegaMenu from './MegaMenu';

const Header = () => {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeMenu, setActiveMenu] = useState<string | null>(null);
  const [cartCount] = useState(0);

  const navItems = [
    { name: 'Ghee', slug: 'ghee', hasMega: true },
    { name: 'Honey', slug: 'honey', hasMega: true },
    { name: 'Sweeteners', slug: 'sweeteners', hasMega: true },
    { name: 'Seeds', slug: 'seeds', hasMega: true },
    { name: 'About', slug: 'about', hasMega: false },
  ];

  return (
    <>
      <header className="sticky top-0 z-40 bg-background/95 backdrop-blur-md border-b border-border">
        <div className="container">
          <div className="flex items-center justify-between h-16 md:h-20">
            {/* Mobile Menu Button */}
            <button
              className="lg:hidden p-2 -ml-2"
              onClick={() => setIsMobileMenuOpen(true)}
              aria-label="Open menu"
            >
              <Menu className="w-6 h-6" />
            </button>

            {/* Logo */}
            <Link to="/" className="flex flex-col items-center">
              <span className="font-serif text-2xl md:text-3xl font-bold tracking-wide text-foreground">
                AMATYA
              </span>
              <span className="text-[10px] md:text-xs tracking-[0.3em] text-muted-foreground uppercase">
                The Amrit Essence
              </span>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center gap-8">
              {navItems.map((item) => (
                <div
                  key={item.slug}
                  className="relative nav-item"
                  onMouseEnter={() => item.hasMega && setActiveMenu(item.slug)}
                  onMouseLeave={() => setActiveMenu(null)}
                >
                  <Link
                    to={item.hasMega ? `/category/${item.slug}` : `/${item.slug}`}
                    className="flex items-center gap-1 py-2 text-sm font-medium text-foreground hover:text-accent transition-colors"
                  >
                    {item.name}
                    {item.hasMega && <ChevronDown className="w-4 h-4" />}
                  </Link>
                  {item.hasMega && activeMenu === item.slug && (
                    <MegaMenu categorySlug={item.slug} />
                  )}
                </div>
              ))}
            </nav>

            {/* Actions */}
            <div className="flex items-center gap-2 md:gap-4">
              <button
                onClick={() => setIsSearchOpen(true)}
                className="p-2 hover:bg-secondary rounded-full transition-colors"
                aria-label="Search"
              >
                <Search className="w-5 h-5" />
              </button>
              <Link
                to="/wishlist"
                className="hidden md:flex p-2 hover:bg-secondary rounded-full transition-colors"
                aria-label="Wishlist"
              >
                <Heart className="w-5 h-5" />
              </Link>
              <Link
                to="/cart"
                className="relative p-2 hover:bg-secondary rounded-full transition-colors"
                aria-label="Cart"
              >
                <ShoppingBag className="w-5 h-5" />
                {cartCount > 0 && (
                  <span className="absolute -top-1 -right-1 w-5 h-5 bg-accent text-accent-foreground text-xs font-bold rounded-full flex items-center justify-center">
                    {cartCount}
                  </span>
                )}
              </Link>
            </div>
          </div>

          {/* Category Pills - Mobile */}
          <div className="lg:hidden flex items-center gap-2 pb-3 overflow-x-auto scrollbar-hide">
            {categories.map((category) => (
              <Link
                key={category.slug}
                to={`/category/${category.slug}`}
                className="px-4 py-1.5 text-sm font-medium whitespace-nowrap bg-secondary hover:bg-primary hover:text-primary-foreground rounded-full transition-colors"
              >
                {category.name}
              </Link>
            ))}
          </div>
        </div>
      </header>

      {/* Search Overlay */}
      <AnimatePresence>
        {isSearchOpen && <SearchOverlay onClose={() => setIsSearchOpen(false)} />}
      </AnimatePresence>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-background"
          >
            <div className="flex items-center justify-between p-4 border-b border-border">
              <span className="font-serif text-2xl font-bold">Menu</span>
              <button onClick={() => setIsMobileMenuOpen(false)} aria-label="Close menu">
                <X className="w-6 h-6" />
              </button>
            </div>
            <nav className="p-4 space-y-4">
              {navItems.map((item) => (
                <Link
                  key={item.slug}
                  to={item.hasMega ? `/category/${item.slug}` : `/${item.slug}`}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="block py-3 text-lg font-medium border-b border-border"
                >
                  {item.name}
                </Link>
              ))}
              <Link
                to="/contact"
                onClick={() => setIsMobileMenuOpen(false)}
                className="block py-3 text-lg font-medium border-b border-border"
              >
                Contact
              </Link>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Header;
