import { Link } from "../links/types";

type TeamMember = {
  name: string
  asset: string
  link?: string
  image?: string
}

export type Project = {
  id: string
  active: boolean
  title: string
  category: string
  series?: string
  releaseDate?: string
  capsule?: string
  links: Omit<Link, "id">[]
  tags: string[]
  members: TeamMember[]
}
