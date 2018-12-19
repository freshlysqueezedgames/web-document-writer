declare module 'immutable' {
  declare export class Collection<T> {
    update <U>(key1: any, callback: (value: U) => U): this
  }
  declare export class Record <T> {
    static (): typeof RecordInstance,
    static (value: T): typeof RecordInstance
  }
  declare export class RecordInstance <T> extends Collection<T> {
    static (value?: T): RecordInstance<T>,

    get <K, V>(key: K): V, 
    set (key: any, value: any): RecordInstance<T>,
    toJS (): {[$Keys<T>]: any}

  }
  declare export class List<T> extends Collection<T[]> {
    static (): List<any>,
    static <T> (params: T) : List<T>,
    static <T> (collection: Iterable<T>): List<T>,

    push (value: T) : this,
    toJS (): Array<T>,
    set (key: number, value: T): List<T>,
    findKey (predicate: (value: T, key: number, iter: this) => boolean, context?: any): number | typeof undefined
  }
}