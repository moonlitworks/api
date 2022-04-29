import { Handler } from "express"
import createLinkMongoRepository from "../../services/links/create-link-mongo-repository"
import getLinks from "../../services/links/get-links"
import db from "../../app/db"

export const getSocialLinks: Handler = async (req: any, res) => {
  const repository = createLinkMongoRepository(db.get())
  const links = await getLinks(repository)()

  res.status(200).json(links)
}
