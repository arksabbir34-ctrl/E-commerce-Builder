import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Mail, MapPin, Phone, Send } from "lucide-react";
import { useContact } from "@/hooks/use-contact";
import { useToast } from "@/hooks/use-toast";
import { insertContactSchema } from "@shared/schema";
import { motion } from "framer-motion";

type ContactForm = z.infer<typeof insertContactSchema>;

export default function Contact() {
  const { toast } = useToast();
  const { mutate, isPending } = useContact();

  const { register, handleSubmit, reset, formState: { errors } } = useForm<ContactForm>({
    resolver: zodResolver(insertContactSchema),
  });

  const onSubmit = (data: ContactForm) => {
    mutate(data, {
      onSuccess: () => {
        toast({
          title: "Message Sent!",
          description: "We'll get back to you as soon as possible.",
        });
        reset();
      },
      onError: (err) => {
        toast({
          title: "Error",
          description: err.message,
          variant: "destructive",
        });
      }
    });
  };

  return (
    <div className="min-h-screen pt-28 pb-20 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h1 className="text-4xl md:text-5xl font-display font-bold mb-6">Get in Touch</h1>
          <p className="text-lg text-muted-foreground">
            Have a question about our products or your order? We're here to help. Reach out to us through any of the channels below.
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-12 lg:gap-20">
          
          {/* Contact Info */}
          <div className="w-full lg:w-1/3 space-y-10">
            <div>
              <h3 className="text-2xl font-display font-bold mb-6">Contact Information</h3>
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-primary/10 text-primary rounded-xl flex items-center justify-center shrink-0">
                    <MapPin className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-lg mb-1">Our Store</h4>
                    <p className="text-muted-foreground leading-relaxed">
                      123 Design Avenue<br />
                      New York, NY 10001<br />
                      United States
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-primary/10 text-primary rounded-xl flex items-center justify-center shrink-0">
                    <Phone className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-lg mb-1">Call Us</h4>
                    <p className="text-muted-foreground mb-1">+1 (555) 123-4567</p>
                    <p className="text-sm text-muted-foreground">Mon-Fri from 9am to 6pm</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-primary/10 text-primary rounded-xl flex items-center justify-center shrink-0">
                    <Mail className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-lg mb-1">Email Us</h4>
                    <p className="text-muted-foreground">hello@lumina.store</p>
                    <p className="text-sm text-muted-foreground">We reply within 24 hours</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="p-8 bg-muted rounded-3xl">
              <h4 className="font-display font-bold text-xl mb-3">FAQ</h4>
              <p className="text-muted-foreground mb-4 text-sm">
                Find quick answers to your questions in our help center.
              </p>
              <a href="#" className="text-primary font-semibold hover:underline">View Help Center &rarr;</a>
            </div>
          </div>

          {/* Contact Form */}
          <div className="w-full lg:w-2/3">
            <motion.div 
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              className="bg-card border border-border shadow-xl rounded-3xl p-8 md:p-12"
            >
              <h2 className="text-2xl font-display font-bold mb-8">Send a Message</h2>
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Your Name</label>
                    <input 
                      {...register("name")}
                      className={`w-full p-4 rounded-xl border ${errors.name ? "border-destructive" : "border-border"} bg-background focus:outline-none focus:ring-4 focus:ring-primary/20 transition-all`}
                      placeholder="John Doe"
                    />
                    {errors.name && <p className="text-destructive text-xs mt-1">{errors.name.message}</p>}
                  </div>
                  
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Email Address</label>
                    <input 
                      {...register("email")}
                      className={`w-full p-4 rounded-xl border ${errors.email ? "border-destructive" : "border-border"} bg-background focus:outline-none focus:ring-4 focus:ring-primary/20 transition-all`}
                      placeholder="john@example.com"
                    />
                    {errors.email && <p className="text-destructive text-xs mt-1">{errors.email.message}</p>}
                  </div>
                </div>
                
                <div className="space-y-2">
                  <label className="text-sm font-medium">Message</label>
                  <textarea 
                    {...register("message")}
                    rows={6}
                    className={`w-full p-4 rounded-xl border ${errors.message ? "border-destructive" : "border-border"} bg-background focus:outline-none focus:ring-4 focus:ring-primary/20 transition-all resize-none`}
                    placeholder="How can we help you?"
                  />
                  {errors.message && <p className="text-destructive text-xs mt-1">{errors.message.message}</p>}
                </div>
                
                <button 
                  type="submit"
                  disabled={isPending}
                  className="w-full md:w-auto px-8 py-4 bg-primary text-white rounded-xl font-bold hover:bg-primary/90 transition-all shadow-lg hover:shadow-primary/30 hover:-translate-y-0.5 disabled:opacity-70 flex items-center justify-center gap-2"
                >
                  {isPending ? "Sending..." : (
                    <>Send Message <Send className="w-5 h-5" /></>
                  )}
                </button>
              </form>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}
