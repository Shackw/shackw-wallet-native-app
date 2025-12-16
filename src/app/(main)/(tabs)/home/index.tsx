import { useRouter } from "expo-router";
import { Scan } from "lucide-react-native";
import { useCallback, useState } from "react";

import { ScreenContainer } from "@/presentation/components/Container";
import { Divider } from "@/presentation/components/gluestack-ui/divider";
import { Fab, FabIcon } from "@/presentation/components/gluestack-ui/fab";
import { Tab } from "@/presentation/components/Tab";
import { useWalletPreferencesContext } from "@/presentation/providers/WalletPreferencesProvider";
import { Token } from "@/registries/ChainTokenRegistry";

import HomeAction from "./_components/HomeAction";
import HomeAssetSummary from "./_components/HomeAssetSummary";
import HomeMainBody from "./_components/HomeMainBody";

const HomeScreen = () => {
  const router = useRouter();
  const { currentChainDefaultToken, currentChainSupportedTokens } = useWalletPreferencesContext();

  const [currentTab, setCurrentTab] = useState<Token>(currentChainDefaultToken);

  const handlePressScan = useCallback(() => {
    router.push("/scan-qr");
  }, [router]);

  return (
    <ScreenContainer className="px-4 items-center">
      <HomeMainBody>
        <Tab options={currentChainSupportedTokens} value={currentTab} handleChange={setCurrentTab} />
        <HomeAssetSummary token={currentTab} />
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
