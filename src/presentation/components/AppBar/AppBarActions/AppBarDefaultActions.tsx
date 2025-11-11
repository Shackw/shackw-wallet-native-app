import { setStringAsync } from "expo-clipboard";
import { useRouter } from "expo-router";
import { BookUser, Copy } from "lucide-react-native";
import { useCallback } from "react";

import { IconButton } from "@/presentation/components/Button";
import { HStack } from "@/presentation/components/gluestack-ui/hstack";
import { useShackwWalletContext } from "@/presentation/providers/ShackwWalletProvider";

const AppBarDefaultActions = () => {
  const router = useRouter();
  const { account } = useShackwWalletContext();

  const handleForwardAddresses = useCallback(() => {
    router.push("/addresses");
  }, [router]);

  return (
    <HStack className="gap-x-2">
      {!!account && <IconButton icon={Copy} iconSize={24} onPress={() => setStringAsync(account.address)} />}
      <IconButton icon={BookUser} iconSize={24} onPress={handleForwardAddresses} />
    </HStack>
  );
};

export default AppBarDefaultActions;
