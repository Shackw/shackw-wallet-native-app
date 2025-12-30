import { useRouter } from "expo-router";
import { useCallback } from "react";

import { AppText } from "@/presentation/components/AppText";
import { HStack } from "@/presentation/components/gluestack-ui/hstack";
import { useBoolean } from "@/presentation/hooks/useBoolean";
import { useShackwWalletContext } from "@/presentation/providers/ShackwWalletProvider";
import { useWalletPreferencesContext } from "@/presentation/providers/WalletPreferencesProvider";
import { useTw } from "@/presentation/styles/tw";
import { cn } from "@/shared/helpers/cn";
import CreateWalletDialog from "@appc/CreateWalletDialog";
import RestoreWalletField from "@appc/RestoreWalletField";

import AccountMenuConteiner from "./AccountMenuConteiner";
import AccountMenuItem from "./AccountMenuItem";

const AccountWalletMenu = () => {
  const tw = useTw();
  const router = useRouter();
  const [isCreating, setIsCreating] = useBoolean(false);
  const [isRestoring, setIsRestoring] = useBoolean(false);
  const { refetchUserSetting } = useWalletPreferencesContext();
  const { account, createWallet, restoreWallet } = useShackwWalletContext();

  const handlePressChangeWallet = useCallback(() => {
    router.push("/wallet");
  }, [router]);

  const handlePressCreateWallet = useCallback(
    async (name: string) => {
      await createWallet(name);
      await refetchUserSetting();
      router.dismissTo("/");
    },
    [router, createWallet, refetchUserSetting]
  );

  const handlePressRestoreWallet = useCallback(
    async (name: string, pk: string) => {
      await restoreWallet(name, pk);
      await refetchUserSetting();
      router.dismissTo("/");
    },
    [router, restoreWallet, refetchUserSetting]
  );

  return (
    <AccountMenuConteiner title="ウォレット設定">
      <AccountMenuItem onPress={handlePressChangeWallet}>
        <HStack className={cn("justify-between", tw.gapX(12))}>
          <AppText t="sm" className="font-bold">
            接続中のウォレット
          </AppText>
          <AppText className={cn("flex-1 leading-none", tw.ml(4))} oneLine ellipsizeMode="middle">
            {account?.address ?? "0x00"}
          </AppText>
        </HStack>
      </AccountMenuItem>

      <AccountMenuItem onPress={setIsCreating.on}>
        <AppText t="sm" className="font-bold">
          ウォレットの新規作成
        </AppText>
      </AccountMenuItem>

      <AccountMenuItem onPress={setIsRestoring.on}>
        <AppText t="sm" className="font-bold">
          ウォレットの復元
        </AppText>
      </AccountMenuItem>

      <CreateWalletDialog isOpen={isCreating} onClose={setIsCreating.off} onCreateWallet={handlePressCreateWallet} />
      <RestoreWalletField
        componentProps={{ title: "秘密鍵からの復元", size: "lg", isOpen: isRestoring, onClose: setIsRestoring.off }}
        onRestoreWallet={handlePressRestoreWallet}
      />
    </AccountMenuConteiner>
  );
};

export default AccountWalletMenu;
