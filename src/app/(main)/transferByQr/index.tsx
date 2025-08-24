import { HStack, Text } from "@gluestack-ui/themed";

import { ScreenContainer } from "@/components/Container";

const TransferByQrScreen = () => {
  return (
    <ScreenContainer title="スキャンして送信" bgColor="$backgroundDark0">
      <HStack>
        <Text>TransferByQrScreen</Text>
      </HStack>
    </ScreenContainer>
  );
};

export default TransferByQrScreen;
