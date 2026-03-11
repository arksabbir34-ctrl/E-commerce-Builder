import { Link } from "wouter";
import { Facebook, Twitter, Instagram, InstagramIcon, Mail, MapPin, Phone } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-foreground text-white/80 pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          {/* Brand */}
          <div className="space-y-4">
            <h3 className="text-2xl font-bold font-display text-white">Lumina</h3>
            <p className="text-sm leading-relaxed text-white/60">
              Curated essentials for modern living. Elevate your everyday with our premium collection of thoughtfully designed products.
            </p>
            <div className="flex gap-4 pt-2">
              <a href="#" className="hover:text-white transition-colors"><Facebook className="w-5 h-5" /></a>
              <a href="#" className="hover:text-white transition-colors"><Twitter className="w-5 h-5" /></a>
              <a href="#" className="hover:text-white transition-colors"><InstagramIcon className="w-5 h-5" /></a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold text-white mb-6 font-display">Shop</h4>
            <ul className="space-y-3 text-sm">
              <li><Link href="/shop?category=New Arrivals" className="hover:text-white transition-colors">New Arrivals</Link></li>
              <li><Link href="/shop?category=Bestsellers" className="hover:text-white transition-colors">Bestsellers</Link></li>
              <li><Link href="/shop?category=Sale" className="hover:text-white transition-colors">Sale Items</Link></li>
              <li><Link href="/shop" className="hover:text-white transition-colors">All Products</Link></li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="text-lg font-semibold text-white mb-6 font-display">Company</h4>
            <ul className="space-y-3 text-sm">
              <li><Link href="/about" className="hover:text-white transition-colors">About Us</Link></li>
              <li><Link href="/contact" className="hover:text-white transition-colors">Contact</Link></li>
              <li><a href="#" className="hover:text-white transition-colors">Privacy Policy</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Terms of Service</a></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-lg font-semibold text-white mb-6 font-display">Contact Us</h4>
            <ul className="space-y-4 text-sm">
              <li className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-primary shrink-0" />
                <span>123 Design Avenue<br />New York, NY 10001</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-primary shrink-0" />
                <span>+1 (555) 123-4567</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-primary shrink-0" />
                <span>hello@lumina.store</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-white/50">
          <p>© {new Date().getFullYear()} Lumina. All rights reserved.</p>
          <div className="flex gap-4">
            <span>Secure payments via</span>
            {/* simple visual indicators for payment types */}
            <div className="flex gap-2">
              <div className="w-8 h-5 bg-white/20 rounded"></div>
              <div className="w-8 h-5 bg-white/20 rounded"></div>
              <div className="w-8 h-5 bg-white/20 rounded"></div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
