import type { Express } from "express";
import type { Server } from "http";
import { storage } from "./storage";
import { api } from "@shared/routes";
import { z } from "zod";

async function seedDatabase() {
  const existingProducts = await storage.getProducts();
  if (existingProducts.length === 0) {
    const { products } = await import("@shared/schema");
    const { db } = await import("./db");
    
    const sampleProducts = [
      {
        name: "Wireless Noise-Cancelling Headphones",
        category: "Electronics",
        price: "299.99",
        description: "Experience premium sound with our top-tier wireless headphones. Features active noise cancellation, 30-hour battery life, and ultra-comfortable ear cushions.",
        image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&q=80",
        rating: "4.8",
        isSale: false
      },
      {
        name: "Minimalist Smartwatch",
        category: "Electronics",
        price: "199.50",
        description: "Track your fitness, receive notifications, and stay connected with this sleek and modern smartwatch. Water-resistant up to 50 meters.",
        image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800&q=80",
        rating: "4.6",
        isSale: true
      },
      {
        name: "Ergonomic Office Chair",
        category: "Furniture",
        price: "150.00",
        description: "Work in comfort all day. Features adjustable lumbar support, breathable mesh back, and smooth-rolling casters.",
        image: "https://images.unsplash.com/photo-1505843490538-5133c6c7d0e1?w=800&q=80",
        rating: "4.5",
        isSale: false
      },
      {
        name: "Classic Leather Backpack",
        category: "Accessories",
        price: "89.99",
        description: "Durable, stylish, and practical. Made from genuine leather with padded compartments for your laptop and daily essentials.",
        image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=800&q=80",
        rating: "4.7",
        isSale: true
      },
      {
        name: "Professional Camera Lens",
        category: "Electronics",
        price: "850.00",
        description: "Capture stunning photos with this 50mm f/1.4 prime lens. Perfect for portraits, low light, and beautiful bokeh effects.",
        image: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=800&q=80",
        rating: "4.9",
        isSale: false
      },
      {
        name: "Ceramic Coffee Mug Set",
        category: "Home",
        price: "34.99",
        description: "Start your morning right with these handcrafted ceramic mugs. Set of 4 in beautiful earthy tones.",
        image: "https://images.unsplash.com/photo-1514228742587-6b1558fcca3d?w=800&q=80",
        rating: "4.8",
        isSale: false
      }
    ];

    await db.insert(products).values(sampleProducts);
  }
}

export async function registerRoutes(
  httpServer: Server,
  app: Express
): Promise<Server> {

  app.get(api.products.list.path, async (req, res) => {
    const search = req.query.search as string | undefined;
    const category = req.query.category as string | undefined;
    const products = await storage.getProducts(search, category);
    res.json(products);
  });

  app.get(api.products.get.path, async (req, res) => {
    const product = await storage.getProduct(Number(req.params.id));
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }
    res.json(product);
  });

  app.post(api.contacts.create.path, async (req, res) => {
    try {
      const input = api.contacts.create.input.parse(req.body);
      const contact = await storage.createContact(input);
      res.status(201).json(contact);
    } catch (err) {
      if (err instanceof z.ZodError) {
        return res.status(400).json({
          message: err.errors[0].message,
          field: err.errors[0].path.join('.'),
        });
      }
      throw err;
    }
  });

  app.post(api.orders.create.path, async (req, res) => {
    try {
      const input = api.orders.create.input.parse(req.body);
      const order = await storage.createOrder(input);
      res.status(201).json(order);
    } catch (err) {
      if (err instanceof z.ZodError) {
        return res.status(400).json({
          message: err.errors[0].message,
          field: err.errors[0].path.join('.'),
        });
      }
      throw err;
    }
  });
  
  // Seed the database
  seedDatabase().catch(console.error);

  return httpServer;
}
