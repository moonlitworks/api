import { Handler } from "express"
import createLinkMongoRepository from "../../services/repository/create-link-mongo-repository"
import getLinks from "../../services/links/get-links"
import cleanLink from "../../services/links/clean-link"
import db from "../../app/db"

export const getSocialLinks: Handler = async (req: any, res) => {
  const repository = createLinkMongoRepository(db.get())
  const links = await getLinks(repository)()
  const activeLinks = links
    .filter(l => l.active)
    .map(cleanLink)

  res.status(200).json(activeLinks)
}
