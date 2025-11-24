import { Modal } from "react-native";

import { Image } from "@/presentation/components/gluestack-ui/image";
import { Text } from "@/presentation/components/gluestack-ui/text";
import { VStack } from "@/presentation/components/gluestack-ui/vstack";

const Maintenance = () => {
  return (
    <Modal visible={true} transparent statusBarTranslucent>
      <VStack className="flex-1 bg-white items-center justify-center">
        <Image size="lg" source={require("@/presentation/assets/images/splash.png")} alt="image" />
        <Text className="font-bold text-center text-secondary-700">
          {`現在メンテナンス中です。\nしばらく時間をおいて再度アクセスしてください。`}
        </Text>
      </VStack>
    </Modal>
  );
};

export default Maintenance;
