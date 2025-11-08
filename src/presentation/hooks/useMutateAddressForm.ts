import { useForm } from "@tanstack/react-form";
import * as v from "valibot";
import { Address } from "viem";

import { useCreateAddress } from "@/presentation/hooks/mutations/useCreateAddress";
import { useUpdateAddress } from "@/presentation/hooks/mutations/useUpdateAddress";
import { addressFormValidator } from "@/shared/validations/forms/addressFormValidator";
import { nameFormValidator } from "@/shared/validations/forms/nameFormValidator";

export type UseMutateAddressFormProps =
  | { mode: "create"; initName?: string; initAddress?: Address }
  | { mode: "edit"; initName: string; initAddress: Address };

const mutateAddressFormSchema = v.object({ name: nameFormValidator, address: addressFormValidator }, issue => {
  const expected = String(issue.expected) === "name" ? "名前" : "アドレス";
  return `${expected} は必須です。`;
});
type MutateAddressFormValues = v.InferInput<typeof mutateAddressFormSchema>;

const useMutateAddressForm = (props: UseMutateAddressFormProps) => {
  const { mutateAsync: createAddress } = useCreateAddress();
  const { mutateAsync: updateAddress } = useUpdateAddress();

  const defaultValues: MutateAddressFormValues = (() => {
    if (props.mode === "create") return { name: props.initName ?? "", address: props.initAddress ?? "" };
    return { name: props.initName, address: props.initAddress };
  })();

  const form = useForm({
    defaultValues,
    validators: {
      onChange: mutateAddressFormSchema,
      onSubmitAsync: async ({ value }) => {
        const { name, address } = value;
        try {
          if (props.mode === "create") await createAddress({ name, address: address as Address });
          await updateAddress({ name, address: address as Address });
        } catch (error) {
          const modeStr = props.mode === "create" ? "作成" : "更新";
          let errMes: string = `不明なエラーにより${modeStr}に失敗しました。`;

          if (error instanceof Error) errMes = error.message;

          return { afterSubmited: [{ message: errMes }] };
        }
      }
    }
  });

  return { form, defaultValues };
};

export default useMutateAddressForm;
