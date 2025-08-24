import { Text, VStack } from "@gluestack-ui/themed";
import { useCallback } from "react";
import { Linking } from "react-native";

import { ContainButton } from "@/components/Button";

const HomeAction = () => {
  // TODO 購入・償還ページへのリンク差し替え
  const handlePress = useCallback(async () => {
    await Linking.openURL("https://google.com");
  }, []);

  return (
    <VStack rowGap="$1" alignItems="center">
      <ContainButton text="購入 ・ 両替" size="md" w={130} onPress={handlePress} />
      <Text size="xs">※JPYC購入ページへ遷移します。</Text>
    </VStack>
  );
};

export default HomeAction;
