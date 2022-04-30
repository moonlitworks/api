import sinon from "sinon"
import { expect } from "chai"
import { docsRedirect } from "../../../src/operations/docs/redirect"

describe("docsRedirect", () => {
  let sandbox: sinon.SinonSandbox
  beforeEach(() => { sandbox = sinon.createSandbox() })
  afterEach(() => { sandbox.restore() })

  const res = {
    set: () => res,
    status: () => res,
    end: () => {}
  }

  it("should set location to /docs", () => {
    const setStub = sandbox.stub(res, "set").returns(res)
    docsRedirect({} as any, res as any, {} as any)
    expect(setStub.calledOnce).to.be.true
    expect(setStub.firstCall?.firstArg).to.eql("location")
    expect(setStub.firstCall?.lastArg).to.eql("/docs")
  })

  it("should return 301 status code", () => {
    sandbox.stub(res, "set").returns(res)
    const statusStub = sandbox.stub(res, "status").returns(res)
    const endStub = sandbox.stub(res, "end")
    docsRedirect({} as any, res as any, {} as any)
    expect(statusStub.firstCall?.firstArg).to.eql(301)
    expect(endStub.calledOnce).to.be.true
  })
})
