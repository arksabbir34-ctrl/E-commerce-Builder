import { useState } from "react";
import { useLocation } from "wouter";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { CheckCircle2, Lock, CreditCard, Calendar, ShieldCheck } from "lucide-react";
import { useCart } from "@/hooks/use-cart";
import { useCheckout } from "@/hooks/use-checkout";
import { useToast } from "@/hooks/use-toast";
import { insertOrderSchema } from "@shared/schema";
import { motion } from "framer-motion";

const checkoutSchema = insertOrderSchema.omit({ total: true, items: true }).extend({
  cardNumber: z.string()
    .min(1, "Card number is required")
    .transform(v => v.replace(/\s/g, ""))
    .pipe(z.string().length(16, "Card number must be 16 digits")),
  cardExpiry: z.string()
    .regex(/^\d{2}\/\d{2}$/, "Expiry must be MM/YY"),
  cardCvc: z.string()
    .regex(/^\d{3,4}$/, "CVV must be 3 or 4 digits"),
  cardName: z.string().min(2, "Cardholder name is required"),
});
type CheckoutForm = z.infer<typeof checkoutSchema>;

export default function Checkout() {
  const { items, getCartTotal, clearCart } = useCart();
  const [, setLocation] = useLocation();
  const { toast } = useToast();
  const [isSuccess, setIsSuccess] = useState(false);
  const [cardNumberDisplay, setCardNumberDisplay] = useState("");
  
  const total = getCartTotal();
  const shipping = total > 100 ? 0 : 15;
  const grandTotal = total + shipping;

  const { mutate, isPending } = useCheckout();

  const { register, handleSubmit, setValue, formState: { errors } } = useForm<CheckoutForm>({
    resolver: zodResolver(checkoutSchema),
  });

  // Redirect if cart empty and not successful
  if (items.length === 0 && !isSuccess) {
    setLocation("/cart");
    return null;
  }

  const onSubmit = (data: CheckoutForm) => {
    mutate({
      ...data,
      total: grandTotal.toString(),
      items: JSON.stringify(items.map(i => ({ id: i.id, quantity: i.quantity, price: i.price }))),
    }, {
      onSuccess: () => {
        setIsSuccess(true);
        clearCart();
        window.scrollTo(0, 0);
      },
      onError: (err) => {
        toast({
          title: "Error processing order",
          description: err.message,
          variant: "destructive",
        });
      }
    });
  };

  if (isSuccess) {
    return (
      <div className="min-h-[80vh] flex items-center justify-center bg-background px-4">
        <motion.div 
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="bg-card p-10 rounded-3xl border border-border shadow-xl text-center max-w-lg w-full"
        >
          <div className="w-20 h-20 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle2 className="w-10 h-10" />
          </div>
          <h2 className="text-3xl font-display font-bold mb-4">Order Confirmed!</h2>
          <p className="text-muted-foreground mb-8">
            Thank you for shopping with Lumina. Your order has been successfully placed and will be shipped soon.
          </p>
          <button 
            onClick={() => setLocation("/")}
            className="w-full bg-primary text-white py-4 rounded-xl font-semibold hover:bg-primary/90 transition-colors"
          >
            Continue Shopping
          </button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-28 pb-20 bg-muted/10">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-2 text-muted-foreground mb-8 justify-center">
          <Lock className="w-4 h-4" />
          <span className="text-sm font-medium uppercase tracking-wider">Secure Checkout</span>
        </div>

        <div className="flex flex-col-reverse lg:flex-row gap-10">
          {/* Form */}
          <div className="w-full lg:w-2/3 bg-card p-6 md:p-10 rounded-3xl border border-border shadow-sm">
            <h2 className="text-2xl font-display font-bold mb-8">Shipping Information</h2>
            
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Full Name</label>
                  <input 
                    {...register("name")}
                    className={`w-full p-3 rounded-xl border ${errors.name ? "border-destructive focus:ring-destructive/20" : "border-border focus:border-primary focus:ring-primary/20"} bg-background focus:outline-none focus:ring-4 transition-all`}
                    placeholder="John Doe"
                  />
                  {errors.name && <p className="text-destructive text-xs mt-1">{errors.name.message}</p>}
                </div>
                
                <div className="space-y-2">
                  <label className="text-sm font-medium">Email Address</label>
                  <input 
                    {...register("email")}
                    className={`w-full p-3 rounded-xl border ${errors.email ? "border-destructive focus:ring-destructive/20" : "border-border focus:border-primary focus:ring-primary/20"} bg-background focus:outline-none focus:ring-4 transition-all`}
                    placeholder="john@example.com"
                  />
                  {errors.email && <p className="text-destructive text-xs mt-1">{errors.email.message}</p>}
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Shipping Address</label>
                <input 
                  {...register("address")}
                  className={`w-full p-3 rounded-xl border ${errors.address ? "border-destructive focus:ring-destructive/20" : "border-border focus:border-primary focus:ring-primary/20"} bg-background focus:outline-none focus:ring-4 transition-all`}
                  placeholder="123 Main St, Apt 4B, New York, NY 10001"
                />
                {errors.address && <p className="text-destructive text-xs mt-1">{errors.address.message}</p>}
              </div>

              <div className="space-y-2 md:w-1/2">
                <label className="text-sm font-medium">Phone Number</label>
                <input 
                  {...register("phone")}
                  className={`w-full p-3 rounded-xl border ${errors.phone ? "border-destructive focus:ring-destructive/20" : "border-border focus:border-primary focus:ring-primary/20"} bg-background focus:outline-none focus:ring-4 transition-all`}
                  placeholder="+1 (555) 000-0000"
                />
                {errors.phone && <p className="text-destructive text-xs mt-1">{errors.phone.message}</p>}
              </div>

              <div className="pt-8 border-t border-border">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-xl font-display font-bold">Payment Method</h3>
                  <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                    <ShieldCheck className="w-4 h-4 text-green-500" />
                    <span>Secure & Encrypted</span>
                  </div>
                </div>

                {/* Accepted Cards */}
                <div className="flex items-center gap-2 mb-5">
                  <span className="text-xs text-muted-foreground mr-1">Accepted:</span>
                  {["VISA", "MC", "AMEX", "DISC"].map(card => (
                    <span key={card} className="px-2 py-1 bg-muted border border-border rounded text-xs font-bold text-muted-foreground tracking-wide">
                      {card}
                    </span>
                  ))}
                </div>

                {/* Cardholder Name */}
                <div className="space-y-2 mb-4">
                  <label className="text-sm font-medium">Cardholder Name</label>
                  <input
                    {...register("cardName")}
                    className={`w-full p-3 rounded-xl border ${errors.cardName ? "border-destructive focus:ring-destructive/20" : "border-border focus:border-primary focus:ring-primary/20"} bg-background focus:outline-none focus:ring-4 transition-all`}
                    placeholder="John Smith"
                    autoComplete="cc-name"
                  />
                  {errors.cardName && <p className="text-destructive text-xs mt-1">{errors.cardName.message}</p>}
                </div>

                {/* Card Number */}
                <div className="space-y-2 mb-4">
                  <label className="text-sm font-medium">Card Number</label>
                  <div className="relative">
                    <CreditCard className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                    <input
                      className={`w-full pl-10 pr-4 p-3 rounded-xl border ${errors.cardNumber ? "border-destructive focus:ring-destructive/20" : "border-border focus:border-primary focus:ring-primary/20"} bg-background focus:outline-none focus:ring-4 transition-all`}
                      placeholder="1234 5678 9012 3456"
                      maxLength={19}
                      autoComplete="cc-number"
                      value={cardNumberDisplay}
                      onChange={e => {
                        const raw = e.target.value.replace(/\D/g, "").slice(0, 16);
                        const formatted = raw.replace(/(.{4})/g, "$1 ").trim();
                        setCardNumberDisplay(formatted);
                        setValue("cardNumber", raw, { shouldValidate: true });
                      }}
                    />
                  </div>
                  {errors.cardNumber && <p className="text-destructive text-xs mt-1">{errors.cardNumber.message}</p>}
                </div>

                {/* Expiry + CVV */}
                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Expiry Date</label>
                    <div className="relative">
                      <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                      <input
                        {...register("cardExpiry")}
                        className={`w-full pl-9 p-3 rounded-xl border ${errors.cardExpiry ? "border-destructive focus:ring-destructive/20" : "border-border focus:border-primary focus:ring-primary/20"} bg-background focus:outline-none focus:ring-4 transition-all`}
                        placeholder="MM/YY"
                        maxLength={5}
                        autoComplete="cc-exp"
                        onChange={e => {
                          let v = e.target.value.replace(/\D/g, "").slice(0, 4);
                          if (v.length >= 3) v = v.slice(0, 2) + "/" + v.slice(2);
                          setValue("cardExpiry", v, { shouldValidate: true });
                          e.target.value = v;
                        }}
                      />
                    </div>
                    {errors.cardExpiry && <p className="text-destructive text-xs mt-1">{errors.cardExpiry.message}</p>}
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium">CVV / CVC</label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                      <input
                        {...register("cardCvc")}
                        className={`w-full pl-9 p-3 rounded-xl border ${errors.cardCvc ? "border-destructive focus:ring-destructive/20" : "border-border focus:border-primary focus:ring-primary/20"} bg-background focus:outline-none focus:ring-4 transition-all`}
                        placeholder="123"
                        maxLength={4}
                        autoComplete="cc-csc"
                        type="password"
                      />
                    </div>
                    {errors.cardCvc && <p className="text-destructive text-xs mt-1">{errors.cardCvc.message}</p>}
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={isPending}
                  data-testid="button-place-order"
                  className="w-full bg-primary text-primary-foreground py-4 rounded-xl font-bold text-lg hover:bg-primary/90 transition-all shadow-lg shadow-primary/25 hover:-translate-y-0.5 disabled:opacity-70 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center gap-2"
                >
                  <Lock className="w-5 h-5" />
                  {isPending ? "Processing..." : `Pay $${grandTotal.toFixed(2)}`}
                </button>
                <p className="text-center text-xs text-muted-foreground mt-3 flex items-center justify-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5 text-green-500" />
                  Your payment info is encrypted and secure
                </p>
              </div>
            </form>
          </div>

          {/* Mini Cart */}
          <div className="w-full lg:w-1/3">
            <div className="bg-card rounded-3xl border border-border p-6 shadow-sm sticky top-28">
              <h3 className="font-display font-bold text-xl mb-6">Order Summary</h3>
              
              <div className="space-y-4 mb-6 max-h-60 overflow-y-auto pr-2">
                {items.map(item => (
                  <div key={item.id} className="flex gap-4 items-center">
                    <div className="relative">
                      <img src={item.image} alt={item.name} className="w-16 h-16 rounded-lg object-cover bg-muted" />
                      <span className="absolute -top-2 -right-2 bg-foreground text-background text-xs font-bold w-5 h-5 rounded-full flex items-center justify-center">
                        {item.quantity}
                      </span>
                    </div>
                    <div className="flex-1">
                      <h4 className="font-medium text-sm line-clamp-1">{item.name}</h4>
                      <p className="text-xs text-muted-foreground">${Number(item.price).toFixed(2)}</p>
                    </div>
                    <div className="font-semibold text-sm">
                      ${(Number(item.price) * item.quantity).toFixed(2)}
                    </div>
                  </div>
                ))}
              </div>

              <div className="space-y-3 pt-6 border-t border-border text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Subtotal</span>
                  <span className="font-medium">${total.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Shipping</span>
                  <span className="font-medium">{shipping === 0 ? "Free" : `$${shipping.toFixed(2)}`}</span>
                </div>
                <div className="flex justify-between items-center pt-3 border-t border-border mt-3">
                  <span className="font-bold text-base">Total</span>
                  <span className="font-bold text-2xl">${grandTotal.toFixed(2)}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
