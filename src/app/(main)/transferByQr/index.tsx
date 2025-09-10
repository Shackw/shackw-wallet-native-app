import { ScreenContainer } from "@/components/Container";
import { HStack } from "@/vendor/gluestack-ui/hstack";
import { Text } from "@/vendor/gluestack-ui/text";

const TransferByQrScreen = () => {
  return (
    <ScreenContainer title="スキャンして送信" className="bg-white rounded-t-[12px]">
      <HStack>
        <Text>TransferByQrScreen</Text>
      </HStack>
    </ScreenContainer>
  );
};

export default TransferByQrScreen;
