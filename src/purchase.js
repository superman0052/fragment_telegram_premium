import puppeteer from "puppeteer-extra"
import StealthPlugin from "puppeteer-extra-plugin-stealth"

import { getActivePurchaseHistory } from "./db.js"

/**
 * ################################################################
 */
export default async function purchase() {
  puppeteer.use(StealthPlugin())

  const activeItems = await getActivePurchaseHistory()

  const pathToExtension = process.env.PATH_TONKEEPER_EXTENSION

  const browser = await puppeteer.launch({
    headless: false,
    args: [
      `--disable-extensions-except=${pathToExtension}`,
      `--load-extension=${pathToExtension}`,
    ]
  })

  const workerTarget = await browser.waitForTarget(target => target.type() === 'service_worker' && target.url().endsWith('background.js'))
  const worker = await workerTarget.worker()

  const page = await browser.newPage()
  await page.goto("https://fragment.com/premium/gift", { waitUntil: "domcontentloaded", timeout: 50000 })
  await page.waitForSelector("button.btn.btn-primary.btn-block.tm-main-intro-auth-btn.ton-auth-link")
  await page.click("button.btn.btn-primary.btn-block.tm-main-intro-auth-btn.ton-auth-link")

  await page.waitForSelector("div#tc-widget-root > tc-root > div > div > div.go1392445990.go1088777916 > div > ul > li:nth-child(2) > button")
  await page.click("div#tc-widget-root > tc-root > div > div > div.go1392445990.go1088777916 > div > ul > li:nth-child(2) > button")
  
  await page.waitForSelector("#tc-widget-root > tc-root > div > div > div.go1392445990.go1088777916 > div > div.go387286889.go1542592061 > button:nth-child(1)")
  await page.click("#tc-widget-root > tc-root > div > div > div.go1392445990.go1088777916 > div > div.go387286889.go1542592061 > button:nth-child(1)")

  await page.waitForNavigation()

  // for (let i = 0; i < activeItems.length; i ++){
  //   await page.goto("https://fragment.com/premium/gift", { waitUntil: "domcontentloaded", timeout: 50000 })
  // }
  
  await browser.close()
}
