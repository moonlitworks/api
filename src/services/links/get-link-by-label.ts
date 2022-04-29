import { Queryable } from "../repository/types"
import { Link } from "./types"

export default (repository: Queryable<Link>) => async (label: string) => repository.query({ label })