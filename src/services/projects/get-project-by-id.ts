import { Retrievable } from "../repository/types"
import { Project } from "./types"

export default (repository: Retrievable<Project>) => async (id: string) => repository.get(id)