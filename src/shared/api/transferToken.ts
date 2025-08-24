// import { encode, getContract, prepareContractCall, sendTransaction, signAuthorization } from "thirdweb";
// import { Account } from "thirdweb/wallets";
// import { createSessionKey } from "thirdweb/wallets/in-app";

// import { DEFAULT_CHAIN } from "../config/chains";
// import { TOKEN_TO_ADDRESS_MAP, TOKEN_TO_CONTRACT_MAP } from "../config/contracts";
// import { THIRDWEB_CLIENT } from "../config/viem";
// import { TokenKind } from "../domain/tokens/registry";
// import { toWei } from "../utils/tokenUnits";

// type TransferTokenProps = { account: Account; token: TokenKind; to: string; amount: number };

// export const transferToken1 = async (props: TransferTokenProps) => {
//   const { account, token, to, amount } = props;
//   try {
//     const userAccountAsContract = getContract({
//       address: account.address,
//       chain: DEFAULT_CHAIN,
//       client: THIRDWEB_CLIENT
//     });

//     // セッションキー登録Txを作る（フル権限/期間つきの最小例）
//     const prepared = createSessionKey({
//       account: account, // ここでユーザーが署名
//       contract: userAccountAsContract, // 呼び先はユーザー自身（EOAをコントラクトとして扱う）
//       sessionKeyAddress: "0x3Bb1639421cF49ce26ea475a7E6864036c6a4144", // サーバーEOA（Vaultにあるウォレット）
//       durationInSeconds: 86400,
//       grantFullPermissions: true // まずは全許可。後でスコープ制限も可能
//     });

//     console.log(prepared);

//     const data = await encode(prepared);

//     console.log({ to: account.address, data });

//     const innerTx = prepareContractCall({
//       contract: TOKEN_TO_CONTRACT_MAP[token],
//       method: "function transfer(address to, uint256 value)",
//       params: [to, toWei(amount, token)] // EURCなら toWei(1) = 1_000_000
//     });
//     const innerData = await encode(innerTx); // ← これが 0xa9059cbb... のcalldata

//     const execTx = prepareContractCall({
//       contract: userAccountAsContract,
//       method: "function execute(address target, uint256 value, bytes data)",
//       params: [TOKEN_TO_ADDRESS_MAP[token], 0n, innerData] // valueは0でOK
//     });
//     const outerData = await encode(execTx);

//     // 3) Engine に渡す payload（これをそのままPOST）
//     console.log({
//       to: account.address, // ← ユーザーEOAに送る
//       data: outerData, // ← wrap済み
//       value: "0x0"
//     });
//   } catch (error) {
//     console.log(error);
//   }
// };

// export const transferToken2 = async (props: TransferTokenProps) => {
//   const { account, token, to, amount } = props;
//   try {
//     const signedAuthorization = await signAuthorization({
//       account: account,
//       request: { address: "0xe17039E62D1afF42efFD893a4c0526A9318f9858", chainId: DEFAULT_CHAIN.id, nonce: 100n }
//     });

//     console.log(signedAuthorization);

//     const transaction = prepareContractCall({
//       contract: TOKEN_TO_CONTRACT_MAP[token],
//       method: "function transfer(address to, uint256 value)",
//       params: [to, toWei(amount, token)],
//       authorizationList: [signedAuthorization]
//     });

//     const hash = await sendTransaction({
//       account,
//       transaction,
//       gasless
//     });

//     console.log(hash);
//   } catch (error) {
//     console.log(error);
//   }
// };
