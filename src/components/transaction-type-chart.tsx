import { PiggyBankIcon, TrendingDownIcon, TrendingUpIcon } from "lucide-react";
import { useSearchParams } from "react-router";
import { Pie, PieChart, Tooltip } from "recharts";

import { useGetUserBalance } from "@/api/hooks/user";
import { Card, CardContent } from "@/components/ui/card";
import { formatCurrency } from "@/helpers/currency";

import TransactionTypeChartLabel from "./transaction-type-chart-label";
import TransactionTypeIcon from "./transaction-type-icon";

const TransactionTypeChart = () => {
  const [searchParams] = useSearchParams();
  const from = searchParams.get("from");
  const to = searchParams.get("to");
  const { data } = useGetUserBalance({ from, to });

  // Normaliza números
  const expenses = Number(data?.expenses) || 0;
  const earnings = Number(data?.earnings) || 0;
  const investments = Number(data?.investments) || 0;

  // Monta data e remove itens inválidos
  const chartData = [
    { type: "Gastos", value: expenses, fill: "var(--color-primary-red)" },
    { type: "Ganhos", value: earnings, fill: "var(--color-primary-green)" },
    {
      type: "Investimentos",
      value: investments,
      fill: "var(--color-primary-blue)",
    },
  ].filter((d) => Number.isFinite(d.value));

  const total = chartData.reduce((acc, d) => acc + d.value, 0);

  return (
    <Card className="flex flex-col">
      <CardContent className="flex flex-1 flex-col items-center justify-center gap-6 sm:flex-row">
        <div className="mx-auto" style={{ width: 250, height: 250 }}>
          {total > 0 ? (
            <PieChart width={250} height={250}>
              <Tooltip
                formatter={(val) => [formatCurrency(Number(val)), ""]}
                cursor={false}
              />
              <Pie
                data={chartData}
                dataKey="value"
                nameKey="type"
                innerRadius={60}
                outerRadius={100}
                paddingAngle={2}
                isAnimationActive={false}
              />
            </PieChart>
          ) : (
            <div className="text-muted-foreground text-sm">
              Sem dados para este período
            </div>
          )}
        </div>

        <div className="space-y-3">
          <TransactionTypeChartLabel
            icon={
              <TransactionTypeIcon
                icon={
                  <TrendingUpIcon className="text-primary-green" size={16} />
                }
                label="Ganhos"
              />
            }
            value={`${Number(data?.earningsPercentage) || 0}%`}
          />
          <TransactionTypeChartLabel
            icon={
              <TransactionTypeIcon
                icon={
                  <TrendingDownIcon className="text-primary-red" size={16} />
                }
                label="Gastos"
              />
            }
            value={`${Number(data?.expensesPercentage) || 0}%`}
          />
          <TransactionTypeChartLabel
            icon={
              <TransactionTypeIcon
                icon={<PiggyBankIcon className="text-primary-blue" size={16} />}
                label="Investimentos"
              />
            }
            value={`${Number(data?.investmentsPercentage) || 0}%`}
          />
        </div>
      </CardContent>
    </Card>
  );
};

export default TransactionTypeChart;
