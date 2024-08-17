import { getServerSession } from "next-auth";

import { SendCard } from "../../../components/SendCard";
import { authOptions } from "../../lib/auth";
import prisma from "@repo/db/client";
import { OnRampP2pTransactions } from "../../../components/OnRampP2pTransactions";

async function getOnRampP2pTransactions() {
  const session = await getServerSession(authOptions);
  const txns = await prisma.p2pTransfer.findMany({
    where: {
      fromUserId: Number(session?.user?.id),
    },
  });
  return txns.map((t) => ({
    time: t.timestamp,
    amount: t.amount,
    from: t.fromUserId,
    to: t.toUserId,
  }));
}

export default async function () {
  const transactions = await getOnRampP2pTransactions();
  const session = await getServerSession(authOptions);

  return (
    <div className="w-full">
      <div className="text-4xl text-[#6a51a6] pt-8 mb-8 font-bold">
        P2P Transfer
      </div>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 p-4">
        <div>
          <SendCard />
        </div>
        <div>
          <OnRampP2pTransactions
            transactions={transactions}
            userId={Number(session?.user?.id)}
          />
        </div>
      </div>
    </div>
  );
}
