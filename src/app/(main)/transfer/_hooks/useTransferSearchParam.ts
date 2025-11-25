import { useStore } from "@tanstack/react-form";
import { useLocalSearchParams } from "expo-router";
import { useRef, useCallback, useEffect } from "react";
import * as v from "valibot";
import { Address } from "viem";

import { useBoolean } from "@/presentation/hooks/useBoolean";
import { useWalletPreferencesContext } from "@/presentation/providers/WalletPreferencesProvider";
import { Token } from "@/registries/ChainTokenRegistry";

import TransferSearchParamsSchema, {
  TransferSearchParams,
  ParsedTransferSearchParams
} from "../_validators/TransferSearchParamsSchema";

import useTransferForm from "./useTransferForm";

export const useTransferSearchParam = () => {
  const { setCurrentChain } = useWalletPreferencesContext();
  const rawParams = useLocalSearchParams<TransferSearchParams>();
  const { form, fee, sendToken, isValid, insuff, setSendToken } = useTransferForm();

  const appliedRef = useRef(false);
  const [isError, setIsError] = useBoolean(false);
  const [isParsing, setIsParsing] = useBoolean(false);
  const [isConfirmed, setIsConfirmed] = useBoolean(false);
  const [isConfirming, setIsConfirming] = useBoolean(false);

  const amount = useStore(form.baseStore, s => {
    const v = s.values.amount;
    return v === "" ? 0 : Number(v);
  });
  const feeToken = useStore(form.baseStore, s => s.values.feeToken as Token);
  const recipient = useStore(form.baseStore, s => s.values.recipient as Address);
  const webhookUrl = useStore(form.baseStore, s => s.values.webhookUrl);

  const trySubmit = useCallback(
    async (parsed: ParsedTransferSearchParams) => {
      const { chain, amount, recipient, feeToken, webhookUrl } = parsed;

      setCurrentChain(chain);

      form.setFieldValue("amount", amount);
      form.setFieldValue("recipient", recipient);
      form.setFieldValue("feeToken", feeToken);
      form.setFieldValue("webhookUrl", webhookUrl);

      await form.validateAllFields("change");

      setIsParsing.off();
    },
    [form, setIsParsing, setCurrentChain]
  );

  useEffect(() => {
    if (appliedRef.current || isConfirmed) return;

    setIsParsing.on();

    const parsed = v.safeParse(TransferSearchParamsSchema, rawParams);
    if (!parsed.success) {
      setIsConfirmed.on();
      setIsParsing.off();
      setIsError.on();
      appliedRef.current = true;
      return;
    }

    const { chain, amount, feeToken, recipient, sendToken, webhookUrl } = parsed.output;

    if (chain && amount && feeToken && recipient && sendToken) {
      setSendToken(sendToken);

      const id = requestAnimationFrame(async () => {
        await trySubmit({ chain, amount, feeToken, recipient, webhookUrl });
        setIsParsing.off();
        appliedRef.current = true;
      });

      return () => cancelAnimationFrame(id);
    } else {
      setIsConfirmed.on();
      setIsParsing.off();
    }
  }, [isConfirmed, rawParams, setIsConfirmed, setIsError, setIsParsing, setSendToken, trySubmit]);

  useEffect(() => {
    if (isValid && !insuff.insufficient && !!fee && !isConfirmed) {
      setIsConfirming.on();
      setIsConfirmed.on();
    }
  }, [fee, insuff.insufficient, isConfirmed, isValid, setIsConfirmed, setIsConfirming]);

  return {
    isParsing,
    isConfirming,
    isError,
    confirmProps: { amount, sendToken, recipient, feeToken, feeDisplyValue: fee?.display ?? 0, webhookUrl },
    setIsConfirming,
    setIsError
  };
};
