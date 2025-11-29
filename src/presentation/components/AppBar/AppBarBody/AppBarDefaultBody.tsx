import { useRouter } from "expo-router";
import { useCallback } from "react";
import { Pressable } from "react-native";

import { CHAIN_ICONS } from "@/config/chain";
import { HStack } from "@/presentation/components/gluestack-ui/hstack";
import { Spinner } from "@/presentation/components/gluestack-ui/spinner";
import { Text } from "@/presentation/components/gluestack-ui/text";
import { useShackwWalletContext } from "@/presentation/providers/ShackwWalletProvider";
import { useWalletPreferencesContext } from "@/presentation/providers/WalletPreferencesProvider";
import { shortenAddress } from "@/shared/helpers/address";

const AppBarDefaultBody = () => {
  const router = useRouter();
  const { account } = useShackwWalletContext();
  const { currentChain } = useWalletPreferencesContext();

  const accountAddress = account?.address;

  const ChainIcon = CHAIN_ICONS[currentChain];

  const handlePressNetwork = useCallback(() => {
    router.push("/network");
  }, [router]);

  const handlePressWallet = useCallback(() => {
    router.push("/wallet");
  }, [router]);

  return (
    <HStack className="w-full justify-center">
      {accountAddress ? (
        <HStack className="items-center gap-x-2">
          <Pressable onPress={handlePressNetwork}>
            <ChainIcon />
          </Pressable>
          <Pressable onPress={handlePressWallet}>
            <Text className="font-bold text-white">{shortenAddress(accountAddress)}</Text>
          </Pressable>
        </HStack>
      ) : (
        <Spinner size="small" color="white" />
      )}
    </HStack>
  );
};

export default AppBarDefaultBody;
