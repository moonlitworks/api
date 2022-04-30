import express from "express"
import ensureDb from "../middlewares/ensure-db"
import errorHandler from "../middlewares/error-handler"

export default (): express.Application => {
  const app = express()
  app.use(express.json())
  app.use(express.urlencoded({ extended: true }))
  app.disable('x-powered-by')
  app.use(ensureDb)
  app.use(errorHandler)
  return app
}
