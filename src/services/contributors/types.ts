import { Link } from "../links/types";

export type Contributor = {
  id: string
  active: boolean
  name: string
  contribution: string
  image?: string
  links: Omit<Link, "id" | "active">[]
}
