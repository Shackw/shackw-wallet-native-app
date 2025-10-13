import { useStore } from "@tanstack/react-form";
import { useCallback, useState } from "react";
import { Pressable } from "react-native";
import { Address } from "viem";

import { shortenAddress } from "@/helpers/address";
import useAddressesRow from "@/hooks/useAddressesRow";
import { useBoolean } from "@/hooks/useBoolean";
import { HStack } from "@/vendor/gluestack-ui/hstack";
import { Text } from "@/vendor/gluestack-ui/text";
import { VStack } from "@/vendor/gluestack-ui/vstack";

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
      <HStack className="w-full px-4 py-3 h-[90px] bg-white items-center justify-between gap-x-5">
        <Text size="xl" className="font-bold text-secondary-700 ">
          振込先
        </Text>
        <Pressable className="flex-1" onPress={handleEdit}>
          {(isEditing && prevValue) || (!isEditing && recipient) ? (
            <VStack className="gap-y-2">
              {addressToName[isEditing ? prevValue.toLowerCase() : recipient.toLowerCase()] && (
                <Text size="xl" className="font-bold text-right">
                  {addressToName[isEditing ? prevValue.toLowerCase() : recipient.toLowerCase()]}
                </Text>
              )}
              <Text size="lg" className="font-bold text-right text-secondary-600">
                {shortenAddress((isEditing ? prevValue : recipient) as Address, 14)}
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
