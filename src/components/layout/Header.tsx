import { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Search, ShoppingBag, Heart, Menu, X, ChevronDown, ChevronLeft, ChevronRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useCart } from '@/context/CartContext';
import { useWishlist } from '@/context/WishlistContext';
import { useCollections } from '@/hooks/useShopify';
import SearchOverlay from './SearchOverlay';
import MegaMenu from './MegaMenu';

const Header = () => {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeMenu, setActiveMenu] = useState<string | null>(null);
  const { totalItems, setIsOpen: setCartOpen } = useCart();
  const { items: wishlistItems } = useWishlist();
  const { data: collections = [] } = useCollections();
  
  // Mobile scroll refs
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);

  // Check scroll position
  const checkScroll = () => {
    const container = scrollContainerRef.current;
    if (container) {
      setCanScrollLeft(container.scrollLeft > 0);
      setCanScrollRight(container.scrollLeft < container.scrollWidth - container.clientWidth - 5);
    }
  };

  useEffect(() => {
    checkScroll();
    const container = scrollContainerRef.current;
    if (container) {
      container.addEventListener('scroll', checkScroll);
      window.addEventListener('resize', checkScroll);
    }
    return () => {
      if (container) {
        container.removeEventListener('scroll', checkScroll);
      }
      window.removeEventListener('resize', checkScroll);
    };
  }, [collections]);

  const scrollMobile = (direction: 'left' | 'right') => {
    const container = scrollContainerRef.current;
    if (container) {
      const scrollAmount = 150;
      container.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth',
      });
    }
  };

  // Static nav items
  const staticNavItems = [
    { name: 'About', slug: 'about', hasMega: false },
  ];

  // Build nav items from collections
  const navItems = [
    ...collections.slice(0, 5).map(col => ({
      name: col.name,
      slug: col.slug,
      hasMega: true,
    })),
    ...staticNavItems,
  ];

  return (
    <>
      <header className="sticky top-[42px] z-40 bg-background border-b border-border" style={{ backgroundColor: 'hsl(var(--background) / 0.95)', backdropFilter: 'blur(8px)' }}>
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
                    <MegaMenu collectionSlug={item.slug} />
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
                className="hidden md:flex p-2 hover:bg-secondary rounded-full transition-colors relative"
                aria-label="Wishlist"
              >
                <Heart className="w-5 h-5" />
                {wishlistItems.length > 0 && (
                  <span className="absolute -top-1 -right-1 w-5 h-5 bg-accent text-accent-foreground text-xs font-bold rounded-full flex items-center justify-center">
                    {wishlistItems.length}
                  </span>
                )}
              </Link>
              <button
                onClick={() => setCartOpen(true)}
                className="relative p-2 hover:bg-secondary rounded-full transition-colors"
                aria-label="Cart"
              >
                <ShoppingBag className="w-5 h-5" />
                {totalItems > 0 && (
                  <span className="absolute -top-1 -right-1 w-5 h-5 bg-accent text-accent-foreground text-xs font-bold rounded-full flex items-center justify-center">
                    {totalItems}
                  </span>
                )}
              </button>
            </div>
          </div>

          {/* Category Pills - Mobile with scroll indicators */}
          <div className="lg:hidden relative pb-3">
            {/* Left Arrow */}
            {canScrollLeft && (
              <button
                onClick={() => scrollMobile('left')}
                className="absolute left-0 top-1/2 -translate-y-1/2 z-10 w-8 h-8 flex items-center justify-center bg-background/90 shadow-md rounded-full"
                aria-label="Scroll left"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
            )}
            
            {/* Scroll Container */}
            <div
              ref={scrollContainerRef}
              className="flex items-center gap-2 overflow-x-auto scrollbar-hide px-1"
              style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
            >
              {collections.map((collection) => (
                <Link
                  key={collection.slug}
                  to={`/category/${collection.slug}`}
                  className="px-4 py-1.5 text-sm font-medium whitespace-nowrap bg-secondary hover:bg-primary hover:text-primary-foreground rounded-full transition-colors flex-shrink-0"
                >
                  {collection.name}
                </Link>
              ))}
            </div>
            
            {/* Right Arrow */}
            {canScrollRight && (
              <button
                onClick={() => scrollMobile('right')}
                className="absolute right-0 top-1/2 -translate-y-1/2 z-10 w-8 h-8 flex items-center justify-center bg-background/90 shadow-md rounded-full"
                aria-label="Scroll right"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            )}
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
                to="/wishlist"
                onClick={() => setIsMobileMenuOpen(false)}
                className="block py-3 text-lg font-medium border-b border-border"
              >
                Wishlist
              </Link>
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
