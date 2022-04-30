import sinon from "sinon"
import { expect } from "chai"
import db from "../../src/app/db"
import mongoose from "mongoose"

describe("db", () => {
  let sandbox: sinon.SinonSandbox
  beforeEach(() => { sandbox = sinon.createSandbox() })
  afterEach(() => { sandbox.restore() })

  describe("connect", () => {
    it("should call mongoose connect with passed string", async () => {
      sandbox.stub(console, "info")
      const dbConnectStub = sandbox.stub(mongoose, "connect")
      await db.connect("db-url")
      expect(dbConnectStub.calledOnce).to.be.true
      expect(dbConnectStub.firstCall?.firstArg).to.eql("db-url")
    })

    it("should call console.info with parameter", async () => {
      const loggerStub = sandbox.stub(console, "info")
      sandbox.stub(mongoose, "connect")
      await db.connect("db-url")
      expect(loggerStub.calledOnce).to.be.true
    })

    it("should call console.info without parameter", async () => {
      const loggerStub = sandbox.stub(console, "info")
      sandbox.stub(mongoose, "connect")
      await db.connect(undefined)
      expect(loggerStub.calledOnce).to.be.true
    })
  })

  describe("get", () => {
    it("should return undefined", () => {
      expect(db.get()).to.be.undefined
    })

    it("should return test-db", async () => {
      sandbox.stub(console, "info")
      sandbox.stub(mongoose, "connect").resolves("test-db" as any)
      await db.connect("test-url")
      expect(db.get()).to.eql("test-db")
    })
  })

  describe("isConnected", () => {
    it("should return false if db is not initialized", async () => {
      sandbox.stub(console, "info")
      expect(db.isConnected()).to.be.false
    })

    it("should return true if readyState is 1", async () => {
      sandbox.stub(console, "info")
      sandbox.stub(mongoose, "connect").resolves({ connection: { readyState: 1 } } as any)
      await db.connect("test-url")
      expect(db.isConnected()).to.be.true
    })

    it("should return false if readyState is 0", async () => {
      sandbox.stub(console, "info")
      sandbox.stub(mongoose, "connect").resolves({ connection: { readyState: 0 } } as any)
      await db.connect("test-url")
      expect(db.isConnected()).to.be.false
    })
  })

  describe("close", () => {
    it("should return test-db", async () => {
      const testDb = {
        disconnect: () => {}
      }
      sandbox.stub(console, "info")
      sandbox.stub(mongoose, "connect").resolves(testDb as any)
      const disconnectStub = sandbox.stub(testDb, "disconnect")
      await db.connect("test-url")
      await db.close()
      expect(disconnectStub.calledOnce).to.be.true
    })
  })
})
