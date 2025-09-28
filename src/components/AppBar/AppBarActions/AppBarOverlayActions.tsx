import { useRouter } from "expo-router";
import { X } from "lucide-react-native";

import { IconButton } from "@/components/Button";

const AppBarOverlayActions = () => {
  const router = useRouter();

  const handlePress = () => {
    router.back();
  };
  return <IconButton icon={X} iconSize={22} onPress={handlePress} />;
};

export default AppBarOverlayActions;
