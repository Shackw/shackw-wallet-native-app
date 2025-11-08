import { HStack } from "@/presentation/components/gluestack-ui/hstack";
import { Spinner } from "@/presentation/components/gluestack-ui/spinner";
import { Text } from "@/presentation/components/gluestack-ui/text";
import { useHinomaruWalletContext } from "@/presentation/providers/HinomaruWalletProvider";
import { shortenAddress } from "@/shared/helpers/address";

const AppBarDefaultBody = () => {
  const { account } = useHinomaruWalletContext();
  const accountAddress = account?.address;

  return (
    <HStack className="w-full justify-center">
      {accountAddress ? (
        <Text className="font-bold text-white">{shortenAddress(accountAddress)}</Text>
      ) : (
        <Spinner size="small" color="white" />
      )}
    </HStack>
  );
};

export default AppBarDefaultBody;
