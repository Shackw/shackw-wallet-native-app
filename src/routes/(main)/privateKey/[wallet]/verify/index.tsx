import { useLocalSearchParams } from "expo-router";

import { Box } from "@/presentation/components/gluestack-ui/box";
import { useTw } from "@/presentation/styles/tw";
import { cn } from "@/shared/helpers/cn";
import ScreenContainer from "@mainc/ScreenContainer";

import PrivateKeyVerifyBody from "./_components/PrivateKeyVerifyBody";
import { PrivateKeyVerifyFormProvider } from "./_hooks/usePrivateKeyVerifyForm";

import type { Address } from "viem";

const PrivateKeyVerifyScreen = () => {
  const tw = useTw();
  const { wallet } = useLocalSearchParams<{ wallet: Address }>();

  return (
    <ScreenContainer
      appBarProps={{ title: "プライベートキー確認" }}
      className={cn("bg-white", "rounded-t-2xl", tw.py(3))}
    >
      <Box className="flex-1">
        <PrivateKeyVerifyFormProvider wallet={wallet}>
          <PrivateKeyVerifyBody />
        </PrivateKeyVerifyFormProvider>
      </Box>
    </ScreenContainer>
  );
};

export default PrivateKeyVerifyScreen;
