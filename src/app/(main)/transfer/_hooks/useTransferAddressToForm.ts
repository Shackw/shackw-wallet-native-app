import { useCallback, useState } from "react";
import * as v from "valibot";

import { useBoolean } from "@/shared/hooks/useBoolean";
import { TransferAddressToFormSchema } from "@/shared/validation/schemas/TransferFormSchema";

export type useTransferAddressToFormResult = {
  addressTo: string | undefined;
  isAddressToValid: boolean;
  addressToError: string | undefined;
  handleAddressToSubmit: (text: string) => void;
};

const useTransferAddressToForm = (): useTransferAddressToFormResult => {
  const [addressTo, setAddressTo] = useState<string>("");
  const [isAddressToValid, setIsAddressToValid] = useBoolean(false);
  const [addressToError, setAddressToError] = useState<string | undefined>(undefined);

  const handleAddressToSubmit = useCallback(
    (addressToText: string) => {
      setIsAddressToValid.off();
      setAddressToError(undefined);

      if (addressToText === "") return setAddressTo("");

      const validation = v.safeParse(TransferAddressToFormSchema, addressToText);
      if (!validation.success) {
        setAddressToError(validation.issues[0].message);
        return;
      }

      setAddressTo(addressToText);
      setIsAddressToValid.on();
    },
    [setIsAddressToValid]
  );

  return { addressTo, isAddressToValid, addressToError, handleAddressToSubmit };
};

export default useTransferAddressToForm;
