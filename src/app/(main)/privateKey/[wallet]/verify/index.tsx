import { useLocalSearchParams } from "expo-router";
import { Address } from "viem";

import { Box } from "@/presentation/components/gluestack-ui/box";
import ScreenContainer from "@mainc/ScreenContainer";

import PrivateKeyVerifyBody from "./_components/PrivateKeyVerifyBody";
import { PrivateKeyVerifyFormProvider } from "./_hooks/usePrivateKeyVerifyForm";

const PrivateKeyVerifyScreen = () => {
  const { wallet } = useLocalSearchParams<{ wallet: Address }>();

  return (
    <ScreenContainer appBarProps={{ title: "プライベートキー確認" }} className="bg-white rounded-t-2xl py-3">
      <Box className="flex-1">
        <PrivateKeyVerifyFormProvider wallet={wallet}>
          <PrivateKeyVerifyBody />
        </PrivateKeyVerifyFormProvider>
      </Box>
    </ScreenContainer>
  );
};

export default PrivateKeyVerifyScreen;
