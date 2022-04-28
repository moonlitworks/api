import { Handler } from "express";

export const getSocialLinks: Handler = (_, res) => {
  res.status(200).json([
    { label: "twitter", url: "https://twitter.com/moonlitworks" }
  ])
}
