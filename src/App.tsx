import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ScrollToTop from "@/components/ScrollToTop";
import { CartProvider } from "@/context/CartContext";
import { WishlistProvider } from "@/context/WishlistContext";
import CartDrawer from "@/components/cart/CartDrawer";
import StickyHeader from "@/components/layout/StickyHeader";
import Index from "./pages/Index";
import ProductDetail from "./pages/ProductDetail";
import CollectionPage from "./pages/CollectionPage";
import WishlistPage from "./pages/WishlistPage";
import ShippingPolicy from "./pages/ShippingPolicy";
import RefundReturnPolicy from "./pages/RefundReturnPolicy";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import TermsConditions from "./pages/TermsConditions";
import NotFound from "./pages/NotFound";
import About from "./pages/About";
import Quality from "./pages/Quality";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <BrowserRouter>
      <ScrollToTop />
      <CartProvider>
        <WishlistProvider>
          <TooltipProvider>
            <Toaster />
            <Sonner />
            {/* Global UI */}
            <CartDrawer />
            {/* Sticky Bars OUTSIDE animated content */}
            <StickyHeader />
            {/* Routes (page content, can be animated) */}
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/product/:slug" element={<ProductDetail />} />
              <Route path="/category/:slug" element={<CollectionPage />} />
              <Route path="/wishlist" element={<WishlistPage />} />
              <Route path="/shipping-policy" element={<ShippingPolicy />} />
              <Route path="/refund-and-return-policy" element={<RefundReturnPolicy />} />
              <Route path="/privacy-policy" element={<PrivacyPolicy />} />
              <Route path="/terms-and-conditions" element={<TermsConditions />} />
              <Route path="/about" element={<About/>} />
              <Route path="/quality" element={<Quality/>} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </TooltipProvider>
        </WishlistProvider>
      </CartProvider>
    </BrowserRouter>
  </QueryClientProvider>
);

export default App;
