import sinon from "sinon"
import { expect } from "chai"
import { getSocialLinks } from "../../../src/operations/links/get-social-links"
import db from "../../../src/app/db"
import * as createLinkMongoRepository from "../../../src/services/links/create-link-mongo-repository"

describe("getSocialLinks", () => {
  let sandbox: sinon.SinonSandbox
  beforeEach(() => { sandbox = sinon.createSandbox() })
  afterEach(() => { sandbox.restore() })

  const res = {
    set: () => {},
    status: () => res,
    end: () => {},
    json: () => {}
  }

  const sampleLinkRepository = {
    getAll: async () => [{
      id: "test-id",
      label: "test-label",
      url: "test-url",
      active: true
    }],
    get: async () => ({
      id: "test-id",
      label: "test-label",
      url: "test-url",
      active: true
    }),
    query: async () => [{
      id: "test-id",
      label: "test-label",
      url: "test-url",
      active: true
    }]
  }

  it("should return 200 status code", async () => {
    sandbox.stub(db, "isConnected").returns(true)
    sandbox.stub(createLinkMongoRepository, "default").returns(sampleLinkRepository)
    const statusStub = sandbox.stub(res, "status").returns(res)

    await getSocialLinks({} as any, res as any, {} as any)

    expect(statusStub.firstCall?.firstArg).to.eql(200)
  })

  it("should call json", async () => {
    sandbox.stub(db, "isConnected").returns(true)
    sandbox.stub(createLinkMongoRepository, "default").returns(sampleLinkRepository)
    const jsonStub = sandbox.stub(res, "json")

    await getSocialLinks({} as any, res as any, {} as any)

    expect(jsonStub.calledOnce).to.be.true
  })
})
