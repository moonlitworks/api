import sinon from "sinon"
import { expect } from "chai"
import db from "../../src/app/db"
import ensureDb from "../../src/middlewares/ensure-db"

describe("ensureDb", () => {
  let sandbox: sinon.SinonSandbox
  beforeEach(() => { sandbox = sinon.createSandbox() })
  afterEach(() => { sandbox.restore() })

  const res = {
    set: () => {},
    status: () => res,
    end: () => {},
    json: () => {}
  }

  it("should call next if db is connected", () => {
    const next = sandbox.stub()
    sandbox.stub(db, "isConnected").returns(true)
    ensureDb({} as any, res as any, next as any)
    expect(next.calledOnce).to.be.true
  })

  it("should call res.status with 503 if db is not connected", () => {
    const next = sandbox.stub()
    const statusStub = sandbox.stub(res, "status").returns(res)
    sandbox.stub(db, "isConnected").returns(false)
    ensureDb({} as any, res as any, next as any)
    expect(next.calledOnce).to.be.false
    expect(statusStub.firstCall?.firstArg).to.eql(503)
  })

  it("should call next if db is not connected but endpoint skips db check", () => {
    const next = sandbox.stub()
    sandbox.stub(db, "isConnected").returns(false)
    const req = {
      operationDoc: {
        "x-controller-skip-db-check": true
      }
    }
    ensureDb(req as any, res as any, next as any)
    expect(next.calledOnce).to.be.true
  })
})
