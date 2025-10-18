import { useForm, useStore } from "@tanstack/react-form";
import { RefetchOptions, QueryObserverResult } from "@tanstack/react-query";
import { createContext, PropsWithChildren, useContext, useEffect, useMemo } from "react";

import { toAllowed } from "@/helpers/tokenUnits";
import { useTransferFee } from "@/hooks/queries/useTransferFee";
import { FeeModel } from "@/models/fee";
import { useTokenBalanceContext } from "@/providers/TokenBalanceProvider";
import { Token } from "@/registries/TokenRegistry";

import buildTransferSchema, { type TransferFormValues } from "../_validators/buildTransferSchema";

type useTransferFormProviderProps = {
  sendToken: Token;
  maxSendable: number;
  defaultValues: TransferFormValues;
};
const useTransferFormProvider = (props: useTransferFormProviderProps) => {
  const { sendToken, maxSendable, defaultValues } = props;
  const schema = useMemo(() => buildTransferSchema(sendToken, maxSendable ?? 0), [maxSendable, sendToken]);

  return useForm({
    defaultValues,
    validators: { onChange: schema }
  });
};

type TransferFormProviderProps = {
  sendToken: Token;
};
export type TransferFormContextType = {
  form: ReturnType<typeof useTransferFormProvider>;
  maxSendable: number;
  fee?: FeeModel;
  sendToken: Token;
  isValid: boolean;
  insuff: { insufficient: boolean; message?: string };
  fetchFee: (options?: RefetchOptions | undefined) => Promise<QueryObserverResult<FeeModel | null, Error>>;
};
const TransferFormContext = createContext<TransferFormContextType | undefined>(undefined);

export const TransferFormProvider = (props: PropsWithChildren<TransferFormProviderProps>) => {
  const { sendToken, children } = props;
  const tokenBalances = useTokenBalanceContext();
  const balance = Number(tokenBalances[sendToken]?.balance ?? 0);
  const maxSendable = toAllowed(balance, sendToken);

  const defaultValues: TransferFormValues = useMemo(
    () => ({
      feeToken: sendToken,
      recipient: "",
      amount: ""
    }),
    [sendToken]
  );
  const form = useTransferFormProvider({ sendToken, maxSendable, defaultValues });

  const amount = useStore(form.baseStore, s => {
    const v = s.values.amount;
    return v === "" ? 0 : Number(v);
  });
  const feeToken = useStore(form.baseStore, s => s.values.feeToken as Token);
  const webhookUrl = useStore(form.baseStore, s => s.values.webhookUrl);
  const fieldMeta = useStore(form.store, s => s.fieldMeta);

  const { data: fee, refetch: fetchFee } = useTransferFee(
    { token: sendToken, feeToken, amountDecimals: amount },
    { enabled: false }
  );

  const isValid = useMemo(() => {
    const amountMeta = fieldMeta.amount;
    const recipientMeta = fieldMeta.recipient;
    const feeTokenMeta = fieldMeta.feeToken;
    const webhookUrlMeta = fieldMeta.webhookUrl;

    const isAmountValid = !!amountMeta?.isValid && !!amountMeta?.isDirty;
    const isRecipientValid = !!recipientMeta?.isValid && !!recipientMeta?.isDirty;
    const isFeeTokenValid = !!feeTokenMeta?.isValid;

    const isWebhookUrlValid = !webhookUrl?.trim() || !!webhookUrlMeta?.isValid;

    return isAmountValid && isRecipientValid && isFeeTokenValid && isWebhookUrlValid;
  }, [fieldMeta.amount, fieldMeta.recipient, fieldMeta.feeToken, fieldMeta.webhookUrl, webhookUrl]);

  const insuff = useMemo(() => {
    if (!isValid) return { insufficient: true };

    if (!fee) return { insufficient: true };

    const balToken = Number(tokenBalances[sendToken]?.balance ?? NaN);
    if (!Number.isFinite(balToken))
      return {
        insufficient: true,
        message: "残高を取得できませんでした。しばらくしてからお試しください。"
      };

    if (sendToken === feeToken) {
      const required = amount + fee.feeDecimals;
      if (balToken < required)
        return {
          insufficient: true,
          message: "残高が不足しています。（送金額＋手数料）"
        };

      return { insufficient: false };
    }

    const balFee = Number(tokenBalances[feeToken]?.balance ?? NaN);
    if (!Number.isFinite(balFee))
      return {
        insufficient: true,
        message: "手数料通貨の残高を取得できませんでした。"
      };

    if (balToken < amount)
      return {
        insufficient: true,
        message: "送金残高が不足しています。"
      };

    if (balFee < fee.feeDecimals)
      return {
        insufficient: true,
        message: "手数料通貨の残高が不足しています。"
      };

    return { insufficient: false };
  }, [amount, fee, feeToken, isValid, sendToken, tokenBalances]);

  useEffect(() => {
    const isAmountValid = form.state.fieldMeta.amount.isTouched && form.state.fieldMeta.amount.isValid;
    if (isAmountValid) fetchFee();
  }, [feeToken, fetchFee, form, sendToken]);

  return (
    <TransferFormContext.Provider
      value={{
        form,
        maxSendable,
        fee: fee ?? undefined,
        sendToken,
        isValid,
        insuff,
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
