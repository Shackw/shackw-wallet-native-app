import { HStack } from "@/gluestack/hstack";
import { Spinner } from "@/gluestack/spinner";
import { Text } from "@/gluestack/text";
import { shortenAddress } from "@/helpers/address";
import { useHinomaruWalletContext } from "@/providers/HinomaruWalletProvider";

const AppBarDefaultBody = () => {
  const { account } = useHinomaruWalletContext();
  const accountAddress = account?.address;

  return (
    <HStack className="self-center flex-row items-center">
      {accountAddress ? (
        <Text className="text-base font-bold text-white">{shortenAddress(accountAddress)}</Text>
      ) : (
        <Spinner size="small" color="white" />
      )}
    </HStack>
  );
};

export default AppBarDefaultBody;
