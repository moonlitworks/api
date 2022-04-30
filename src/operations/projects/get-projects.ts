import { Handler } from "express"
import createProjectMongoRepository from "../../services/repository/create-project-mongo-repository"
import getProjectsService from "../../services/projects/get-projects"
import db from "../../app/db"

export const getProjects: Handler = async (req: any, res) => {
  const repository = createProjectMongoRepository(db.get())
  
  const foundProjects = await getProjectsService(repository)()
  const mappedProjects = foundProjects
    .filter(project => project.active)
    .map(foundProject => {
      const { active, ...project } = foundProject
      return project
    })
  res.status(200).json(mappedProjects)
}
