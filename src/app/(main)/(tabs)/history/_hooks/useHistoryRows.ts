import { useMemo } from "react";

import { TransactionModel } from "@/domain/transaction";
import { useListTransactionsByTerm } from "@/presentation/hooks/queries/useListTransactionsByTerm";
import { useShackwWalletContext } from "@/presentation/providers/ShackwWalletProvider";
import { Token } from "@/registries/TokenRegistry";
import { toAllowedStr } from "@/shared/helpers/tokenUnits";

export type HistoryViewModel = Pick<
  TransactionModel,
  "txHash" | "token" | "direction" | "counterparty" | "transferredAt"
> & { displayValue: string; anchorColor: string };

export type HistoryTerm = { timeFrom: Date; timeTo: Date };

export type UseHistoryRowsProps = { token: Token } & HistoryTerm;

const useHistoryRows = (props: UseHistoryRowsProps) => {
  const { token, timeFrom, timeTo } = props;

  const { account } = useShackwWalletContext();
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
        displayValue: `${valueSign}${toAllowedStr(transaction.value.displyValue, token)} ${token}`,
        anchorColor
      };
    });
  }, [account, token, transactions]);

  return { historyRows, ...rest };
};

export default useHistoryRows;
