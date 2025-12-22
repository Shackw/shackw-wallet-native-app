import { useRouter } from "expo-router";
import { useCallback } from "react";
import { Pressable } from "react-native";

import { CHAIN_ICONS } from "@/config/chain";
import { Box } from "@/presentation/components/gluestack-ui/box";
import { HStack } from "@/presentation/components/gluestack-ui/hstack";
import { Spinner } from "@/presentation/components/gluestack-ui/spinner";
import { Text } from "@/presentation/components/gluestack-ui/text";
import { useShackwWalletContext } from "@/presentation/providers/ShackwWalletProvider";
import { useWalletPreferencesContext } from "@/presentation/providers/WalletPreferencesProvider";
import { shortenAddress } from "@/shared/helpers/address";

import { AppBarProps } from ".";

const AppBarBody = (props: AppBarProps) => {
  const { title } = props;

  const router = useRouter();
  const { account } = useShackwWalletContext();
  const { currentChain } = useWalletPreferencesContext();

  const accountAddress = account?.address;

  const ChainIcon = CHAIN_ICONS[currentChain];

  const handlePressWallet = useCallback(() => {
    router.push("/wallet");
  }, [router]);

  if (title)
    return (
      <HStack className="w-full justify-center">
        <Text className="text-lg font-bold text-white">{title}</Text>
      </HStack>
    );
  return (
    <HStack className="w-full justify-center">
      {accountAddress ? (
        <Pressable onPress={handlePressWallet}>
          <HStack className="items-center relative">
            <Box className="absolute left-[-25px]">
              <ChainIcon />
            </Box>
            <Text className="font-bold text-white">{shortenAddress(accountAddress)}</Text>
          </HStack>
        </Pressable>
      ) : (
        <Spinner size="small" color="white" />
      )}
    </HStack>
  );
};

export default AppBarBody;
