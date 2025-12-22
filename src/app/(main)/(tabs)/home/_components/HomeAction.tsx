import { useCallback } from "react";
import { Linking } from "react-native";

import { ContainButton } from "@/presentation/components/Button";
import { Text } from "@/presentation/components/gluestack-ui/text";
import { VStack } from "@/presentation/components/gluestack-ui/vstack";

const HomeAction = () => {
  const handlePress = useCallback(async () => {
    await Linking.openURL("https://jpyc.co.jp/");
  }, []);

  return (
    <VStack className="gap-y-3 items-center w-full">
      <ContainButton text="発行・償還" size="md" onPress={handlePress} className="w-[130px]" />
      <Text size="sm" className="w-full text-center">
        ※JPYC EX ホームページへ遷移します。
      </Text>
    </VStack>
  );
};

export default HomeAction;
