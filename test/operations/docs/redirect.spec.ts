import sinon from "sinon"
import { expect } from "chai"
import { docsRedirect } from "../../../src/operations/docs/redirect"

describe("docsRedirect", () => {
  let sandbox: sinon.SinonSandbox
  beforeEach(() => { sandbox = sinon.createSandbox() })
  afterEach(() => { sandbox.restore() })

  it("should set location to /docs", () => {
    const res = {
      set: () => {},
      status: () => res,
      end: () => {}
    }
    const setStub = sandbox.stub(res, "set")

    docsRedirect({} as any, res as any, {} as any)

    expect(setStub.calledOnce).to.be.true
    expect(setStub.firstCall.firstArg).to.eql("location")
    expect(setStub.firstCall.lastArg).to.eql("/docs")
  })

  it("should return 301 status code", () => {
    const res = {
      set: () => {},
      status: () => res,
      end: () => {}
    }
    const statusStub = sandbox.stub(res, "status")
    statusStub.returns(res)

    docsRedirect({} as any, res as any, {} as any)

    expect(statusStub.firstCall.firstArg).to.eql(301)
  })

  it("should call end", () => {
    const res = {
      set: () => {},
      status: () => res,
      end: () => {}
    }
    const endStub = sandbox.stub(res, "end")

    docsRedirect({} as any, res as any, {} as any)

    expect(endStub.calledOnce).to.be.true
  })
})
