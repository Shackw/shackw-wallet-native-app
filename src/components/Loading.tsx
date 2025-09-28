import { Modal } from "react-native";

import { theme } from "@/styles/theme";
import { Image } from "@/vendor/gluestack-ui/image";
import { Spinner } from "@/vendor/gluestack-ui/spinner";
import { VStack } from "@/vendor/gluestack-ui/vstack";

const Loading = () => {
  return (
    <Modal visible={true} transparent statusBarTranslucent>
      <VStack className="flex-1 bg-white items-center justify-center">
        <Image size="lg" source={require("@/assets/images/splash.png")} alt="image" />
        <Spinner color={theme.colors.primary[500]} />
      </VStack>
    </Modal>
  );
};

export default Loading;
