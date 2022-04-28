import express from "express"

export default (): express.Application => {
  const app = express()
  app.use(express.json())
  app.use(express.urlencoded({ extended: true }))
  app.disable('x-powered-by')
  return app
}
