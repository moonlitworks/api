import sinon from "sinon"
import { expect } from "chai"
import setupExpress from "../../src/app/setupExpress"

describe("setupExpress", () => {
  let sandbox: sinon.SinonSandbox
  beforeEach(() => { sandbox = sinon.createSandbox() })
  afterEach(() => { sandbox.restore() })

  it("should create an express", () => {
    expect(setupExpress()).to.not.be.undefined
  })
})
