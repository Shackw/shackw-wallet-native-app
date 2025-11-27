import { useMemo } from "react";
import { Pressable } from "react-native";

import { ListPrivateKeysCommand } from "@/domain/privateKey";
import { TableRow } from "@/presentation/components/gluestack-ui/table";
import { Text } from "@/presentation/components/gluestack-ui/text";
import { VStack } from "@/presentation/components/gluestack-ui/vstack";
import { useBoolean } from "@/presentation/hooks/useBoolean";
import { shortenAddress } from "@/shared/helpers/address";

import PrivateKeyDisplyField from "./PrivateKeyDisplyField";
import { PrivateKeyRows } from "./PrivateKeyScreenSuspence";

type PrivateKeyTableRowProps = {
  row: PrivateKeyRows;
  index: number;
  fetchPrivateKeys: (variables: ListPrivateKeysCommand) => Promise<void>;
};

const PrivateKeyTableRow = (props: PrivateKeyTableRowProps) => {
  const { row, index, fetchPrivateKeys } = props;
  const [isDisplaying, setIsDisplaying] = useBoolean(false);

  const isEven = useMemo(() => index % 2 === 0, [index]);

  return (
    <>
      <TableRow className="w-full">
        <Pressable
          className={`w-full px-3 py-2 active:bg-secondary-100 ${isEven ? "bg-secondary-50" : ""}`}
          onLongPress={setIsDisplaying.on}
        >
          <VStack className="gap-y-1">
            <Text className="font-bold text-secondary-500">{row.createdAtStr}</Text>
            <Text className="font-bold pl-1" size="lg">
              {row.name}
            </Text>
            <Text className="ml-auto" size="lg">
              {shortenAddress(row.wallet, 16)}
            </Text>
          </VStack>
        </Pressable>
      </TableRow>

      <PrivateKeyDisplyField
        wallet={row.wallet}
        privateKey={row.privateKey}
        createdAtStr={row.createdAtStr}
        componentProps={{
          title: "プライベートキーの管理",
          size: "lg",
          isOpen: isDisplaying,
          onClose: setIsDisplaying.off
        }}
        fetchPrivateKeys={fetchPrivateKeys}
      />
    </>
  );
};

export default PrivateKeyTableRow;
