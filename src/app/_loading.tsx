import { Image, Spinner, VStack } from "@gluestack-ui/themed";

const Loading = () => {
  return (
    <VStack bg="$white" w="$full" h="$full" alignItems="center" justifyContent="center">
      <Image size="lg" source={require("@/assets/images/splash.png")} alt="image" />
      <Spinner />
    </VStack>
  );
};

export default Loading;
