import { theme } from "@/styles/theme";
import { Image } from "@/vendor/gluestack-ui/image";
import { Spinner } from "@/vendor/gluestack-ui/spinner";
import { VStack } from "@/vendor/gluestack-ui/vstack";

const Loading = () => {
  return (
    <VStack className="bg-white w-full h-full items-center justify-center">
      <Image size="lg" source={require("@/assets/images/splash.png")} alt="image" />
      <Spinner color={theme.colors.primary[500]} />
    </VStack>
  );
};

export default Loading;
