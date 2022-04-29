import sinon from "sinon"
import { expect } from "chai"
import { getSocialLink } from "../../../src/operations/links/get-social-link"
import db from "../../../src/app/db"
import * as createLinkMongoRepository from "../../../src/services/links/create-link-mongo-repository"

describe("getSocialLink", () => {
  let sandbox: sinon.SinonSandbox
  beforeEach(() => { sandbox = sinon.createSandbox() })
  afterEach(() => { sandbox.restore() })

  const res = {
    set: () => {},
    status: () => res,
    end: () => {}
  }

  const sampleLinkRepository = {
    getAll: async () => [{
      id: "test-id",
      label: "test-label",
      url: "test-url",
      active: true
    }],
    get: async () => ({
      id: "test-id",
      label: "test-label",
      url: "test-url",
      active: true
    }),
    query: async () => [{
      id: "test-id",
      label: "test-label",
      url: "test-url",
      active: true
    }]
  }

  it("should return 404 if result array is empty", async () => {
    sandbox.stub(db, "isConnected").returns(true)
    sandbox.stub(createLinkMongoRepository, "default").returns({
      ...sampleLinkRepository,
      query: async () => []
    })
    const statusStub = sandbox.stub(res, "status").returns(res)
    const req = {
      params: {
        label: "test-label"
      }
    }

    await getSocialLink(req as any, res as any, {} as any)

    expect(statusStub.firstCall?.firstArg).to.eql(404)
  })

  it("should set content-type to text/plain", async () => {
    sandbox.stub(db, "isConnected").returns(true)
    sandbox.stub(createLinkMongoRepository, "default").returns(sampleLinkRepository)
    const setStub = sandbox.stub(res, "set")
    const req = {
      params: {
        label: "test-label"
      }
    }

    await getSocialLink(req as any, res as any, {} as any)

    expect(setStub.calledOnce).to.be.true
    expect(setStub.firstCall?.firstArg).to.eql("content-type")
    expect(setStub.firstCall?.lastArg).to.eql("text/plain")
  })

  it("should return 200 status code", async () => {
    sandbox.stub(db, "isConnected").returns(true)
    sandbox.stub(createLinkMongoRepository, "default").returns(sampleLinkRepository)
    const statusStub = sandbox.stub(res, "status").returns(res)
    const req = {
      params: {
        label: "test-label"
      }
    }

    await getSocialLink(req as any, res as any, {} as any)

    expect(statusStub.firstCall?.firstArg).to.eql(200)
  })

  it("should call end", async () => {
    sandbox.stub(db, "isConnected").returns(true)
    sandbox.stub(createLinkMongoRepository, "default").returns(sampleLinkRepository)
    const endStub = sandbox.stub(res, "end")
    const req = {
      params: {
        label: "test-label"
      }
    }

    await getSocialLink(req as any, res as any, {} as any)

    expect(endStub.calledOnce).to.be.true
  })
})
