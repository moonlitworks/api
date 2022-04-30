import sinon from "sinon"
import { expect } from "chai"
import { getProjects } from "../../../src/operations/projects/get-projects"
import * as createProjectMongoRepository from "../../../src/services/repository/create-project-mongo-repository"

describe("getProjects", () => {
  let sandbox: sinon.SinonSandbox
  beforeEach(() => { sandbox = sinon.createSandbox() })
  afterEach(() => { sandbox.restore() })

  const res = {
    set: () => {},
    status: () => res,
    end: () => {},
    json: () => {}
  }

  const sampleProjectRepository = {
    getAll: async () => [],
    get: async () => ({} as any),
    query: async () => []
  }

  it("should return 200 status code and call res.json", async () => {
    sandbox.stub(createProjectMongoRepository, "default").returns(sampleProjectRepository)
    sandbox.stub(sampleProjectRepository, "getAll").returns([] as any)
    const statusStub = sandbox.stub(res, "status").returns(res)
    const jsonStub = sandbox.stub(res, "json")
    await getProjects({} as any, res as any, {} as any)
    expect(statusStub.firstCall?.firstArg).to.eql(200)
    expect(jsonStub.calledOnce).to.be.true
  })

  it("should filter inactive projects", async () => {
    sandbox.stub(createProjectMongoRepository, "default").returns(sampleProjectRepository)
    sandbox.stub(sampleProjectRepository, "getAll").returns([
      {
        id: "test-id-1",
        active: false,
        title: "test-title-1",
        category: "test-category-1",
      },
      {
        id: "test-id-2",
        active: true,
        title: "test-title-2",
        category: "test-category-2",
      },
    ] as any)
    const jsonStub = sandbox.stub(res, "json")
    await getProjects({} as any, res as any, {} as any)
    expect(jsonStub.firstCall?.firstArg).to.eql([
      {
        id: "test-id-2",
        title: "test-title-2",
        category: "test-category-2",
      }
    ])
  })
})
