import { Modal } from "react-native";

import { Image } from "@/presentation/components/gluestack-ui/image";
import { Spinner } from "@/presentation/components/gluestack-ui/spinner";
import { VStack } from "@/presentation/components/gluestack-ui/vstack";
import { theme } from "@/presentation/styles/theme";

const Loading = () => {
  return (
    <Modal visible={true} transparent statusBarTranslucent>
      <VStack className="flex-1 bg-white items-center justify-center">
        <Image size="lg" source={require("@/presentation/assets/images/splash.png")} alt="image" />
        <Spinner color={theme.colors.primary[500]} />
      </VStack>
    </Modal>
  );
};

export default Loading;
