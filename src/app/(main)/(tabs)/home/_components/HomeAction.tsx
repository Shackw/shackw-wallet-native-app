import { useCallback } from "react";
import { Linking } from "react-native";

import { AppText } from "@/presentation/components/AppText";
import { ContainButton } from "@/presentation/components/Button";
import { VStack } from "@/presentation/components/gluestack-ui/vstack";
import { useTw } from "@/presentation/styles/tw";
import { cn } from "@/shared/helpers/cn";

const HomeAction = () => {
  const tw = useTw();

  const handlePress = useCallback(async () => {
    await Linking.openURL("https://jpyc.co.jp/");
  }, []);

  return (
    <VStack className={cn("items-center w-full", tw.gapY(3))}>
      <ContainButton text="発行・償還" size="md" onPress={handlePress} />
      <AppText t="sm" className="w-full text-center">
        {`※JPYC EX ホームページへ遷移します。`}
      </AppText>
    </VStack>
  );
};

export default HomeAction;
