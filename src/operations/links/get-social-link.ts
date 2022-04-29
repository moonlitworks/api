import { Handler } from "express"
import createLinkMongoRepository from "../../services/links/create-link-mongo-repository"
import getLinkByLabel from "../../services/links/get-link-by-label"
import db from "../../app/db"

export const getSocialLink: Handler = async (req: any, res) => {
  const { label } = req.params
  const repository = createLinkMongoRepository(db.get())
  const foundLinks = await getLinkByLabel(repository)(label)
  const firstLink = foundLinks[0]

  if (!firstLink) return res.status(404).end(`Link for ${ label } not found`)

  res.set('content-type', 'text/plain')
  res.status(200).end(firstLink.url)
}
