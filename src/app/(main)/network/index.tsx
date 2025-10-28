import { ScreenContainer } from "@/components/Container";
import { Box } from "@/vendor/gluestack-ui/box";
import { VStack } from "@/vendor/gluestack-ui/vstack";

import NetworkChain from "./_components/NetworkChain";
import NetworkDefault from "./_components/NetworkDefault";
import NetworkSubmitButton from "./_components/NetworkSubmitButton";
import { SelectNetworkFormProvider } from "./_hooks/useSelectNetworkForm";

const AccountNetworkScreen = () => {
  return (
    <ScreenContainer appBarProps={{ title: "ネットワーク設定" }} className="bg-white rounded-t-2xl">
      <Box className="py-[8px] flex-1">
        <SelectNetworkFormProvider>
          <VStack className="flex-1 bg-secondary-100">
            <VStack className="gap-y-8">
              <NetworkChain />
              <NetworkDefault />
            </VStack>
            <NetworkSubmitButton />
          </VStack>
        </SelectNetworkFormProvider>
      </Box>
    </ScreenContainer>
  );
};

export default AccountNetworkScreen;
