import express from "express"
import { initialize as initializeOpenapi } from "express-openapi"
import { readFileSync } from "fs"
import { resolve } from "path"
import { load } from "js-yaml"
import ensureDb from "../middlewares/ensure-db"
import * as operations from "../operations"

type OpenapiOptions = {
  apiDocFilePath: string
  apiDocUrl: string
}

const defaultOpenapiOptions: OpenapiOptions = {
  apiDocFilePath: resolve(__dirname, "..", "..", "lib", "docs", "openapi.yml"),
  apiDocUrl: "/oas3"
}

export default (
  openapiOptions: OpenapiOptions = defaultOpenapiOptions,
) => (
  app: express.Application,
) => {
  const apiDocContent = readFileSync(openapiOptions.apiDocFilePath, "utf8")
  const apiDocJson = load(apiDocContent) as any
  initializeOpenapi({
    app,
    apiDoc: {
      ...apiDocJson,
      "x-express-openapi-additional-middleware": [ensureDb],
    },
    docsPath: openapiOptions.apiDocUrl,
    operations,
  })
  return app
}