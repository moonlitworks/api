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
    const SAMPLE_ID = "5e63c3a5e4232e4cd0274ac2"
    const result = await repository.get(SAMPLE_ID)
    expect(result).to.eql(1)
    expect(findStub.firstCall?.firstArg).to.eql(SAMPLE_ID)
  })

  it("should return null for empty get result", async () => {
    const findStub = sandbox.stub(testModel, "findById").returns(null as any)
    const repository = createMongoRepository(testDb as any, {
      ...testOptions,
      documentParser: (s: string): number => +s
    } as any)
    const SAMPLE_ID = "5e63c3a5e4232e4cd0274ac2"
    const result = await repository.get(SAMPLE_ID)
    expect(result).to.eql(null)
    expect(findStub.firstCall?.firstArg).to.eql(SAMPLE_ID)
  })

  it("should return null for invalid id", async () => {
    const findStub = sandbox.stub(testModel, "findById").returns("1" as any)
    const repository = createMongoRepository(testDb as any, {
      ...testOptions,
      documentParser: (s: string): number => +s
    } as any)
    const SAMPLE_ID = "abc123456"
    const result = await repository.get(SAMPLE_ID)
    expect(result).to.eql(null)
    expect(findStub.calledOnce).to.be.false
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
