import { ReactNode } from "react";

import { AppText } from "@/presentation/components/AppText";
import { Spinner } from "@/presentation/components/gluestack-ui/spinner";
import { VStack } from "@/presentation/components/gluestack-ui/vstack";
import { theme } from "@/presentation/styles/theme";
import { useTw } from "@/presentation/styles/tw";
import { cn } from "@/shared/helpers/cn";

import useMyAddressOptions, { type AddressOption } from "../_hooks/useMyAddressOptions";

type WalletScreenSuspenceProps = {
  initialValue: ReturnType<typeof useMyAddressOptions>["initialValue"];
  addressOptions: ReturnType<typeof useMyAddressOptions>["addressOptions"];
  error: ReturnType<typeof useMyAddressOptions>["error"];
  children: (initialValue: AddressOption, options: AddressOption[]) => ReactNode;
};

const WalletScreenSuspence = (props: WalletScreenSuspenceProps) => {
  const tw = useTw();
  const { initialValue, addressOptions, error, children } = props;

  if (!!error || initialValue === null)
    return (
      <VStack className={cn("flex-1", "justify-center", "items-center", tw.pb(32))}>
        <AppText t="md" className="font-bold text-secondary-500">
          ウォレット一覧の取得に失敗しました。
        </AppText>
      </VStack>
    );

  if (initialValue === undefined || !addressOptions)
    return (
      <VStack className={cn("flex-1", "justify-center", "items-center", tw.pb(32))}>
        <Spinner color={theme.colors.primary[400]} size={34.3} />
      </VStack>
    );

  return children(initialValue, addressOptions);
};

export default WalletScreenSuspence;
