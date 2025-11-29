import { useRouter } from "expo-router";
import { useCallback } from "react";

import { Text } from "@/presentation/components/gluestack-ui/text";

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
        <Text className="font-bold">アドレス帳</Text>
      </AccountMenuItem>
    </AccountMenuConteiner>
  );
};

export default AccountAddressMenu;
