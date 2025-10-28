import { HStack } from "@/vendor/gluestack-ui/hstack";
import { Text } from "@/vendor/gluestack-ui/text";

import AccountMenuConteiner from "../AccountMenuConteiner";
import AccountMenuItem from "../AccountMenuItem";

const AccountWalletMenu = () => {
  return (
    <AccountMenuConteiner title="ウォレット設定">
      <AccountMenuItem>
        <HStack className="justify-between">
          <Text className="font-bold">接続中のウォレット</Text>
          <Text>あああ</Text>
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
