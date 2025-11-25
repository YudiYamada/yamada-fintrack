import queryString from "query-string";

import { protectedApi } from "@/lib/axios";

interface Transaction {
  id: string; // O ID deve ser obrigatório no retorno
  name: string;
  date: string; // Geralmente string ISO 8601
  amount: number;
  type: "INCOME" | "EXPENSE" | string; // Exemplo de tipagem mais estrita para 'type'
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
};
