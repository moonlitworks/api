import sinon from "sinon"
import { expect } from "chai"
import * as expressSwagger from "swagger-ui-express"
import initializeSwagger from "../../src/app/initializeSwagger"

describe("initializeOpenapi", () => {
  let sandbox: sinon.SinonSandbox
  beforeEach(() => { sandbox = sinon.createSandbox() })
  afterEach(() => { sandbox.restore() })

  it("should call setup function of swagger-ui-express", () => {
    const app = { test: true, use: () => {} }
    const appUseStub = sandbox.stub(app, "use")
    initializeSwagger()(app as any)
    expect(appUseStub.calledOnce).to.be.true
  })

  it("should return app", () => {
    const app = { test: true, use: () => {} }
    const returnedApp = initializeSwagger()(app as any)
    expect(returnedApp).to.eql(app)
  })
})
