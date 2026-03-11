import { pgTable, text, serial, numeric, boolean } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const products = pgTable("products", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  category: text("category").notNull(),
  price: numeric("price").notNull(),
  description: text("description").notNull(),
  image: text("image").notNull(),
  rating: numeric("rating").notNull(),
  isSale: boolean("is_sale").default(false),
});

export const insertProductSchema = createInsertSchema(products).omit({ id: true });
export type Product = typeof products.$inferSelect;
export type InsertProduct = z.infer<typeof insertProductSchema>;

export const contacts = pgTable("contacts", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull(),
  message: text("message").notNull(),
});

export const insertContactSchema = createInsertSchema(contacts).omit({ id: true });
export type Contact = typeof contacts.$inferSelect;
export type InsertContact = z.infer<typeof insertContactSchema>;

export const orders = pgTable("orders", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull(),
  address: text("address").notNull(),
  phone: text("phone").notNull(),
  total: numeric("total").notNull(),
  items: text("items").notNull(), // JSON string representing cart items
});

export const insertOrderSchema = createInsertSchema(orders).omit({ id: true });
export type Order = typeof orders.$inferSelect;
export type InsertOrder = z.infer<typeof insertOrderSchema>;
