import { useRouter } from "expo-router";
import { useCallback } from "react";

import { Text } from "@/presentation/components/gluestack-ui/text";

import AccountMenuConteiner from "../AccountMenuConteiner";
import AccountMenuItem from "../AccountMenuItem";

const AccountPrivateMenu = () => {
  const router = useRouter();

  const handlePressManagePrivateKey = useCallback(() => {
    router.push("/privateKey");
  }, [router]);

  return (
    <AccountMenuConteiner title="プライベート設定">
      <AccountMenuItem onPress={handlePressManagePrivateKey}>
        <Text className="font-bold">プライベートキーの管理</Text>
      </AccountMenuItem>
    </AccountMenuConteiner>
  );
};

export default AccountPrivateMenu;
