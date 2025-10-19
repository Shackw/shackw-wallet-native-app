import { useRouter } from "expo-router";
import { X } from "lucide-react-native";
import { useCallback } from "react";

import { IconButton } from "@/components/Button";

const AppBarOverlayActions = () => {
  const router = useRouter();

  const handlePress = useCallback(async () => {
    if (router.canGoBack()) {
      router.back();
    } else {
      router.replace("/");
    }
  }, [router]);

  return <IconButton icon={X} iconSize={22} onPress={handlePress} />;
};

export default AppBarOverlayActions;
