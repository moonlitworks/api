import express from "express"
import cors from "cors"
import errorHandler from "../middlewares/error-handler"
import path from "path"

export default (): express.Application => {
  const app = express()
  app.use(cors())
  app.use(express.json())
  app.use(express.urlencoded({ extended: true }))
  app.use(express.static(path.join(__dirname, "..", "..", "public")))
  app.disable('x-powered-by')
  app.use(errorHandler)
  return app
}
