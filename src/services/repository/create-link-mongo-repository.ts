import { Mongoose, Schema, Document } from "mongoose"
import createMongoRepository from "./create-mongo-repository"
import { Link } from "../links/types"
import omitNilProperties from "../common/omit-nil-properties";

type LinkDocument = Document & Link

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

export const toSocialLink = (
	document: LinkDocument
): Link => omitNilProperties({
	id: document._id.toString(),
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
