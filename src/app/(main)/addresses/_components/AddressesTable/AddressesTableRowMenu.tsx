import { setStringAsync } from "expo-clipboard";
import { Copy, EllipsisVertical, QrCode, SquarePen } from "lucide-react-native";
import { useCallback } from "react";

import AddressesDisplayQR from "@/presentation/components/Addresses/AddressesDisplayQR";
import AddressMutateField from "@/presentation/components/Addresses/AddressMutateField";
import { IconButton } from "@/presentation/components/Button";
import { Icon } from "@/presentation/components/gluestack-ui/icon";
import { Menu, MenuItem, MenuItemLabel } from "@/presentation/components/gluestack-ui/menu";
import useAddressesRow, { AddressRow } from "@/presentation/hooks/useAddressesRow";
import { useBoolean } from "@/presentation/hooks/useBoolean";
import { theme } from "@/presentation/styles/theme";

import AddressesTableDeleteDialog from "./AddressesTableDeleteDialog";

type AddressesTableRowMenuProps = {
  row: AddressRow;
  refetchAddresses: ReturnType<typeof useAddressesRow>["refetch"];
};

const AddressesTableRowMenu = (props: AddressesTableRowMenuProps) => {
  const { row, refetchAddresses } = props;
  const [isEditing, setIsEditing] = useBoolean(false);
  const [isDeleting, setIsDeleting] = useBoolean(false);
  const [isDisplayQr, setIsDisplayQr] = useBoolean(false);

  const handleCopy = useCallback(() => {
    setStringAsync(row.address);
  }, [row.address]);

  return (
    <>
      <Menu
        placement="left bottom"
        offset={5}
        className="bg-secondary-50"
        trigger={({ ...triggerProps }) => {
          return (
            <IconButton
              defaultProps={triggerProps}
              action="default"
              className="ml-auto"
              iconSize={22}
              icon={EllipsisVertical}
              iconColor={theme.colors.secondary[700]}
            />
          );
        }}
      >
        <MenuItem key="Edit Profile" textValue="編集" onPress={setIsEditing.on}>
          <Icon as={SquarePen} size="md" className="mr-2" />
          <MenuItemLabel size="md" className="font-bold">
            編集
          </MenuItemLabel>
        </MenuItem>
        <MenuItem key="Disply QR" textValue="QRコードを表示" onPress={setIsDisplayQr.on}>
          <Icon as={QrCode} size="md" className="mr-2" />
          <MenuItemLabel size="md" className="font-bold">
            QRコードを表示
          </MenuItemLabel>
        </MenuItem>
        <MenuItem key="Copy Address" textValue="アドレスをコピー" onPress={handleCopy}>
          <Icon as={Copy} size="md" className="mr-2" />
          <MenuItemLabel size="md" className="font-bold">
            アドレスをコピー
          </MenuItemLabel>
        </MenuItem>
        {!row.isMine && (
          <MenuItem key="Delete Address" textValue="削除" onPress={setIsDeleting.on}>
            <Icon as={Copy} size="md" className="mr-2" />
            <MenuItemLabel size="md" className="font-bold">
              削除
            </MenuItemLabel>
          </MenuItem>
        )}
      </Menu>

      <AddressMutateField
        mode="edit"
        initName={row.name}
        initAddress={row.address}
        disableFields={["address"]}
        refetch={refetchAddresses}
        componentProps={{ title: "アドレス編集", size: "lg", isOpen: isEditing, onClose: setIsEditing.off }}
      />

      <AddressesTableDeleteDialog
        address={row.address}
        isOpen={isDeleting}
        handleClose={setIsDeleting.off}
        refetchAddresses={refetchAddresses}
      />

      <AddressesDisplayQR
        name={row.name}
        address={row.address}
        componentProps={{
          title: "アドレスの共有",
          size: "lg",
          isOpen: isDisplayQr,
          onClose: setIsDisplayQr.off
        }}
      />
    </>
  );
};

export default AddressesTableRowMenu;
