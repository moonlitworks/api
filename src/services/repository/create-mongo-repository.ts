import { Mongoose, Schema, Model, isValidObjectId } from "mongoose"

type DocumentParser<T> = (...args: any[]) => T

type mongoModelOptions<T> = {
  documentParser?: (doc: any) => T
  collectionName: string
  schema: Schema
}

const identity = <T>(self: T) => self

const toJSON = <T>(doc: T) => JSON.parse(JSON.stringify(doc))

const createModelGetAll = <T>(model: Model<T>, parser: DocumentParser<T>) => async () => {
  const docs = await model.find()
  return docs.map(toJSON).map(parser)
}

const createModelGet = <T>(model: Model<T>, parser: DocumentParser<T>) => async (id: string) => {
  if (!isValidObjectId(id)) return null
  const doc = await model.findById(id)
  return doc ? parser(toJSON(doc)) : null
}

const createModelQuery = <T>(model: Model<T>, parser: DocumentParser<T>) => async (query: Partial<T>) => {
  const docs = await model.find(query)
  return docs.map(toJSON).map(parser)
}

export default <T>(db: Mongoose, options: mongoModelOptions<T>) => {
  const model = db.model<T>(options.collectionName, options.schema, options.collectionName)
  const docParser = options.documentParser ?? identity
  return {
    getAll: createModelGetAll<T>(model, docParser),
    get: createModelGet<T>(model, docParser),
    query: createModelQuery<T>(model, docParser),
  }
}
