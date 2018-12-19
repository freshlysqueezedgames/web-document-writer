declare module 'shortid' {
  declare function generate(): string
  declare function characters(str: string): void
  declare function isValid(value: string): boolean
  declare function worker(integer: number): void
  declare function seed(integer: number): void
}

