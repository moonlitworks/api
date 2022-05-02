import { Handler } from "express"
import createProjectMongoRepository from "../../services/repository/create-project-mongo-repository"
import getProjectByIdService from "../../services/projects/get-project-by-id"
import cleanProject from "../../services/projects/clean-project"
import db from "../../app/db"

export const getProjectById: Handler = async (req: any, res) => {
  const { id } = req.params
  const repository = createProjectMongoRepository(db.get())
  
  const project = await getProjectByIdService(repository)(id)
  if (!project || !project.active) return res.status(404).end(`Project ${ id } not found`)

  res.status(200).json(cleanProject(project))
}
