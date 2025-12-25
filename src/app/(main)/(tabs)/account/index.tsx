import { ScrollView } from "react-native";

import { VStack } from "@/presentation/components/gluestack-ui/vstack";
import { useTw } from "@/presentation/styles/tw";
import { cn } from "@/shared/helpers/cn";
import ScreenContainer from "@mainc/ScreenContainer";

import AccountAddressMenu from "./_components/AccountAddressMenu";
import AccountNetworkMenu from "./_components/AccountNetworkMenu";
import AccountPrivateMenu from "./_components/AccountPrivateMenu";
import AccountWalletMenu from "./_components/AccountWalletMenu";

const AccountScreen = () => {
  const tw = useTw();

  return (
    <ScreenContainer className={cn("bg-white rounded-t-2xl", tw.px(3), tw.py(2))}>
      <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
        <VStack className={cn("w-full", tw.px(2), tw.py(4), tw.gapY(8))}>
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
