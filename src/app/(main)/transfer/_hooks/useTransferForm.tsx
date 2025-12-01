import { useForm, useStore } from "@tanstack/react-form";
import { createContext, PropsWithChildren, useContext, useMemo, useState } from "react";

import { TokenAmountMeta } from "@/domain/walletMeta";
import { useTokenBalanceContext } from "@/presentation/providers/TokenBalanceProvider";
import { useWalletMetaContext } from "@/presentation/providers/WalletMetaProvider";
import { useWalletPreferencesContext } from "@/presentation/providers/WalletPreferencesProvider";
import { Token } from "@/registries/ChainTokenRegistry";
import { toAllowed } from "@/shared/helpers/tokenUnits";

import buildTransferSchema, { type TransferFormValues } from "../_validators/buildTransferSchema";

type useTransferFormProviderProps = {
  sendToken: Token;
  maxSendable: number;
  minTransfer: number;
};
const useTransferFormProvider = (props: useTransferFormProviderProps) => {
  const { sendToken, maxSendable, minTransfer } = props;
  const schema = useMemo(
    () => buildTransferSchema(sendToken, maxSendable ?? 0, minTransfer),
    [maxSendable, minTransfer, sendToken]
  );

  const defaultValues: TransferFormValues = {
    feeToken: "USDC",
    recipient: "",
    amount: ""
  };

  return useForm({
    defaultValues,
    validators: { onChange: schema }
  });
};

export type TransferFormContextType = {
  form: ReturnType<typeof useTransferFormProvider>;
  maxSendable: number;
  fee?: TokenAmountMeta;
  sendToken: Token;
  isValid: boolean;
  insuff: { insufficient: boolean; message?: string };
  setSendToken: React.Dispatch<React.SetStateAction<Token>>;
};
const TransferFormContext = createContext<TransferFormContextType | undefined>(undefined);

export const TransferFormProvider = ({ children }: PropsWithChildren) => {
  const { currentChain, currentChainDefaultToken } = useWalletPreferencesContext();

  const [sendToken, setSendToken] = useState<Token>(currentChainDefaultToken);

  const { meta } = useWalletMetaContext();

  const tokenBalances = useTokenBalanceContext();
  const maxSendable = useMemo(
    () => toAllowed(Number(tokenBalances[sendToken]?.balance ?? 0), sendToken),
    [sendToken, tokenBalances]
  );

  const minTransfer = useMemo(
    () => meta[currentChain][sendToken]?.minTransfer.display ?? 0,
    [currentChain, meta, sendToken]
  );

  const form = useTransferFormProvider({
    sendToken,
    maxSendable,
    minTransfer
  });

  const amount = useStore(form.baseStore, s => {
    const v = s.values.amount;
    return v === "" ? 0 : Number(v);
  });
  const feeToken = useStore(form.baseStore, s => s.values.feeToken as Token);
  const webhookUrl = useStore(form.baseStore, s => s.values.webhookUrl);
  const fieldMeta = useStore(form.store, s => s.fieldMeta);

  const fee = useMemo(() => meta[currentChain][feeToken]?.fixedFee, [currentChain, feeToken, meta]);

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
  }, [fieldMeta.amount, fieldMeta.feeToken, fieldMeta.recipient, fieldMeta.webhookUrl, webhookUrl]);

  const insuff = useMemo(() => {
    if (!fee) return { insufficient: true };

    const balToken = Number(tokenBalances[sendToken]?.balance ?? NaN);
    if (!Number.isFinite(balToken))
      return {
        insufficient: true,
        message: "残高を取得できませんでした。しばらくしてからお試しください。"
      };

    if (sendToken === feeToken) {
      const required = amount + fee.display;
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

    if (balFee < fee.display)
      return {
        insufficient: true,
        message: "手数料通貨の残高が不足しています。"
      };

    return { insufficient: false };
  }, [amount, fee, feeToken, sendToken, tokenBalances]);

  return (
    <TransferFormContext.Provider
      value={{
        form,
        maxSendable,
        fee: fee ?? undefined,
        sendToken,
        isValid,
        insuff,
        setSendToken
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
