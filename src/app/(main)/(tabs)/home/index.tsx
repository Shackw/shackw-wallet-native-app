import { Scan } from "lucide-react-native";
import { useState } from "react";

import { ScreenContainer } from "@/components/Container";
import { Tab } from "@/components/Tab";
import { useBoolean } from "@/hooks/useBoolean";
import { Token, TOKENS_MAP } from "@/registries/TokenRegistry";
import { Divider } from "@/vendor/gluestack-ui/divider";
import { Fab, FabIcon } from "@/vendor/gluestack-ui/fab";

import HomeAction from "./_components/HomeAction";
import HomeLastTransactionAt from "./_components/HomeLastTransaction";
import HomeMainBody from "./_components/HomeMainBody";
import HomeTokenBalance from "./_components/HomeTokenBalance";

const HomeScreen = () => {
  const [currentTab, setCurrentTab] = useState<Token>("JPYC");
  const [isScaning, setIsScaning] = useBoolean(false);

  return (
    <ScreenContainer className="px-4 items-center">
      <HomeMainBody>
        <Tab options={TOKENS_MAP} value={currentTab} handleChange={setCurrentTab} />
        <HomeTokenBalance token={currentTab} />
        <HomeLastTransactionAt />
        <Divider className="w-[90%] bg-secondary-50" />
        <HomeAction />
      </HomeMainBody>
      <Fab size="lg" placement="bottom right" className="bg-primary-400 rounded-3xl bottom-7" onPress={setIsScaning.on}>
        <FabIcon as={Scan} className="p-5" />
      </Fab>
    </ScreenContainer>
  );
};

export default HomeScreen;
