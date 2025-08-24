import { useRouter } from "expo-router";
import { X } from "lucide-react-native";

import { IconButton } from "@/components/Button";

const AppBarRouterBackAction = () => {
  const router = useRouter();

  const handlePress = () => {
    router.back();
  };
  return <IconButton icon={X} iconSize="xl" handlePress={handlePress} />;
};

export default AppBarRouterBackAction;
