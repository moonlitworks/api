import sinon from "sinon"
import { expect } from "chai"
import { getProjectById } from "../../../src/operations/projects/get-project-by-id"
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
    sandbox.stub(sampleProjectRepository, "get").returns({ active: true } as any)
    const statusStub = sandbox.stub(res, "status").returns(res)
    const jsonStub = sandbox.stub(res, "json")
    const req = { params: { id: "test-id"} }
    await getProjectById(req as any, res as any, {} as any)
    expect(statusStub.firstCall?.firstArg).to.eql(200)
    expect(jsonStub.calledOnce).to.be.true
  })

  it("should return 404 status code and call res.json", async () => {
    sandbox.stub(createProjectMongoRepository, "default").returns(sampleProjectRepository)
    sandbox.stub(sampleProjectRepository, "get").returns(null as any)
    const statusStub = sandbox.stub(res, "status").returns(res)
    const req = { params: { id: "test-id"} }
    await getProjectById(req as any, res as any, {} as any)
    expect(statusStub.firstCall?.firstArg).to.eql(404)
  })

  it("should return active project", async () => {
    sandbox.stub(createProjectMongoRepository, "default").returns(sampleProjectRepository)
    sandbox.stub(sampleProjectRepository, "get").returns({
      id: "test-id-1",
      active: true,
      title: "test-title-1",
      category: "test-category-1",
    } as any)
    const jsonStub = sandbox.stub(res, "json")
    const req = { params: { id: "test-id"} }
    await getProjectById(req as any, res as any, {} as any)
    expect(jsonStub.firstCall?.firstArg).to.eql({
      id: "test-id-1",
      title: "test-title-1",
      category: "test-category-1",
    })
  })

  it("should not return inactive project", async () => {
    sandbox.stub(createProjectMongoRepository, "default").returns(sampleProjectRepository)
    sandbox.stub(sampleProjectRepository, "get").returns({
      id: "test-id-1",
      active: false,
      title: "test-title-1",
      category: "test-category-1",
    } as any)
    const statusStub = sandbox.stub(res, "status").returns(res)
    const req = { params: { id: "test-id"} }
    await getProjectById(req as any, res as any, {} as any)
    expect(statusStub.firstCall?.firstArg).to.eql(404)
  })
})
