import { useStore } from "@tanstack/react-form";
import { useCallback, useEffect, useState } from "react";
import { Pressable } from "react-native";

import { toAllowedStr } from "@/helpers/tokenUnits";
import { useBoolean } from "@/hooks/useBoolean";
import { HStack } from "@/vendor/gluestack-ui/hstack";
import { Text } from "@/vendor/gluestack-ui/text";
import { VStack } from "@/vendor/gluestack-ui/vstack";

import { useTransferForm } from "../../_hooks/useTransferForm";

import TransferAmountField from "./TransferAmountField";
import TransferAmountSummary from "./TransferAmountSummary";

const TransferAmount = () => {
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
        <HStack className="w-full px-4 py-3 h-[90px] bg-white items-center justify-between gap-x-5">
          <Text size="xl" className="font-bold text-secondary-700 ">
            送金額
          </Text>
          <Pressable className="flex-1" onPress={handleEdit}>
            {(isEditing && prevValue) || (!isEditing && amount) ? (
              <Text size="2xl" className="font-bold text-right">
                {`${toAllowedStr(amount ?? 0, sendToken)} ${sendToken}`}
              </Text>
            ) : (
              <Text size="xl" className="text-primary-600 font-bold text-center">
                金額を入力
              </Text>
            )}
          </Pressable>
        </HStack>
        <TransferAmountSummary transferForm={transferForm} display="both" className="px-4" />
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
