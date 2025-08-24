import { Account, Address, encodeFunctionData, erc20Abi, Hex, WalletClient } from "viem";

import { DEFAULT_CHAIN } from "../config/chains";
import { DELEGATE_CONTRACT_ADDRESS, TOKEN_TO_ADDRESS_MAP } from "../config/contracts";
import { VIEM_PUBLIC_CLIENT } from "../config/viem";
import { TokenKind } from "../domain/tokens/registry";
import { toWei } from "../utils/tokenUnits";

type TransferTokenProps = {
  account: Account;
  walletClient: WalletClient;
  token: TokenKind;
  to: Address;
  amount: number;
};

const bigintReplacer = (_: string, v: unknown) => (typeof v === "bigint" ? v.toString() : v);

export const transferToken = async (props: TransferTokenProps) => {
  const { account, walletClient, token, to, amount } = props;
  try {
    const nonce = await VIEM_PUBLIC_CLIENT.getTransactionCount({
      address: account.address,
      blockTag: "pending"
    });
    const authorization = await walletClient.signAuthorization({
      account,
      contractAddress: DELEGATE_CONTRACT_ADDRESS as Hex,
      chainId: DEFAULT_CHAIN.id,
      nonce
    });

    const transferCalldata = encodeFunctionData({
      abi: erc20Abi,
      functionName: "transfer",
      args: [to, toWei(amount, token)]
    });
    const call = {
      to: TOKEN_TO_ADDRESS_MAP[token],
      value: 0n,
      data: transferCalldata
    } as const;

    const payload = {
      from: account.address,
      chainId: DEFAULT_CHAIN.id,
      authorization,
      call,
      revertOnFail: true,
      value: call.value
    };

    const res = await fetch("https://3104a120000c.ngrok-free.app/api/v1/test", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(payload, bigintReplacer)
    });

    if (!res.ok) {
      const err = await res.text();
      throw new Error(`relay failed: ${res.status} ${err}`);
    }

    const { hash } = await res.json();
    return hash as Hex;
  } catch (error) {
    console.log(error);
  }
};
