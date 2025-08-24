import { HStack, Text } from "@gluestack-ui/themed";

import { ScreenContainer } from "@/components/Container";

const ReceiveScreen = () => {
  return (
    <ScreenContainer title="受け取り" bgColor="$white" borderTopLeftRadius={12} borderTopRightRadius={12}>
      <HStack>
        <Text>ReceiveScreen</Text>
      </HStack>
    </ScreenContainer>
  );
};

export default ReceiveScreen;
