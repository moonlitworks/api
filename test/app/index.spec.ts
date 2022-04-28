import sinon from "sinon"
import { expect } from "chai"
import * as setupExpress from "../../src/app/setupExpress"
import * as initializeOpenapi from "../../src/app/initializeOpenapi"
import * as initializeSwagger from "../../src/app/initializeSwagger"
import * as startServer from "../../src/app/startServer"
import startApp from "../../src/app/index"

describe("app", () => {
  let sandbox: sinon.SinonSandbox
  beforeEach(() => { sandbox = sinon.createSandbox() })
  afterEach(() => { sandbox.restore() })

  it("should call setup functions", () => {
    const setupExpressStub = sandbox.stub(setupExpress, "default")
    const initializeOpenapiStub = sandbox.stub(initializeOpenapi, "default")
    const initializeSwaggerStub = sandbox.stub(initializeSwagger, "default")
    const startServerStub = sandbox.stub(startServer, "default")

    startApp()

    expect(setupExpressStub.calledOnce).to.be.true
    expect(initializeOpenapiStub.calledOnce).to.be.true
    expect(initializeSwaggerStub.calledOnce).to.be.true
    expect(startServerStub.calledOnce).to.be.true
  })
})
