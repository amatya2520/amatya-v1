import { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Search, ShoppingBag, Heart, Menu, X, ChevronDown } from 'lucide-react';
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
  const [anchorRect, setAnchorRect] = useState<DOMRect | null>(null);
  const closeTimerRef = useRef<number | null>(null);
  const { totalItems, setIsOpen: setCartOpen } = useCart();
  const { items: wishlistItems } = useWishlist();
  const { data: collections = [] } = useCollections();
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);

  useEffect(() => {
    if (!isMobileMenuOpen) return undefined;

    const { body, documentElement } = document;
    const previousBodyOverflow = body.style.overflow;
    const previousRootOverflow = documentElement.style.overflow;

    body.style.overflow = 'hidden';
    documentElement.style.overflow = 'hidden';

    return () => {
      body.style.overflow = previousBodyOverflow;
      documentElement.style.overflow = previousRootOverflow;
    };
  }, [isMobileMenuOpen]);

  useEffect(() => {
    const container = scrollContainerRef.current;
    if (!container) return;

    const updateScrollState = () => {
      if (!scrollContainerRef.current) return;
      const el = scrollContainerRef.current;
      setCanScrollLeft(el.scrollLeft > 2);
      setCanScrollRight(el.scrollLeft + el.clientWidth < el.scrollWidth - 2);
    };

    updateScrollState();
    container.addEventListener('scroll', updateScrollState, { passive: true });
    window.addEventListener('resize', updateScrollState);

    return () => {
      container.removeEventListener('scroll', updateScrollState);
      window.removeEventListener('resize', updateScrollState);
    };
  }, [collections]);
  
  // Static nav items
  const staticNavItems = [
    { name: 'About', slug: 'about', hasMega: false },
    { name: 'Quality', slug: 'quality', hasMega: false },
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
      <header className="w-full max-w-full border-b border-border bg-background/95">
        <div className="container max-w-full">
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
            <Link to="/" className="flex flex-col items-left">
              <span className="font-brand-samarkan text-2xl md:text-3xl tracking-[1px] font-bold text-foreground">
                amatya
              </span>
              <span className="text-[10px] md:text-xs tracking-[0.23em] text-muted-foreground uppercase">
                The Amrit Essence
              </span>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center gap-8">
              {navItems.map((item) => (
                <div
                  key={item.slug}
                  className="relative nav-item"
                  onMouseEnter={(e) => {
                    if (closeTimerRef.current) {
                      window.clearTimeout(closeTimerRef.current);
                      closeTimerRef.current = null;
                    }
                    if (item.hasMega) {
                      setActiveMenu(item.slug);
                      const el = e.currentTarget as HTMLElement;
                      setAnchorRect(el.getBoundingClientRect());
                    }
                  }}
                  onMouseLeave={() => {
                    // Delay closing to allow pointer to move to portal-mounted menu
                    if (closeTimerRef.current) window.clearTimeout(closeTimerRef.current);
                    closeTimerRef.current = window.setTimeout(() => {
                      setActiveMenu(null);
                      setAnchorRect(null);
                      closeTimerRef.current = null;
                    }, 150);
                  }}
                >
                  <Link
                    to={item.hasMega ? `/category/${item.slug}` : `/${item.slug}`}
                    className="flex items-center gap-1 py-2 text-sm font-medium text-foreground hover:text-accent transition-colors"
                  >
                    {item.name}
                    {item.hasMega && <ChevronDown className="w-4 h-4" />}
                  </Link>
                  {/* Use a boundary wrapper to prevent flicker */}
                  {item.hasMega && activeMenu === item.slug && (
                    <div>
                      <MegaMenu
                        collectionSlug={item.slug}
                        anchorRect={anchorRect}
                        onOpen={() => {
                          if (closeTimerRef.current) {
                            window.clearTimeout(closeTimerRef.current);
                            closeTimerRef.current = null;
                          }
                          setActiveMenu(item.slug);
                        }}
                        onClose={() => {
                          if (closeTimerRef.current) window.clearTimeout(closeTimerRef.current);
                          closeTimerRef.current = window.setTimeout(() => {
                            setActiveMenu(null);
                            setAnchorRect(null);
                            closeTimerRef.current = null;
                          }, 150);
                        }}
                      />
                    </div>
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

          {/* Category Pills - Mobile/Tablet centered below logo with dots */}
          <div className="pb-3 pt-2 lg:hidden">
            <div className="relative px-4">
              {canScrollLeft && (
                <div className="pointer-events-none absolute left-4 top-1/2 h-8 w-6 -translate-y-1/2 bg-gradient-to-r from-background to-transparent" />
              )}
              {canScrollRight && (
                <div className="pointer-events-none absolute right-4 top-1/2 h-8 w-6 -translate-y-1/2 bg-gradient-to-l from-background to-transparent" />
              )}
              <div
                ref={scrollContainerRef}
                className="flex gap-2 overflow-x-auto whitespace-nowrap px-1 py-1 scroll-smooth snap-x snap-mandatory"
                style={{ scrollbarWidth: 'thin', msOverflowStyle: 'auto' }}
              >
                {collections.map((collection) => (
                  <Link
                    key={collection.slug}
                    to={`/category/${collection.slug}`}
                    className="inline-flex shrink-0 snap-start rounded-full bg-secondary px-3 py-1.5 text-xs font-medium text-foreground hover:bg-primary hover:text-primary-foreground"
                  >
                    {collection.name}
                  </Link>
                ))}
              </div>
            </div>
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
            key="mobile-menu"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[70] flex"
          >
            <div
              className="absolute inset-0 bg-background/70 backdrop-blur-sm"
              onClick={() => setIsMobileMenuOpen(false)}
            />
            <motion.aside
              initial={{ y: '100%' }}
              animate={{ y: 0 }}
              exit={{ y: '100%' }}
              transition={{ type: 'spring', stiffness: 280, damping: 32 }}
              className="relative flex h-full min-h-screen w-full flex-col bg-background shadow-2xl"
              role="dialog"
              aria-modal="true"
              onClick={(event) => event.stopPropagation()}
            >
              <div className="flex items-center justify-between px-5 py-4 border-b border-border">
                <span className="font-brand-samarkan text-2xl text-foreground">amatya</span>
                <button onClick={() => setIsMobileMenuOpen(false)} aria-label="Close menu" className="p-2 -mr-2">
                  <X className="w-6 h-6" />
                </button>
              </div>
              <div className="flex-1 overflow-y-auto px-5 pb-10 min-h-0">
                <nav className="space-y-4 pt-4">
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
              </div>
            </motion.aside>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Header;
