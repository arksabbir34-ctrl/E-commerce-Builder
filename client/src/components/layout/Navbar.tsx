import { useState, useEffect } from "react";
import { Link, useLocation } from "wouter";
import { ShoppingBag, Search, Menu, X, User } from "lucide-react";
import { useCart } from "@/hooks/use-cart";
import { motion, AnimatePresence } from "framer-motion";

export function Navbar() {
  const [location, setLocation] = useLocation();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const cartItemCount = useCart((state) => state.getItemCount());

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      setLocation(`/shop?search=${encodeURIComponent(searchQuery.trim())}`);
      setMobileMenuOpen(false);
    }
  };

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "Shop", path: "/shop" },
    { name: "About", path: "/about" },
    { name: "Contact", path: "/contact" },
  ];

  return (
    <header 
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        isScrolled ? "glass-nav py-3 shadow-sm" : "bg-transparent py-5"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="text-2xl font-bold font-display tracking-tight text-foreground flex items-center gap-2">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center text-white">
              <ShoppingBag className="w-5 h-5" />
            </div>
            Lumina
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link 
                key={link.name} 
                href={link.path}
                className={`font-medium text-sm transition-colors hover:text-primary ${
                  location === link.path ? "text-primary" : "text-muted-foreground"
                }`}
              >
                {link.name}
              </Link>
            ))}
          </nav>

          {/* Actions */}
          <div className="flex items-center gap-4">
            <form onSubmit={handleSearch} className="hidden lg:flex relative">
              <input
                type="text"
                placeholder="Search products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 pr-4 py-2 bg-muted/50 border-none rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 w-48 transition-all focus:w-64 focus:bg-background"
              />
              <Search className="w-4 h-4 text-muted-foreground absolute left-3 top-1/2 -translate-y-1/2" />
            </form>

            <Link href="/cart" className="relative p-2 text-foreground hover:text-primary transition-colors">
              <ShoppingBag className="w-6 h-6" />
              <AnimatePresence>
                {cartItemCount > 0 && (
                  <motion.span
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    exit={{ scale: 0 }}
                    className="absolute top-0 right-0 bg-primary text-white text-[10px] font-bold w-5 h-5 rounded-full flex items-center justify-center border-2 border-white"
                  >
                    {cartItemCount}
                  </motion.span>
                )}
              </AnimatePresence>
            </Link>

            <button 
              className="md:hidden p-2 text-foreground"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-background border-b border-border absolute w-full overflow-hidden"
          >
            <div className="px-4 py-6 space-y-4 flex flex-col">
              <form onSubmit={handleSearch} className="relative w-full mb-4">
                <input
                  type="text"
                  placeholder="Search..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 bg-muted rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/20"
                />
                <Search className="w-4 h-4 text-muted-foreground absolute left-3 top-1/2 -translate-y-1/2" />
              </form>
              
              {navLinks.map((link) => (
                <Link 
                  key={link.name} 
                  href={link.path}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`text-lg font-medium p-2 rounded-lg ${
                    location === link.path ? "bg-primary/5 text-primary" : "text-foreground"
                  }`}
                >
                  {link.name}
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
