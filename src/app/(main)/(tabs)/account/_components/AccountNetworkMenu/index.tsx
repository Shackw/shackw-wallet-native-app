import { useRouter } from "expo-router";
import { useCallback } from "react";

import { SUPPORT_CHAIN_KEYS_MAP } from "@/configs/chain";
import { useUserSettingContext } from "@/providers/UserSettingProvider";
import { HStack } from "@/vendor/gluestack-ui/hstack";
import { Text } from "@/vendor/gluestack-ui/text";

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
