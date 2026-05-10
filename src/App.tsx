import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  ShoppingBag, 
  Search, 
  Heart, 
  User as UserIcon, 
  Moon, 
  Sun, 
  Menu, 
  X, 
  ChevronRight,
  Star,
  Plus,
  Minus,
  Trash2,
  CheckCircle2,
  LayoutGrid,
  Filter,
  ArrowRight
} from 'lucide-react';

import { Product, CartItem, Category as CategoryType } from './types';
import { PRODUCTS, CATEGORIES } from './constants';

// --- Components ---

const Navbar = ({ 
  cartCount, 
  wishlistCount, 
  onOpenCart, 
  onOpenWishlist, 
  onOpenUser,
  searchQuery, 
  setSearchQuery,
  toggleTheme,
  isDark
}: { 
  cartCount: number; 
  wishlistCount: number; 
  onOpenCart: () => void; 
  onOpenWishlist: () => void;
  onOpenUser: () => void;
  searchQuery: string;
  setSearchQuery: (q: string) => void;
  toggleTheme: () => void;
  isDark: boolean;
}) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 dark:bg-neutral-950/80 backdrop-blur-xl border-b border-neutral-200 dark:border-neutral-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <div className="flex items-center gap-2 cursor-pointer" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
            <div className="w-10 h-10 bg-black dark:bg-white rounded-xl flex items-center justify-center">
              <ShoppingBag className="text-white dark:text-black w-6 h-6" />
            </div>
            <span className="font-display text-2xl font-bold tracking-tight">LUXE</span>
          </div>

          {/* Desktop Search */}
          <div className="hidden md:flex flex-1 max-w-md mx-8 relative">
            <input 
              type="text" 
              placeholder="Search products, brands..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-neutral-100 dark:bg-neutral-900 border-none rounded-full py-2.5 pl-12 pr-4 focus:ring-2 focus:ring-black dark:focus:ring-white transition-all"
            />
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-400 w-5 h-5" />
          </div>

          {/* Desktop Actions */}
          <div className="hidden md:flex items-center gap-6">
            <button onClick={toggleTheme} className="p-2 hover:bg-neutral-100 dark:hover:bg-neutral-900 rounded-full transition-colors">
              {isDark ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </button>
            <button onClick={onOpenWishlist} className="relative p-2 hover:bg-neutral-100 dark:hover:bg-neutral-900 rounded-full transition-colors">
              <Heart className="w-5 h-5" />
              {wishlistCount > 0 && <span className="absolute top-0 right-0 w-4 h-4 bg-red-500 text-white text-[10px] flex items-center justify-center rounded-full font-bold">{wishlistCount}</span>}
            </button>
            <button onClick={onOpenCart} className="relative p-2 hover:bg-neutral-100 dark:hover:bg-neutral-900 rounded-full transition-colors">
              <ShoppingBag className="w-5 h-5" />
              {cartCount > 0 && <span className="absolute top-0 right-0 w-4 h-4 bg-black dark:bg-white dark:text-black text-white text-[10px] flex items-center justify-center rounded-full font-bold">{cartCount}</span>}
            </button>
            <div onClick={onOpenUser} className="w-10 h-10 rounded-full bg-neutral-200 dark:bg-neutral-800 flex items-center justify-center cursor-pointer overflow-hidden hover:ring-2 hover:ring-black dark:hover:ring-white transition-all">
              <UserIcon className="w-5 h-5" />
            </div>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center gap-4">
             <button onClick={toggleTheme} className="p-2">
              {isDark ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </button>
            <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="p-2">
              {isMenuOpen ? <X /> : <Menu />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div 
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="md:hidden bg-white dark:bg-neutral-950 border-t border-neutral-200 dark:border-neutral-800 overflow-hidden"
          >
            <div className="px-4 pt-4 pb-8 space-y-6">
              <div className="relative">
                <input 
                  type="text" 
                  placeholder="Search..." 
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-neutral-100 dark:bg-neutral-900 border-none rounded-xl py-3 pl-12 pr-4"
                />
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-400 w-5 h-5" />
              </div>
              <div className="grid grid-cols-3 gap-4">
                <button onClick={() => { onOpenCart(); setIsMenuOpen(false); }} className="flex flex-col items-center gap-2 p-4 bg-neutral-50 dark:bg-neutral-900 rounded-2xl">
                  <ShoppingBag className="w-6 h-6" />
                  <span className="text-xs font-medium">Cart ({cartCount})</span>
                </button>
                <button onClick={() => { onOpenWishlist(); setIsMenuOpen(false); }} className="flex flex-col items-center gap-2 p-4 bg-neutral-50 dark:bg-neutral-900 rounded-2xl">
                  <Heart className="w-6 h-6" />
                  <span className="text-xs font-medium">Wishlist ({wishlistCount})</span>
                </button>
                <button onClick={() => { onOpenUser(); setIsMenuOpen(false); }} className="flex flex-col items-center gap-2 p-4 bg-neutral-50 dark:bg-neutral-900 rounded-2xl">
                  <UserIcon className="w-6 h-6" />
                  <span className="text-xs font-medium">Profile</span>
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

const Hero = ({ onShopNow }: { onShopNow: () => void }) => {
  return (
    <section className="relative h-[85vh] flex items-center overflow-hidden">
      <div className="absolute inset-0 z-0">
        <img 
          src="https://picsum.photos/seed/luxury-hero/1920/1080" 
          alt="Luxury Experience" 
          className="w-full h-full object-cover opacity-80"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-neutral-50 via-neutral-50/50 to-transparent dark:from-neutral-950 dark:via-neutral-950/50" />
      </div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
        <motion.div 
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="max-w-xl"
        >
          <span className="inline-block px-4 py-1.5 bg-black/5 dark:bg-white/10 rounded-full text-xs font-bold tracking-widest uppercase mb-6">
            Season Collection 2026
          </span>
          <h1 className="font-display text-6xl md:text-8xl font-bold leading-[0.9] mb-8">
            Redefine Your <br />
            <span className="text-neutral-500 italic">Lifestyle.</span>
          </h1>
          <p className="text-lg text-neutral-600 dark:text-neutral-400 mb-10 max-w-md">
            Explore the intersection of high-performance technology and sustainable luxury fashion.
          </p>
          <div className="flex items-center gap-4">
            <button onClick={onShopNow} className="btn-primary flex items-center gap-2">
              Shop Collection <ArrowRight className="w-4 h-4" />
            </button>
            <button className="btn-outline">Watch Film</button>
          </div>
        </motion.div>
      </div>

      {/* Floating Elements Animation */}
      <div className="hidden lg:block absolute right-[10%] top-[20%] w-64 h-64 bg-neutral-200/20 dark:bg-white/5 rounded-full blur-3xl animate-pulse" />
    </section>
  );
};

interface ProductCardProps {
  key?: React.Key;
  product: Product; 
  onOpen: (p: Product) => void;
  onAddToCart: (p: Product) => void;
  onToggleWishlist: (p: Product) => void;
  isWishlisted: boolean;
}

const ProductCard = ({ 
  product, 
  onOpen, 
  onAddToCart, 
  onToggleWishlist,
  isWishlisted 
}: ProductCardProps) => {
  return (
    <motion.div 
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="group relative bg-white dark:bg-neutral-900 rounded-3xl overflow-hidden card-hover"
    >
      {/* Product Image */}
      <div className="aspect-square overflow-hidden relative cursor-pointer" onClick={() => onOpen(product)}>
        <img 
          src={product.image} 
          alt={product.name} 
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-black/5 opacity-0 group-hover:opacity-100 transition-opacity" />
        
        {/* Wishlist Button */}
        <button 
          onClick={(e) => { e.stopPropagation(); onToggleWishlist(product); }}
          className={`absolute top-4 right-4 p-2.5 rounded-full backdrop-blur-md transition-all ${
            isWishlisted ? 'bg-red-500 text-white' : 'bg-white/80 dark:bg-black/80 text-neutral-900 dark:text-white hover:scale-110'
          }`}
        >
          <Heart className={`w-5 h-5 ${isWishlisted ? 'fill-current' : ''}`} />
        </button>

        {/* Category Tag */}
        <div className="absolute bottom-4 left-4">
           <span className="px-3 py-1 bg-white/90 dark:bg-black/90 text-[10px] font-bold uppercase tracking-wider rounded-full shadow-sm">
            {product.category}
          </span>
        </div>
      </div>

      {/* Product Info */}
      <div className="p-6">
        <div className="flex justify-between items-start mb-2">
          <div>
            <h3 className="font-display text-xl font-bold group-hover:text-neutral-600 dark:group-hover:text-neutral-400 transition-colors">{product.name}</h3>
            <div className="flex items-center gap-1 mt-1">
              <Star className="w-3.5 h-3.5 fill-yellow-400 text-yellow-400" />
              <span className="text-xs font-medium text-neutral-500">{product.rating}</span>
            </div>
          </div>
          <span className="font-mono font-medium text-lg">${product.price.toFixed(2)}</span>
        </div>
        
        <button 
          onClick={() => onAddToCart(product)}
          className="w-full mt-4 flex items-center justify-center gap-2 py-3 bg-neutral-100 dark:bg-neutral-800 rounded-2xl font-bold text-sm hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black transition-all"
        >
          <Plus className="w-4 h-4" /> Add to Cart
        </button>
      </div>
    </motion.div>
  );
};

// --- Main App ---

export default function App() {
  const [cart, setCart] = useState<CartItem[]>(() => {
    const saved = localStorage.getItem('cart');
    return saved ? JSON.parse(saved) : [];
  });
  const [wishlist, setWishlist] = useState<string[]>(() => {
    const saved = localStorage.getItem('wishlist');
    return saved ? JSON.parse(saved) : [];
  });
  const [selectedCategory, setSelectedCategory] = useState<CategoryType>('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [isDark, setIsDark] = useState(() => {
    const saved = localStorage.getItem('theme');
    return saved === 'dark' || (!saved && window.matchMedia('(prefers-color-scheme: dark)').matches);
  });
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isWishlistOpen, setIsWishlistOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isUserModalOpen, setIsUserModalOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [showToast, setShowToast] = useState<{message: string, type: 'success' | 'info'} | null>(null);

  const orderHistory = [
    { id: 'ORD-9921', date: 'Oct 24, 2025', total: 454.99, status: 'Delivered' },
    { id: 'ORD-8812', date: 'Sep 12, 2025', total: 120.00, status: 'Shipped' },
  ];

  // Actions
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    localStorage.setItem('wishlist', JSON.stringify(wishlist));
  }, [wishlist]);

  useEffect(() => {
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
    if (isDark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDark]);

  // Filtering
  const filteredProducts = useMemo(() => {
    return PRODUCTS.filter(p => {
      const matchesCategory = selectedCategory === 'All' || p.category === selectedCategory;
      const matchesSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                           p.category.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [selectedCategory, searchQuery]);

  // Actions
  const addToCart = (product: Product) => {
    setCart(prev => {
      const existing = prev.find(item => item.id === product.id);
      if (existing) {
        return prev.map(item => item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item);
      }
      return [...prev, { ...product, quantity: 1 }];
    });
    triggerToast(`Added ${product.name} to cart`, 'success');
  };

  const removeFromCart = (id: string) => {
    setCart(prev => prev.filter(item => item.id !== id));
  };

  const updateQuantity = (id: string, delta: number) => {
    setCart(prev => prev.map(item => {
      if (item.id === id) {
        const newQty = Math.max(1, item.quantity + delta);
        return { ...item, quantity: newQty };
      }
      return item;
    }));
  };

  const toggleWishlist = (product: Product) => {
    setWishlist(prev => {
      if (prev.includes(product.id)) {
        triggerToast(`Removed from wishlist`, 'info');
        return prev.filter(id => id !== product.id);
      }
      triggerToast(`Saved to wishlist`, 'success');
      return [...prev, product.id];
    });
  };

  const triggerToast = (message: string, type: 'success' | 'info' = 'success') => {
    setShowToast({ message, type });
    setTimeout(() => setShowToast(null), 3000);
  };

  const totalPrice = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div className="min-h-screen font-sans">
      <Navbar 
        cartCount={cartCount} 
        wishlistCount={wishlist.length} 
        onOpenCart={() => setIsCartOpen(true)} 
        onOpenWishlist={() => setIsWishlistOpen(true)}
        onOpenUser={() => setIsUserModalOpen(true)}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        toggleTheme={() => setIsDark(!isDark)}
        isDark={isDark}
      />

      <main className="pt-20">
        <Hero onShopNow={() => document.getElementById('products-grid')?.scrollIntoView({ behavior: 'smooth' })} />
        
        {/* Categories Scroller */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="flex items-center gap-4 overflow-x-auto pb-4 no-scrollbar">
            {CATEGORIES.map(cat => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat as CategoryType)}
                className={`flex-shrink-0 px-8 py-3 rounded-full font-bold text-sm transition-all ${
                  selectedCategory === cat 
                    ? 'bg-black text-white dark:bg-white dark:text-black shadow-lg scale-105' 
                    : 'bg-neutral-100 dark:bg-neutral-900 text-neutral-500 hover:bg-neutral-200 dark:hover:bg-neutral-800'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Products Grid */}
        <section id="products-grid" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="flex justify-between items-end mb-12">
            <div>
              <h2 className="font-display text-4xl font-bold mb-2">Featured Products</h2>
              <p className="text-neutral-500">Handpicked items for your lifestyle.</p>
            </div>
            <div className="flex gap-2">
              <button className="p-2.5 bg-neutral-100 dark:bg-neutral-900 rounded-xl"><LayoutGrid className="w-5 h-5" /></button>
              <button className="p-2.5 bg-neutral-100 dark:bg-neutral-900 rounded-xl"><Filter className="w-5 h-5" /></button>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            <AnimatePresence mode="popLayout">
              {filteredProducts.map((product) => (
                <ProductCard 
                  key={product.id}
                  product={product as Product}
                  onOpen={setSelectedProduct}
                  onAddToCart={addToCart}
                  onToggleWishlist={toggleWishlist}
                  isWishlisted={wishlist.includes(product.id)}
                />
              ))}
            </AnimatePresence>
          </div>

          {filteredProducts.length === 0 && (
            <div className="py-24 text-center">
              <div className="w-20 h-20 bg-neutral-100 dark:bg-neutral-900 rounded-full flex items-center justify-center mx-auto mb-6">
                <Search className="w-8 h-8 text-neutral-400" />
              </div>
              <h3 className="text-xl font-bold mb-2">No results found</h3>
              <p className="text-neutral-500">Try adjusting your filters or search keywords.</p>
            </div>
          )}

          {/* AI-Like Recommendation Segment */}
          {selectedCategory !== 'All' && filteredProducts.length > 0 && (
            <div className="mt-32 p-12 bg-black text-white dark:bg-white dark:text-black rounded-[40px] overflow-hidden relative">
              <div className="relative z-10">
                <h3 className="font-display text-4xl font-bold mb-4 italic">Just for You.</h3>
                <p className="text-neutral-400 dark:text-neutral-500 mb-8 max-w-md">Our algorithm suggests these items based on your interest in {selectedCategory}.</p>
                <div className="flex gap-4">
                  {PRODUCTS.filter(p => p.category !== selectedCategory).slice(0, 2).map(p => (
                    <div key={p.id} className="flex items-center gap-4 bg-white/10 dark:bg-black/10 p-4 rounded-2xl backdrop-blur-md border border-white/10">
                      <img src={p.image} alt={p.name} className="w-12 h-12 rounded-lg object-cover" />
                      <div>
                        <p className="text-sm font-bold truncate w-32">{p.name}</p>
                        <p className="text-xs text-neutral-400">${p.price}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="absolute right-[-10%] top-[-20%] w-96 h-96 bg-white/5 dark:bg-black/5 rounded-full blur-3xl" />
            </div>
          )}
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-neutral-100 dark:bg-neutral-900 pt-24 pb-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-20">
            <div className="col-span-1 md:col-span-1">
              <div className="flex items-center gap-2 mb-6">
                <div className="w-8 h-8 bg-black dark:bg-white rounded-lg flex items-center justify-center">
                  <ShoppingBag className="text-white dark:text-black w-5 h-5" />
                </div>
                <span className="font-display text-xl font-bold">LUXE</span>
              </div>
              <p className="text-neutral-500 text-sm leading-relaxed mb-8">
                The premier destination for modern luxury. Combining technology with sophisticated design to elevate your daily life.
              </p>
              <div className="flex gap-4">
                 <div className="w-10 h-10 bg-white dark:bg-black rounded-full flex items-center justify-center border border-neutral-200 dark:border-neutral-800 cursor-pointer hover:border-black transition-colors">
                  <span className="text-xs font-bold">IG</span>
                 </div>
                 <div className="w-10 h-10 bg-white dark:bg-black rounded-full flex items-center justify-center border border-neutral-200 dark:border-neutral-800 cursor-pointer hover:border-black transition-colors">
                  <span className="text-xs font-bold">TW</span>
                 </div>
                 <div className="w-10 h-10 bg-white dark:bg-black rounded-full flex items-center justify-center border border-neutral-200 dark:border-neutral-800 cursor-pointer hover:border-black transition-colors">
                  <span className="text-xs font-bold">FB</span>
                 </div>
              </div>
            </div>

            <div>
              <h4 className="font-bold mb-6">Shop</h4>
              <ul className="space-y-4 text-sm text-neutral-500">
                <li onClick={() => { setSelectedCategory('All' as CategoryType); document.getElementById('products-grid')?.scrollIntoView({ behavior: 'smooth' }); }} className="hover:text-black dark:hover:text-white cursor-pointer transition-colors">New Arrivals</li>
                <li onClick={() => { setSelectedCategory('Electronics' as CategoryType); document.getElementById('products-grid')?.scrollIntoView({ behavior: 'smooth' }); }} className="hover:text-black dark:hover:text-white cursor-pointer transition-colors">Electronics</li>
                <li onClick={() => { setSelectedCategory('Fashion' as CategoryType); document.getElementById('products-grid')?.scrollIntoView({ behavior: 'smooth' }); }} className="hover:text-black dark:hover:text-white cursor-pointer transition-colors">Fashion</li>
                <li onClick={() => { setSelectedCategory('Shoes' as CategoryType); document.getElementById('products-grid')?.scrollIntoView({ behavior: 'smooth' }); }} className="hover:text-black dark:hover:text-white cursor-pointer transition-colors">Footwear</li>
              </ul>
            </div>

            <div>
              <h4 className="font-bold mb-6">Customer Care</h4>
              <ul className="space-y-4 text-sm text-neutral-500">
                <li onClick={() => triggerToast("Support Center is available 24/7", "info")} className="hover:text-black dark:hover:text-white cursor-pointer transition-colors">Support Center</li>
                <li onClick={() => triggerToast("Free shipping on all orders this month", "info")} className="hover:text-black dark:hover:text-white cursor-pointer transition-colors">Shipping Info</li>
                <li onClick={() => triggerToast("30-day hassle-free returns", "info")} className="hover:text-black dark:hover:text-white cursor-pointer transition-colors">Return Policy</li>
                <li onClick={() => triggerToast("Gift Cards available in profile settings", "info")} className="hover:text-black dark:hover:text-white cursor-pointer transition-colors">Gift Cards</li>
              </ul>
            </div>

            <div>
              <h4 className="font-bold mb-6">Stay Updated</h4>
              <p className="text-sm text-neutral-500 mb-6">Subscribe to get the latest news and early access to drops.</p>
              <div className="relative">
                <input 
                  type="email" 
                  placeholder="Email address" 
                  className="w-full bg-white dark:bg-black border border-neutral-200 dark:border-neutral-800 rounded-xl py-3 px-4 focus:ring-1 focus:ring-black dark:focus:ring-white transition-all outline-none"
                />
                <button className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 bg-black dark:bg-white text-white dark:text-black rounded-lg flex items-center justify-center transition-transform hover:scale-110">
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>

          <div className="pt-8 border-t border-neutral-200 dark:border-neutral-800 flex flex-col md:flex-row justify-between items-center gap-4 text-[10px] uppercase font-bold tracking-widest text-neutral-400">
            <span>© 2026 LUXECommerce All rights reserved.</span>
            <div className="flex gap-8">
              <span className="hover:text-neutral-600 dark:hover:text-neutral-200 cursor-pointer transition-colors">Privacy Policy</span>
              <span className="hover:text-neutral-600 dark:hover:text-neutral-200 cursor-pointer transition-colors">Terms of Service</span>
            </div>
          </div>
        </div>
      </footer>

      {/* --- Drawers & Modals --- */}
      
      {/* Cart Drawer */}
      <AnimatePresence>
        {isCartOpen && (
          <>
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsCartOpen(false)}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[60]"
            />
            <motion.div 
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed top-0 right-0 h-screen w-full max-w-md bg-white dark:bg-neutral-950 z-[70] shadow-2xl flex flex-col"
            >
              <div className="p-8 border-b border-neutral-100 dark:border-neutral-900 flex justify-between items-center">
                <h2 className="font-display text-3xl font-bold">Your Bag</h2>
                <button onClick={() => setIsCartOpen(false)} className="p-2 hover:bg-neutral-100 dark:hover:bg-neutral-900 rounded-full"><X /></button>
              </div>

              <div className="flex-1 overflow-y-auto p-8 space-y-8 scroll-smooth">
                {cart.length === 0 ? (
                  <div className="h-full flex flex-col items-center justify-center text-center">
                    <ShoppingBag className="w-16 h-16 text-neutral-200 mb-6" />
                    <h3 className="text-xl font-bold mb-2">Cart is empty</h3>
                    <p className="text-neutral-500 mb-8">Looks like you haven't added anything to your bag yet.</p>
                    <button onClick={() => setIsCartOpen(false)} className="btn-primary">Start Shopping</button>
                  </div>
                ) : (
                  cart.map(item => (
                    <div key={item.id} className="flex gap-6 group">
                      <div className="relative w-24 h-24 rounded-2xl overflow-hidden bg-neutral-100 dark:bg-neutral-900 flex-shrink-0">
                        <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                      </div>
                      <div className="flex-1 flex flex-col justify-between py-1">
                        <div className="flex justify-between items-start">
                          <div>
                            <h4 className="font-bold">{item.name}</h4>
                            <p className="text-xs text-neutral-500 mt-1">{item.category}</p>
                          </div>
                          <button onClick={() => removeFromCart(item.id)} className="text-neutral-300 hover:text-red-500 transition-colors">
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                        <div className="flex justify-between items-center mt-4">
                          <div className="flex items-center bg-neutral-100 dark:bg-neutral-900 rounded-lg p-1">
                            <button onClick={() => updateQuantity(item.id, -1)} className="p-1 hover:bg-white dark:hover:bg-neutral-800 rounded-md transition-colors"><Minus className="w-3 h-3" /></button>
                            <span className="w-8 text-center text-sm font-bold">{item.quantity}</span>
                            <button onClick={() => updateQuantity(item.id, 1)} className="p-1 hover:bg-white dark:hover:bg-neutral-800 rounded-md transition-colors"><Plus className="w-3 h-3" /></button>
                          </div>
                          <span className="font-mono font-bold">${(item.price * item.quantity).toFixed(2)}</span>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>

              {cart.length > 0 && (
                <div className="p-8 bg-neutral-50 dark:bg-neutral-900/50 border-t border-neutral-200 dark:border-neutral-800">
                  <div className="flex justify-between mb-2">
                    <span className="text-neutral-500">Subtotal</span>
                    <span className="font-mono">${totalPrice.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between mb-8">
                    <span className="text-neutral-500">Shipping</span>
                    <span className="text-green-500 font-bold uppercase text-[10px] tracking-widest bg-green-500/10 px-2 flex items-center rounded">Free</span>
                  </div>
                  <div className="flex justify-between mb-8 items-end">
                    <span className="text-xl font-bold">Total</span>
                    <span className="text-3xl font-display font-bold">${totalPrice.toFixed(2)}</span>
                  </div>
                  <button 
                    onClick={() => { setIsCartOpen(false); setIsCheckoutOpen(true); }}
                    className="w-full btn-primary py-4 text-lg"
                  >
                    Proceed to Checkout
                  </button>
                </div>
              )}
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Product Detail Modal */}
      <AnimatePresence>
        {selectedProduct && (
          <>
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedProduct(null)}
              className="fixed inset-0 bg-black/80 backdrop-blur-md z-[80]"
            />
            <motion.div 
              initial={{ scale: 0.9, opacity: 0, y: 50 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 50 }}
              className="fixed inset-4 md:inset-x-20 md:inset-y-10 lg:inset-x-64 lg:inset-y-20 bg-white dark:bg-neutral-950 z-[90] rounded-[40px] overflow-hidden flex flex-col md:flex-row"
            >
              <button 
                onClick={() => setSelectedProduct(null)}
                className="absolute top-8 right-8 z-10 p-3 bg-black/5 dark:bg-white/10 hover:bg-black/10 dark:hover:bg-white/20 rounded-full transition-colors"
              >
                <X className="w-6 h-6" />
              </button>

              <div className="w-full md:w-1/2 h-full bg-neutral-100 dark:bg-neutral-900 group">
                <img 
                  src={selectedProduct.image} 
                  alt={selectedProduct.name} 
                  className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
                  referrerPolicy="no-referrer"
                />
              </div>

              <div className="w-full md:w-1/2 h-full overflow-y-auto p-8 md:p-16 flex flex-col">
                <div className="flex-1">
                  <div className="flex items-center gap-4 mb-6">
                    <span className="px-4 py-1.5 bg-neutral-100 dark:bg-neutral-900 rounded-full text-xs font-bold uppercase tracking-widest">{selectedProduct.category}</span>
                    <div className="flex items-center gap-1.5 ">
                      <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                      <span className="font-bold text-sm">{selectedProduct.rating}</span>
                      <span className="text-neutral-400 text-xs">(128 reviews)</span>
                    </div>
                  </div>
                  
                  <h2 className="font-display text-4xl md:text-5xl font-bold mb-6 leading-tight">{selectedProduct.name}</h2>
                  <p className="text-3xl font-mono mb-10 text-neutral-400">$<span className="text-black dark:text-white">{selectedProduct.price.toFixed(2)}</span></p>
                  
                  <div className="space-y-8 mb-12">
                    <div>
                      <h4 className="text-xs font-bold uppercase tracking-widest text-neutral-400 mb-4">Description</h4>
                      <p className="text-neutral-600 dark:text-neutral-400 leading-relaxed font-medium">
                        {selectedProduct.description}
                      </p>
                    </div>

                    <div>
                      <h4 className="text-xs font-bold uppercase tracking-widest text-neutral-400 mb-4">Specifications</h4>
                      <div className="grid grid-cols-2 gap-y-4 gap-x-8">
                        {Object.entries(selectedProduct.specifications).map(([key, val]) => (
                          <div key={key}>
                            <span className="block text-[10px] text-neutral-400 uppercase font-bold tracking-tighter mb-1">{key}</span>
                            <span className="text-sm font-medium">{val}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex gap-4 pt-8 border-t border-neutral-100 dark:border-neutral-900 mt-auto">
                  <button 
                     onClick={() => { addToCart(selectedProduct); setSelectedProduct(null); }}
                     className="flex-1 btn-primary flex items-center justify-center gap-3 py-5 text-lg"
                  >
                    <Plus className="w-6 h-6" /> Add to Bag
                  </button>
                  <button 
                    onClick={() => toggleWishlist(selectedProduct)}
                    className={`p-5 rounded-full aspect-square flex items-center justify-center transition-all ${
                      wishlist.includes(selectedProduct.id) 
                        ? 'bg-red-500 text-white' 
                        : 'bg-neutral-100 dark:bg-neutral-900 hover:bg-neutral-200 dark:hover:bg-neutral-800'
                    }`}
                  >
                    <Heart className={`w-6 h-6 ${wishlist.includes(selectedProduct.id) ? 'fill-current' : ''}`} />
                  </button>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Checkout Modal */}
      <AnimatePresence>
        {isCheckoutOpen && (
          <>
            <motion.div 
               initial={{ opacity: 0 }}
               animate={{ opacity: 1 }}
               exit={{ opacity: 0 }}
               className="fixed inset-0 bg-neutral-50 dark:bg-neutral-950 z-[100]"
            />
            <motion.div 
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 20, opacity: 0 }}
              className="fixed inset-0 z-[110] flex flex-col md:flex-row overflow-hidden"
            >
              {/* Left Side: Summary (Mobile First) */}
              <div className="w-full md:w-1/3 bg-neutral-100 dark:bg-neutral-900 p-8 md:p-12 order-2 md:order-1 overflow-y-auto">
                <button onClick={() => setIsCheckoutOpen(false)} className="hidden md:flex items-center gap-2 text-neutral-400 hover:text-black dark:hover:text-white transition-colors mb-12">
                   <Minus className="w-4 h-4 rotate-90" /> Back to Bag
                </button>
                
                <h3 className="font-display text-3xl font-bold mb-8">Order Summary</h3>
                <div className="space-y-6 mb-12">
                  {cart.map(item => (
                    <div key={item.id} className="flex gap-4">
                      <div className="w-16 h-16 rounded-xl overflow-hidden bg-white dark:bg-black flex-shrink-0">
                        <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                      </div>
                      <div className="flex-1 flex justify-between items-center">
                        <div>
                          <p className="font-bold text-sm">{item.name}</p>
                          <p className="text-xs text-neutral-400">Qty: {item.quantity}</p>
                        </div>
                        <span className="font-mono text-sm">${(item.price * item.quantity).toFixed(2)}</span>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="space-y-4 pt-8 border-t border-neutral-200 dark:border-neutral-800">
                  <div className="flex justify-between text-neutral-500">
                    <span>Subtotal</span>
                    <span>${totalPrice.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-neutral-500">
                    <span>Shipping</span>
                    <span className="text-green-500 font-bold">FREE</span>
                  </div>
                  <div className="flex justify-between items-end pt-4">
                    <span className="text-xl font-bold">Total</span>
                    <span className="text-3xl font-display font-bold">${totalPrice.toFixed(2)}</span>
                  </div>
                </div>
              </div>

              {/* Right Side: Form */}
              <div className="w-full md:w-2/3 bg-white dark:bg-neutral-950 p-8 md:p-24 order-1 md:order-2 overflow-y-auto">
                 <button onClick={() => setIsCheckoutOpen(false)} className="md:hidden flex items-center gap-2 text-neutral-400 mb-8">
                   <ChevronRight className="w-4 h-4 rotate-180" /> Back
                </button>
                
                <div className="max-w-xl mx-auto">
                  <h2 className="font-display text-4xl font-bold mb-4">Checkout</h2>
                  <p className="text-neutral-500 mb-12">Complete your order by providing your shipping and payment details.</p>

                  <form onSubmit={(e) => {
                    e.preventDefault();
                    triggerToast('Order placed successfully!', 'success');
                    setIsCheckoutOpen(false);
                    setCart([]);
                  }} className="space-y-10">
                    <div className="space-y-6">
                      <h4 className="text-xs font-bold uppercase tracking-widest text-neutral-400">Contact Information</h4>
                      <input type="email" placeholder="Email Address" required className="w-full p-4 bg-neutral-50 dark:bg-neutral-900 border-none rounded-2xl focus:ring-2 focus:ring-black dark:focus:ring-white transition-all" />
                    </div>

                    <div className="space-y-6">
                      <h4 className="text-xs font-bold uppercase tracking-widest text-neutral-400">Shipping Address</h4>
                      <div className="grid grid-cols-2 gap-4">
                        <input type="text" placeholder="First Name" required className="w-full p-4 bg-neutral-50 dark:bg-neutral-900 border-none rounded-2xl" />
                        <input type="text" placeholder="Last Name" required className="w-full p-4 bg-neutral-50 dark:bg-neutral-900 border-none rounded-2xl" />
                      </div>
                      <input type="text" placeholder="Address line 1" required className="w-full p-4 bg-neutral-50 dark:bg-neutral-900 border-none rounded-2xl" />
                      <div className="grid grid-cols-2 gap-4">
                        <input type="text" placeholder="City" required className="w-full p-4 bg-neutral-50 dark:bg-neutral-900 border-none rounded-2xl" />
                        <input type="text" placeholder="Postal Code" required className="w-full p-4 bg-neutral-50 dark:bg-neutral-900 border-none rounded-2xl" />
                      </div>
                    </div>

                    <div className="space-y-6">
                       <h4 className="text-xs font-bold uppercase tracking-widest text-neutral-400">Payment Details</h4>
                       <div className="relative">
                        <input type="text" placeholder="Card Number" required className="w-full p-4 bg-neutral-50 dark:bg-neutral-900 border-none rounded-2xl" />
                        <div className="absolute right-4 top-1/2 -translate-y-1/2 flex gap-2">
                          <div className="w-8 h-5 bg-blue-600 rounded-sm"></div>
                          <div className="w-8 h-5 bg-orange-500 rounded-sm"></div>
                        </div>
                       </div>
                       <div className="grid grid-cols-2 gap-4">
                         <input type="text" placeholder="Exp Date (MM/YY)" required className="w-full p-4 bg-neutral-50 dark:bg-neutral-900 border-none rounded-2xl" />
                         <input type="text" placeholder="CVV" required className="w-full p-4 bg-neutral-50 dark:bg-neutral-900 border-none rounded-2xl" />
                       </div>
                    </div>

                    <button type="submit" className="w-full btn-primary py-5 text-xl font-bold flex items-center justify-center gap-3">
                      Place Order <CheckCircle2 className="w-6 h-6" />
                    </button>
                  </form>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Persistence / Toast */}
      <AnimatePresence>
        {showToast && (
          <motion.div 
            initial={{ y: 50, opacity: 0, scale: 0.8 }}
            animate={{ y: 0, opacity: 1, scale: 1 }}
            exit={{ y: 50, opacity: 0, scale: 0.8 }}
            className={`fixed bottom-12 left-1/2 -translate-x-1/2 z-[200] px-8 py-4 rounded-full shadow-2xl flex items-center gap-4 ${
              showToast.type === 'success' ? 'bg-black text-white dark:bg-white dark:text-black' : 'bg-neutral-800 text-white'
            }`}
          >
            {showToast.type === 'success' ? <CheckCircle2 className="w-5 h-5 text-green-400" /> : <ShoppingBag className="w-5 h-5" />}
            <span className="font-bold text-sm tracking-tight">{showToast.message}</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Wishlist Drawer */}
      <AnimatePresence>
        {isWishlistOpen && (
          <>
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsWishlistOpen(false)}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[60]"
            />
            <motion.div 
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              className="fixed top-0 right-0 h-screen w-full max-w-md bg-white dark:bg-neutral-950 z-[70] shadow-2xl flex flex-col"
            >
              <div className="p-8 border-b border-neutral-100 dark:border-neutral-900 flex justify-between items-center">
                <h2 className="font-display text-3xl font-bold">Favorites</h2>
                <button onClick={() => setIsWishlistOpen(false)} className="p-2 hover:bg-neutral-100 rounded-full"><X /></button>
              </div>

              <div className="flex-1 overflow-y-auto p-8 space-y-8">
                {wishlist.length === 0 ? (
                  <div className="h-full flex flex-col items-center justify-center text-center">
                    <Heart className="w-16 h-16 text-neutral-200 mb-6" />
                    <h3 className="text-xl font-bold mb-2">No favorites yet</h3>
                    <button onClick={() => setIsWishlistOpen(false)} className="btn-primary">Explore Products</button>
                  </div>
                ) : (
                  PRODUCTS.filter(p => wishlist.includes(p.id)).map(product => (
                    <div key={product.id} className="flex gap-6 group">
                      <div className="relative w-24 h-24 rounded-2xl overflow-hidden bg-neutral-100 flex-shrink-0">
                        <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
                      </div>
                      <div className="flex-1 flex flex-col justify-between py-1">
                         <div className="flex justify-between items-start">
                          <div>
                            <h4 className="font-bold">{product.name}</h4>
                            <p className="text-xs text-neutral-500 mt-1">${product.price.toFixed(2)}</p>
                          </div>
                          <button onClick={() => toggleWishlist(product)} className="text-red-500">
                             <Heart className="w-4 h-4 fill-current" />
                          </button>
                        </div>
                        <button 
                           onClick={() => { addToCart(product); setIsWishlistOpen(false); }}
                           className="w-full py-2 bg-neutral-100 dark:bg-neutral-900 rounded-xl text-xs font-bold hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black transition-colors"
                        >
                          Add to Cart
                        </button>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* User Profile Modal */}
      <AnimatePresence>
        {isUserModalOpen && (
          <>
            <motion.div 
               initial={{ opacity: 0 }}
               animate={{ opacity: 1 }}
               exit={{ opacity: 0 }}
               onClick={() => setIsUserModalOpen(false)}
               className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[150]"
            />
            <motion.div 
               initial={{ scale: 0.95, opacity: 0 }}
               animate={{ scale: 1, opacity: 1 }}
               exit={{ scale: 0.95, opacity: 0 }}
               className="fixed inset-4 md:inset-x-64 md:inset-y-24 bg-white dark:bg-neutral-950 z-[160] rounded-[40px] overflow-hidden flex flex-col md:flex-row shadow-2xl"
            >
              <div className="w-full md:w-1/3 bg-neutral-100 dark:bg-neutral-900 p-12 border-b md:border-b-0 md:border-r border-neutral-200 dark:border-neutral-800">
                <div className="flex flex-col items-center text-center">
                   <div className="w-32 h-32 rounded-full bg-white dark:bg-black border-4 border-white dark:border-neutral-800 shadow-xl flex items-center justify-center mb-6 overflow-hidden">
                      <UserIcon className="w-16 h-16 text-neutral-400" />
                   </div>
                   <h3 className="text-2xl font-display font-bold mb-1">Alex Simmons</h3>
                   <p className="text-sm text-neutral-500 mb-8">Premium Member</p>
                   <div className="w-full space-y-2">
                     <button className="w-full py-3 bg-black dark:bg-white text-white dark:text-black rounded-xl font-bold text-sm">Edit Profile</button>
                     <button className="w-full py-3 border border-neutral-200 dark:border-neutral-800 rounded-xl font-bold text-sm hover:bg-neutral-50 dark:hover:bg-neutral-800 transition-colors">Sign Out</button>
                   </div>
                </div>
              </div>
              <div className="flex-1 p-12 overflow-y-auto">
                 <div className="flex justify-between items-center mb-8">
                   <h4 className="text-xl font-bold">Recent Orders</h4>
                   <button onClick={() => setIsUserModalOpen(false)} className="md:hidden"><X /></button>
                 </div>
                 <div className="space-y-4 mb-12">
                   {orderHistory.map(order => (
                     <div key={order.id} className="p-6 bg-neutral-50 dark:bg-neutral-900 rounded-2xl flex justify-between items-center group hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors">
                       <div>
                         <p className="font-bold mb-1">{order.id}</p>
                         <p className="text-xs text-neutral-400">{order.date}</p>
                       </div>
                       <div className="text-right">
                         <p className="font-mono font-bold mb-1">${order.total.toFixed(2)}</p>
                         <span className="text-[10px] font-bold uppercase tracking-widest text-green-500">{order.status}</span>
                       </div>
                     </div>
                   ))}
                 </div>

                 <h4 className="text-xl font-bold mb-6">Saved Addresses</h4>
                 <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                   <div className="p-6 border border-neutral-200 dark:border-neutral-800 rounded-2xl relative">
                     <span className="absolute top-4 right-4 bg-black text-white text-[8px] font-bold px-2 py-0.5 rounded uppercase">Default</span>
                     <p className="font-bold mb-2">Home</p>
                     <p className="text-xs text-neutral-500 leading-relaxed">
                       123 Luxury Avenue, Suite 400<br />
                       Beverly Hills, CA 90210
                     </p>
                   </div>
                   <div className="p-6 border border-dashed border-neutral-300 dark:border-neutral-700 rounded-2xl flex flex-col items-center justify-center text-neutral-400 cursor-pointer hover:border-black transition-colors">
                      <Plus className="w-6 h-6 mb-2" />
                      <span className="text-xs font-bold uppercase tracking-widest">Add New</span>
                   </div>
                 </div>
              </div>
               <button onClick={() => setIsUserModalOpen(false)} className="hidden md:block absolute top-8 right-8 p-2 hover:bg-neutral-100 dark:hover:bg-neutral-900 rounded-full transition-colors"><X /></button>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
