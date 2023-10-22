export interface Rule {
  pattern: RegExp
  doing: string
  map?: Map<string, string>
  hideTitle?: boolean
  extra?: Record<string, any>
  program?: string
}

export function createRules<T extends string>(
  rules: Array<
    Omit<Rule, 'pattern' | 'map'> & {
      pattern: T[]
      map?: Partial<Record<T, string>>
    }
  >,
) {
  return rules.map(({ pattern, map, ...rest }) => {
    const base: Rule = {
      pattern: new RegExp(pattern.join('|'), 'i'),
      ...rest,
    }
    if (map) {
      base.map = new Map(Object.entries(map))
    }

    return base
  })
}
