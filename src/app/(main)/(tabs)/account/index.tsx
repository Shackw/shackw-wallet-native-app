import { ScrollView } from "react-native";

import { ScreenContainer } from "@/components/Container";
import { VStack } from "@/vendor/gluestack-ui/vstack";

import AccountNetworkMenu from "./_components/AccountNetworkMenu";
import AccountPrivateMenu from "./_components/AccountPrivateMenu";
import AccountWalletMenu from "./_components/AccountWalletMenu";

const AccountScreen = () => {
  return (
    <ScreenContainer className="bg-white rounded-t-[12px] px-[12px] py-[8px]">
      <ScrollView style={{ flex: 1 }} showsVerticalScrollIndicator>
        <VStack className="w-full px-2 py-4 gap-y-8">
          <AccountNetworkMenu />
          <AccountWalletMenu />
          <AccountPrivateMenu />
        </VStack>
      </ScrollView>
    </ScreenContainer>
  );
};

export default AccountScreen;
