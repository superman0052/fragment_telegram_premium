import initializeDB from "./db.js"
import { markBody1, markError } from "./util.js"

/**
 * ################################################################
 */
export default async function initialize() {
  markBody1("Database Initializing Started")
  try {
    await initializeDB()
  } catch (e){
    markError('Error on database initializing:', e);
  }
  markBody1("Database Initializing Ended")
}
