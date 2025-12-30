import { useRouter } from "expo-router";
import { useCallback } from "react";

import { AppText } from "@/presentation/components/AppText";

import AccountMenuConteiner from "./AccountMenuConteiner";
import AccountMenuItem from "./AccountMenuItem";

const AccountAddressMenu = () => {
  const router = useRouter();

  const handlePressAdresses = useCallback(() => {
    router.push("/addresses");
  }, [router]);

  return (
    <AccountMenuConteiner title="アドレス設定">
      <AccountMenuItem onPress={handlePressAdresses}>
        <AppText t="sm" className="font-bold">
          アドレス帳
        </AppText>
      </AccountMenuItem>
    </AccountMenuConteiner>
  );
};

export default AccountAddressMenu;
