import sinon from "sinon"
import { expect } from "chai"
import createMongoRepository from "../../../src/services/repository/create-mongo-repository"

describe("createMongoRepository", () => {
  let sandbox: sinon.SinonSandbox
  beforeEach(() => { sandbox = sinon.createSandbox() })
  afterEach(() => { sandbox.restore() })

  const testModel = {
    find: () => [],
    findById: () => {}
  }

  const testDb = {
    model: () => testModel
  }

  const testOptions = {
    collectionName: "test-collection-name",
    schema: {},
  }

  it("should return a repository", () => {
    const repository = createMongoRepository(testDb as any, testOptions as any)
    expect(repository).to.haveOwnProperty("getAll")
    expect(repository).to.haveOwnProperty("get")
    expect(repository).to.haveOwnProperty("query")
  })

  it("should get all", async () => {
    sandbox.stub(testModel, "find").returns(["1", "2", "3"] as any)
    const repository = createMongoRepository(testDb as any, testOptions as any)
    const result = await repository.getAll()
    expect(result).to.eql(["1", "2", "3"])
  })

  it("should get and parse", async () => {
    const findStub = sandbox.stub(testModel, "findById").returns("1" as any)
    const repository = createMongoRepository(testDb as any, {
      ...testOptions,
      documentParser: (s: string): number => +s
    } as any)
    const result = await repository.get("test")
    expect(result).to.eql(1)
    expect(findStub.firstCall?.firstArg).to.eql("test")
  })

  it("should return null for empty get result", async () => {
    const findStub = sandbox.stub(testModel, "findById").returns(null as any)
    const repository = createMongoRepository(testDb as any, {
      ...testOptions,
      documentParser: (s: string): number => +s
    } as any)
    const result = await repository.get("test")
    expect(result).to.eql(null)
    expect(findStub.firstCall?.firstArg).to.eql("test")
  })

  it("should query and parse", async () => {
    const findStub = sandbox.stub(testModel, "find").returns(["1", "2"] as any)
    const repository = createMongoRepository(testDb as any, {
      ...testOptions,
      documentParser: (s: string): number => +s
    } as any)
    const result = await repository.query({q: "test"})
    expect(result).to.eql([1, 2])
    expect(findStub.firstCall?.firstArg).to.eql({q: "test"})
  })
})
