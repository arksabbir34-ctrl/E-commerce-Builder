import { db } from "./db";
import {
  products, contacts, orders,
  type Product, type InsertProduct,
  type Contact, type InsertContact,
  type Order, type InsertOrder
} from "@shared/schema";
import { eq } from "drizzle-orm";

export interface IStorage {
  // Products
  getProducts(search?: string, category?: string): Promise<Product[]>;
  getProduct(id: number): Promise<Product | undefined>;
  
  // Contacts
  createContact(contact: InsertContact): Promise<Contact>;
  
  // Orders
  createOrder(order: InsertOrder): Promise<Order>;
}

export class DatabaseStorage implements IStorage {
  async getProducts(search?: string, category?: string): Promise<Product[]> {
    let query = db.select().from(products);
    let results = await query;
    
    if (search) {
      const lowerSearch = search.toLowerCase();
      results = results.filter(p => p.name.toLowerCase().includes(lowerSearch) || p.description.toLowerCase().includes(lowerSearch));
    }
    if (category) {
      results = results.filter(p => p.category === category);
    }
    
    return results;
  }

  async getProduct(id: number): Promise<Product | undefined> {
    const [product] = await db.select().from(products).where(eq(products.id, id));
    return product;
  }

  async createContact(contact: InsertContact): Promise<Contact> {
    const [newContact] = await db.insert(contacts).values(contact).returning();
    return newContact;
  }

  async createOrder(order: InsertOrder): Promise<Order> {
    const [newOrder] = await db.insert(orders).values(order).returning();
    return newOrder;
  }
}

export const storage = new DatabaseStorage();
