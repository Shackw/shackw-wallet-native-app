import { useRouter } from "expo-router";
import { Scan } from "lucide-react-native";
import { useCallback, useState } from "react";

import { ScreenContainer } from "@/presentation/components/Container";
import { Divider } from "@/presentation/components/gluestack-ui/divider";
import { Fab, FabIcon } from "@/presentation/components/gluestack-ui/fab";
import { Tab } from "@/presentation/components/Tab";
import { Token, TOKENS_MAP } from "@/registries/TokenRegistry";

import HomeAction from "./_components/HomeAction";
import HomeLastTransactionAt from "./_components/HomeLastTransaction";
import HomeMainBody from "./_components/HomeMainBody";
import HomeTokenBalance from "./_components/HomeTokenBalance";

const HomeScreen = () => {
  const router = useRouter();
  const [currentTab, setCurrentTab] = useState<Token>("JPYC");

  const handlePressScan = useCallback(() => {
    router.replace("/scan-qr");
  }, [router]);

  return (
    <ScreenContainer className="px-4 items-center">
      <HomeMainBody>
        <Tab options={TOKENS_MAP} value={currentTab} handleChange={setCurrentTab} />
        <HomeTokenBalance token={currentTab} />
        <HomeLastTransactionAt />
        <Divider className="w-[90%] bg-secondary-50" />
        <HomeAction />
      </HomeMainBody>
      <Fab size="lg" placement="bottom right" className="bg-primary-400 rounded-3xl bottom-7" onPress={handlePressScan}>
        <FabIcon as={Scan} className="p-5" />
      </Fab>
    </ScreenContainer>
  );
};

export default HomeScreen;
