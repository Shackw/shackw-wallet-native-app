import { shortenAddress } from "@/helpers/address";
import { useHinomaruWalletContext } from "@/providers/HinomaruWalletProvider";
import { HStack } from "@/vendor/gluestack-ui/hstack";
import { Spinner } from "@/vendor/gluestack-ui/spinner";
import { Text } from "@/vendor/gluestack-ui/text";

const AppBarDefaultBody = () => {
  const { account } = useHinomaruWalletContext();
  const accountAddress = account?.address;

  return (
    <HStack className="w-full justify-center">
      {accountAddress ? (
        <Text className="text-base font-bold text-white">{shortenAddress(accountAddress)}</Text>
      ) : (
        <Spinner size="small" color="white" />
      )}
    </HStack>
  );
};

export default AppBarDefaultBody;
