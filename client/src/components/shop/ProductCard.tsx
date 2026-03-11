import { Link } from "wouter";
import { Star, ShoppingCart } from "lucide-react";
import type { Product } from "@shared/schema";
import { useCart } from "@/hooks/use-cart";
import { useToast } from "@/hooks/use-toast";
import { motion } from "framer-motion";

export function ProductCard({ product }: { product: Product }) {
  const addItem = useCart((state) => state.addItem);
  const { toast } = useToast();

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addItem(product);
    toast({
      title: "Added to cart",
      description: `${product.name} has been added to your cart.`,
    });
  };

  return (
    <Link href={`/product/${product.id}`} className="group block h-full">
      <motion.div 
        whileHover={{ y: -5 }}
        className="bg-card rounded-2xl overflow-hidden border border-border/50 shadow-sm hover:shadow-xl transition-all duration-300 h-full flex flex-col"
      >
        <div className="relative aspect-[4/5] overflow-hidden bg-muted">
          {product.isSale && (
            <div className="absolute top-3 left-3 z-10 bg-destructive text-destructive-foreground text-xs font-bold px-2 py-1 rounded-md uppercase tracking-wider">
              SALE
            </div>
          )}
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
            loading="lazy"
          />
          
          {/* Quick Add Overlay */}
          <div className="absolute inset-x-0 bottom-0 p-4 opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300 ease-out">
            <button
              onClick={handleAddToCart}
              className="w-full bg-primary/90 backdrop-blur text-primary-foreground py-3 rounded-xl font-semibold flex items-center justify-center gap-2 hover:bg-primary transition-colors shadow-lg"
            >
              <ShoppingCart className="w-4 h-4" />
              Quick Add
            </button>
          </div>
        </div>

        <div className="p-5 flex flex-col flex-grow">
          <div className="text-xs text-muted-foreground mb-2 font-medium tracking-wide uppercase">
            {product.category}
          </div>
          <h3 className="font-display font-semibold text-lg text-foreground mb-1 leading-tight group-hover:text-primary transition-colors line-clamp-2">
            {product.name}
          </h3>
          
          <div className="flex items-center gap-1 mb-3">
            <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
            <span className="text-sm font-medium">{Number(product.rating).toFixed(1)}</span>
          </div>

          <div className="mt-auto flex items-center justify-between">
            <div className="text-xl font-bold text-foreground">
              ${Number(product.price).toFixed(2)}
            </div>
          </div>
        </div>
      </motion.div>
    </Link>
  );
}
