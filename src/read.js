import fs from "fs"

import { markBody1, markError } from "./util.js"
import { insertPurchaseHistory } from "./db.js"

/**
 * ################################################################
 */
export default async function read() {
  let usernames = []

  markBody1("Text Reading Started")
  try {
    const textFileName = process.env.TEXT_FILENAME
    const data = fs.readFileSync(textFileName, 'utf8')
    let lines = data.split(/\r?\n/)
    usernames = lines.filter(username => !!username)
  } catch (e) {
    markError("Error on reading text file: ", e)
  }
  markBody1("Text Reading Ended")

  markBody1("Purchase History Writing Started")
  try {
    const items = usernames.map(username => ({
      tg_username: username,
      duration: 0,
      price_ton: 0,
      price_usd: 0,
      is_purchased: 0,
      is_active: 1
    }))

    await insertPurchaseHistory(items)
  } catch (e) {
    markError("Error on writing purchase history: ", e)
  }
  markBody1("Purchase History Writing Ended")
}
