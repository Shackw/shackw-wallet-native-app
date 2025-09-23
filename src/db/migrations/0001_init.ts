import type { SQLiteDatabase } from "expo-sqlite";

export const up_0001 = async (db: SQLiteDatabase) => {
  await db.execAsync?.(`
    CREATE TABLE IF NOT EXISTS addresses (
      address     TEXT PRIMARY KEY
                  CHECK(address = lower(address))
                  CHECK(length(address) = 42)
                  CHECK(substr(address,1,2) = '0x'),
      name        TEXT NOT NULL
                  CHECK(length(name) <= 20),
      is_mine     INTEGER NOT NULL DEFAULT 0
                  CHECK (is_mine IN (0,1)),
      updated_at  INTEGER NOT NULL DEFAULT (strftime('%s','now')),
      created_at  INTEGER NOT NULL DEFAULT (strftime('%s','now'))
    );

    CREATE TABLE IF NOT EXISTS transactions (
      tx_hash           TEXT NOT NULL
                                CHECK(tx_hash = lower(tx_hash))
                                CHECK(length(tx_hash) = 66)
                                CHECK(substr(tx_hash,1,2) = '0x'),
      log_index         INTEGER NOT NULL CHECK(log_index >= 0),
      block_number      TEXT NOT NULL
                        CHECK(block_number GLOB '[0-9]*')
                        CHECK(length(block_number) > 0),

      token_address     TEXT NOT NULL
                        CHECK(token_address = lower(token_address))
                        CHECK(length(token_address) = 42)
                        CHECK(substr(token_address,1,2) = '0x'),

      from_address      TEXT NOT NULL
                        CHECK(from_address = lower(from_address))
                        CHECK(length(from_address) = 42)
                        CHECK(substr(from_address,1,2) = '0x'),

      to_address        TEXT NOT NULL
                        CHECK(to_address = lower(to_address))
                        CHECK(length(to_address) = 42)
                        CHECK(substr(to_address,1,2) = '0x'),

      value_min_units   TEXT NOT NULL
                        CHECK(value_min_units GLOB '[0-9]*')
                        CHECK(length(value_min_units) > 0),

      transferred_at    INTEGER NOT NULL CHECK(transferred_at >= 0),
      inserted_at       INTEGER NOT NULL DEFAULT (strftime('%s','now')),
      PRIMARY KEY (tx_hash, log_index, block_number)
    );

    CREATE TABLE IF NOT EXISTS transaction_progress (
      year            INTEGER NOT NULL CHECK(year BETWEEN 2009 AND 9999),
      month           INTEGER NOT NULL CHECK(month BETWEEN 1 AND 12),
      status          TEXT    NOT NULL CHECK(status IN ('completed','partial')),
      last_updated_at INTEGER NOT NULL DEFAULT (strftime('%s','now')),
      PRIMARY KEY (year, month)
    );

    -- Indexes
    CREATE INDEX IF NOT EXISTS idx_tx_block_log         ON transactions(block_number, log_index);
    CREATE INDEX IF NOT EXISTS idx_tx_from_by_time      ON transactions(from_address, transferred_at);
    CREATE INDEX IF NOT EXISTS idx_tx_to_by_time        ON transactions(to_address, transferred_at);
    CREATE INDEX IF NOT EXISTS idx_tx_token_by_time     ON transactions(token_address, transferred_at);
  `);
};
