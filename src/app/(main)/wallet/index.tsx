import { Box } from "@/presentation/components/gluestack-ui/box";
import { VStack } from "@/presentation/components/gluestack-ui/vstack";
import { useTw } from "@/presentation/styles/tw";
import { cn } from "@/shared/helpers/cn";

import ScreenContainer from "../_components/ScreenContainer";

import WalletDefault from "./_components/WalletDefault";
import WalletScreenSuspence from "./_components/WalletScreenSuspence";
import WalletSelect from "./_components/WalletSelect";
import WalletSubmitButton from "./_components/WalletSubmitButton";
import useMyAddressOptions from "./_hooks/useMyAddressOptions";
import { SelectWalletFormProvider } from "./_hooks/useSelectWalletForm";

const WalletScreen = () => {
  const tw = useTw();
  const { initialValue, addressOptions, error } = useMyAddressOptions();

  return (
    <ScreenContainer appBarProps={{ title: "ウォレット設定" }} className={cn("bg-white", "rounded-t-2xl")}>
      <Box className={cn(tw.py(5), "flex-1")}>
        <WalletScreenSuspence initialValue={initialValue} addressOptions={addressOptions} error={error}>
          {(initialValue, options) => (
            <SelectWalletFormProvider initialValue={initialValue}>
              <VStack className={cn("flex-1", "bg-secondary-100")}>
                <VStack className={cn(tw.gapY(8))}>
                  <WalletSelect initialValue={initialValue} options={options} />
                  <WalletDefault />
                </VStack>
                <WalletSubmitButton />
              </VStack>
            </SelectWalletFormProvider>
          )}
        </WalletScreenSuspence>
      </Box>
    </ScreenContainer>
  );
};

export default WalletScreen;
