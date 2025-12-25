import { useRouter } from "expo-router";
import { useCallback } from "react";

import { AppText } from "@/presentation/components/AppText";

import AccountMenuConteiner from "./AccountMenuConteiner";
import AccountMenuItem from "./AccountMenuItem";

const AccountPrivateMenu = () => {
  const router = useRouter();

  const handlePressManagePrivateKey = useCallback(() => {
    router.push("/privateKey");
  }, [router]);

  return (
    <AccountMenuConteiner title="プライベート設定">
      <AccountMenuItem onPress={handlePressManagePrivateKey}>
        <AppText t="md" className="font-bold">
          プライベートキーの管理
        </AppText>
      </AccountMenuItem>
    </AccountMenuConteiner>
  );
};

export default AccountPrivateMenu;
