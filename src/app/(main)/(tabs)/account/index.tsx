import { ScrollView } from "react-native";

import { ScreenContainer } from "@/presentation/components/Container";
import { VStack } from "@/presentation/components/gluestack-ui/vstack";

import AccountAddressMenu from "./_components/AccountAddressMenu";
import AccountNetworkMenu from "./_components/AccountNetworkMenu";
import AccountPrivateMenu from "./_components/AccountPrivateMenu";
import AccountWalletMenu from "./_components/AccountWalletMenu";

const AccountScreen = () => {
  return (
    <ScreenContainer className="bg-white rounded-t-2xl px-[12px] py-[8px]">
      <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
        <VStack className="w-full px-2 py-4 gap-y-8">
          <AccountAddressMenu />
          <AccountNetworkMenu />
          <AccountPrivateMenu />
          <AccountWalletMenu />
        </VStack>
      </ScrollView>
    </ScreenContainer>
  );
};

export default AccountScreen;
