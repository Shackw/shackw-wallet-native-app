import { useStore } from "@tanstack/react-form";
import { useCallback, useEffect, useState } from "react";
import { Pressable } from "react-native";

import { HStack } from "@/presentation/components/gluestack-ui/hstack";
import { Text } from "@/presentation/components/gluestack-ui/text";
import { VStack } from "@/presentation/components/gluestack-ui/vstack";
import { useBoolean } from "@/presentation/hooks/useBoolean";
import { toAllowedStr } from "@/shared/helpers/tokenUnits";

import useReceiveForm from "../../_hooks/useReceiveForm";

import ReceiveAmountField from "./ReceiveAmountField";
import ReceiveAmountSummary from "./ReceiveAmountSummary";

const ReceiveAmount = () => {
  const receiveForm = useReceiveForm();

  const { form, sendToken } = receiveForm;
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
            請求額
          </Text>
          <Pressable className="flex-1" onPress={handleEdit}>
            {(isEditing && prevValue) || (!isEditing && amount) ? (
              <Text size="2xl" className="font-bold text-right">
                {`${toAllowedStr(amount ?? 0, sendToken)} ${sendToken}`}
              </Text>
            ) : (
              <Text size="lg" className="text-primary-600 font-bold text-center">
                金額を入力
              </Text>
            )}
          </Pressable>
        </HStack>
        <ReceiveAmountSummary transferForm={receiveForm} display="both" className="px-4" />
      </VStack>
      <ReceiveAmountField
        prevValue={prevValue}
        transferForm={receiveForm}
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

export default ReceiveAmount;
