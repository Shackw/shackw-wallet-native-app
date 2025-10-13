import { useLocalSearchParams } from "expo-router";
import { Dispatch, SetStateAction, useCallback, useEffect, useRef, useState } from "react";
import * as v from "valibot";
import { Address } from "viem";

import { useBoolean } from "@/hooks/useBoolean";
import { Token } from "@/registries/TokenRegistry";

import { TransferSubmitButtonHandle } from "../_components/TransferSubmitButton";
import TransferSearchParamsSchema, {
  ParsedTransferSearchParams,
  type TransferSearchParams
} from "../_validator/TransferSearchParamsSchema";

type UseTransferSearchParamsProps = {
  setSelectedToken: Dispatch<SetStateAction<"JPYC" | "USDC" | "EURC">>;
};

const useTransferSearchParams = (props: UseTransferSearchParamsProps) => {
  const { setSelectedToken } = props;

  const params = useLocalSearchParams<TransferSearchParams>();
  const [parsedParams, setParsedParams] = useState<ParsedTransferSearchParams | undefined | null>(undefined);

  const [isTrying, setIsTrying] = useBoolean(false);
  const [isTryedError, setIsTryedError] = useBoolean(false);
  const submitButtonRef = useRef<TransferSubmitButtonHandle>(null);

  const trySubmit = useCallback(
    async (sendToken: Token, parsed: ParsedTransferSearchParams) => {
      const { amount, feeToken, webhookUrl, recipient } = parsed;

      let retry = 0;
      while (retry <= 10) {
        setIsTrying.on();
        setSelectedToken(sendToken);
        setParsedParams({ amount, feeToken, recipient, webhookUrl });

        if (submitButtonRef.current?.handleTrySubmit) {
          const { success } = await submitButtonRef.current.handleTrySubmit(false);
          if (success) break;
        }
        retry++;
      }
      setIsTrying.off();
    },
    [setIsTrying, setSelectedToken]
  );

  useEffect(() => {
    if (parsedParams !== undefined) return;

    const parsed = v.safeParse(TransferSearchParamsSchema, params);

    if (!parsed.success) {
      setIsTryedError.on();
      setParsedParams(null);
      return;
    }

    const { amount, feeToken, recipient, sendToken, webhookUrl } = parsed.output;
    if (amount && feeToken && recipient && sendToken)
      trySubmit(sendToken, { amount, feeToken, webhookUrl, recipient: recipient as Address });
  }, [isTrying, params, parsedParams, setIsTryedError, trySubmit]);

  return {
    isTrying,
    isTryedError,
    submitButtonRef,
    initAmount: parsedParams?.amount,
    initFeeToken: parsedParams?.feeToken,
    initRecipient: parsedParams?.recipient,
    setIsTryedError
  };
};

export default useTransferSearchParams;
