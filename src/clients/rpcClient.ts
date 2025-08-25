import { JSONRPCClient } from "json-rpc-2.0";

const withInvariants = (params?: any) =>
  Array.isArray(params) ? [{ ...(params[0] ?? {}) }, ...params.slice(1)] : [{ ...(params ?? {}) }];

const stringifyWithBigInt = (obj: unknown, as: "dec" | "hex" = "dec") =>
  JSON.stringify(obj, (_k, v) => {
    if (typeof v === "bigint") return as === "hex" ? `0x${v.toString(16)}` : v.toString();
    return v;
  });

export const rpcClient: JSONRPCClient = (() => {
  const client = new JSONRPCClient(async jsonRPCRequest => {
    try {
      const body = { ...jsonRPCRequest, params: withInvariants(jsonRPCRequest.params) };

      const res = await fetch("http://xxxxx/rpc/vi", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: stringifyWithBigInt(body, "dec")
      });

      if (res.status === 200) {
        const json = await res.json();
        if (Array.isArray(json)) json.forEach(r => client.receive(r));
        else client.receive(json);
        return;
      }

      if (jsonRPCRequest.id !== undefined) {
        return Promise.reject(new Error(`HTTP ${res.status} ${res.statusText}`));
      }
      return Promise.resolve();
    } catch (err) {
      if (jsonRPCRequest.id !== undefined) return Promise.reject(err as Error);
      return Promise.resolve();
    }
  });
  return client;
})();
