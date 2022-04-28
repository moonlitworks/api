import sinon from "sinon"
import { expect } from "chai"
import { getSocialLink } from "../../../src/operations/links/get-social-link"

describe("getSocialLink", () => {
  let sandbox: sinon.SinonSandbox
  beforeEach(() => { sandbox = sinon.createSandbox() })
  afterEach(() => { sandbox.restore() })

  it("should set content-type to text/plain", () => {
    const res = {
      set: () => {},
      status: () => res,
      end: () => {}
    }
    const setStub = sandbox.stub(res, "set")

    getSocialLink({} as any, res as any, {} as any)

    expect(setStub.calledOnce).to.be.true
    expect(setStub.firstCall.firstArg).to.eql("content-type")
    expect(setStub.firstCall.lastArg).to.eql("text/plain")
  })

  it("should return 200 status code", () => {
    const res = {
      set: () => {},
      status: () => res,
      end: () => {}
    }
    const statusStub = sandbox.stub(res, "status")
    statusStub.returns(res)

    getSocialLink({} as any, res as any, {} as any)

    expect(statusStub.firstCall.firstArg).to.eql(200)
  })

  it("should call end", () => {
    const res = {
      set: () => {},
      status: () => res,
      end: () => {}
    }
    const endStub = sandbox.stub(res, "end")

    getSocialLink({} as any, res as any, {} as any)

    expect(endStub.calledOnce).to.be.true
  })
})
