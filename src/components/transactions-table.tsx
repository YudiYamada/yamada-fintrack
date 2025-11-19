import { format } from "date-fns";
import { ptBR } from "date-fns/locale/pt-BR";
import { useSearchParams } from "react-router";

import { useGetTransactions } from "@/api/hooks/transaction";
import { formatCurrency } from "@/helpers/currency";

import EditTransactionButton from "./edit-transaction-button";
import TransactionTypeBadge from "./transaction-type-badge";
import { DataTable } from "./ui/data-table";
import { ScrollArea, ScrollBar } from "./ui/scroll-area";

const columns = [
  {
    accessorKey: "name",
    header: "Título",
  },
  {
    accessorKey: "type",
    header: "Tipo",
    cell: ({ row: { original: transaction } }) => {
      return <TransactionTypeBadge variant={transaction.type.toLowerCase()} />;
    },
  },
  {
    accessorKey: "date",
    header: "Data",
    cell: ({ row: { original: transaction } }) => {
      return format(new Date(transaction.date), "dd 'de' MMMM 'de' yyyy", {
        locale: ptBR,
      });
    },
  },
  {
    accessorKey: "amount",
    header: "valor",
    cell: ({ row: { original: transaction } }) => {
      return formatCurrency(transaction.amount);
    },
  },
  {
    accessorKey: "actions",
    header: "Ações",
    cell: ({ row: { original: transaction } }) => {
      return <EditTransactionButton transaction={transaction} />;
    },
  },
];

function TransactionsTable() {
  const [searchParams] = useSearchParams();
  const from = searchParams.get("from");
  const to = searchParams.get("to");
  const { data: transactions } = useGetTransactions({ from, to });
  if (!transactions) return null;
  return (
    <>
      <h2 className="text-2xl font-bold">Transações</h2>
      <ScrollArea className="h-[220px] max-h-[220px] rounded-md border">
        <DataTable columns={columns} data={transactions} />
        <ScrollBar orientation="horizontal" />
      </ScrollArea>
    </>
  );
}

export default TransactionsTable;
