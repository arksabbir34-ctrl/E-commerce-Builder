import { Link } from "wouter";
import { ArrowRight, Truck, ShieldCheck, RefreshCw } from "lucide-react";
import { useProducts } from "@/hooks/use-products";
import { ProductCard } from "@/components/shop/ProductCard";
import { motion } from "framer-motion";

export default function Home() {
  const { data: products, isLoading } = useProducts();
  const featuredProducts = products?.slice(0, 4) || [];

  const features = [
    { icon: Truck, title: "Free Shipping", desc: "On all orders over $100" },
    { icon: ShieldCheck, title: "Secure Payment", desc: "100% secure processing" },
    { icon: RefreshCw, title: "30 Days Return", desc: "Easy return policy" },
  ];

  return (
    <div className="min-h-screen pt-20">
      {/* Hero Section */}
      <section className="relative h-[80vh] min-h-[600px] flex items-center">
        <div className="absolute inset-0 z-0">
          {/* landing page hero minimalist elegant interior */}
          <img 
            src="https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&q=80&w=2000"
            alt="Modern interior"
            className="w-full h-full object-cover brightness-[0.85]"
          />
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="max-w-2xl text-white"
          >
            <span className="text-sm font-bold tracking-widest uppercase mb-4 block text-primary-foreground/90">
              New Collection 2025
            </span>
            <h1 className="text-5xl md:text-7xl font-display font-bold leading-tight mb-6 text-balance">
              Elevate Your Everyday Space.
            </h1>
            <p className="text-lg md:text-xl text-white/80 mb-8 max-w-lg leading-relaxed">
              Discover our curated selection of premium minimalist pieces designed to bring harmony and style to your home.
            </p>
            <Link 
              href="/shop" 
              className="inline-flex items-center gap-2 bg-primary text-white px-8 py-4 rounded-xl font-semibold text-lg hover:bg-primary/90 transition-colors shadow-lg hover:shadow-primary/25 hover:-translate-y-1"
            >
              Shop Collection <ArrowRight className="w-5 h-5" />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Features Bar */}
      <section className="bg-background py-12 border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 divide-y md:divide-y-0 md:divide-x divide-border">
            {features.map((feature, idx) => (
              <div key={idx} className="flex items-center gap-4 pt-8 md:pt-0 first:pt-0 md:px-8 first:px-0 justify-center md:justify-start">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary shrink-0">
                  <feature.icon className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="font-semibold text-foreground">{feature.title}</h4>
                  <p className="text-sm text-muted-foreground">{feature.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-24 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-end mb-12">
            <div>
              <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground mb-4">Trending Now</h2>
              <p className="text-muted-foreground">Our most sought-after pieces this season.</p>
            </div>
            <Link href="/shop" className="hidden md:flex items-center gap-1 text-primary font-semibold hover:underline">
              View All <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          {isLoading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="aspect-[4/5] bg-muted animate-pulse rounded-2xl"></div>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {featuredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}
          
          <div className="mt-10 text-center md:hidden">
             <Link href="/shop" className="inline-flex items-center gap-2 text-primary font-semibold hover:underline">
              View All Products <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* Categories Banners */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <Link href="/shop?category=Furniture" className="group relative h-96 rounded-3xl overflow-hidden block">
              {/* aesthetic chair furniture */}
              <img src="https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&q=80" alt="Furniture" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex flex-col justify-end p-10">
                <h3 className="text-3xl font-display font-bold text-white mb-2">Furniture</h3>
                <span className="text-white/90 group-hover:text-primary transition-colors flex items-center gap-2">
                  Shop Category <ArrowRight className="w-4 h-4" />
                </span>
              </div>
            </Link>
            <Link href="/shop?category=Decor" className="group relative h-96 rounded-3xl overflow-hidden block">
              {/* modern vase decor minimal */}
              <img src="https://images.unsplash.com/photo-1513506003901-1e6a229e2d15?auto=format&fit=crop&q=80" alt="Decor" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex flex-col justify-end p-10">
                <h3 className="text-3xl font-display font-bold text-white mb-2">Minimal Decor</h3>
                <span className="text-white/90 group-hover:text-primary transition-colors flex items-center gap-2">
                  Shop Category <ArrowRight className="w-4 h-4" />
                </span>
              </div>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
