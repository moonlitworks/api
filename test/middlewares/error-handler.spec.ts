import sinon from "sinon"
import { expect } from "chai"
import errorHandler from "../../src/middlewares/error-handler"

describe("errorHandler", () => {
  let sandbox: sinon.SinonSandbox
  beforeEach(() => { sandbox = sinon.createSandbox() })
  afterEach(() => { sandbox.restore() })

  const res = {
    set: () => {},
    status: () => res,
    end: () => {},
    json: () => {}
  }

  it("should return status 500", () => {
    const statusStub = sandbox.stub(res, "status").returns(res)
    errorHandler({} as any, {} as any, res as any, {} as any)
    expect(statusStub.firstCall?.firstArg).to.eql(500)
  })
})
