import { ScreenContainer } from "@/components/Container";
import { HStack } from "@/gluestack/hstack";
import { Text } from "@/gluestack/text";

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
