import sinon from "sinon"
import { expect } from "chai"
import getProjectsByCategory from "../../../src/services/projects/get-projects-by-category"

describe("getProjectsByCategory", () => {
  let sandbox: sinon.SinonSandbox
  beforeEach(() => { sandbox = sinon.createSandbox() })
  afterEach(() => { sandbox.restore() })

  const testRepo = {
    query: async () => []
  }

  it("should call query of repository with category", async () => {
    const stub = sandbox.stub(testRepo, "query")
    await getProjectsByCategory(testRepo)("test-category")
    expect(stub.calledOnce).to.be.true
    expect(stub.firstCall?.firstArg).to.eql({ category: "test-category" })
  })
})
