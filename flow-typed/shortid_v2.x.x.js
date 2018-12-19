declare module 'shortid' {
  declare export class shortid {
    static generate(): string,
    static characters(str: string): void,
    static isValid(value: string): boolean,
    static worker(integer: number): void,
    static seed(integer: number): void
  }
}