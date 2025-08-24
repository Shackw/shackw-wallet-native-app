import { Divider, Text } from "@gluestack-ui/themed";
import { useState } from "react";

import { ScreenContainer } from "@/components/Container";
import { Tab } from "@/components/Tab";
import { TokenKind, TOKENS } from "@/shared/domain/tokens/registry";

import HomeAction from "./_components/HomeAction";
import HomeLastTransactionAt from "./_components/HomeLastTransaction";
import HomeMainBody from "./_components/HomeMainBody";
import HomeTokenBalance from "./_components/HomeTokenBalance";

const HomeScreen = () => {
  const [currentTab, setCurrentTab] = useState<TokenKind>("JPYC");

  return (
    <ScreenContainer px="$4" alignItems="center">
      <HomeMainBody>
        <Tab options={TOKENS} value={currentTab} handleChange={setCurrentTab} />
        <Text color="$primary500" fontWeight="$bold">
          現在高
        </Text>
        <HomeTokenBalance token={currentTab} />
        <HomeLastTransactionAt />
        <Divider w="90%" bg="$secondary50" />
        <HomeAction />
      </HomeMainBody>
    </ScreenContainer>
  );
};

export default HomeScreen;
