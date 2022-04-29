import sinon from "sinon"
import { expect } from "chai"
import getLinks from "../../../src/services/links/get-links"

describe("getLinks", () => {
  let sandbox: sinon.SinonSandbox
  beforeEach(() => { sandbox = sinon.createSandbox() })
  afterEach(() => { sandbox.restore() })

  const testRepo = {
    getAll: async () => []
  }

  it("should call getAll of repository", async () => {
    const stub = sandbox.stub(testRepo, "getAll")
    await getLinks(testRepo)()
    expect(stub.calledOnce).to.be.true
  })
})
