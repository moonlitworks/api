import express from "express"
import { initialize as initializeOpenapi } from "express-openapi"
import * as operations from "../operations"

type OpenapiOptions = {
  apiDocFilePath: string
  apiDocUrl: string
}

const defaultOpenapiOptions: OpenapiOptions = {
  apiDocFilePath: "lib/docs/openapi.yml",
  apiDocUrl: "/oas3"
}

export default (
  openapiOptions: OpenapiOptions = defaultOpenapiOptions,
) => (
  app: express.Application,
) => {
  initializeOpenapi({
    app,
    apiDoc: openapiOptions.apiDocFilePath,
    docsPath: openapiOptions.apiDocUrl,
    operations,
  })
  return app
}