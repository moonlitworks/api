import { Mongoose, Schema, Document } from "mongoose"
import createMongoRepository from "./create-mongo-repository"
import { Project } from "../projects/types"
import omitNilProperties from "../common/omit-nil-properties"

type ProjectDocument = Document & Project

const ProjectLinkSchema = new Schema({
  label: String,
  url: String
})

const ProjectMemberSchema = new Schema({
  name: String,
  asset: String,
  link: String,
  image: String,
})

const ProjectSchema = new Schema({
	active: {
		type: Boolean,
		default: true
	},
  title: String,
  category: String,
  series: String,
  links: [ProjectLinkSchema],
  tags: [String],
  members: [ProjectMemberSchema]
}, {
	timestamps: true,
	versionKey: false,
	strict: false
});

export const toProject = (
	document: ProjectDocument
) => omitNilProperties({
	id: document._id.toString(),
	active: document.active,
  title: document.title,
  category: document.category,
  series: document.series,
  releaseDate: document.releaseDate,
  capsule: document.capsule,
  links: document.links?.map(omitNilProperties) ?? [],
  tags: document.tags ?? [],
  members: document.members ?? []
})

export default (db: Mongoose) => {
  const options = {
    collectionName: "projects",
    schema: ProjectSchema,
    documentParser: toProject
  }
  return createMongoRepository<Project>(db, options)
}
