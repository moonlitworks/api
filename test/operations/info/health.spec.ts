import sinon from "sinon"
import { expect } from "chai"
import { health } from "../../../src/operations/info/health"
import db from "../../../src/app/db"

describe("health", () => {
  let sandbox: sinon.SinonSandbox
  beforeEach(() => { sandbox = sinon.createSandbox() })
  afterEach(() => { sandbox.restore() })

  it("should return 200 status code with status UP when database is connected", () => {
    const res = {
      set: () => {},
      status: () => res,
      end: () => {},
      json: () => {}
    }
    sandbox.stub(db, "isConnected").returns(true)
    const statusStub = sandbox.stub(res, "status").returns(res)
    const jsonStub = sandbox.stub(res, "json")
    health({} as any, res as any, {} as any)
    expect(statusStub.firstCall?.firstArg).to.eql(200)
    expect(jsonStub.firstCall?.firstArg).to.eql({
      status: "UP"
    })
  })

  it("should return 503 status code with status DOWN when database is not connected", () => {
    const res = {
      set: () => {},
      status: () => res,
      end: () => {},
      json: () => {}
    }
    sandbox.stub(db, "isConnected").returns(false)
    const statusStub = sandbox.stub(res, "status").returns(res)
    const jsonStub = sandbox.stub(res, "json")
    health({} as any, res as any, {} as any)
    expect(statusStub.firstCall?.firstArg).to.eql(503)
    expect(jsonStub.firstCall?.firstArg).to.eql({
      status: "DOWN"
    })
  })
})
