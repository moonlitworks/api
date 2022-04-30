import { Handler } from "express"
import createProjectMongoRepository from "../../services/repository/create-project-mongo-repository"
import getProjectsByCategoryService from "../../services/projects/get-projects-by-category"
import db from "../../app/db"

export const getProjectsByCategory: Handler = async (req: any, res) => {
  const { category } = req.params
  const repository = createProjectMongoRepository(db.get())
  
  const foundProjects = await getProjectsByCategoryService(repository)(category)
  const mappedProjects = foundProjects
    .filter(project => project.active)
    .map(foundProject => {
      const { active, ...project } = foundProject
      return project
    })
  res.status(200).json(mappedProjects)
}
