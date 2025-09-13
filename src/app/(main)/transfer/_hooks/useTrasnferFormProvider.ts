import { useForm } from "@tanstack/react-form";
import * as v from "valibot";
import { isAddress, zeroAddress } from "viem";

import { toDecimals } from "@/helpers/tokenUnits";
import { useTokenBalanceContext } from "@/providers/TokenBalanceProvider";
import { Token, TOKEN_REGISTRY, TOKENS } from "@/registries/TokenRegistry";

type UseTrasnferFormProviderProps = {
  sendToken: Token;
};

const useTrasnferFormProvider = (props: UseTrasnferFormProviderProps) => {
  const { sendToken } = props;

  const tokenBalanceResult = useTokenBalanceContext();
  const { balance } = tokenBalanceResult[sendToken];

  const minTransferAmount = toDecimals(TOKEN_REGISTRY[sendToken].minTransferAmountUnits, sendToken);

  const trasferFromValidator = v.object({
    feeToken: v.pipe(
      v.string("手数料支払い通貨を選んでください。"),
      v.picklist(TOKENS, `手数料支払い通貨は ${TOKENS.join(" / ")} から選んでください。`)
    ),
    recipient: v.pipe(
      v.string("宛先は文字列で入力してください。"),
      v.regex(/^0x[0-9a-fA-F]{40}$/, "宛先は0xで始まる40桁の16進数で入力してください。"),
      v.custom(
        (s): s is string => typeof s === "string" && s.toLowerCase() !== zeroAddress,
        () => "宛先にゼロアドレスは指定できません。"
      ),
      v.custom(
        (s): s is string => typeof s === "string" && isAddress(s),
        () => "宛先は有効なEVMアドレスを入力してください。"
      )
    ),
    amount: v.pipe(
      v.number("金額は数値で入力してください。"),
      v.minValue(minTransferAmount, `最低可能額は ${minTransferAmount} ${sendToken} です。`),
      v.maxValue(Number(balance ?? 0), `送金可能額は ${Number(balance)} ${sendToken} です。`)
    )
  });

  const defaultValues: v.InferInput<typeof trasferFromValidator> = {
    feeToken: "JPYC",
    recipient: "",
    amount: 0
  };

  const form = useForm({
    defaultValues,
    validators: {
      onBlur: trasferFromValidator
    },
    onSubmit: async ({ value }) => {
      console.log("submit", value);
    }
  });
};
