import { Handler } from "express";

export const docsRedirect: Handler = (_, res) => {
  res.set("location", "/docs")
	res.status(301).end()
}
