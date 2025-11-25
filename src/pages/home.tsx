import { Navigate } from "react-router";

import AddTransactionButton from "@/components/add-transaction-button";
import Balance from "@/components/balance";
import DataSelection from "@/components/date-selection";
import Header from "@/components/header";
import TransactionTypeChart from "@/components/transaction-type-chart";
import TransactionsTable from "@/components/transactions-table";
import { useAuthContext } from "@/contexts/auth";

function HomePage() {
  const { user, isInitializing } = useAuthContext();
  if (isInitializing) return null;
  if (!user) {
    return <Navigate to={`/login`} />;
  }

  return (
    <>
      <Header />
      {/* PARTE DO TOPO */}
      <div className="space-y-6 p-8">
        <div className="flex flex-col items-center justify-between sm:flex-row">
          <h2 className="text-2xl font-bold">Dashboard</h2>
          <div className="flex flex-col-reverse items-center gap-2 sm:flex-row">
            <DataSelection />
            <AddTransactionButton />
            {/* SELETOR DE DATA E NOVA TRANSAÇÃO */}
          </div>
        </div>
        {/* GRAFICOS */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-[2fr_1fr]">
          <Balance />
          <TransactionTypeChart />
        </div>
        <TransactionsTable />
      </div>
    </>
  );
}

export default HomePage;
