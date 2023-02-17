import sinon from "sinon"
import { expect } from "chai"
import { getContributors } from "../../../src/operations/contributors/get-contributors"
import * as createContributorMongoRepository from "../../../src/services/repository/create-contributor-mongo-repository"

describe("getContributors", () => {
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
    sandbox.stub(createContributorMongoRepository, "default").returns(sampleLinkRepository)
    sandbox.stub(sampleLinkRepository, "getAll").returns([] as any)
    const statusStub = sandbox.stub(res, "status").returns(res)
    const jsonStub = sandbox.stub(res, "json")
    await getContributors({} as any, res as any, {} as any)
    expect(statusStub.firstCall?.firstArg).to.eql(200)
    expect(jsonStub.calledOnce).to.be.true
  })

  it("should filter inactive contributors", async () => {
    sandbox.stub(createContributorMongoRepository, "default").returns(sampleLinkRepository)
    sandbox.stub(sampleLinkRepository, "getAll").returns([
      {
        id: "test-id-1",
        active: false,
        name: "test-name-1",
        image: "test-image-1",
        contribution: "test-contribution-1",
        links: [{
          label: "test-link-label-1",
          url: "test-link-url-1",
        }],
      },
      {
        id: "test-id-2",
        active: true,
        name: "test-name-2",
        image: "test-image-2",
        contribution: "test-contribution-2",
        links: [{
          label: "test-link-label-2",
          url: "test-link-url-2",
        }],
      },
    ] as any)
    const jsonStub = sandbox.stub(res, "json")
    await getContributors({} as any, res as any, {} as any)
    expect(jsonStub.firstCall?.firstArg).to.eql([
      {
        name: "test-name-2",
        image: "test-image-2",
        contribution: "test-contribution-2",
        links: [{
          label: "test-link-label-2",
          url: "test-link-url-2",
        }],
      }
    ])
  })
})
