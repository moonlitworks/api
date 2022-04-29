import db from "../app/db"

export default (req: any, res: any, next: any) => {
  if (!db.isConnected()) return res.status(503).end()
  next()
}