import sinon from "sinon"
import { expect } from "chai"
import * as startApp from "../src/app/index"

describe("index", () => {
  let sandbox: sinon.SinonSandbox
  beforeEach(() => { sandbox = sinon.createSandbox() })
  afterEach(() => { sandbox.restore() })

  it("should start the app", async () => {
    const startAppStub = sandbox.stub(startApp, "default")
    await import("../src/index")
    expect(startAppStub.calledOnce).to.be.true
  })
})
