import { HINOMARU_API_URL } from "@/configs/env";

export type HttpMethod = "GET" | "POST" | "PUT" | "PATCH" | "DELETE";

export type RestClientConfig = {
  baseURL?: string;
  timeoutMs?: number;
  headers?: Record<string, string>;
  fetchImpl?: typeof fetch;
};

export type RequestOptions = {
  headers?: Record<string, string>;
  query?: Record<string, string | number | boolean | undefined | null>;
  signal?: AbortSignal;
  timeoutMs?: number;
  idempotencyKey?: string;
};

export class ApiError extends Error {
  readonly status: number;
  readonly method: HttpMethod;
  readonly url: string;
  readonly headers: Record<string, string>;
  readonly body: unknown;
  readonly requestId?: string;

  constructor(args: {
    message: string;
    status: number;
    method: HttpMethod;
    url: string;
    headers: Record<string, string>;
    body: unknown;
  }) {
    super(args.message);
    this.name = "ApiError";
    this.status = args.status;
    this.method = args.method;
    this.url = args.url;
    this.headers = args.headers;
    this.body = args.body as any;
    this.requestId =
      args.headers["x-request-id"] || args.headers["x-amzn-requestid"] || args.headers["x-amz-request-id"];
  }
}

const bigintReplacer = (_: string, v: unknown) => (typeof v === "bigint" ? v.toString() : v);

async function parseResponse(res: Response): Promise<unknown> {
  const ctype = res.headers.get("content-type")?.toLowerCase() || "";
  try {
    if (ctype.includes("application/json")) {
      return await res.json();
    }
    if (ctype.startsWith("text/")) {
      return await res.text();
    }
    return await res.arrayBuffer();
  } catch {
    try {
      return await res.text();
    } catch {
      return undefined;
    }
  }
}

function withQuery(url: string, query?: RequestOptions["query"]): string {
  if (!query) return url;
  const usp = new URLSearchParams();
  for (const [k, v] of Object.entries(query)) {
    if (v === undefined || v === null) continue;
    usp.set(k, String(v));
  }
  const hasQuery = url.includes("?");
  return `${url}${hasQuery ? "&" : "?"}${usp.toString()}`;
}

function buildSignal(baseSignal?: AbortSignal, timeoutMs?: number): { signal?: AbortSignal; cleanup: () => void } {
  if (!timeoutMs) {
    return { signal: baseSignal, cleanup: () => {} };
  }

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), timeoutMs);

  const onAbort = () => controller.abort();
  baseSignal?.addEventListener("abort", onAbort, { once: true });

  return {
    signal: controller.signal,
    cleanup: () => {
      clearTimeout(timeout);
      baseSignal?.removeEventListener("abort", onAbort);
    }
  };
}

export class RestClient {
  private readonly baseURL: string | undefined;
  private readonly fetchImpl: typeof fetch;
  private readonly defaultHeaders: Record<string, string>;
  private readonly defaultTimeoutMs?: number;

  constructor(cfg: RestClientConfig = {}) {
    this.baseURL = cfg.baseURL;
    this.fetchImpl = cfg.fetchImpl ?? fetch;
    this.defaultHeaders = cfg.headers ?? {};
    this.defaultTimeoutMs = cfg.timeoutMs;
  }

  async request<T>(method: HttpMethod, path: string, body?: unknown, opts: RequestOptions = {}): Promise<T> {
    const url = this.resolveURL(path, opts.query);
    const headers: Record<string, string> = {
      Accept: "application/json",
      "Content-Type": "application/json",
      ...this.defaultHeaders,
      ...opts.headers
    };
    if (opts.idempotencyKey) {
      headers["Idempotency-Key"] = opts.idempotencyKey;
    }

    const { signal, cleanup } = buildSignal(opts.signal, opts.timeoutMs ?? this.defaultTimeoutMs) ?? {
      signal: opts.signal,
      cleanup: () => {}
    };

    try {
      const res = await this.fetchImpl(url, {
        method,
        headers,
        body:
          body !== undefined && method !== "GET" && method !== "DELETE"
            ? JSON.stringify(body, bigintReplacer)
            : undefined,
        signal
      });

      const data = await parseResponse(res);
      if (!res.ok) {
        throw new ApiError({
          message: `HTTP ${res.status} ${res.statusText}`,
          status: res.status,
          method,
          url,
          headers: headersToObject(res.headers),
          body: data
        });
      }
      return data as T;
    } catch (e: any) {
      if (e instanceof ApiError) throw e;

      const isAbort = e?.name === "AbortError" || e?.message?.toLowerCase?.().includes("aborted");
      const message = isAbort ? "Request aborted/timeout" : "Network error";
      throw new ApiError({
        message,
        status: 0,
        method,
        url,
        headers: {},
        body: { cause: e?.message ?? String(e) }
      });
    } finally {
      cleanup();
    }
  }

  get<T>(path: string, opts?: RequestOptions) {
    return this.request<T>("GET", path, undefined, opts);
  }
  post<T>(path: string, body?: unknown, opts?: RequestOptions) {
    return this.request<T>("POST", path, body, opts);
  }
  put<T>(path: string, body?: unknown, opts?: RequestOptions) {
    return this.request<T>("PUT", path, body, opts);
  }
  patch<T>(path: string, body?: unknown, opts?: RequestOptions) {
    return this.request<T>("PATCH", path, body, opts);
  }
  delete<T>(path: string, opts?: RequestOptions) {
    return this.request<T>("DELETE", path, undefined, opts);
  }

  private resolveURL(path: string, query?: RequestOptions["query"]): string {
    const clean = path.startsWith("http://") || path.startsWith("https://") ? path : `${this.baseURL ?? ""}${path}`;
    return withQuery(clean, query);
  }
}

function headersToObject(headers: Headers): Record<string, string> {
  const obj: Record<string, string> = {};
  headers.forEach((v, k) => (obj[k.toLowerCase()] = v));
  return obj;
}

export const restClient = new RestClient({
  baseURL: HINOMARU_API_URL,
  timeoutMs: 15_000
});
