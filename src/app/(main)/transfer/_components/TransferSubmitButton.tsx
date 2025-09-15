import { useStore } from "@tanstack/react-form";
import { useMemo } from "react";
import { Address } from "viem";

import { ContainButton } from "@/components/Button";
import { ErrorText, InfoText } from "@/components/Text";
import { useTransferToken } from "@/hooks/mutations/useTransferToken";
import { useHinomaruWalletContext } from "@/providers/HinomaruWalletProvider";
import { useTokenBalanceContext } from "@/providers/TokenBalanceProvider";
import { Token } from "@/registries/TokenRegistry";
import { VStack } from "@/vendor/gluestack-ui/vstack";

import { useTransferForm } from "../_hooks/useTransferForm";

const TransferSubmitButton = () => {
  const { form, sendToken, fee } = useTransferForm();
  const { account, client } = useHinomaruWalletContext();
  const tokenBalanceResult = useTokenBalanceContext();
  const { mutateAsync } = useTransferToken();

  const amount = useStore(form.baseStore, s => {
    const v = s.values.amount;
    return v === "" ? 0 : Number(v);
  });
  const feeToken = useStore(form.baseStore, s => s.values.feeToken as Token);
  const fieldMeta = useStore(form.store, s => s.fieldMeta);

  const isValid = useMemo(() => {
    const amountMeta = fieldMeta.amount;
    const recipientMeta = fieldMeta.recipient;
    const feeTokenMeta = fieldMeta.feeToken;

    const isAmountValid = !!amountMeta?.isTouched && !!amountMeta?.isValid;
    const isRecipientValid = !!recipientMeta?.isTouched && !!recipientMeta?.isValid;
    const isFeeTokenValid = !!feeTokenMeta?.isValid;

    return isAmountValid && isRecipientValid && isFeeTokenValid;
  }, [fieldMeta]);

  const insuff = useMemo(() => {
    if (!isValid) return { insufficient: true };

    if (!fee) return { insufficient: true };

    const balToken = Number(tokenBalanceResult[sendToken]?.balance ?? NaN);
    if (!Number.isFinite(balToken)) {
      return { insufficient: true, message: "残高を取得できませんでした。しばらくしてからお試しください。" };
    }

    if (sendToken === feeToken) {
      const required = amount + fee.feeDecimals;
      if (balToken < required) {
        return {
          insufficient: true,
          message: "残高が不足しています。（送金額＋手数料）"
        };
      }
      return { insufficient: false as const, message: undefined };
    }

    const balFee = Number(tokenBalanceResult[feeToken]?.balance ?? NaN);
    if (!Number.isFinite(balFee)) {
      return { insufficient: true, message: "手数料通貨の残高を取得できませんでした。" };
    }

    if (balToken < amount) {
      return {
        insufficient: true,
        message: "送金残高が不足しています。"
      };
    }
    if (balFee < fee.feeDecimals) {
      return {
        insufficient: true,
        message: "手数料通貨の残高が不足しています。"
      };
    }

    return { insufficient: false as const, message: undefined };
  }, [amount, fee, feeToken, isValid, sendToken, tokenBalanceResult]);

  const handleSubmit = async () => {
    if (insuff.insufficient || !account || !client) return;
    const values = form.state.values;
    const result = await mutateAsync({
      account,
      client,
      token: sendToken,
      feeToken: values.feeToken as Token,
      amountDecimals: Number(values.amount),
      recipient: values.recipient as Address
    });
    console.log(result);
  };

  return (
    <VStack className="px-4 pt-5 gap-y-5">
      {insuff.insufficient && insuff.message ? (
        <ErrorText size="md">{insuff.message}</ErrorText>
      ) : (
        <InfoText size="md">必要項目を入力すると手数料を自動計算します。</InfoText>
      )}
      <ContainButton
        text="確認画面へ"
        size="lg"
        isLoading={isValid && !fee}
        isDisabled={!isValid || insuff.insufficient}
        onPress={handleSubmit}
        className="w-full mx-auto"
      />
    </VStack>
  );
};

export default TransferSubmitButton;
