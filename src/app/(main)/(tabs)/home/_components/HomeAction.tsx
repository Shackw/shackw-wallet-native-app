import { useCallback } from "react";
import { Linking } from "react-native";

import { ContainButton } from "@/presentation/components/Button";
import { Text } from "@/presentation/components/gluestack-ui/text";
import { VStack } from "@/presentation/components/gluestack-ui/vstack";

const HomeAction = () => {
  // TODO 購入・償還ページへのリンク差し替え
  const handlePress = useCallback(async () => {
    await Linking.openURL("https://google.com");
  }, []);

  return (
    <VStack className="gap-y-3 items-center w-full">
      <ContainButton text="購入 ・ 両替" size="md" onPress={handlePress} className="w-[130px]" />
      <Text size="sm" className="w-full text-center">
        ※JPYC購入ページへ遷移します。
      </Text>
    </VStack>
  );
};

export default HomeAction;
