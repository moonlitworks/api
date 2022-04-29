export type hasId = {
  id: string
}

export type Promisable<T> = T | Promise<T>

export type Listable<T> = {
  getAll: () => Promisable<T[]>
}

export type Retrievable<T extends hasId> = {
  get: (id: T["id"]) => Promisable<T>
}

export type Creatable<T extends hasId> = {
  create: (body: Partial<T>) => T
}

export type Updatable<T extends hasId, UpdateQuery = Partial<T>> = {
  update: (id: T["id"], body: Partial<T> | UpdateQuery) => Promisable<T | boolean>
}

export type Deletable<T extends hasId> = {
  delete: (id: T["id"]) => Promisable<T | boolean>
}

export type Queryable<T, Query = Partial<T>> = {
  query: (query: Query) => Promisable<T[]>
}

export type QueryUpdatable<T, Query, UpdateQuery = Partial<T>> = {
  updateByQuery: (query: Query, body: Partial<T> | UpdateQuery) => Promisable<T[]>
}

export type QueryDeletable<T, Query> = {
  deleteByQuery: (query: Query) => Promisable<T[]>
}
