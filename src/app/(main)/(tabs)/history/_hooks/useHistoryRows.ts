import { useMemo } from "react";

import { toAllowedStr } from "@/helpers/tokenUnits";
import { useListTransactionsByTerm } from "@/hooks/queries/useListTransactionsByTerm";
import { TransactionModel } from "@/models/transaction";
import { useHinomaruWalletContext } from "@/providers/HinomaruWalletProvider";
import { Token } from "@/registries/TokenRegistry";

export type HistoryViewModel = Pick<
  TransactionModel,
  "txHash" | "token" | "direction" | "counterparty" | "transferredAt"
> & { displayValue: string; anchorColor: string };

export type HistoryTerm = { timeFrom: Date; timeTo: Date };

export type UseHistoryRowsProps = { token: Token } & HistoryTerm;

const useHistoryRows = (props: UseHistoryRowsProps) => {
  const { token, timeFrom, timeTo } = props;

  const { account } = useHinomaruWalletContext();
  const { data: transactions, ...rest } = useListTransactionsByTerm(
    { wallet: account?.address ?? "0x00", token, timeFrom, timeTo },
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
        displayValue: `${valueSign}${toAllowedStr(transaction.value.decimals, token)} ${token}`,
        anchorColor
      };
    });
  }, [account, token, transactions]);

  return { historyRows, ...rest };
};

export default useHistoryRows;
