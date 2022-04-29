import { Mongoose, Schema, Document } from "mongoose"
import createMongoRepository from "../repository/create-mongo-repository"
import { Link } from "./types"

const LinkSchema = new Schema({
	label: {
		type: String,
		collation: { locale: 'en', strength: 2 },
		index: { unique: true, sparse: true }
	},
	url: String,
	active: {
		type: Boolean,
		default: true
	}
}, {
	timestamps: true,
	versionKey: false,
	strict: false
});

type LinkDocument = Document & Link

export const toSocialLink = (
	document: LinkDocument
): Link => ({
	id: document._id,
	active: document.active,
	label: document.label,
	url: document.url
})

export default (db: Mongoose) => {
  const options = {
    collectionName: "links",
    schema: LinkSchema,
    documentParser: toSocialLink
  }
  return createMongoRepository<Link>(db, options)
}
