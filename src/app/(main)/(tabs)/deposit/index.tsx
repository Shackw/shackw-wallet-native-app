import { Hammer } from "lucide-react-native";

import { ScreenContainer } from "@/components/Container";
import { HStack } from "@/vendor/gluestack-ui/hstack";
import { Icon } from "@/vendor/gluestack-ui/icon";
import { Text } from "@/vendor/gluestack-ui/text";
import { VStack } from "@/vendor/gluestack-ui/vstack";

const DepositScreen = () => {
  return (
    <ScreenContainer className="bg-white rounded-t-[12px] px-[12px] py-[8px]">
      <VStack className="gap-y-5 items-center flex-1">
        <HStack className="w-full flex-1 justify-center items-center gap-2">
          <Icon as={Hammer} size="xl" className="mr-2" />
          <Text size="xl" className="font-bold">
            現在開発中です
          </Text>
        </HStack>
      </VStack>
    </ScreenContainer>
  );
};

export default DepositScreen;
