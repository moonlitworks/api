import sinon from "sinon"
import { expect } from "chai"
import getContributors from "../../../src/services/contributors/get-contributors"

describe("getContributors", () => {
  let sandbox: sinon.SinonSandbox
  beforeEach(() => { sandbox = sinon.createSandbox() })
  afterEach(() => { sandbox.restore() })

  const testRepo = {
    getAll: async () => []
  }

  it("should call getAll of repository", async () => {
    const stub = sandbox.stub(testRepo, "getAll")
    await getContributors(testRepo)()
    expect(stub.calledOnce).to.be.true
  })
})
