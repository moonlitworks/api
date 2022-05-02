export type Nil = undefined | null

export default (value: any): value is Nil =>
  (value === null || value === undefined)