import { formatCurrency } from "@/helpers/currency";
import type { BalanceItemProps } from "@/types/components/balance-item";

import { Card, CardContent } from "./ui/card";

function BalanceItem({ label, icon, amount }: BalanceItemProps) {
  return (
    <>
      <Card>
        <CardContent className="space-y-2 p-6">
          {/* ÍCONE E LABEL */}
          <div className="flex items-center gap-2">
            <div className="bg-muted flex h-8 w-8 items-center justify-center rounded-lg">
              {icon}
            </div>
            <p className="text-muted-foreground text-sm">{label}</p>
          </div>
          <h3 className="text-2xl font-semibold">{formatCurrency(amount)}</h3>
        </CardContent>
      </Card>
    </>
  );
}

export default BalanceItem;
