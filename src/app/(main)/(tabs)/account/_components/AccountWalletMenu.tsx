import { useRouter } from "expo-router";
import { useCallback } from "react";

import CreateWalletDialog from "@/presentation/components/CreateWalletDialog";
import { HStack } from "@/presentation/components/gluestack-ui/hstack";
import { Text } from "@/presentation/components/gluestack-ui/text";
import RestoreWalletField from "@/presentation/components/RestoreWalletField";
import { useBoolean } from "@/presentation/hooks/useBoolean";
import { useShackwWalletContext } from "@/presentation/providers/ShackwWalletProvider";
import { useWalletPreferencesContext } from "@/presentation/providers/WalletPreferencesProvider";
import { shortenAddress } from "@/shared/helpers/address";

import AccountMenuConteiner from "./AccountMenuConteiner";
import AccountMenuItem from "./AccountMenuItem";

const AccountWalletMenu = () => {
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
      router.push("/");
    },
    [router, createWallet, refetchUserSetting]
  );

  const handlePressRestoreWallet = useCallback(
    async (name: string, pk: string) => {
      await restoreWallet(name, pk);
      await refetchUserSetting();
      router.push("/");
    },
    [router, restoreWallet, refetchUserSetting]
  );

  return (
    <AccountMenuConteiner title="ウォレット設定">
      <AccountMenuItem onPress={handlePressChangeWallet}>
        <HStack className="justify-between">
          <Text className="font-bold">接続中のウォレット</Text>
          <Text size="lg">{shortenAddress(account?.address ?? "0x00", 8)}</Text>
        </HStack>
      </AccountMenuItem>

      <AccountMenuItem onPress={setIsCreating.on}>
        <Text className="font-bold">ウォレットの新規作成</Text>
      </AccountMenuItem>

      <AccountMenuItem onPress={setIsRestoring.on}>
        <Text className="font-bold">ウォレットの復元</Text>
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
