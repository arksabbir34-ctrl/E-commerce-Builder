import type { Product } from "@shared/schema";

// Static product catalog — used on the frontend so the site works
// fully as a static deployment (Netlify) without a backend API.
export const PRODUCTS: Product[] = [
  {
    id: 1,
    name: "Wireless Noise-Cancelling Headphones",
    category: "Electronics",
    price: "299.99",
    description:
      "Experience premium sound with our top-tier wireless headphones. Features active noise cancellation, 30-hour battery life, and ultra-comfortable ear cushions.",
    image:
      "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&q=80",
    rating: "4.8",
    isSale: false,
  },
  {
    id: 2,
    name: "Minimalist Smartwatch",
    category: "Electronics",
    price: "199.50",
    description:
      "Track your fitness, receive notifications, and stay connected with this sleek and modern smartwatch. Water-resistant up to 50 meters.",
    image:
      "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800&q=80",
    rating: "4.6",
    isSale: true,
  },
  {
    id: 3,
    name: "Ergonomic Office Chair",
    category: "Furniture",
    price: "150.00",
    description:
      "Work in comfort all day. Features adjustable lumbar support, breathable mesh back, and smooth-rolling casters.",
    image:
      "https://images.unsplash.com/photo-1505843490538-5133c6c7d0e1?w=800&q=80",
    rating: "4.5",
    isSale: false,
  },
  {
    id: 4,
    name: "Classic Leather Backpack",
    category: "Accessories",
    price: "89.99",
    description:
      "Durable, stylish, and practical. Made from genuine leather with padded compartments for your laptop and daily essentials.",
    image:
      "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=800&q=80",
    rating: "4.7",
    isSale: true,
  },
  {
    id: 5,
    name: "Professional Camera Lens",
    category: "Electronics",
    price: "850.00",
    description:
      "Capture stunning photos with this 50mm f/1.4 prime lens. Perfect for portraits, low light, and beautiful bokeh effects.",
    image:
      "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=800&q=80",
    rating: "4.9",
    isSale: false,
  },
  {
    id: 6,
    name: "Ceramic Coffee Mug Set",
    category: "Home",
    price: "34.99",
    description:
      "Start your morning right with these handcrafted ceramic mugs. Set of 4 in beautiful earthy tones.",
    image:
      "https://images.unsplash.com/photo-1514228742587-6b1558fcca3d?w=800&q=80",
    rating: "4.8",
    isSale: false,
  },
  {
    id: 7,
    name: "Linen Throw Blanket",
    category: "Home",
    price: "59.99",
    description:
      "Soft, breathable linen throw in a natural weave. Perfect for cozy evenings and adds a warm, textured touch to any sofa.",
    image:
      "https://images.unsplash.com/photo-1584100936595-c0654b55a2e2?w=800&q=80",
    rating: "4.7",
    isSale: false,
  },
  {
    id: 8,
    name: "Wooden Desk Lamp",
    category: "Home",
    price: "79.00",
    description:
      "A beautifully crafted solid oak desk lamp with adjustable arm and warm Edison bulb. Adds a natural, cozy glow to any workspace.",
    image:
      "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=800&q=80",
    rating: "4.6",
    isSale: true,
  },
  {
    id: 9,
    name: "Portable Bluetooth Speaker",
    category: "Electronics",
    price: "119.99",
    description:
      "360-degree surround sound, IPX7 waterproof rating, and 20-hour battery life. Go anywhere with premium audio.",
    image:
      "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=800&q=80",
    rating: "4.5",
    isSale: false,
  },
  {
    id: 10,
    name: "Minimalist Wallet",
    category: "Accessories",
    price: "45.00",
    description:
      "Slim full-grain leather bifold wallet. Holds up to 8 cards and cash — everything you need, nothing you don't.",
    image:
      "https://images.unsplash.com/photo-1627123424574-724758594e93?w=800&q=80",
    rating: "4.8",
    isSale: false,
  },
  {
    id: 11,
    name: "Bookshelf in Walnut",
    category: "Furniture",
    price: "320.00",
    description:
      "Solid walnut five-shelf bookcase with clean Scandinavian lines. Makes a stunning focal point in any living room or study.",
    image:
      "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=800&q=80",
    rating: "4.9",
    isSale: false,
  },
  {
    id: 12,
    name: "Sunglasses — Polarised",
    category: "Accessories",
    price: "129.00",
    description:
      "UV400 polarised lenses in a classic acetate frame. Lightweight and durable for all-day wear.",
    image:
      "https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=800&q=80",
    rating: "4.6",
    isSale: true,
  },
];

export const CATEGORIES = ["All", ...Array.from(new Set(PRODUCTS.map((p) => p.category))).sort()];
