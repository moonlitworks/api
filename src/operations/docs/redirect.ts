import { Handler } from "express";

export const docsRedirect: Handler = (_, res) => res
  .set("location", "/docs")
  .status(301)
  .end()
