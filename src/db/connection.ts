import { type SQLiteDatabase } from "expo-sqlite";

import { UserVersionRow } from "./schema";

export const applyPragmas = async (db: SQLiteDatabase) => {
  await db.execAsync?.("PRAGMA foreign_keys = ON;");
  try {
    await db.execAsync?.("PRAGMA journal_mode = WAL;");
    await db.execAsync?.("PRAGMA synchronous = NORMAL;");
  } catch {}
};

export const getUserVersion = async (db: SQLiteDatabase): Promise<number> => {
  const res = await db.getFirstAsync?.<UserVersionRow>("PRAGMA user_version;");
  return res?.user_version ?? 0;
};

export const setUserVersion = async (db: SQLiteDatabase, v: number) => {
  await db.execAsync?.(`PRAGMA user_version = ${v};`);
};
