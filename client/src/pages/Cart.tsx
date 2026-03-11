import { Link, useLocation } from "wouter";
import { Trash2, Plus, Minus, ArrowRight, ShoppingBag } from "lucide-react";
import { useCart } from "@/hooks/use-cart";
import { motion, AnimatePresence } from "framer-motion";

export default function Cart() {
  const { items, updateQuantity, removeItem, getCartTotal } = useCart();
  const [, setLocation] = useLocation();

  const total = getCartTotal();
  const shipping = total > 100 ? 0 : 15;
  const grandTotal = total + shipping;

  if (items.length === 0) {
    return (
      <div className="min-h-[80vh] flex flex-col items-center justify-center px-4 bg-background">
        <div className="w-24 h-24 bg-primary/10 text-primary rounded-full flex items-center justify-center mb-6">
          <ShoppingBag className="w-12 h-12" />
        </div>
        <h2 className="text-3xl font-display font-bold mb-4">Your cart is empty</h2>
        <p className="text-muted-foreground mb-8 text-center max-w-md">
          Looks like you haven't added anything to your cart yet. Discover our latest products and collections.
        </p>
        <Link 
          href="/shop" 
          className="bg-primary text-white px-8 py-4 rounded-xl font-semibold hover:bg-primary/90 transition-colors"
        >
          Start Shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-28 pb-20 bg-muted/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-display font-bold text-foreground mb-10">Shopping Cart</h1>
        
        <div className="flex flex-col lg:flex-row gap-10">
          {/* Cart Items */}
          <div className="w-full lg:w-2/3">
            <div className="bg-card rounded-2xl border border-border shadow-sm overflow-hidden">
              <div className="p-6 border-b border-border hidden sm:grid grid-cols-12 gap-4 text-sm font-semibold text-muted-foreground uppercase tracking-wider">
                <div className="col-span-6">Product</div>
                <div className="col-span-3 text-center">Quantity</div>
                <div className="col-span-3 text-right">Total</div>
              </div>
              
              <div className="divide-y divide-border">
                <AnimatePresence>
                  {items.map((item) => (
                    <motion.div 
                      key={item.id}
                      layout
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      className="p-6 grid grid-cols-1 sm:grid-cols-12 gap-6 items-center"
                    >
                      <div className="col-span-1 sm:col-span-6 flex items-center gap-4">
                        <img 
                          src={item.image} 
                          alt={item.name} 
                          className="w-24 h-24 object-cover rounded-xl bg-muted"
                        />
                        <div>
                          <Link href={`/product/${item.id}`} className="font-display font-semibold text-lg hover:text-primary transition-colors line-clamp-1">
                            {item.name}
                          </Link>
                          <div className="text-muted-foreground text-sm mt-1 mb-2">{item.category}</div>
                          <div className="font-medium">${Number(item.price).toFixed(2)}</div>
                        </div>
                      </div>
                      
                      <div className="col-span-1 sm:col-span-3 flex justify-start sm:justify-center items-center">
                        <div className="flex items-center border border-border rounded-lg bg-background">
                          <button 
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            className="p-2 text-muted-foreground hover:text-foreground transition-colors"
                          >
                            <Minus className="w-3 h-3" />
                          </button>
                          <span className="w-8 text-center font-medium text-sm">{item.quantity}</span>
                          <button 
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            className="p-2 text-muted-foreground hover:text-foreground transition-colors"
                          >
                            <Plus className="w-3 h-3" />
                          </button>
                        </div>
                      </div>
                      
                      <div className="col-span-1 sm:col-span-3 flex justify-between sm:justify-end items-center">
                        <span className="sm:hidden text-muted-foreground">Total:</span>
                        <div className="flex items-center gap-4">
                          <span className="font-bold text-lg">
                            ${(Number(item.price) * item.quantity).toFixed(2)}
                          </span>
                          <button 
                            onClick={() => removeItem(item.id)}
                            className="text-muted-foreground hover:text-destructive transition-colors p-2"
                            title="Remove item"
                          >
                            <Trash2 className="w-5 h-5" />
                          </button>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>
            </div>
          </div>

          {/* Order Summary */}
          <div className="w-full lg:w-1/3">
            <div className="bg-card rounded-2xl border border-border shadow-sm p-6 lg:p-8 sticky top-28">
              <h3 className="text-xl font-display font-bold mb-6">Order Summary</h3>
              
              <div className="space-y-4 mb-6 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Subtotal</span>
                  <span className="font-medium">${total.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Shipping</span>
                  <span className="font-medium">
                    {shipping === 0 ? <span className="text-emerald-500 font-semibold">Free</span> : `$${shipping.toFixed(2)}`}
                  </span>
                </div>
                {shipping > 0 && (
                  <p className="text-xs text-muted-foreground mt-1">
                    Add ${(100 - total).toFixed(2)} more for free shipping!
                  </p>
                )}
              </div>
              
              <div className="border-t border-border pt-6 mb-8">
                <div className="flex justify-between items-center mb-2">
                  <span className="font-bold text-lg">Total</span>
                  <span className="font-bold text-2xl">${grandTotal.toFixed(2)}</span>
                </div>
                <p className="text-xs text-muted-foreground text-right">Including VAT</p>
              </div>
              
              <button 
                onClick={() => setLocation("/checkout")}
                className="w-full bg-primary text-primary-foreground py-4 rounded-xl font-semibold text-lg flex items-center justify-center gap-2 hover:bg-primary/90 transition-all shadow-lg hover:shadow-primary/25 hover:-translate-y-0.5"
              >
                Proceed to Checkout <ArrowRight className="w-5 h-5" />
              </button>
              
              <div className="mt-6 flex justify-center gap-4 opacity-60 grayscale">
                 <div className="w-10 h-6 bg-foreground rounded flex items-center justify-center text-[8px] text-background font-bold">VISA</div>
                 <div className="w-10 h-6 bg-foreground rounded flex items-center justify-center text-[8px] text-background font-bold">MC</div>
                 <div className="w-10 h-6 bg-foreground rounded flex items-center justify-center text-[8px] text-background font-bold">AMEX</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
