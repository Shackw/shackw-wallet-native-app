import { useForm, useStore } from "@tanstack/react-form";
import { RefetchOptions, QueryObserverResult } from "@tanstack/react-query";
import { createContext, PropsWithChildren, useContext, useEffect, useMemo } from "react";
import * as v from "valibot";

import { toDecimals, toAllowed } from "@/helpers/tokenUnits";
import { useTransferFee } from "@/hooks/queries/useTransferFee";
import { FeeModel } from "@/models/fee";
import { useTokenBalanceContext } from "@/providers/TokenBalanceProvider";
import { Token, TOKEN_REGISTRY } from "@/registries/TokenRegistry";
import { addressFormValidator } from "@/validations/forms/addressFormValidator";
import { tokenFormValidator } from "@/validations/forms/tokenFormValidator";

const buildTransferSchema = (sendToken: Token, maxSendable: number) => {
  const fraction = TOKEN_REGISTRY[sendToken].supportDecimals;
  const minAmount = toDecimals(TOKEN_REGISTRY[sendToken].minTransferAmountUnits, sendToken);
  const amountPattern = new RegExp(`^\\d+(?:\\.\\d{1,${fraction}})?$`);

  return v.object({
    feeToken: tokenFormValidator,
    recipient: addressFormValidator,
    amount: v.pipe(
      v.string("金額を入力してください。"),
      v.transform(s => s.trim()),
      v.minLength(1, "金額を入力してください。"),
      v.regex(amountPattern, `数値で入力してください（小数は最大 ${fraction} 桁まで）。`),
      v.transform(s => Number(s)),
      v.number("金額は数値で入力してください。"),
      v.minValue(minAmount, `最低送金可能額は ${minAmount} ${sendToken} です。`),
      v.maxValue(maxSendable, `送金可能な残高を超えています。`)
    )
  });
};
type TransferFormValues = v.InferInput<ReturnType<typeof buildTransferSchema>>;

type TransferFormProviderProps = { sendToken: Token; maxSendable: number };
const useTransferFormProvider = (props: TransferFormProviderProps) => {
  const { sendToken, maxSendable } = props;
  const schema = useMemo(() => buildTransferSchema(sendToken, maxSendable), [sendToken, maxSendable]);

  const defaultValues: TransferFormValues = { feeToken: sendToken, recipient: "", amount: "" };

  return useForm({
    defaultValues,
    validators: { onChange: schema }
  });
};

export type TransferFormContextType = {
  form: ReturnType<typeof useTransferFormProvider>;
  maxSendable: number;
  fee?: FeeModel;
  sendToken: Token;
  fetchFee: (options?: RefetchOptions | undefined) => Promise<QueryObserverResult<FeeModel | null, Error>>;
};

const TransferFormContext = createContext<TransferFormContextType | undefined>(undefined);

export const TransferFormProvider = (props: PropsWithChildren<Pick<TransferFormProviderProps, "sendToken">>) => {
  const { sendToken, children } = props;
  const tokenBalances = useTokenBalanceContext();
  const balance = Number(tokenBalances[sendToken]?.balance ?? 0);
  const maxSendable = toAllowed(balance, sendToken);

  const form = useTransferFormProvider({ sendToken, maxSendable });

  const feeToken = useStore(form.baseStore, s => s.values.feeToken as Token);
  const amountDecimals = useStore(form.store, s => {
    const v = s.values.amount;
    return v === "" ? 0 : Number(v);
  });
  const { data: fee, refetch: fetchFee } = useTransferFee(
    { token: sendToken, feeToken, amountDecimals },
    { enabled: false }
  );

  useEffect(() => {
    const isAmountValid = form.state.fieldMeta.amount.isTouched && form.state.fieldMeta.amount.isValid;
    if (isAmountValid) fetchFee();
  }, [feeToken, fetchFee, form]);

  return (
    <TransferFormContext.Provider
      value={{
        form,
        maxSendable,
        fee: fee ?? undefined,
        sendToken,
        fetchFee
      }}
    >
      {children}
    </TransferFormContext.Provider>
  );
};

const useTransferForm = () => {
  const ctx = useContext(TransferFormContext);
  if (!ctx) throw new Error("TransferFormProvider is not mounted. Wrap your component with <TransferFormProvider>.");
  return ctx;
};

export default useTransferForm;
