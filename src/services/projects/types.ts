import { Link } from "../links/types";

type TeamMember = {
  name: string
  asset: string
  link: string
}

export type Project = {
  id: string
  active: boolean
  title: string
  category: string
  series: string
  links: Omit<Link, "id">[]
  tags: string[]
  members: TeamMember[]
}
