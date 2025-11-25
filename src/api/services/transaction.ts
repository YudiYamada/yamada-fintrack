import queryString from "query-string";

import { protectedApi } from "@/lib/axios";

interface Transaction {
  id: string;
  name: string;
  date: string;
  amount: number;
  type: "INCOME" | "EXPENSE" | string;
}

export const TransactionService = {
  create: async (input: Transaction) => {
    const response = await protectedApi.post("/transactions/me", {
      name: input.name,
      date: input.date,
      amount: input.amount,
      type: input.type,
    });
    return response.data;
  },
  getAll: async (input: { from: string; to: string }) => {
    const query = queryString.stringify({ from: input.from, to: input.to });
    const response = await protectedApi.get(`/transactions/me?${query}`);
    return response.data;
  },
  update: async (input: Transaction) => {
    const response = await protectedApi.patch(`/transactions/me/${input.id}`, {
      name: input.name,
      date: input.date,
      amount: input.amount,
      type: input.type,
    });
    return response.data;
  },
  delete: async (input: { id: string }) => {
    const response = await protectedApi.delete(`/transactions/me/${input.id}`);
    return response.data;
  },
};
