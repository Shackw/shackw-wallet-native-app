import { Address } from "viem";

import { Box } from "@/vendor/gluestack-ui/box";
import { HStack } from "@/vendor/gluestack-ui/hstack";
import { Text } from "@/vendor/gluestack-ui/text";
import { VStack } from "@/vendor/gluestack-ui/vstack";

type TransferConfirmRecipientProps = {
  name: string | undefined;
  recipient: Address;
};

const TransferConfirmRecipient = (props: TransferConfirmRecipientProps) => {
  const { name, recipient } = props;

  return (
    <VStack className="w-full gap-y-2">
      <HStack className="gap-x-2">
        <Box className="w-1.5 bg-primary-500" />
        <Text className="font-bold">振込先情報</Text>
      </HStack>
      <VStack className="border-[0.5px] border-secondary-300 px-5 py-6 bg-secondary-50 rounded-xl gap-y-3">
        {name && (
          <VStack className="gap-y-1">
            <Text className="font-bold text-secondary-600">振込先名</Text>
            <Text className="font-bold text-secondary-800 text-right">{name}</Text>
          </VStack>
        )}
        <VStack className="gap-y-1">
          <Text className="font-bold text-secondary-600">振込先アドレス</Text>
          <Text className="font-bold text-secondary-800 text-right">{recipient}</Text>
        </VStack>
      </VStack>
    </VStack>
  );
};

export default TransferConfirmRecipient;
