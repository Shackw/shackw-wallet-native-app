import { useState, useMemo, useCallback, useEffect } from "react";
import * as v from "valibot";

import { useTokenBalanceContext } from "@/providers/TokenBalanceProvider";
import { TokenKind } from "@/shared/domain/tokens/registry";
import { useBoolean } from "@/shared/hooks/useBoolean";
import { isConvertibleToNumber } from "@/shared/utils/number";
import { TransferAmountFormSchema } from "@/shared/validation/schemas/TransferFormSchema";

type UseTransferAmountFormProps = { token: TokenKind };

export type UseTransferAmountFormResult = {
  amount: number;
  transferableAmount: number;
  isAmountValid: boolean;
  amountError: string | undefined;
  handleAmountSubmit: (text: string) => void;
};

const useTransferAmountForm = (props: UseTransferAmountFormProps): UseTransferAmountFormResult => {
  const { token } = props;
  const { tokenToBalance } = useTokenBalanceContext();

  const [amount, setAmount] = useState<number>(0);
  const [isAmountValid, setIsAmountValid] = useBoolean(false);
  const [amountError, setAmountError] = useState<string | undefined>(undefined);

  const transferableAmount = useMemo(() => Number(tokenToBalance[token] ?? 0), [token, tokenToBalance]);

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
