import { useRouter } from "expo-router";
import { useCallback } from "react";

import { SUPPORT_CHAIN_KEYS_MAP } from "@/config/chain";
import { HStack } from "@/presentation/components/gluestack-ui/hstack";
import { Text } from "@/presentation/components/gluestack-ui/text";
import { useUserSettingContext } from "@/presentation/providers/UserSettingProvider";

import AccountMenuConteiner from "../AccountMenuConteiner";
import AccountMenuItem from "../AccountMenuItem";

const AccountNetworkMenu = () => {
  const router = useRouter();
  const { currentChain } = useUserSettingContext();

  const handlePressChangeNetwork = useCallback(() => {
    router.push("/network");
  }, [router]);

  return (
    <AccountMenuConteiner title="ネットワーク設定">
      <AccountMenuItem onPress={handlePressChangeNetwork}>
        <HStack className="justify-between">
          <Text className="font-bold">接続中のネットワーク</Text>
          <Text size="xl">{SUPPORT_CHAIN_KEYS_MAP[currentChain]}</Text>
        </HStack>
      </AccountMenuItem>
    </AccountMenuConteiner>
  );
};

export default AccountNetworkMenu;
