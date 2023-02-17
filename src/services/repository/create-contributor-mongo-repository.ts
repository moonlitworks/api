import { Mongoose, Schema, Document } from "mongoose"
import createMongoRepository from "./create-mongo-repository"
import { Contributor } from "../contributors/types"
import omitNilProperties from "../common/omit-nil-properties";

type ContributorDocument = Document & Contributor

const ContributorLinkSchema = new Schema({
  label: String,
  url: String
})

const ContributorSchema = new Schema({
	name: {
		type: String,
		collation: { locale: 'en', strength: 2 },
		index: { unique: true, sparse: true }
	},
	contribution: String,
	image: String,
	links: [ContributorLinkSchema],
}, {
	timestamps: true,
	versionKey: false,
	strict: false
});

export const toContributor = (
	document: ContributorDocument
): Contributor => omitNilProperties({
	id: document._id.toString(),
	active: document.active,
	name: document.name,
	contribution: document.contribution,
	image: document.image,
	links: document.links,
})

export default (db: Mongoose) => {
  const options = {
    collectionName: "contributors",
    schema: ContributorSchema,
    documentParser: toContributor
  }
  return createMongoRepository<Contributor>(db, options)
}
