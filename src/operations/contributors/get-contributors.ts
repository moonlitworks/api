import { Handler } from "express"
import createContributorMongoRepository from "../../services/repository/create-contributor-mongo-repository"
import queryContributorService from "../../services/contributors/get-contributors"
import cleanContributor from "../../services/contributors/clean-contributor"
import db from "../../app/db"

export const getContributors: Handler = async (req: any, res) => {
  const repository = createContributorMongoRepository(db.get())
  const foundContributors = await queryContributorService(repository)()
  const mappedContributors = foundContributors
    .filter(contributor => contributor.active)
    .map(cleanContributor)
  res.status(200).json(mappedContributors)
}
