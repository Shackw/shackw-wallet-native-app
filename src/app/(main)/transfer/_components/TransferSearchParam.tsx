import { useLocalSearchParams } from "expo-router";
import { Dispatch, SetStateAction, useCallback, useEffect, useRef } from "react";
import * as v from "valibot";

import BackDrop from "@/components/BackDrop";
import { AlertDialog } from "@/components/Dialog";
import { ErrorText } from "@/components/Text";
import { useBoolean } from "@/hooks/useBoolean";
import { Token } from "@/registries/TokenRegistry";
import { VStack } from "@/vendor/gluestack-ui/vstack";

import useTransferForm from "../_hooks/useTransferForm";
import TransferSearchParamsSchema, {
  TransferSearchParams,
  ParsedTransferSearchParams
} from "../_validators/TransferSearchParamsSchema";

type TransferSearchParamProps = { setSelectedToken: Dispatch<SetStateAction<Token>> };

const TransferSearchParam = ({ setSelectedToken }: TransferSearchParamProps) => {
  const { form, maxSendable, fetchFee } = useTransferForm();
  const rawParams = useLocalSearchParams<TransferSearchParams>();

  const appliedRef = useRef(false);

  const [isError, setIsError] = useBoolean(false);
  const [isParsing, setIsParsing] = useBoolean(false);

  const trySubmit = useCallback(
    async (parsed: ParsedTransferSearchParams) => {
      const { amount, recipient, feeToken, webhookUrl } = parsed;

      form.setFieldValue("amount", amount);
      form.setFieldValue("recipient", recipient);
      form.setFieldValue("feeToken", feeToken);
      form.setFieldValue("webhookUrl", webhookUrl);

      await form.validateAllFields("change");
      await fetchFee();

      setIsParsing.off();
    },
    [fetchFee, form, setIsParsing]
  );

  useEffect(() => {
    if (appliedRef.current) return;

    setIsParsing.on();

    const parsed = v.safeParse(TransferSearchParamsSchema, rawParams);
    if (!parsed.success) {
      setIsParsing.off();
      setIsError.on();
      return;
    }

    const { amount, feeToken, recipient, sendToken, webhookUrl } = parsed.output;

    if (amount && feeToken && recipient && sendToken) {
      setSelectedToken(sendToken);

      const id = requestAnimationFrame(async () => {
        await trySubmit({ amount, feeToken, recipient, webhookUrl });
        setIsParsing.off();
        appliedRef.current = true;
      });

      return () => cancelAnimationFrame(id);
    } else {
      setIsParsing.off();
    }
  }, [rawParams, setIsError, setIsParsing, maxSendable, setSelectedToken, trySubmit]);

  return (
    <>
      <BackDrop visible={isParsing} />

      <AlertDialog title="読み取りエラー" isOpen={isError} onClose={setIsError.off} size="lg">
        <VStack className="py-4 gap-y-1">
          <ErrorText className="flex-1">読み込まれた情報が正しくない可能性があります。</ErrorText>
        </VStack>
      </AlertDialog>
    </>
  );
};

export default TransferSearchParam;
