import { useRouter } from "expo-router";
import { useCallback } from "react";
import { Pressable } from "react-native";

import { CHAIN_ICONS } from "@/config/chain";
import { AppText } from "@/presentation/components/AppText";
import { Box } from "@/presentation/components/gluestack-ui/box";
import { HStack } from "@/presentation/components/gluestack-ui/hstack";
import { Spinner } from "@/presentation/components/gluestack-ui/spinner";
import { useShackwWalletContext } from "@/presentation/providers/ShackwWalletProvider";
import { useWalletPreferencesContext } from "@/presentation/providers/WalletPreferencesProvider";
import { useTw } from "@/presentation/styles/tw";
import { shortenAddress } from "@/shared/helpers/address";
import { cn } from "@/shared/helpers/cn";

import { AppBarProps } from ".";

const AppBarBody = (props: AppBarProps) => {
  const { title } = props;

  const router = useRouter();
  const { account } = useShackwWalletContext();
  const { currentChain } = useWalletPreferencesContext();

  const tw = useTw();

  const accountAddress = account?.address;

  const ChainIcon = CHAIN_ICONS[currentChain];

  const handlePressWallet = useCallback(() => {
    router.push("/wallet");
  }, [router]);

  if (title)
    return (
      <HStack className="w-full justify-center">
        <AppText t="lg" className="font-bold text-white">
          {title}
        </AppText>
      </HStack>
    );
  return (
    <HStack className="w-full justify-center">
      {accountAddress ? (
        <Pressable onPress={handlePressWallet}>
          <HStack className="items-center relative">
            <Box className={cn("absolute", "ml-[-22px]")}>
              <ChainIcon />
            </Box>
            <AppText className="font-bold text-white">{shortenAddress(accountAddress)}</AppText>
          </HStack>
        </Pressable>
      ) : (
        <Spinner size={tw.scaleNum(18)} color="white" />
      )}
    </HStack>
  );
};

export default AppBarBody;
