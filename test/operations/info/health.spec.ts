import sinon from "sinon"
import { expect } from "chai"
import { health } from "../../../src/operations/info/health"

describe("health", () => {
  let sandbox: sinon.SinonSandbox
  beforeEach(() => { sandbox = sinon.createSandbox() })
  afterEach(() => { sandbox.restore() })

  it("should return 200 status code with status UP", () => {
    const res = {
      set: () => {},
      status: () => res,
      end: () => {},
      json: () => {}
    }
    const statusStub = sandbox.stub(res, "status").returns(res)
    const jsonStub = sandbox.stub(res, "json")
    health({} as any, res as any, {} as any)
    expect(statusStub.firstCall?.firstArg).to.eql(200)
    expect(jsonStub.firstCall?.firstArg).to.eql({
      status: "UP"
    })
  })
})
