import { Hammer } from "lucide-react-native";

import { AppText } from "@/presentation/components/AppText";
import { HStack } from "@/presentation/components/gluestack-ui/hstack";
import { Icon } from "@/presentation/components/gluestack-ui/icon";
import { VStack } from "@/presentation/components/gluestack-ui/vstack";
import { useTw } from "@/presentation/styles/tw";
import { cn } from "@/shared/helpers/cn";
import ScreenContainer from "@mainc/ScreenContainer";

const DepositScreen = () => {
  const tw = useTw();

  return (
    <ScreenContainer className={cn("bg-white rounded-t-2xl", tw.px(12), tw.py(8))}>
      <VStack className={cn(tw.gapY(5), "items-center flex-1")}>
        <HStack className={cn("w-full flex-1 justify-center items-center", tw.gapX(2))}>
          <Icon as={Hammer} size="xl" className={tw.mr(2)} />
          <AppText t="xl" className="font-bold">
            現在開発中です
          </AppText>
        </HStack>
      </VStack>
    </ScreenContainer>
  );
};

export default DepositScreen;
