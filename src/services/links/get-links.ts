import { Listable } from "../repository/types"
import { Link } from "./types"

export default (repository: Listable<Link>) => async () => repository.getAll()