import { ReactNode, useMemo } from "react";
import { Address, Hex } from "viem";

import { PrivateKeyModel } from "@/domain/privateKey";
import { Spinner } from "@/presentation/components/gluestack-ui/spinner";
import { VStack } from "@/presentation/components/gluestack-ui/vstack";
import { theme } from "@/presentation/styles/theme";
import { useTw } from "@/presentation/styles/tw";
import { cn } from "@/shared/helpers/cn";
import { formatIsoString } from "@/shared/helpers/datetime";

export type PrivateKeyRows = {
  name: string;
  wallet: Address;
  privateKey: Hex;
  createdAtStr: string;
};

type PrivateKeyScreenSuspenceProps = {
  privateKeys: PrivateKeyModel[] | undefined;
  children: (privateKeyRows: PrivateKeyRows[]) => ReactNode;
};

const PrivateKeyScreenSuspence = (props: PrivateKeyScreenSuspenceProps) => {
  const tw = useTw();
  const { privateKeys, children } = props;

  const privateKeyRows: PrivateKeyRows[] | undefined = useMemo(() => {
    if (!privateKeys) return undefined;

    return privateKeys.map(p => ({
      name: p.name,
      wallet: p.wallet,
      privateKey: p.privateKey,
      createdAtStr: formatIsoString(p.createdAt)
    }));
  }, [privateKeys]);

  if (privateKeyRows === undefined)
    return (
      <VStack className={cn("flex-1", "justify-center", "items-center", tw.pb(32))}>
        <Spinner color={theme.colors.primary[400]} size={34.3} />
      </VStack>
    );

  return children(privateKeyRows);
};

export default PrivateKeyScreenSuspence;
