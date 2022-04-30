import { Mongoose, Schema, Document } from "mongoose"
import createMongoRepository from "./create-mongo-repository"
import { Project } from "../projects/types"

type ProjectDocument = Document & Project

const ProjectLinksSchema = new Schema({
  label: String,
  url: String
})

const ProjectMemberSchema = new Schema({
  name: String,
  asset: String,
  link: String
})

const ProjectSchema = new Schema({
	active: {
		type: Boolean,
		default: true
	},
  title: String,
  category: String,
  series: String,
  links: [ProjectLinksSchema],
  tags: [String],
  members: [ProjectMemberSchema]
}, {
	timestamps: true,
	versionKey: false,
	strict: false
});

export const toProject = (
	document: ProjectDocument
): Project => ({
	id: document._id,
	active: document.active,
  title: document.title,
  category: document.category,
  series: document.series ?? null,
  links: document.links ?? [],
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
