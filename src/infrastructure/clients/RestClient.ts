import { ApiError } from "@/shared/exceptions";

export type HttpMethod = "GET" | "POST" | "PUT" | "PATCH" | "DELETE";

export type RestClientConfig = {
  baseURL?: string;
  timeoutMs?: number;
  headers?: Record<string, string>;
  fetchImpl?: typeof fetch;
};

export type RequestOptions = {
  headers?: Record<string, string>;
  query?: Record<string, string | number | boolean | null | undefined>;
  signal?: AbortSignal;
  timeoutMs?: number;
  idempotencyKey?: string;
};

export class RestClient {
  private baseURL?: string;
  private defaultHeaders: Record<string, string>;
  private defaultTimeoutMs?: number;
  private fetchImpl: typeof fetch;

  constructor(cfg: RestClientConfig = {}) {
    this.baseURL = cfg.baseURL;
    this.defaultHeaders = cfg.headers ?? {};
    this.defaultTimeoutMs = cfg.timeoutMs;
    this.fetchImpl = cfg.fetchImpl ?? fetch;
  }

  // ---------- internal helpers ----------

  private withQuery(path: string, query?: RequestOptions["query"]) {
    if (!query) return path;
    const usp = new URLSearchParams();

    for (const [k, v] of Object.entries(query)) {
      if (v !== undefined && v !== null) usp.set(k, String(v));
    }

    return path + (path.includes("?") ? "&" : "?") + usp.toString();
  }

  private resolveURL(path: string, query?: RequestOptions["query"]) {
    const abs = path.startsWith("http://") || path.startsWith("https://") ? path : `${this.baseURL ?? ""}${path}`;

    return this.withQuery(abs, query);
  }

  private buildSignal(base?: AbortSignal, timeoutMs?: number) {
    if (!timeoutMs) return { signal: base, cleanup: () => {} };

    const controller = new AbortController();
    const t = setTimeout(() => controller.abort(), timeoutMs);

    const onAbort = () => controller.abort();
    base?.addEventListener("abort", onAbort, { once: true });

    return {
      signal: controller.signal,
      cleanup: () => {
        clearTimeout(t);
        base?.removeEventListener("abort", onAbort);
      }
    };
  }

  private async parseResponse(res: Response): Promise<any> {
    const ct = res.headers.get("content-type")?.toLowerCase() ?? "";

    try {
      if (ct.includes("application/json")) return await res.json();
      if (ct.startsWith("text/")) return await res.text();
      return await res.arrayBuffer();
    } catch {
      try {
        return await res.text();
      } catch {
        return undefined;
      }
    }
  }

  // ---------- main request ----------

  private async request(method: HttpMethod, path: string, body?: any, opts: RequestOptions = {}): Promise<any> {
    const url = this.resolveURL(path, opts.query);
    const headers: Record<string, string> = {
      Accept: "application/json",
      "Content-Type": "application/json",
      ...this.defaultHeaders,
      ...opts.headers
    };
    if (opts.idempotencyKey) headers["Idempotency-Key"] = opts.idempotencyKey;

    const { signal, cleanup } = this.buildSignal(opts.signal, opts.timeoutMs ?? this.defaultTimeoutMs);

    try {
      const res = await this.fetchImpl(url, {
        method,
        headers,
        signal,
        body:
          body !== undefined && method !== "GET" && method !== "DELETE"
            ? JSON.stringify(body, (_, v) => (typeof v === "bigint" ? v.toString() : v))
            : undefined
      });

      const data = await this.parseResponse(res);

      if (!res.ok) {
        throw new ApiError({
          message: `HTTP ${res.status} ${res.statusText}`,
          status: res.status,
          method,
          url,
          body: data,
          requestId:
            res.headers.get("x-request-id") ??
            res.headers.get("x-amzn-requestid") ??
            res.headers.get("x-amz-request-id") ??
            undefined
        });
      }
      return data;
    } catch (e: any) {
      const aborted = e?.name === "AbortError";
      throw new ApiError({
        message: aborted ? "Request aborted/timeout" : "Network error",
        status: 0,
        method,
        url,
        body: { cause: e?.message ?? String(e) }
      });
    } finally {
      cleanup();
    }
  }

  // ---------- public API ----------

  get(path: string, opts?: RequestOptions) {
    return this.request("GET", path, undefined, opts);
  }
  post(path: string, body?: any, opts?: RequestOptions) {
    return this.request("POST", path, body, opts);
  }
  put(path: string, body?: any, opts?: RequestOptions) {
    return this.request("PUT", path, body, opts);
  }
  patch(path: string, body?: any, opts?: RequestOptions) {
    return this.request("PATCH", path, body, opts);
  }
  delete(path: string, opts?: RequestOptions) {
    return this.request("DELETE", path, undefined, opts);
  }
}
