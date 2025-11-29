import { useRouter } from "expo-router";
import { useCallback } from "react";

import { CHAIN_KEY_TO_DISPLAY_NAME } from "@/config/chain";
import { HStack } from "@/presentation/components/gluestack-ui/hstack";
import { Text } from "@/presentation/components/gluestack-ui/text";
import { useWalletPreferencesContext } from "@/presentation/providers/WalletPreferencesProvider";

import AccountMenuConteiner from "./AccountMenuConteiner";
import AccountMenuItem from "./AccountMenuItem";

const AccountNetworkMenu = () => {
  const router = useRouter();
  const { currentChain } = useWalletPreferencesContext();

  const handlePressChangeNetwork = useCallback(() => {
    router.push("/network");
  }, [router]);

  return (
    <AccountMenuConteiner title="ネットワーク設定">
      <AccountMenuItem onPress={handlePressChangeNetwork}>
        <HStack className="justify-between">
          <Text className="font-bold">接続中のネットワーク</Text>
          <Text size="xl">{CHAIN_KEY_TO_DISPLAY_NAME[currentChain]}</Text>
        </HStack>
      </AccountMenuItem>
    </AccountMenuConteiner>
  );
};

export default AccountNetworkMenu;
