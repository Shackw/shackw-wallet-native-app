import { useStore } from "@tanstack/react-form";
import { useCallback, useEffect, useState } from "react";
import { Pressable } from "react-native";

import { AppText } from "@/presentation/components/AppText";
import { HStack } from "@/presentation/components/gluestack-ui/hstack";
import { VStack } from "@/presentation/components/gluestack-ui/vstack";
import { useBoolean } from "@/presentation/hooks/useBoolean";
import { useTw } from "@/presentation/styles/tw";
import { cn } from "@/shared/helpers/cn";
import { toAllowedStr } from "@/shared/helpers/tokenUnits";

import useTransferForm from "../../_hooks/useTransferForm";

import TransferAmountField from "./TransferAmountField";
import TransferAmountSummary from "./TransferAmountSummary";

const TransferAmount = () => {
  const tw = useTw();
  const transferForm = useTransferForm();

  const { form, sendToken } = transferForm;
  const [isEditing, setIsEditing] = useBoolean(false);
  const [prevValue, setPrevValue] = useState<number | undefined>(undefined);

  const amount = useStore(form.baseStore, s => {
    const v = s.values.amount;
    return v === "" ? undefined : Number(v);
  });

  const handleEdit = useCallback(() => {
    setPrevValue(amount);
    setIsEditing.on();
  }, [amount, setIsEditing]);

  useEffect(() => {
    form.resetField("amount");
  }, [form, sendToken]);

  return (
    <>
      <VStack className="w-full">
        <HStack
          className={cn(
            "w-full",
            tw.px(4),
            tw.py(3),
            tw.h(24),
            "bg-white",
            "items-center",
            "justify-between",
            tw.gapX(5)
          )}
        >
          <AppText t="lg" className="font-bold text-secondary-700">
            送金額
          </AppText>
          <Pressable className="flex-1" onPress={handleEdit}>
            {(isEditing && prevValue) || (!isEditing && amount) ? (
              <AppText t="2xl" className="font-bold text-right">
                {`${toAllowedStr(amount ?? 0, sendToken)} ${sendToken}`}
              </AppText>
            ) : (
              <AppText t="lg" className="text-primary-600 font-bold text-center">
                金額を入力
              </AppText>
            )}
          </Pressable>
        </HStack>
        <TransferAmountSummary transferForm={transferForm} display="both" className={cn(tw.px(4))} />
      </VStack>
      <TransferAmountField
        prevValue={prevValue}
        transferForm={transferForm}
        componentProps={{
          title: "金額を入力",
          size: "lg",
          isOpen: isEditing,
          onClose: setIsEditing.off
        }}
      />
    </>
  );
};

export default TransferAmount;
