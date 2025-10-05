import { useMemo } from "react";
import RNQRCode from "react-native-qrcode-svg";
import { Address } from "viem";

import { ENV } from "@/configs/env";
import { Token } from "@/registries/TokenRegistry";

type QRCodeProps = (
  | { path: "addresses"; query: { name: string; address: Address } }
  | { path: "transfer"; query: { feeToken: Token; recipient: Address; amount: number; webhook: string } }
) & { size: number };

const QRCode = (props: QRCodeProps) => {
  const { size, path, query } = props;

  const value = useMemo(() => {
    const url = new URL(path, `${ENV.HINOMARU_UNIVERSAL_LINK}/wallet`);
    for (const [key, v] of Object.entries(query)) url.searchParams.set(key, String(v));
    return url.toString();
  }, [path, query]);

  return <RNQRCode value={value} size={size} ecl="M" backgroundColor="#fff" />;
};

export default QRCode;
