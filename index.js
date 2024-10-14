import "dotenv/config"

import { markEnd, markStart } from "./src/util.js"
import initialize from "./src/initialize.js"
import read from "./src/read.js";
import purchase from "./src/purchase.js";

markStart("Initializing Started")
await initialize();
markEnd("Initializing Ended")

markStart("Reading Started")
await read();
markEnd("Reading Ended")

markStart("Purchasing Started")
await purchase()
markEnd("Purchasing Ended")