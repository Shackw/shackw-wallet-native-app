import { HttpMethod } from "@/clients/restClient";

export class CustomError extends Error {}

export class ApiError extends Error {
  readonly status: number;
  readonly method: HttpMethod;
  readonly url: string;
  readonly body: unknown;
  readonly requestId?: string;

  constructor(args: {
    message: string;
    status: number;
    method: HttpMethod;
    url: string;
    body: unknown;
    requestId?: string;
  }) {
    super(args.message);
    this.name = "ApiError";
    this.status = args.status;
    this.method = args.method;
    this.url = args.url;
    this.body = args.body;
    this.requestId = args.requestId;
  }
}
