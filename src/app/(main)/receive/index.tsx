import { ScreenContainer } from "@/components/Container";
import { HStack } from "@/gluestack/hstack";
import { Text } from "@/gluestack/text";

const ReceiveScreen = () => {
  return (
    <ScreenContainer title="受け取り" className="bg-white rounded-t-[12px]">
      <HStack>
        <Text>ReceiveScreen</Text>
      </HStack>
    </ScreenContainer>
  );
};

export default ReceiveScreen;
