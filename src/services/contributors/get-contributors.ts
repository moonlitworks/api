import { Listable } from "../repository/types"
import { Contributor } from "./types"

export default (repository: Listable<Contributor>) => async () => repository.getAll()