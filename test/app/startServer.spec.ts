import sinon from "sinon"
import { expect } from "chai"
import startServer from "../../src/app/startServer"

describe("startServer", () => {
  let sandbox: sinon.SinonSandbox
  beforeEach(() => { sandbox = sinon.createSandbox() })
  afterEach(() => { sandbox.restore() })

  it("should call listen function of express app", () => {
    const app = { listen: () => {} }
    const listenStub = sandbox.stub(app, "listen")
    startServer()(app as any)
    expect(listenStub.calledOnce).to.be.true
  })

  it("should use port 80 if nothing is passed", () => {
    const app = { listen: () => {} }
    const listenStub = sandbox.stub(app, "listen")
    startServer()(app as any)
    expect(listenStub.firstCall.firstArg).to.eql(80)
  })

  it("should call log callback", () => {
    const app = { listen: (_port: number, callback: Function) => { callback() } }
    const logStub = sandbox.stub(console, "log")
    startServer()(app as any)
    expect(logStub.calledOnce).to.be.true
    expect(logStub.firstCall.lastArg).to.eql("API server running at port 80\nhttp://localhost:80")
  })
})

