import { useMemo } from "react";

import { TransactionModel } from "@/domain/transaction";
import { useListMonthlyTransactions } from "@/presentation/hooks/queries/useListMonthlyTransactions";
import { useShackwWalletContext } from "@/presentation/providers/ShackwWalletProvider";
import { Token } from "@/registries/ChainTokenRegistry";
import { toAllowedStr } from "@/shared/helpers/tokenUnits";

export type HistoryViewModel = Pick<
  TransactionModel,
  "txHash" | "token" | "direction" | "counterparty" | "transferredAt"
> & { displayValue: string; anchorColor: string };

export type HistoryYearMonth = { year: number; month: number };

export type UseHistoryRowsProps = { token: Token } & HistoryYearMonth;

const useHistoryRows = (props: UseHistoryRowsProps) => {
  const { token, year, month } = props;

  const { account } = useShackwWalletContext();
  const { data: transactions, ...rest } = useListMonthlyTransactions(
    { wallet: account?.address ?? "0x00", token, year, month },
    { enabled: !!account?.address }
  );

  const historyRows = useMemo<HistoryViewModel[] | undefined>(() => {
    if (!transactions || !account) return undefined;

    return transactions.map(transaction => {
      const [valueSign, anchorColor] = (() => {
        switch (transaction.direction) {
          case "in":
            return ["+", "#A3D8F6"];
          case "out":
            return ["-", "#FFA3B5"];
          case "self":
            return ["±", "#D1BDD5"];
        }
      })();

      return {
        txHash: transaction.txHash,
        token: transaction.token,
        direction: transaction.direction,
        counterparty: transaction.counterparty,
        transferredAt: transaction.transferredAt,
        displayValue: `${valueSign}${toAllowedStr(transaction.value.displyValue, token)} ${token}`,
        anchorColor
      };
    });
  }, [account, token, transactions]);

  return { historyRows, ...rest };
};

export default useHistoryRows;
