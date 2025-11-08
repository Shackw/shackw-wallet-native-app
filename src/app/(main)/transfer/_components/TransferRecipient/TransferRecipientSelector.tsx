import { useCallback } from "react";
import { Pressable, ScrollView } from "react-native";
import { Address } from "viem";

import { Avatar, AvatarFallbackText } from "@/presentation/components/gluestack-ui/avatar";
import { HStack } from "@/presentation/components/gluestack-ui/hstack";
import { Table, TableBody, TableRow } from "@/presentation/components/gluestack-ui/table";
import { Text } from "@/presentation/components/gluestack-ui/text";
import { VStack } from "@/presentation/components/gluestack-ui/vstack";
import Searcher from "@/presentation/components/Searcher";
import TableSuspence from "@/presentation/components/TableSuspence";
import useAddressesRow from "@/presentation/hooks/useAddressesRow";

import { TransferFormContextType } from "../../_hooks/useTransferForm";

type TransferRecipientSelectorProps = Pick<
  ReturnType<typeof useAddressesRow>,
  "addressRows" | "searchText" | "searchTextRef" | "isError" | "handleChangeSearchText"
> & { form: TransferFormContextType["form"]; handleClose: () => void };

const TransferRecipientSelector = (props: TransferRecipientSelectorProps) => {
  const { form, addressRows, searchText, searchTextRef, isError, handleClose, handleChangeSearchText } = props;

  const handleSelect = useCallback(
    (address: Address) => {
      form.setFieldValue("recipient", address);
      handleClose();
    },
    [form, handleClose]
  );

  return (
    <VStack className="w-full flex-1 gap-y-2">
      <Searcher
        defaultValue={searchText}
        inputRef={searchTextRef}
        handleChange={handleChangeSearchText}
        componetProps={{ className: "w-full" }}
      />
      <TableSuspence title="アドレス" rows={addressRows} isError={isError}>
        {rows => (
          <ScrollView style={{ flex: 1 }} showsVerticalScrollIndicator>
            <Table className="w-full overflow-y-auto">
              <TableBody className="w-full">
                {rows.map(({ name, address }, index) => (
                  <TableRow key={`recipient-${index}`} className="w-full py-3">
                    <Pressable onPress={() => handleSelect(address)}>
                      <HStack className="w-full gap-x-1 items-center">
                        <Avatar size="md" className="mx-2">
                          <AvatarFallbackText>{name}</AvatarFallbackText>
                        </Avatar>
                        <VStack className="w-full gap-y-1">
                          <Text size="lg" className="font-bold">
                            {name}
                          </Text>
                          <Text size="md" className="font-bold text-secondary-500">
                            {address}
                          </Text>
                        </VStack>
                      </HStack>
                    </Pressable>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </ScrollView>
        )}
      </TableSuspence>
    </VStack>
  );
};

export default TransferRecipientSelector;
