import { Listable } from "../repository/types"
import { Project } from "./types"

export default (repository: Listable<Project>) => async () => repository.getAll()