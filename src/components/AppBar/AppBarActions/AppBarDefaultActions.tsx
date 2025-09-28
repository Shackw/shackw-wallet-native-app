import { setStringAsync } from "expo-clipboard";
import { useRouter } from "expo-router";
import { BookUser, Copy } from "lucide-react-native";
import { useCallback } from "react";

import { IconButton } from "@/components/Button";
import { useHinomaruWalletContext } from "@/providers/HinomaruWalletProvider";
import { HStack } from "@/vendor/gluestack-ui/hstack";

const AppBarDefaultActions = () => {
  const router = useRouter();
  const { account } = useHinomaruWalletContext();

  const handleForwardAddresses = useCallback(() => {
    router.push("/account");
  }, [router]);

  return (
    <HStack className="gap-x-2">
      {!!account && <IconButton icon={Copy} iconSize={24} onPress={() => setStringAsync(account.address)} />}
      <IconButton icon={BookUser} iconSize={24} onPress={handleForwardAddresses} />
    </HStack>
  );
};

export default AppBarDefaultActions;
