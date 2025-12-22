import { setStringAsync } from "expo-clipboard";
import { useRouter } from "expo-router";
import { Copy, BookUser, X } from "lucide-react-native";
import { useCallback } from "react";

import { IconButton } from "@/presentation/components/Button";
import { HStack } from "@/presentation/components/gluestack-ui/hstack";
import { useSafeCloseToHome } from "@/presentation/hooks/useSafeCloseToHome";
import { useShackwWalletContext } from "@/presentation/providers/ShackwWalletProvider";

type AppBarActionsProps = {
  isDefault: boolean;
};

const AppBarActions = (props: AppBarActionsProps) => {
  const { isDefault } = props;

  const router = useRouter();
  const { safeClose } = useSafeCloseToHome();
  const { account } = useShackwWalletContext();

  const handleForwardAddresses = useCallback(() => {
    router.push("/addresses");
  }, [router]);

  return (
    <HStack className="absolute right-0">
      {isDefault ? (
        <HStack className="gap-x-2">
          {!!account && <IconButton icon={Copy} iconSize={24} onPress={() => setStringAsync(account.address)} />}
          <IconButton icon={BookUser} iconSize={24} onPress={handleForwardAddresses} />
        </HStack>
      ) : (
        <IconButton icon={X} iconSize={22} onPress={safeClose} />
      )}
    </HStack>
  );
};

export default AppBarActions;
