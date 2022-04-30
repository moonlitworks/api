import sinon from "sinon"
import { expect } from "chai"
import getProjects from "../../../src/services/projects/get-projects"

describe("getProjects", () => {
  let sandbox: sinon.SinonSandbox
  beforeEach(() => { sandbox = sinon.createSandbox() })
  afterEach(() => { sandbox.restore() })

  const testRepo = {
    getAll: async () => []
  }

  it("should call getAll of repository", async () => {
    const stub = sandbox.stub(testRepo, "getAll")
    await getProjects(testRepo)()
    expect(stub.calledOnce).to.be.true
  })
})
