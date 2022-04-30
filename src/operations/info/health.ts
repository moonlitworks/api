import { Handler } from "express";

export const health: Handler = (_, res) => res
  .status(200)
  .json({ status: "UP" })
