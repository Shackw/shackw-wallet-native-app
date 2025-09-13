import React, { useState } from "react";
import { Pressable } from "react-native";
import { Address } from "viem";

import { shortenAddress } from "@/helpers/address";
import { HStack } from "@/vendor/gluestack-ui/hstack";
import { Input, InputField } from "@/vendor/gluestack-ui/input";
import { Text } from "@/vendor/gluestack-ui/text";
import { VStack } from "@/vendor/gluestack-ui/vstack";

import { useTransferRecipientFormResult } from "../_hooks/useTransferRecipientForm";

type TransferRecipientProps = { form: useTransferRecipientFormResult };

const TransferRecipient = ({ form }: TransferRecipientProps) => {
  const { recipient } = form;

  return (
    <HStack className="w-full px-4 py-3 h-[90px] bg-white items-center justify-between gap-x-5">
      <Text size="lg" className="font-bold text-secondary-700 ">
        振込先
      </Text>
      <Pressable className="flex-1">
        {recipient ? (
          <Text size="xl" className="font-bold text-right">
            {shortenAddress(recipient as Address, 12)}
          </Text>
        ) : (
          <Text size="xl" className="text-primary-700 font-bold text-center">
            振込先を入力
          </Text>
        )}
      </Pressable>
    </HStack>
  );
};

export default TransferRecipient;
