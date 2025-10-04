import { useState } from "react";

import { ScreenContainer } from "@/components/Container";
import { Tab } from "@/components/Tab";
import { Token, TOKENS_MAP } from "@/registries/TokenRegistry";
import { Divider } from "@/vendor/gluestack-ui/divider";

import HomeAction from "./_components/HomeAction";
import HomeLastTransactionAt from "./_components/HomeLastTransaction";
import HomeMainBody from "./_components/HomeMainBody";
import HomeTokenBalance from "./_components/HomeTokenBalance";

const HomeScreen = () => {
  const [currentTab, setCurrentTab] = useState<Token>("JPYC");

  return (
    <ScreenContainer className="px-4 items-center">
      <HomeMainBody>
        <Tab options={TOKENS_MAP} value={currentTab} handleChange={setCurrentTab} />
        <HomeTokenBalance token={currentTab} />
        <HomeLastTransactionAt />
        <Divider className="w-[90%] bg-secondary-50" />
        <HomeAction />
      </HomeMainBody>
    </ScreenContainer>
  );
};

export default HomeScreen;
