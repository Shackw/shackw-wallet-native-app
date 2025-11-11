export interface IShackwMetaRepository {
  getSummary(): Promise<unknown>;
  getTokensMeta(): Promise<unknown>;
  getFeesMets(): Promise<unknown>;
  getMinTransferMeta(): Promise<unknown>;
  getConstractsMets(): Promise<unknown>;
}
