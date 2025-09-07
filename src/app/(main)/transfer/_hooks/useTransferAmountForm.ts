import { useState, useMemo, useCallback, useEffect } from "react";
import * as v from "valibot";

import { isConvertibleToNumber } from "@/helpers/number";
import { toDecimals } from "@/helpers/tokenUnits";
import { useTransferFee } from "@/hooks/queries/useTransferFee";
import { useBoolean } from "@/hooks/useBoolean";
import { useTokenBalanceContext } from "@/providers/TokenBalanceProvider";
import { Token, TOKEN_REGISTRY } from "@/registries/TokenRegistry";

type UseTransferAmountFormProps = { token: Token };

export type UseTransferAmountFormResult = {
  amount: number;
  feeAmount: number;
  transferableAmount: number;
  isAmountValid: boolean;
  amountError: string | undefined;
  handleAmountSubmit: (text: string) => void;
};

const TransferAmountFormSchema = (token: Token, min: number, max: number) =>
  v.pipe(
    v.number("金額を入力してください。"),
    v.minValue(min, `最低送金額は${min}${token}です。`),
    v.maxValue(max, `送金可能額を超えています。`)
  );

const useTransferAmountForm = (props: UseTransferAmountFormProps): UseTransferAmountFormResult => {
  const { token } = props;
  const tokenBalanceResult = useTokenBalanceContext();

  const [amount, setAmount] = useState<number>(0);
  const [isAmountValid, setIsAmountValid] = useBoolean(false);
  const [amountError, setAmountError] = useState<string | undefined>(undefined);

  const tokenBalance = Number(tokenBalanceResult[token].balance ?? 0);

  const { data: maxFee } = useTransferFee(
    {
      token,
      feeToken: token,
      amountDecimals: tokenBalance
    },
    { enabled: tokenBalance !== 0 }
  );
  const { data: transferFee } = useTransferFee({
    token,
    feeToken: token,
    amountDecimals: amount
  });

  const transferableAmount = useMemo(() => {
    return tokenBalance - (maxFee?.feeDecimals ?? 0);
  }, [maxFee, tokenBalance]);

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

    const schema = TransferAmountFormSchema(
      token,
      toDecimals(TOKEN_REGISTRY[token].minTransferAmountUnits, token),
      transferableAmount
    );
    const validation = v.safeParse(schema, amount);
    if (!validation.success) {
      setAmountError(validation.issues[0].message);
      return;
    }

    setAmountError(undefined);
    setIsAmountValid.on();
  }, [amount, setIsAmountValid, token, transferableAmount]);

  return {
    amount,
    feeAmount: transferFee?.feeDecimals ?? 0,
    transferableAmount,
    isAmountValid,
    amountError,
    handleAmountSubmit
  };
};

export default useTransferAmountForm;
