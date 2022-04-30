import { Queryable } from "../repository/types"
import { Project } from "./types"

export default (repository: Queryable<Project>) => async (category: string) => repository.query({ category })