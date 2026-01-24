import { useRouter } from "expo-router";
import { useCallback } from "react";

import { CHAIN_KEY_TO_DISPLAY_NAME } from "@/config/chain";
import { AppText } from "@/presentation/components/AppText";
import { HStack } from "@/presentation/components/gluestack-ui/hstack";
import { useWalletPreferencesContext } from "@/presentation/providers/WalletPreferencesProvider";
import { useTw } from "@/presentation/styles/tw";
import { cn } from "@/shared/helpers/cn";

import AccountMenuConteiner from "./AccountMenuConteiner";
import AccountMenuItem from "./AccountMenuItem";

const AccountNetworkMenu = () => {
  const router = useRouter();
  const { currentChain } = useWalletPreferencesContext();

  const tw = useTw();

  const handlePressChangeNetwork = useCallback(() => {
    router.push("/network");
  }, [router]);

  return (
    <AccountMenuConteiner title="ネットワーク設定">
      <AccountMenuItem onPress={handlePressChangeNetwork}>
        <HStack className={cn("justify-between", tw.gapX(6))}>
          <AppText t="sm" className="font-bold">
            接続中のネットワーク
          </AppText>
          <AppText className="leading-none" oneLine>
            {CHAIN_KEY_TO_DISPLAY_NAME[currentChain]}
          </AppText>
        </HStack>
      </AccountMenuItem>
    </AccountMenuConteiner>
  );
};

export default AccountNetworkMenu;
