import { useForm } from "@tanstack/react-form";
import * as v from "valibot";
import { Address } from "viem";

import { useCreateAddress } from "@/hooks/mutations/useCreateAddress";
import { useUpdateAddress } from "@/hooks/mutations/useUpdateAddress";
import { addressFormValidator } from "@/validations/forms/addressFormValidator";
import { nameFormValidator } from "@/validations/forms/nameFormValidator";

export type UseMutateAddressFormProps = { mode: "create" } | { mode: "edit"; initName: string; initAddress: Address };

const mutateAddressFormSchema = v.object({ name: nameFormValidator, address: addressFormValidator }, issue => {
  const expected = String(issue.expected) === "name" ? "名前" : "アドレス";
  return `${expected} は必須です。`;
});
type MutateAddressFormValues = v.InferInput<typeof mutateAddressFormSchema>;

const useMutateAddressForm = (props: UseMutateAddressFormProps) => {
  const { mutateAsync: createAddress } = useCreateAddress();
  const { mutateAsync: updateAddress } = useUpdateAddress();

  const defaultValues: MutateAddressFormValues = (() => {
    if (props.mode === "create") return { name: "", address: "" };
    return { name: props.initName, address: props.initAddress };
  })();

  const handleSubmit = async ({ value: { name, address } }: { value: MutateAddressFormValues }) => {
    if (props.mode === "create") {
      try {
        await createAddress({ name, address: address as Address, isMine: false });
      } catch {}
    }
    try {
      await updateAddress({ name, address: address as Address });
    } catch {}
  };

  return useForm({
    defaultValues,
    validators: { onChange: mutateAddressFormSchema },
    onSubmit: handleSubmit
  });
};

export default useMutateAddressForm;
