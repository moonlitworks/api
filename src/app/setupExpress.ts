import express from "express"
import cors from "cors"
import errorHandler from "../middlewares/error-handler"

export default (): express.Application => {
  const app = express()
  app.use(cors())
  app.use(express.json())
  app.use(express.urlencoded({ extended: true }))
  app.disable('x-powered-by')
  app.use(errorHandler)
  return app
}
