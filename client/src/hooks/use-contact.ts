import { useMutation } from "@tanstack/react-query";
import { api } from "@shared/routes";
import type { InsertContact } from "@shared/schema";

export function useContact() {
  return useMutation({
    mutationFn: async (data: InsertContact) => {
      const res = await fetch(api.contacts.create.path, {
        method: api.contacts.create.method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      
      if (!res.ok) {
        const errorData = await res.json().catch(() => ({}));
        throw new Error(errorData.message || "Failed to submit contact form");
      }
      
      return res.json();
    },
  });
}
