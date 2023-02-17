import sinon from "sinon"
import { expect } from "chai"
import createContributorMongoRepository, { toContributor } from "../../../src/services/repository/create-contributor-mongo-repository"
import * as createMongoRepository from "../../../src/services/repository/create-mongo-repository"

describe("createLinkMongoRepository", () => {
  let sandbox: sinon.SinonSandbox
  beforeEach(() => { sandbox = sinon.createSandbox() })
  afterEach(() => { sandbox.restore() })

  it("should call create mongo repository", () => {
    const stub = sandbox.stub(createMongoRepository, "default")
    createContributorMongoRepository({ db: true } as any)
    expect(stub.calledOnce).to.be.true
    expect(stub.firstCall?.firstArg).to.eql({ db: true })
  })
})

describe("toContributor", () => {
  it("should parse contributor doc", () => {
    const doc = {
      _id: "test-id",
      active: true,
      name: "test-name",
      image: "test-image",
      contribution: "test-contribution",
      links: [{
        label: "test-link-label",
        url: "test-link-url",
      }]
    }
    const expected = {
      id: "test-id",
      active: true,
      name: "test-name",
      image: "test-image",
      contribution: "test-contribution",
      links: [{
        label: "test-link-label",
        url: "test-link-url",
      }]
    }
    expect(toContributor(doc as any)).to.eql(expected)
  })
})
