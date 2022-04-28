import { Handler } from "express";

export const getSocialLink: Handler = (_, res) => {
  res.set('content-type', 'text/plain');
  res.status(200).end("https://twitter.com/moonlitworks")
}
