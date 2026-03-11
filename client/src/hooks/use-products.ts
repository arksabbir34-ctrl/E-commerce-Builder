import { useQuery } from "@tanstack/react-query";
import { api, buildUrl } from "@shared/routes";
import type { Product } from "@shared/schema";

export function useProducts(params?: { search?: string; category?: string }) {
  return useQuery({
    queryKey: [api.products.list.path, params?.search, params?.category],
    queryFn: async () => {
      const searchParams = new URLSearchParams();
      if (params?.search) searchParams.set("search", params.search);
      if (params?.category && params.category !== "All") searchParams.set("category", params.category);
      
      const url = `${api.products.list.path}${searchParams.toString() ? `?${searchParams.toString()}` : ""}`;
      
      const res = await fetch(url, { credentials: "omit" }); // using omit for public catalog
      if (!res.ok) throw new Error("Failed to fetch products");
      
      // Fallback parsing if Zod schemas aren't properly exported
      const data = await res.json();
      try {
        return api.products.list.responses[200].parse(data);
      } catch (e) {
        return data as Product[];
      }
    },
  });
}

export function useProduct(id: number) {
  return useQuery({
    queryKey: [api.products.get.path, id],
    queryFn: async () => {
      const url = buildUrl(api.products.get.path, { id });
      const res = await fetch(url, { credentials: "omit" });
      
      if (res.status === 404) return null;
      if (!res.ok) throw new Error("Failed to fetch product");
      
      const data = await res.json();
      try {
        return api.products.get.responses[200].parse(data);
      } catch (e) {
        return data as Product;
      }
    },
    enabled: !!id,
  });
}
