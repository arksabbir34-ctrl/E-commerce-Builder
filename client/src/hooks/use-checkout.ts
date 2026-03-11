import { useMutation } from "@tanstack/react-query";
import { api } from "@shared/routes";
import type { InsertOrder } from "@shared/schema";

export function useCheckout() {
  return useMutation({
    mutationFn: async (data: InsertOrder) => {
      const res = await fetch(api.orders.create.path, {
        method: api.orders.create.method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      
      if (!res.ok) {
        const errorData = await res.json().catch(() => ({}));
        throw new Error(errorData.message || "Failed to submit order");
      }
      
      return res.json();
    },
  });
}
