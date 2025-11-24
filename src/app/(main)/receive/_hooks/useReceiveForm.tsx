import { useForm, useStore } from "@tanstack/react-form";
import { createContext, PropsWithChildren, useContext, useMemo, useState } from "react";

import { TokenAmountMeta } from "@/domain/walletMeta";
import { useWalletMetaContext } from "@/presentation/providers/WalletMetaProvider";
import { useWalletPreferencesContext } from "@/presentation/providers/WalletPreferencesProvider";
import { Token } from "@/registries/ChainTokenRegistry";

import buildReceiveSchema, { type ReceiveFormValues } from "../_validators/buildReceiveSchema";

type useReceiveFormProviderProps = { sendToken: Token; minTransfer: number };
const useReceiveFormProvider = (props: useReceiveFormProviderProps) => {
  const { sendToken, minTransfer } = props;
  const schema = useMemo(() => buildReceiveSchema(sendToken, minTransfer), [minTransfer, sendToken]);

  const defaultValues: ReceiveFormValues = {
    feeToken: "USDC",
    amount: "",
    webhookUrl: ""
  };

  return useForm({
    defaultValues,
    validators: { onChange: schema }
  });
};

export type ReceiveFormContextType = {
  form: ReturnType<typeof useReceiveFormProvider>;
  fee?: TokenAmountMeta;
  sendToken: Token;
  isValid: boolean;
  setSendToken: React.Dispatch<React.SetStateAction<Token>>;
};
const ReceiveFormContext = createContext<ReceiveFormContextType | undefined>(undefined);

export const ReceiveFormProvider = ({ children }: PropsWithChildren) => {
  const [sendToken, setSendToken] = useState<Token>("USDC");
  const { currentChain } = useWalletPreferencesContext();

  const { meta } = useWalletMetaContext();
  const minTransfer = useMemo(
    () => meta[currentChain][sendToken]?.minTransfer.display ?? 0,
    [currentChain, meta, sendToken]
  );

  const form = useReceiveFormProvider({ sendToken, minTransfer });

  const feeToken = useStore(form.baseStore, s => s.values.feeToken as Token);
  const webhookUrl = useStore(form.baseStore, s => s.values.webhookUrl);
  const fieldMeta = useStore(form.store, s => s.fieldMeta);

  const fee = useMemo(() => meta[currentChain][feeToken]?.fixedFee, [currentChain, feeToken, meta]);

  const isValid = useMemo(() => {
    const amountMeta = fieldMeta.amount;
    const feeTokenMeta = fieldMeta.feeToken;
    const webhookUrlMeta = fieldMeta.webhookUrl;

    const isAmountValid = !!amountMeta?.isTouched && !!amountMeta?.isValid;
    const isFeeTokenValid = !!feeTokenMeta?.isValid;
    const isWebhookUrlValid = !!webhookUrlMeta?.isValid || !webhookUrl;

    return isAmountValid && isFeeTokenValid && isWebhookUrlValid;
  }, [fieldMeta.amount, fieldMeta.feeToken, fieldMeta.webhookUrl, webhookUrl]);

  return (
    <ReceiveFormContext.Provider
      value={{
        form,
        fee: fee ?? undefined,
        sendToken,
        isValid,
        setSendToken
      }}
    >
      {children}
    </ReceiveFormContext.Provider>
  );
};

const useReceiveForm = () => {
  const ctx = useContext(ReceiveFormContext);
  if (!ctx) throw new Error("ReceiveFormContext is not mounted. Wrap your component with <ReceiveFormContext>.");
  return ctx;
};

export default useReceiveForm;
