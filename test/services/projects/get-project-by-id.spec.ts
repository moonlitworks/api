import sinon from "sinon"
import { expect } from "chai"
import getProjectById from "../../../src/services/projects/get-project-by-id"

describe("getProjectById", () => {
  let sandbox: sinon.SinonSandbox
  beforeEach(() => { sandbox = sinon.createSandbox() })
  afterEach(() => { sandbox.restore() })

  const testRepo = {
    get: async () => {}
  }

  it("should call get of repository with id", async () => {
    const stub = sandbox.stub(testRepo, "get")
    await getProjectById(testRepo as any)("test-id")
    expect(stub.calledOnce).to.be.true
    expect(stub.firstCall?.firstArg).to.eql("test-id")
  })
})
