import { type SQLiteDatabase } from "expo-sqlite";

import { up_0001 } from "./0001_init";

export type Migration = {
  version: number;
  up: (db: SQLiteDatabase) => Promise<void>;
};

export const migrations: Migration[] = [{ version: 1, up: up_0001 }];
