import sqlite3 from "sqlite3"
import { open } from "sqlite"
import fs from "fs"
import path from "path"

const fileName = process.env.SQLITE3_DB ?? "premium.db"

/**
 * ################################################################
 */
export default async function initializeDB() {
  if (fs.existsSync(path.join(process.cwd(), fileName))) {
    fs.unlinkSync(path.join(process.cwd(), fileName))
  }

  const db = await open({ filename: fileName, driver: sqlite3.Database })

  await db.exec(
    `CREATE TABLE purchase_history (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      tg_username TEXT,
      duration TEXT,
      price_ton INTEGER,
      price_usd INTEGER,
      is_purchased INTEGER,
      is_active INTEGER
    )`
  )

  await db.close()
}

/**
 * ################################################################
 */
export async function insertPurchaseHistory(items) {
  if (!items || items.length <= 0) return

  const db = await open({ filename: fileName, driver: sqlite3.Database, mode: sqlite3.OPEN_READWRITE })

  const ids = []
  for (let i = 0; i < items.length; i++) {
    const one = items[i]

    const result = await db.run("INSERT INTO purchase_history (tg_username, duration, price_ton, price_usd, is_purchased, is_active) VALUES (:tg_username, :duration, :price_ton, :price_usd, :is_purchased, :is_active)", {
      ":tg_username": one.tg_username,
      ":duration": one.duration,
      ":price_ton": one.price_ton,
      ":price_usd": one.price_usd,
      ":is_purchased": one.is_purchased,
      ":is_active": one.is_active
    })

    ids.push(result.lastID)
  }

  await db.close()

  return ids
}

export async function getActivePurchaseHistory() {
  const db = await open({ filename: fileName, driver: sqlite3.Database, mode: sqlite3.OPEN_READONLY })

  const result = await db.all(`SELECT * FROM purchase_history WHERE is_active = 1`);

  await db.close()

  return result
}
