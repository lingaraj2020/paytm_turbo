import { Card } from "@repo/ui/card";

export const OnRampP2pTransactions = ({
  transactions,
  userId,
}: {
  transactions: {
    time: Date;
    amount: number;
    from: number;
    to: number;
  }[];
  userId:number;
}) => {
  if (!transactions.length) {
    return (
      <Card title="Recent Transactions">
        <div className="text-center pb-8 pt-8">No Recent Transactions</div>
      </Card>
    );
  }
  return (
    <Card title="Recent Transactions">
      <div className="pt-2">
        {transactions.map((t,index) => (
          <div key={index} className="flex justify-between">
            <div>
              <div className="text-sm">
              {t.from === userId ? "Debited INR" : "Credited INR"}
              </div>
              <div className="text-slate-600 text-xs">
                {t.time.toDateString()}
              </div>
            </div>
            <div className="flex flex-col justify-center">
            {t.from === userId ? `- Rs ${t.amount / 100}` : `+ Rs ${t.amount / 100}`}
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
};
