import { useState } from "react";
import { useParams } from "wouter";
import { Star, Minus, Plus, ShoppingCart, Truck, ShieldCheck, Heart } from "lucide-react";
import { useProduct, useProducts } from "@/hooks/use-products";
import { useCart } from "@/hooks/use-cart";
import { useToast } from "@/hooks/use-toast";
import { ProductCard } from "@/components/shop/ProductCard";

export default function ProductDetails() {
  const params = useParams();
  const id = Number(params.id);
  const { data: product, isLoading } = useProduct(id);
  const { data: allProducts } = useProducts();
  
  const [quantity, setQuantity] = useState(1);
  const addItem = useCart((state) => state.addItem);
  const { toast } = useToast();

  if (isLoading) {
    return (
      <div className="min-h-screen pt-32 pb-20 max-w-7xl mx-auto px-4 animate-pulse">
        <div className="flex flex-col md:flex-row gap-12">
          <div className="w-full md:w-1/2 aspect-square bg-muted rounded-3xl"></div>
          <div className="w-full md:w-1/2 space-y-6">
            <div className="h-10 bg-muted w-3/4 rounded"></div>
            <div className="h-6 bg-muted w-1/4 rounded"></div>
            <div className="h-32 bg-muted w-full rounded"></div>
            <div className="h-12 bg-muted w-full rounded"></div>
          </div>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen pt-32 pb-20 flex items-center justify-center">
        <h2 className="text-2xl font-display">Product not found.</h2>
      </div>
    );
  }

  const relatedProducts = allProducts
    ?.filter(p => p.category === product.category && p.id !== product.id)
    .slice(0, 4) || [];

  const handleAddToCart = () => {
    addItem(product, quantity);
    toast({
      title: "Added to cart",
      description: `${quantity} x ${product.name} added to your cart.`,
    });
  };

  return (
    <div className="min-h-screen pt-28 pb-20 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Breadcrumb */}
        <div className="text-sm text-muted-foreground mb-8">
          Home / Shop / {product.category} / <span className="text-foreground">{product.name}</span>
        </div>

        <div className="flex flex-col lg:flex-row gap-12 lg:gap-20 mb-24">
          {/* Image */}
          <div className="w-full lg:w-1/2">
            <div className="aspect-[4/5] md:aspect-square bg-muted rounded-3xl overflow-hidden relative">
              {product.isSale && (
                <div className="absolute top-6 left-6 z-10 bg-destructive text-destructive-foreground text-sm font-bold px-3 py-1.5 rounded-lg uppercase tracking-wider">
                  SALE
                </div>
              )}
              <img 
                src={product.image} 
                alt={product.name} 
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          {/* Details */}
          <div className="w-full lg:w-1/2 flex flex-col pt-4">
            <div className="mb-2 text-primary font-medium tracking-wide uppercase text-sm">
              {product.category}
            </div>
            <h1 className="text-4xl md:text-5xl font-display font-bold text-foreground mb-4 leading-tight">
              {product.name}
            </h1>
            
            <div className="flex items-center gap-4 mb-6">
              <div className="flex items-center gap-1">
                {[...Array(5)].map((_, i) => (
                  <Star 
                    key={i} 
                    className={`w-5 h-5 ${i < Math.floor(Number(product.rating)) ? "fill-amber-400 text-amber-400" : "fill-muted text-muted-foreground"}`} 
                  />
                ))}
              </div>
              <span className="text-sm text-muted-foreground underline cursor-pointer">
                {Number(product.rating).toFixed(1)} Rating
              </span>
            </div>

            <div className="text-3xl font-bold text-foreground mb-8">
              ${Number(product.price).toFixed(2)}
            </div>

            <p className="text-lg text-muted-foreground mb-10 leading-relaxed">
              {product.description}
            </p>

            {/* Actions */}
            <div className="flex flex-col sm:flex-row gap-4 mb-10">
              <div className="flex items-center border-2 border-border rounded-xl px-4 py-1 w-full sm:w-32 justify-between">
                <button 
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="p-2 text-muted-foreground hover:text-foreground transition-colors"
                >
                  <Minus className="w-4 h-4" />
                </button>
                <span className="font-semibold">{quantity}</span>
                <button 
                  onClick={() => setQuantity(quantity + 1)}
                  className="p-2 text-muted-foreground hover:text-foreground transition-colors"
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>
              
              <button 
                onClick={handleAddToCart}
                className="flex-1 bg-primary text-white py-4 rounded-xl font-semibold flex items-center justify-center gap-2 hover:bg-primary/90 transition-all shadow-lg hover:shadow-primary/25 hover:-translate-y-0.5 active:translate-y-0"
              >
                <ShoppingCart className="w-5 h-5" />
                Add to Cart
              </button>
              
              <button className="p-4 border-2 border-border rounded-xl text-foreground hover:border-primary hover:text-primary transition-colors flex items-center justify-center">
                <Heart className="w-5 h-5" />
              </button>
            </div>

            {/* Guarantees */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 py-8 border-y border-border">
              <div className="flex items-center gap-3">
                <Truck className="w-5 h-5 text-primary" />
                <span className="text-sm font-medium">Free Shipping & Returns</span>
              </div>
              <div className="flex items-center gap-3">
                <ShieldCheck className="w-5 h-5 text-primary" />
                <span className="text-sm font-medium">2 Year Warranty included</span>
              </div>
            </div>
          </div>
        </div>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <div className="pt-16 border-t border-border">
            <h3 className="text-3xl font-display font-bold mb-10 text-center">You May Also Like</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {relatedProducts.map(p => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
