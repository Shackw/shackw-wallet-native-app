import { setStringAsync } from "expo-clipboard";
import { useRouter } from "expo-router";
import { Copy, BookUser, X } from "lucide-react-native";
import { useCallback } from "react";

import { IconButton } from "@/presentation/components/Button";
import { HStack } from "@/presentation/components/gluestack-ui/hstack";
import { useSafeCloseToHome } from "@/presentation/hooks/useSafeCloseToHome";
import { useShackwWalletContext } from "@/presentation/providers/ShackwWalletProvider";
import { useTw } from "@/presentation/styles/tw";
import { cn } from "@/shared/helpers/cn";

type AppBarActionsProps = {
  isDefault: boolean;
};

const AppBarActions = (props: AppBarActionsProps) => {
  const { isDefault } = props;

  const router = useRouter();
  const { safeClose } = useSafeCloseToHome();
  const { account } = useShackwWalletContext();

  const tw = useTw();

  const handleForwardAddresses = useCallback(() => {
    router.push("/addresses");
  }, [router]);

  return (
    <HStack className="absolute right-0">
      {isDefault ? (
        <HStack className={cn(tw.gapX(2))}>
          {!!account && (
            <IconButton icon={Copy} iconSize={tw.scaleNum(24)} onPress={() => setStringAsync(account.address)} />
          )}
          <IconButton icon={BookUser} iconSize={tw.scaleNum(24)} onPress={handleForwardAddresses} />
        </HStack>
      ) : (
        <IconButton icon={X} iconSize={tw.scaleNum(22)} onPress={safeClose} />
      )}
    </HStack>
  );
};

export default AppBarActions;
