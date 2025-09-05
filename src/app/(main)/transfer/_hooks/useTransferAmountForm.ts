import { useState, useMemo, useCallback, useEffect } from "react";
import * as v from "valibot";

import { useBoolean } from "@/hooks/useBoolean";
import { useTokenBalanceContext } from "@/providers/TokenBalanceProvider";
import { Token } from "@/registries/TokenRegistry";
import { isConvertibleToNumber } from "@/helpers/number";

type UseTransferAmountFormProps = { token: Token };

export type UseTransferAmountFormResult = {
  amount: number;
  transferableAmount: number;
  isAmountValid: boolean;
  amountError: string | undefined;
  handleAmountSubmit: (text: string) => void;
};

const TransferAmountFormSchema = (maxAmount: number) =>
  v.pipe(
    v.number("金額を入力してください。"),
    v.minValue(0.00000000001, "0より大きい金額を指定してください。"),
    v.maxValue(maxAmount, `送金可能額を超えています。`)
  );

const useTransferAmountForm = (props: UseTransferAmountFormProps): UseTransferAmountFormResult => {
  const { token } = props;
  const tokenBalanceResult = useTokenBalanceContext();

  const [amount, setAmount] = useState<number>(0);
  const [isAmountValid, setIsAmountValid] = useBoolean(false);
  const [amountError, setAmountError] = useState<string | undefined>(undefined);

  const transferableAmount = useMemo(() => Number(tokenBalanceResult[token].balance ?? 0), [tokenBalanceResult, token]);

  const amountSchema = useMemo(() => TransferAmountFormSchema(transferableAmount), [transferableAmount]);

  const handleAmountSubmit = useCallback((amountText: string) => {
    if (amountText === "" || !isConvertibleToNumber(amountText)) return setAmount(0);
    setAmount(Number(amountText));
  }, []);

  useEffect(() => {
    setIsAmountValid.off();
    if (amount === 0) {
      setAmountError(undefined);
      return;
    }

    const validation = v.safeParse(amountSchema, amount);
    if (!validation.success) {
      setAmountError(validation.issues[0].message);
      return;
    }

    setAmountError(undefined);
    setIsAmountValid.on();
  }, [amount, amountSchema, setIsAmountValid]);

  return {
    amount,
    transferableAmount,
    isAmountValid,
    amountError,
    handleAmountSubmit
  };
};

export default useTransferAmountForm;
