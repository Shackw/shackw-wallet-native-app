import { useState } from "react";

import { ScreenContainer } from "@/components/Container";
import { Tab } from "@/components/Tab";
import { Token, TOKENS } from "@/registries/TokenRegistry";
import { Divider } from "@/vendor/gluestack-ui/divider";
import { Text } from "@/vendor/gluestack-ui/text";

import HomeAction from "./_components/HomeAction";
import HomeLastTransactionAt from "./_components/HomeLastTransaction";
import HomeMainBody from "./_components/HomeMainBody";
import HomeTokenBalance from "./_components/HomeTokenBalance";

const HomeScreen = () => {
  const [currentTab, setCurrentTab] = useState<Token>("JPYC");

  return (
    <ScreenContainer className="px-4 items-center">
      <HomeMainBody>
        <Tab options={TOKENS} value={currentTab} handleChange={setCurrentTab} />
        <Text className="text-primary-500 font-bold">現在高</Text>
        <HomeTokenBalance token={currentTab} />
        <HomeLastTransactionAt />
        <Divider className="w-[90%] bg-secondary-50" />
        <HomeAction />
      </HomeMainBody>
    </ScreenContainer>
  );
};

export default HomeScreen;
