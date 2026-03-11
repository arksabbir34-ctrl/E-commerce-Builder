import { useQuery } from "@tanstack/react-query";
import { buildUrl } from "@shared/routes";
import type { Product } from "@shared/schema";
import { PRODUCTS } from "@/data/products";

// Filter products locally — used both as fallback and primary source on static hosts (Netlify)
function filterProducts(products: Product[], params?: { search?: string; category?: string }) {
  let result = [...products];
  if (params?.category && params.category !== "All") {
    result = result.filter((p) => p.category === params.category);
  }
  if (params?.search) {
    const q = params.search.toLowerCase();
    result = result.filter(
      (p) => p.name.toLowerCase().includes(q) || p.description.toLowerCase().includes(q)
    );
  }
  return result;
}

export function useProducts(params?: { search?: string; category?: string }) {
  return useQuery<Product[]>({
    queryKey: ["products", params?.search, params?.category],
    queryFn: async () => {
      // Try the backend API first (works on Replit / same-origin deploys)
      const apiBase = import.meta.env.VITE_API_URL || "";
      try {
        const searchParams = new URLSearchParams();
        if (params?.search) searchParams.set("search", params.search);
        if (params?.category && params.category !== "All")
          searchParams.set("category", params.category);

        const url =
          apiBase +
          `/api/products` +
          (searchParams.toString() ? `?${searchParams.toString()}` : "");

        const res = await fetch(url, { credentials: "omit" });
        if (!res.ok) throw new Error("API unavailable");
        const data = await res.json();
        // Only use the API result if it actually returned products
        if (Array.isArray(data) && data.length > 0) return data as Product[];
        throw new Error("API returned empty");
      } catch {
        // Fall back to bundled static data — works on Netlify and offline
        return filterProducts(PRODUCTS, params);
      }
    },
    staleTime: 5 * 60 * 1000,
  });
}

export function useProduct(id: number) {
  return useQuery<Product | null>({
    queryKey: ["product", id],
    queryFn: async () => {
      const apiBase = import.meta.env.VITE_API_URL || "";
      try {
        const url = apiBase + buildUrl("/api/products/:id", { id });
        const res = await fetch(url, { credentials: "omit" });
        if (res.status === 404) return null;
        if (!res.ok) throw new Error("API unavailable");
        return (await res.json()) as Product;
      } catch {
        // Fallback to static data
        return PRODUCTS.find((p) => p.id === id) ?? null;
      }
    },
    enabled: !!id,
  });
}
