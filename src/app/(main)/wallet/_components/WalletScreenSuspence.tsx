import { ReactNode } from "react";

import { Spinner } from "@/presentation/components/gluestack-ui/spinner";
import { Text } from "@/presentation/components/gluestack-ui/text";
import { VStack } from "@/presentation/components/gluestack-ui/vstack";
import { theme } from "@/presentation/styles/theme";

import useMyAddressOptions, { type AddressOption } from "../_hooks/useMyAddressOptions";

type WalletScreenSuspenceProps = {
  initialValue: ReturnType<typeof useMyAddressOptions>["initialValue"];
  addressOptions: ReturnType<typeof useMyAddressOptions>["addressOptions"];
  error: ReturnType<typeof useMyAddressOptions>["error"];
  children: (initialValue: AddressOption, options: AddressOption[]) => ReactNode;
};

const WalletScreenSuspence = (props: WalletScreenSuspenceProps) => {
  const { initialValue, addressOptions, error, children } = props;

  if (!!error || initialValue === null)
    return (
      <VStack className="flex-1 justify-center items-center pb-32">
        <Text className="font-bold text-secondary-500">ウォレット一覧の取得に失敗しました。</Text>
      </VStack>
    );

  if (initialValue === undefined || !addressOptions)
    return (
      <VStack className="flex-1 justify-center items-center pb-32">
        <Spinner color={theme.colors.primary[400]} size={34.3} />
      </VStack>
    );

  return children(initialValue, addressOptions);
};

export default WalletScreenSuspence;
