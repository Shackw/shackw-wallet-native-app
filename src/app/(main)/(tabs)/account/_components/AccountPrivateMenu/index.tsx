import { Text } from "@/vendor/gluestack-ui/text";

import AccountMenuConteiner from "../AccountMenuConteiner";
import AccountMenuItem from "../AccountMenuItem";

const AccountPrivateMenu = () => {
  return (
    <AccountMenuConteiner title="プライベート設定">
      <AccountMenuItem>
        <Text className="font-bold">プライベートキーの管理</Text>
      </AccountMenuItem>
    </AccountMenuConteiner>
  );
};

export default AccountPrivateMenu;
