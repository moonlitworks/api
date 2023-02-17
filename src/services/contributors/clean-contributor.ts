import { Contributor } from "./types";

export default (contributor: Contributor) => {
  const { name, contribution, image, links } = contributor
  return { name, contribution, image, links }
}