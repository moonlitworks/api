import db from "../app/db"

export default (req: any, res: any, next: any) => {
  const dbConnected = db.isConnected()
  const skipDbCheck = req?.operationDoc?.["x-skip-db-check"]
  if (!dbConnected && !skipDbCheck) return res.status(503).end()
  next()
}