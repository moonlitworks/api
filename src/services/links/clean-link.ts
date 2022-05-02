import { Link } from "./types";

export default (link: Link) => {
  const { label, url } = link
  return { label, url }
}