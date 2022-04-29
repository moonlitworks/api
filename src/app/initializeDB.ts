import express from "express"
import db from "./db"

export default (
  dbString: string | undefined
) => async (
  app: express.Application
) => {
  await db.connect(dbString).catch(console.error)
  return app
}