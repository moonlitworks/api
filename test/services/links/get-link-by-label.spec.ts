import sinon from "sinon"
import { expect } from "chai"
import getLinkByLabel from "../../../src/services/links/get-link-by-label"

describe("getLinkByLabel", () => {
  let sandbox: sinon.SinonSandbox
  beforeEach(() => { sandbox = sinon.createSandbox() })
  afterEach(() => { sandbox.restore() })

  const testRepo = {
    query: async () => []
  }

  it("should call getAll of repository", async () => {
    const stub = sandbox.stub(testRepo, "query")
    await getLinkByLabel(testRepo)("test-label")
    expect(stub.calledOnce).to.be.true
    expect(stub.firstCall?.firstArg).to.eql({ label: "test-label" })
  })
})
