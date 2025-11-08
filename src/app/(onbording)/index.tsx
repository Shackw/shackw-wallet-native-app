import { Box } from "@/presentation/components/gluestack-ui/box";
import { HStack } from "@/presentation/components/gluestack-ui/hstack";
import { Image } from "@/presentation/components/gluestack-ui/image";
import { Text } from "@/presentation/components/gluestack-ui/text";
import { VStack } from "@/presentation/components/gluestack-ui/vstack";

import OnBordingActions from "./_components/OnBordingActions";

const OnBording = () => {
  return (
    <VStack className="flex-1 bg-white items-center pt-20 pb-10">
      <HStack className="items-center">
        <Image size="sm" source={require("@/presentation/assets/images/splash.png")} alt="image" />
        <Text size="3xl" className="font-bold">
          HINOMARU WALLET
        </Text>
      </HStack>
      <Box className="w-full aspect-[1]">
        <Image size="full" source={require("@/presentation/assets/images/onbording.png")} alt="image" />
      </Box>
      <OnBordingActions />
      <Text>Powerd By FickleWolf</Text>
    </VStack>
  );
};

export default OnBording;
