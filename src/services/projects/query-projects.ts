import { Queryable } from "../repository/types"
import { Project } from "./types"

export default (repository: Queryable<Project>) => async (query: Partial<Project>) => repository.query(query)