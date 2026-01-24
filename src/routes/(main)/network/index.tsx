import { Box } from "@/presentation/components/gluestack-ui/box";
import { VStack } from "@/presentation/components/gluestack-ui/vstack";
import { useTw } from "@/presentation/styles/tw";
import { cn } from "@/shared/helpers/cn";

import ScreenContainer from "../_components/ScreenContainer";

import NetworkDefault from "./_components/NetworkDefault";
import NetworkSelect from "./_components/NetworkSelect";
import NetworkSubmitButton from "./_components/NetworkSubmitButton";
import { SelectNetworkFormProvider } from "./_hooks/useSelectNetworkForm";

const NetworkScreen = () => {
  const tw = useTw();

  return (
    <ScreenContainer appBarProps={{ title: "ネットワーク設定" }} className="bg-white rounded-t-2xl">
      <Box className={cn(tw.py(5), "flex-1")}>
        <SelectNetworkFormProvider>
          <VStack className={cn("flex-1", "bg-secondary-100")}>
            <VStack className={cn(tw.gapY(8))}>
              <NetworkSelect />
              <NetworkDefault />
            </VStack>
            <NetworkSubmitButton />
          </VStack>
        </SelectNetworkFormProvider>
      </Box>
    </ScreenContainer>
  );
};

export default NetworkScreen;
