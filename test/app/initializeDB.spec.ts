import sinon from "sinon"
import { expect } from "chai"
import initializeDB from "../../src/app/initializeDB"
import db from "../../src/app/db"

describe("initializeDB", () => {
  let sandbox: sinon.SinonSandbox
  beforeEach(() => { sandbox = sinon.createSandbox() })
  afterEach(() => { sandbox.restore() })

  it("should call db connect function", async () => {
    const app = { test: true }
    const dbConnectStub = sandbox.stub(db, "connect").resolves()
    await initializeDB("")(app as any)
    expect(dbConnectStub.calledOnce).to.be.true
  })

  it("should return app", async () => {
    const app = { test: true }
    sandbox.stub(db, "connect").resolves()
    const returnedApp = await initializeDB("")(app as any)
    expect(returnedApp).to.eql(app)
  })
})
