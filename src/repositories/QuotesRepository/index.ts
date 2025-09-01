import * as v from "valibot";

import { hinomaruRestClient } from "@/clients/restClient";
import { QuoteModel } from "@/models/quote";

import { CreateQuotePayload } from "./interface";
import { responceToQuoteModel } from "./mapper";
import { CreateQuoteResponceSchema } from "./parser";

export const QuotesRepository = {
  async create(payload: CreateQuotePayload): Promise<QuoteModel> {
    const created = await hinomaruRestClient.post("/quotes", { ...payload });
    const parsed = v.parse(CreateQuoteResponceSchema, created);
    return responceToQuoteModel(parsed);
  }
};
