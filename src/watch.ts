import {
  WatchWindowForeground,
  getProcessName,
  getHandleProcessID,
} from 'hmc-win32'
import { Rule } from './utils.js'
import { debugLog } from './logger.js'

export interface Doing {
  title?: string
  extra?: any
  program: string
  doing: string
}

export function watchWin(
  rules: Rule[],
  cb: (err: Error | null, doing: Doing | undefined) => void,
  opts: {
    debug: boolean
  } = {
    debug: false,
  },
) {
  const { debug } = opts
  function findDoing(p: string | null, title: string) {
    if (p === null) {
      return
    }
    for (const { pattern, map, hideTitle, program, ...rest } of rules) {
      if (pattern.test(p)) {
        const mapKey = pattern.exec(p)?.[0] ?? ''
        const base: Doing = {
          title,
          program: (program || map?.get(mapKey)) ?? p.replace('.exe', ''),
          ...rest,
        }
        if (hideTitle) {
          delete base.title
        }

        return base
      }
    }
  }
  WatchWindowForeground((_n1, _n2, win) => {
    const program = getProcessName(getHandleProcessID(win) ?? 0)
    const doing = findDoing(program, win.title)

    try {
      if (debug) {
        debugLog('title', win.title)
        debugLog('program', program)
        debugLog('doing', doing)
        console.log('-----------------')
      }
      cb(null, doing)
    } catch (error: any) {
      const err = new Error(error.message)
      cb(err, doing)
    }
  })
}
