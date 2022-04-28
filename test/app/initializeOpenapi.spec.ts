import sinon from "sinon"
import { expect } from "chai"
import * as expressOpenapi from "express-openapi"
import initializeOpenapi from "../../src/app/initializeOpenapi"

describe("initializeOpenapi", () => {
  let sandbox: sinon.SinonSandbox
  beforeEach(() => { sandbox = sinon.createSandbox() })
  afterEach(() => { sandbox.restore() })

  it("should call initialize function of express-openapi", () => {
    const expressOpenapiStub = sandbox.stub(expressOpenapi, "initialize")
    initializeOpenapi()({} as any)
    expect(expressOpenapiStub.calledOnce).to.be.true
  })

  it("should return app", () => {
    const app = { test: true }
    sandbox.stub(expressOpenapi, "initialize")
    const returnedApp = initializeOpenapi()(app as any)
    expect(returnedApp).to.eql(app)
  })
})
