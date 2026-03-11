import { Link } from "wouter";
import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

export default function About() {
  return (
    <div className="min-h-screen bg-background">
      
      {/* Hero */}
      <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto text-center">
        <h1 className="text-5xl md:text-7xl font-display font-bold mb-6 text-balance">
          Design for everyday life.
        </h1>
        <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
          At Lumina, we believe that the objects you surround yourself with shape your mood, productivity, and wellbeing.
        </p>
      </section>

      {/* Image Block */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-24">
        <div className="relative rounded-3xl overflow-hidden h-[60vh] min-h-[400px]">
          {/* sleek modern architecture interior */}
          <img 
            src="https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1600&q=80" 
            alt="Lumina Studio" 
            className="w-full h-full object-cover"
          />
        </div>
      </section>

      {/* Content */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 mb-24">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            <h2 className="text-3xl md:text-4xl font-display font-bold leading-tight">
              Craftsmanship meets modern utility.
            </h2>
            <p className="text-muted-foreground leading-relaxed text-lg">
              Founded in 2020, Lumina started with a simple premise: everyday items shouldn't be ordinary. Our team of designers sources and creates pieces that merge exceptional craftsmanship with profound utility.
            </p>
            <p className="text-muted-foreground leading-relaxed text-lg">
              We travel the world to find artisans who share our dedication to quality, sustainability, and aesthetic rigor. Every product in our catalog has been tested and loved in our own homes before it reaches yours.
            </p>
          </motion.div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-4">
              {/* minimal ceramic vase */}
              <img src="https://pixabay.com/get/gbf86de8f873c7b91643f6e9f3e54a8a1462bba4709ea092dc459334591f97a68e10040a6905ec22274a9d3a852549127ca2ccf3d45230593d0c705256847a6c9_1280.jpg" alt="Detail 1" className="w-full h-64 object-cover rounded-2xl" />
              {/* minimalist chair */}
              <img src="https://images.unsplash.com/photo-1592078615290-033ee584e267?auto=format&fit=crop&w=600&q=80" alt="Detail 2" className="w-full h-48 object-cover rounded-2xl" />
            </div>
            <div className="space-y-4 mt-8">
              {/* modern lighting */}
              <img src="https://images.unsplash.com/photo-1507473885765-e6ed057f782c?auto=format&fit=crop&w=600&q=80" alt="Detail 3" className="w-full h-48 object-cover rounded-2xl" />
              {/* aesthetic objects */}
              <img src="https://images.unsplash.com/photo-1600607688969-a5bfcd646154?auto=format&fit=crop&w=600&q=80" alt="Detail 4" className="w-full h-64 object-cover rounded-2xl" />
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-foreground text-background py-24 text-center px-4">
        <h2 className="text-4xl font-display font-bold mb-6">Ready to transform your space?</h2>
        <p className="text-background/70 mb-10 max-w-xl mx-auto text-lg">
          Explore our latest arrivals and find the perfect addition to your collection.
        </p>
        <Link 
          href="/shop" 
          className="inline-flex items-center gap-2 bg-primary text-white px-8 py-4 rounded-xl font-semibold text-lg hover:bg-primary/90 transition-colors shadow-lg"
        >
          View Collection <ArrowRight className="w-5 h-5" />
        </Link>
      </section>
    </div>
  );
}
