import { useStore } from "@tanstack/react-form";
import { useCallback, useState } from "react";
import { Pressable } from "react-native";
import { Address } from "viem";

import { HStack } from "@/presentation/components/gluestack-ui/hstack";
import { Text } from "@/presentation/components/gluestack-ui/text";
import { VStack } from "@/presentation/components/gluestack-ui/vstack";
import { useAddressesRow } from "@/presentation/hooks/useAddressesRow";
import { useBoolean } from "@/presentation/hooks/useBoolean";

import useTransferForm from "../../_hooks/useTransferForm";

import TransferRecipientField from "./TransferRecipientField";

const TransferRecipient = () => {
  const transferForm = useTransferForm();

  const { form } = transferForm;
  const [isEditing, setIsEditing] = useBoolean(false);
  const [prevValue, setPrevValue] = useState<string>("");

  const useAddressesRowResult = useAddressesRow();
  const { addressToName } = useAddressesRowResult;

  const recipient = useStore(form.baseStore, s => s.values.recipient);

  const handleEdit = useCallback(() => {
    setPrevValue(recipient);
    setIsEditing.on();
  }, [recipient, setIsEditing]);

  return (
    <>
      <HStack className="w-full px-4 py-3 h-[90px] bg-white items-center justify-between gap-x-10">
        <Text size="xl" className="font-bold text-secondary-700 ">
          振込先
        </Text>
        <Pressable className="flex-1" onPress={handleEdit}>
          {(isEditing && prevValue) || (!isEditing && recipient) ? (
            <VStack className="gap-y-2">
              {addressToName[isEditing ? prevValue.toLowerCase() : recipient.toLowerCase()] && (
                <Text size="xl" numberOfLines={1} ellipsizeMode="middle" className="font-bold text-right">
                  {addressToName[isEditing ? prevValue.toLowerCase() : recipient.toLowerCase()]}
                </Text>
              )}
              <Text
                size="lg"
                numberOfLines={1}
                ellipsizeMode="middle"
                className="font-bold text-right text-secondary-600"
              >
                {(isEditing ? prevValue : recipient) as Address}
              </Text>
            </VStack>
          ) : (
            <Text size="lg" className="text-primary-600 font-bold text-center">
              振込先を入力
            </Text>
          )}
        </Pressable>
      </HStack>
      <TransferRecipientField
        prevValue={prevValue}
        transferForm={transferForm}
        useAddressesRowResult={useAddressesRowResult}
        componentProps={{
          title: "宛先を入力",
          size: "lg",
          isOpen: isEditing,
          onClose: setIsEditing.off
        }}
      />
    </>
  );
};

export default TransferRecipient;
