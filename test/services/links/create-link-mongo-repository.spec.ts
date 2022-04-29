import sinon from "sinon"
import { expect } from "chai"
import createLinkMongoRepository, { toSocialLink } from "../../../src/services/links/create-link-mongo-repository"
import * as createMongoRepository from "../../../src/services/repository/create-mongo-repository"

describe("createLinkMongoRepository", () => {
  let sandbox: sinon.SinonSandbox
  beforeEach(() => { sandbox = sinon.createSandbox() })
  afterEach(() => { sandbox.restore() })

  it("should call create mongo repository", () => {
    const stub = sandbox.stub(createMongoRepository, "default")
    createLinkMongoRepository({ db: true } as any)
    expect(stub.calledOnce).to.be.true
    expect(stub.firstCall?.firstArg).to.eql({ db: true })
  })
})

describe("toSocialLink", () => {
  it("should parse link doc", () => {
    const doc = {
      _id: "test-id",
      active: true,
      label: "test-label",
      url: "test-url"
    }
    const expected = {
      id: "test-id",
      active: true,
      label: "test-label",
      url: "test-url"
    }
    expect(toSocialLink(doc as any)).to.eql(expected)
  })
})
