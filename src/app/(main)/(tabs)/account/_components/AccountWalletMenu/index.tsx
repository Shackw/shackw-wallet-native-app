import { useRouter } from "expo-router";
import { useCallback } from "react";

import { shortenAddress } from "@/helpers/address";
import { useHinomaruWalletContext } from "@/providers/HinomaruWalletProvider";
import { HStack } from "@/vendor/gluestack-ui/hstack";
import { Text } from "@/vendor/gluestack-ui/text";

import AccountMenuConteiner from "../AccountMenuConteiner";
import AccountMenuItem from "../AccountMenuItem";

const AccountWalletMenu = () => {
  const router = useRouter();
  const { account } = useHinomaruWalletContext();

  const handleChangeWallet = useCallback(() => {
    router.push("/wallet");
  }, [router]);

  return (
    <AccountMenuConteiner title="ウォレット設定">
      <AccountMenuItem onPress={handleChangeWallet}>
        <HStack className="justify-between">
          <Text className="font-bold">接続中のウォレット</Text>
          <Text size="lg">{shortenAddress(account?.address ?? "0x00", 8)}</Text>
        </HStack>
      </AccountMenuItem>

      <AccountMenuItem>
        <Text className="font-bold">ウォレットの新規作成</Text>
      </AccountMenuItem>

      <AccountMenuItem>
        <Text className="font-bold">ウォレットの復元</Text>
      </AccountMenuItem>
    </AccountMenuConteiner>
  );
};

export default AccountWalletMenu;
