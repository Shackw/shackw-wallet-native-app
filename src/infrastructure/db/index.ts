import { applyPragmas, getUserVersion, setUserVersion } from "./connection";
import { migrations } from "./migrations";

import type { SQLiteDatabase } from "expo-sqlite";

export const migrate = async (db: SQLiteDatabase) => {
  await applyPragmas(db);

  const current = await getUserVersion(db);
  const pending = migrations.filter(m => m.version > current).sort((a, b) => a.version - b.version);
  if (pending.length === 0) return;

  for (const m of pending) {
    await db.execAsync?.("BEGIN;");
    try {
      await m.up(db);
      await setUserVersion(db, m.version);
      await db.execAsync?.("COMMIT;");
    } catch (e) {
      await db.execAsync?.("ROLLBACK;");
      throw new Error(`Migration ${m.version} failed: ${(e as Error).message}`);
    }
  }
};
