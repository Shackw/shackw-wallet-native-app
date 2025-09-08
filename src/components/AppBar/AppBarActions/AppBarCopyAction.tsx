import { setStringAsync } from "expo-clipboard";
import { Copy } from "lucide-react-native";

import { IconButton } from "@/components/Button";
import { useHinomaruWalletContext } from "@/providers/HinomaruWalletProvider";

const AppBarCopyAction = () => {
  const { account } = useHinomaruWalletContext();

  if (!account) return null;

  const handleCopyAddress = async () => {
    setStringAsync(account.address);
  };

  return <IconButton icon={Copy} iconSize={24} onPress={handleCopyAddress} />;
};

export default AppBarCopyAction;
