import { HStack, Spinner, Text } from "@gluestack-ui/themed";

import { useHinomaruWalletContext } from "@/providers/HinomaruWalletProvider";
import { shortenAddress } from "@/helpers/address";

const AppBarDefaultBody = () => {
  const { account } = useHinomaruWalletContext();
  const accountAddress = account?.address;

  return (
    <HStack alignItems="center" marginHorizontal="auto">
      {accountAddress ? (
        <Text size="md" fontWeight="bold" color="white">
          {shortenAddress(accountAddress)}
        </Text>
      ) : (
        <Spinner size="small" color="white" />
      )}
    </HStack>
  );
};

export default AppBarDefaultBody;
