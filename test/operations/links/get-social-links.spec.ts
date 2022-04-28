import sinon from "sinon"
import { expect } from "chai"
import { getSocialLinks } from "../../../src/operations/links/get-social-links"

describe("getSocialLinks", () => {
  let sandbox: sinon.SinonSandbox
  beforeEach(() => { sandbox = sinon.createSandbox() })
  afterEach(() => { sandbox.restore() })

  it("should return 200 status code", () => {
    const res = {
      set: () => {},
      status: () => res,
      json: () => {}
    }
    const statusStub = sandbox.stub(res, "status")
    statusStub.returns(res)

    getSocialLinks({} as any, res as any, {} as any)

    expect(statusStub.firstCall.firstArg).to.eql(200)
  })

  it("should call json", () => {
    const res = {
      set: () => {},
      status: () => res,
      json: () => {}
    }
    const jsonStub = sandbox.stub(res, "json")

    getSocialLinks({} as any, res as any, {} as any)

    expect(jsonStub.calledOnce).to.be.true
  })
})
