import { useForm, useStore } from "@tanstack/react-form";
import { RefetchOptions, QueryObserverResult } from "@tanstack/react-query";
import { createContext, PropsWithChildren, useContext, useEffect, useMemo } from "react";

import { useTransferFee } from "@/hooks/queries/useTransferFee";
import { FeeModel } from "@/models/fee";
import { Token } from "@/registries/TokenRegistry";

import buildReceiveSchema, { type ReceiveFormValues } from "../_validators/buildReceiveSchema";

type useReceiveFormProviderProps = { sendToken: Token; defaultValues: ReceiveFormValues };
const useReceiveFormProvider = (props: useReceiveFormProviderProps) => {
  const { sendToken, defaultValues } = props;
  const schema = useMemo(() => buildReceiveSchema(sendToken), [sendToken]);

  return useForm({
    defaultValues,
    validators: { onChange: schema }
  });
};

type ReceiveFormProviderProps = {
  sendToken: Token;
};
export type ReceiveFormContextType = {
  form: ReturnType<typeof useReceiveFormProvider>;
  fee?: FeeModel;
  sendToken: Token;
  isValid: boolean;
  fetchFee: (options?: RefetchOptions | undefined) => Promise<QueryObserverResult<FeeModel | null, Error>>;
};
const ReceiveFormContext = createContext<ReceiveFormContextType | undefined>(undefined);

export const ReceiveFormProvider = (props: PropsWithChildren<ReceiveFormProviderProps>) => {
  const { sendToken, children } = props;

  const defaultValues: ReceiveFormValues = {
    feeToken: sendToken,
    amount: "",
    webhookUrl: ""
  };
  const form = useReceiveFormProvider({ sendToken, defaultValues });

  const amountDecimals = useStore(form.store, s => {
    const v = s.values.amount;
    return v === "" ? 0 : Number(v);
  });
  const feeToken = useStore(form.baseStore, s => s.values.feeToken as Token);
  const webhookUrl = useStore(form.baseStore, s => s.values.webhookUrl);
  const fieldMeta = useStore(form.store, s => s.fieldMeta);

  const { data: fee, refetch: fetchFee } = useTransferFee(
    { token: sendToken, feeToken, amountDecimals },
    { enabled: false }
  );

  const isValid = useMemo(() => {
    const amountMeta = fieldMeta.amount;
    const feeTokenMeta = fieldMeta.feeToken;
    const webhookUrlMeta = fieldMeta.webhookUrl;

    const isAmountValid = !!amountMeta?.isTouched && !!amountMeta?.isValid;
    const isFeeTokenValid = !!feeTokenMeta?.isValid;
    const isWebhookUrlValid = !!webhookUrlMeta?.isValid || !webhookUrl;

    return isAmountValid && isFeeTokenValid && isWebhookUrlValid;
  }, [fieldMeta.amount, fieldMeta.feeToken, fieldMeta.webhookUrl, webhookUrl]);

  useEffect(() => {
    const isAmountValid = form.state.fieldMeta.amount.isTouched && form.state.fieldMeta.amount.isValid;
    if (isAmountValid) fetchFee();
  }, [feeToken, fetchFee, form]);

  return (
    <ReceiveFormContext.Provider
      value={{
        form,
        fee: fee ?? undefined,
        sendToken,
        isValid,
        fetchFee
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
