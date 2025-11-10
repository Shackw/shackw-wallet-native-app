export interface IHinomaruMetaRepository {
  getSummary(): Promise<unknown>;
  getTokensMeta(): Promise<unknown>;
  getFeesMets(): Promise<unknown>;
  getMinTransferMeta(): Promise<unknown>;
  getConstractsMets(): Promise<unknown>;
}
