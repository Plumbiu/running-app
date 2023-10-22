import colors from 'picocolors'

export function debugLog(prefix: string, value: any) {
  console.log(
    colors.cyan(colors.bold(prefix)) +
      colors.dim(': ') +
      colors.yellow(JSON.stringify(value, undefined, 2)),
  )
}
