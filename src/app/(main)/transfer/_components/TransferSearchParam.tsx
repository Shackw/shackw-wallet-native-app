import { useStore } from "@tanstack/react-form";
import { useLocalSearchParams } from "expo-router";
import { useCallback, useEffect, useRef } from "react";
import * as v from "valibot";
import { Address } from "viem";

import BackDrop from "@/components/BackDrop";
import { AlertDialog } from "@/components/Dialog";
import { ErrorText } from "@/components/Text";
import useAddressesRow from "@/hooks/useAddressesRow";
import { useBoolean } from "@/hooks/useBoolean";
import { Token } from "@/registries/TokenRegistry";
import { VStack } from "@/vendor/gluestack-ui/vstack";

import useTransferForm from "../_hooks/useTransferForm";
import TransferSearchParamsSchema, {
  TransferSearchParams,
  ParsedTransferSearchParams
} from "../_validators/TransferSearchParamsSchema";

import TransferConfirm from "./TransferConfirm";

const TransferSearchParam = () => {
  const { form, fee, sendToken, isValid, insuff, setSendToken } = useTransferForm();
  const rawParams = useLocalSearchParams<TransferSearchParams>();

  const { addressToName } = useAddressesRow();
  const [isConfirming, setIsConfirming] = useBoolean(false);

  const appliedRef = useRef(false);
  const [isError, setIsError] = useBoolean(false);
  const [isParsing, setIsParsing] = useBoolean(false);

  const amount = useStore(form.baseStore, s => {
    const v = s.values.amount;
    return v === "" ? 0 : Number(v);
  });
  const feeToken = useStore(form.baseStore, s => s.values.feeToken as Token);
  const recipient = useStore(form.baseStore, s => s.values.recipient as Address);
  const webhookUrl = useStore(form.baseStore, s => s.values.webhookUrl);

  const trySubmit = useCallback(
    async (parsed: ParsedTransferSearchParams) => {
      const { amount, recipient, feeToken, webhookUrl } = parsed;

      form.setFieldValue("amount", amount);
      form.setFieldValue("recipient", recipient);
      form.setFieldValue("feeToken", feeToken);
      form.setFieldValue("webhookUrl", webhookUrl);

      await form.validateAllFields("change");

      setIsParsing.off();
    },
    [form, setIsParsing]
  );

  useEffect(() => {
    if (appliedRef.current) return;

    setIsParsing.on();

    const parsed = v.safeParse(TransferSearchParamsSchema, rawParams);
    if (!parsed.success) {
      setIsParsing.off();
      setIsError.on();
      appliedRef.current = true;
      return;
    }

    const { amount, feeToken, recipient, sendToken, webhookUrl } = parsed.output;

    if (amount && feeToken && recipient && sendToken) {
      setSendToken(sendToken);

      const id = requestAnimationFrame(async () => {
        await trySubmit({ amount, feeToken, recipient, webhookUrl });
        setIsParsing.off();
        appliedRef.current = true;
      });

      return () => cancelAnimationFrame(id);
    } else {
      setIsParsing.off();
    }
  }, [rawParams, setIsError, setIsParsing, setSendToken, trySubmit]);

  useEffect(() => {
    if (isValid && !insuff.insufficient && !!fee) setIsConfirming.on();
  }, [fee, insuff.insufficient, isValid, setIsConfirming]);

  return (
    <>
      <BackDrop visible={isParsing} />

      <TransferConfirm
        name={addressToName[recipient.toLowerCase()]}
        recipient={recipient}
        amount={amount}
        sendToken={sendToken}
        feeToken={feeToken}
        feeDecimals={fee?.feeDecimals ?? 0}
        webhookUrl={webhookUrl}
        componentProps={{ title: "内容確認", size: "lg", isOpen: isConfirming, onClose: setIsConfirming.off }}
      />

      <AlertDialog title="読み取りエラー" isOpen={isError} onClose={setIsError.off} size="lg">
        <VStack className="py-4 gap-y-1">
          <ErrorText className="flex-1">読み込まれた情報が正しくない可能性があります。</ErrorText>
        </VStack>
      </AlertDialog>
    </>
  );
};

export default TransferSearchParam;
