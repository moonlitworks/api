import sinon from "sinon"
import { expect } from "chai"
import { getSocialLinks } from "../../../src/operations/links/get-social-links"
import * as createLinkMongoRepository from "../../../src/services/repository/create-link-mongo-repository"

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
    getAll: async () => [],
    get: async () => ({} as any),
    query: async () => []
  }

  it("should return 200 status code and call res.json", async () => {
    sandbox.stub(createLinkMongoRepository, "default").returns(sampleLinkRepository)
    sandbox.stub(sampleLinkRepository, "getAll").returns([] as any)
    const statusStub = sandbox.stub(res, "status").returns(res)
    const jsonStub = sandbox.stub(res, "json")
    await getSocialLinks({} as any, res as any, {} as any)
    expect(statusStub.firstCall?.firstArg).to.eql(200)
    expect(jsonStub.calledOnce).to.be.true
  })

  it("should filter inactive links", async () => {
    sandbox.stub(createLinkMongoRepository, "default").returns(sampleLinkRepository)
    sandbox.stub(sampleLinkRepository, "getAll").returns([
      {
        id: "test-id-1",
        active: false,
        label: "test-label-1",
        url: "test-url-1"
      },
      {
        id: "test-id-2",
        active: true,
        label: "test-label-2",
        url: "test-url-2"
      },
    ] as any)
    const jsonStub = sandbox.stub(res, "json")
    await getSocialLinks({} as any, res as any, {} as any)
    expect(jsonStub.firstCall?.firstArg).to.eql([
      {
        label: "test-label-2",
        url: "test-url-2"
      }
    ])
  })
})
