import { useState, useEffect } from "react";
import { useLocation } from "wouter";
import { Filter, SlidersHorizontal, ChevronDown } from "lucide-react";
import { useProducts } from "@/hooks/use-products";
import { ProductCard } from "@/components/shop/ProductCard";
import { CATEGORIES } from "@/data/products";

export default function Shop() {
  const [location] = useLocation();
  const searchParams = new URLSearchParams(window.location.search);
  const initialCategory = searchParams.get("category") || "All";
  const initialSearch = searchParams.get("search") || "";

  const [activeCategory, setActiveCategory] = useState(initialCategory);
  const [activeSearch, setActiveSearch] = useState(initialSearch);

  // Sync state with URL params
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    setActiveCategory(params.get("category") || "All");
    setActiveSearch(params.get("search") || "");
  }, [location]);

  const { data: products, isLoading } = useProducts({ 
    category: activeCategory !== "All" ? activeCategory : undefined,
    search: activeSearch || undefined
  });

  const categories = CATEGORIES;

  const handleCategoryClick = (cat: string) => {
    setActiveCategory(cat);
    const params = new URLSearchParams(window.location.search);
    if (cat === "All") {
      params.delete("category");
    } else {
      params.set("category", cat);
    }
    window.history.replaceState({}, "", `${window.location.pathname}?${params.toString()}`);
  };

  return (
    <div className="min-h-screen pt-24 pb-20 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Page Header */}
        <div className="mb-12">
          <h1 className="text-4xl md:text-5xl font-display font-bold text-foreground mb-4">
            {activeSearch ? `Search: ${activeSearch}` : (activeCategory === "All" ? "All Products" : activeCategory)}
          </h1>
          <p className="text-muted-foreground text-lg">
            Discover our complete collection of thoughtfully curated pieces.
          </p>
        </div>

        {/* Filters and Layout */}
        <div className="flex flex-col md:flex-row gap-8">
          
          {/* Sidebar Filters */}
          <aside className="w-full md:w-64 shrink-0">
            <div className="sticky top-28 bg-card rounded-2xl p-6 border border-border shadow-sm">
              <div className="flex items-center gap-2 mb-6 pb-4 border-b border-border">
                <Filter className="w-5 h-5 text-primary" />
                <h3 className="font-semibold text-lg">Filters</h3>
              </div>
              
              <div className="space-y-6">
                <div>
                  <h4 className="font-medium mb-3">Categories</h4>
                  <ul className="space-y-2">
                    {categories.map((cat) => (
                      <li key={cat}>
                        <button
                          onClick={() => handleCategoryClick(cat)}
                          className={`w-full text-left px-3 py-2 rounded-lg transition-colors ${
                            activeCategory === cat 
                              ? "bg-primary/10 text-primary font-medium" 
                              : "text-muted-foreground hover:bg-muted"
                          }`}
                        >
                          {cat}
                        </button>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </aside>

          {/* Product Grid */}
          <main className="flex-1">
            <div className="flex items-center justify-between mb-6">
              <p className="text-muted-foreground text-sm">
                Showing {products?.length || 0} products
              </p>
              <div className="flex items-center gap-2">
                <span className="text-sm text-muted-foreground">Sort by:</span>
                <button className="flex items-center gap-1 text-sm font-medium px-3 py-1.5 border border-border rounded-lg bg-card hover:bg-muted transition-colors">
                  Featured <ChevronDown className="w-4 h-4" />
                </button>
              </div>
            </div>

            {isLoading ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {[...Array(6)].map((_, i) => (
                  <div key={i} className="aspect-[4/5] bg-muted animate-pulse rounded-2xl"></div>
                ))}
              </div>
            ) : products?.length === 0 ? (
              <div className="text-center py-20 bg-muted/30 rounded-2xl border border-border border-dashed">
                <h3 className="text-xl font-display font-semibold mb-2">No products found</h3>
                <p className="text-muted-foreground mb-6">Try adjusting your search or filters.</p>
                <button 
                  onClick={() => handleCategoryClick("All")}
                  className="px-6 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors"
                >
                  Clear Filters
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {products?.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            )}
          </main>
        </div>
      </div>
    </div>
  );
}
