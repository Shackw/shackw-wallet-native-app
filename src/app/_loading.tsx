import { Image } from "@/gluestack/image";
import { Spinner } from "@/gluestack/spinner";
import { VStack } from "@/gluestack/vstack";

const Loading = () => {
  return (
    <VStack className="bg-white w-full h-full items-center justify-center">
      <Image size="lg" source={require("@/assets/images/splash.png")} alt="image" />
      <Spinner />
    </VStack>
  );
};

export default Loading;
