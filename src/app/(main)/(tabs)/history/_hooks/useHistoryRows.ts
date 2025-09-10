import { useMemo } from "react";
import { Address } from "viem";

import { formatUnixTimestampToJST } from "@/helpers/datetime";
import { toDecimals } from "@/helpers/tokenUnits";
import { useListTransactionsByTerm } from "@/hooks/queries/useListTransactionsByTerm";
import { useHinomaruWalletContext } from "@/providers/HinomaruWalletProvider";
import { Token } from "@/registries/TokenRegistry";

export type HistoryViewModel = {
  token: Token;
  value: number;
  counterparty: Address;
  direction: "IN" | "OUT";
  transactionAt: string;
};

export type HistoryTerm = { timeFrom: Date; timeTo: Date };

export type UseHistoryRowsProps = { token: Token } & HistoryTerm;

const useHistoryRows = (props: UseHistoryRowsProps) => {
  const { token, timeFrom, timeTo } = props;

  const { account } = useHinomaruWalletContext();
  const { data: transactions, ...rest } = useListTransactionsByTerm(
    { wallet: account?.address ?? "0x00", token, timeFrom, timeTo },
    { enabled: !!account?.address }
  );

  const historyRows = useMemo(() => {
    if (!transactions) return undefined;

    return transactions.map(v => {
      const direction = v.to === account?.address ? "IN" : "OUT";
      const counterparty = direction === "IN" ? v.from : v.to;

      const decimals = toDecimals(v.value, token);
      const value = direction === "OUT" ? decimals * -1 : decimals;
      return {
        token,
        value,
        counterparty,
        direction,
        transactionAt: formatUnixTimestampToJST(v.timestamp)
      };
    });
  }, [account, token, transactions]);

  return { historyRows, ...rest };
};

export default useHistoryRows;
