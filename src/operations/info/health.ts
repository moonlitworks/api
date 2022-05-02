import { Handler } from "express";
import db from "../../app/db";

export const health: Handler = (_, res) => {
  const isDbConnected = db.isConnected()
  if (isDbConnected) {
    return res.status(200).json({ status: "UP" })
  } else {
    return res.status(503).json({ status: "DOWN" })
  }
}
