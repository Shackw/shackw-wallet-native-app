import { Modal } from "react-native";

import { Image } from "@/presentation/components/gluestack-ui/image";
import { Text } from "@/presentation/components/gluestack-ui/text";
import { VStack } from "@/presentation/components/gluestack-ui/vstack";

type MaintenanceOverlayProps = {
  text?: string;
};

export const MaintenanceOverlay = (props: MaintenanceOverlayProps) => {
  const { text } = props;

  return (
    <Modal visible={true} transparent statusBarTranslucent>
      <VStack className="flex-1 bg-white items-center justify-center">
        <Image size="lg" source={require("@/presentation/assets/images/splash.png")} alt="image" />
        <Text className="font-bold text-center text-secondary-700">
          {text ?? `サーバーがダウンしている可能性があります。\nしばらく時間をおいてから再度アクセスしてください。`}
        </Text>
      </VStack>
    </Modal>
  );
};
