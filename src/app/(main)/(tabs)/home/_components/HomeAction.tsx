import { useCallback } from "react";
import { Linking } from "react-native";

import { ContainButton } from "@/components/Button";
import { Text } from "@/gluestack/text";
import { VStack } from "@/gluestack/vstack";

const HomeAction = () => {
  // TODO 購入・償還ページへのリンク差し替え
  const handlePress = useCallback(async () => {
    await Linking.openURL("https://google.com");
  }, []);

  return (
    <VStack className="gap-y-1 items-center">
      <ContainButton text="購入 ・ 両替" size="md" onPress={handlePress} className="w-[130px]" />
      <Text size="xs">※JPYC購入ページへ遷移します。</Text>
    </VStack>
  );
};

export default HomeAction;
