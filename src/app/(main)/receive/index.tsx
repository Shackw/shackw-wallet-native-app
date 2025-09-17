import { ScreenContainer } from "@/components/Container";
import { HStack } from "@/vendor/gluestack-ui/hstack";
import { Text } from "@/vendor/gluestack-ui/text";

const ReceiveScreen = () => {
  return (
    <ScreenContainer title="受け取り" className="bg-white rounded-t-2xl">
      <HStack>
        <Text>ReceiveScreen</Text>
      </HStack>
    </ScreenContainer>
  );
};

export default ReceiveScreen;
