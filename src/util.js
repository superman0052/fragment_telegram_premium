import colors from "colors"

export function delay(time) {
  return new Promise((resolve) => setTimeout(resolve, time))
}

/* ################################################################ */
export function markStart(memo) {
  console.log(colors.cyan("################################################################"))
  console.log(colors.cyan(`---------------- ${memo} ----------------`))
}

export function markEnd(memo) {
  console.log(colors.cyan(`---------------- ${memo} ----------------`))
  console.log(colors.cyan("################################################################\n"))
}

/* ################################################################ */
export function markBody1(memo) {
  console.log(colors.magenta(`------------ ${memo} ------------`))
}

export function markBody2(memo) {
  console.log(colors.blue(`-------- ${memo} --------`))
}

export function markBody3(memo) {
  console.log(colors.yellow(`${memo}`))
}

/* ################################################################ */
export function markBody11(memo) {
  console.log(colors.bgGreen(`-------- ${memo} --------`))
}

export function markBody12(memo) {
  console.log(colors.bgRed(`-------- ${memo} --------`))
}

/* ################################################################ */
export function markError(memo, error) {
  console.log(colors.red(`${memo}: `, error))
}
