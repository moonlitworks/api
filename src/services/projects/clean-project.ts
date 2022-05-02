import { Project } from "./types";

export default (project: Project) => {
  const { active, ...restProperties } = project
  return restProperties
}