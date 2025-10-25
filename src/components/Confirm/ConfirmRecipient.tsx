import { Address } from "viem";

import { Box } from "@/vendor/gluestack-ui/box";
import { HStack } from "@/vendor/gluestack-ui/hstack";
import { Text } from "@/vendor/gluestack-ui/text";
import { VStack } from "@/vendor/gluestack-ui/vstack";

type ConfirmAddressProps = {
  title: string;
  name: string | undefined;
  address: Address;
};

const ConfirmRecipient = (props: ConfirmAddressProps) => {
  const { title, name, address } = props;

  return (
    <VStack className="w-full gap-y-2">
      <HStack className="gap-x-2">
        <Box className="w-1.5 bg-primary-500" />
        <Text className="font-bold">{title}</Text>
      </HStack>
      <VStack className="border-[0.5px] border-secondary-300 p-4 bg-secondary-50 rounded-xl">
        <VStack className="gap-y-1">
          <Text className="font-bold text-secondary-600">名前</Text>
          <Text className="font-bold text-secondary-800 text-right">{name}</Text>
        </VStack>
        <VStack className="gap-y-1">
          <Text className="font-bold text-secondary-600">アドレス</Text>
          <Text className="font-bold text-secondary-800 text-right">{address}</Text>
        </VStack>
      </VStack>
    </VStack>
  );
};

export default ConfirmRecipient;
