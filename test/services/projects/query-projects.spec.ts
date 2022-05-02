import sinon from "sinon"
import { expect } from "chai"
import queryProjects from "../../../src/services/projects/query-projects"

describe("getProjects", () => {
  let sandbox: sinon.SinonSandbox
  beforeEach(() => { sandbox = sinon.createSandbox() })
  afterEach(() => { sandbox.restore() })

  const testRepo = {
    query: async () => []
  }

  it("should call query of repository", async () => {
    const stub = sandbox.stub(testRepo, "query")
    await queryProjects(testRepo)({})
    expect(stub.calledOnce).to.be.true
  })
})
