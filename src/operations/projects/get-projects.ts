import { Handler } from "express"
import createProjectMongoRepository from "../../services/repository/create-project-mongo-repository"
import queryProjectsService from "../../services/projects/query-projects"
import omitNilProperties from "../../services/common/omit-nil-properties"
import cleanProject from "../../services/projects/clean-project"
import db from "../../app/db"

export const getProjects: Handler = async (req: any, res) => {
  const { category } = req.query ?? {}
  const projectQuery = omitNilProperties({ category })

  const repository = createProjectMongoRepository(db.get())
  
  const foundProjects = await queryProjectsService(repository)(projectQuery)
  const mappedProjects = foundProjects
    .filter(project => project.active)
    .map(cleanProject)
  res.status(200).json(mappedProjects)
}
