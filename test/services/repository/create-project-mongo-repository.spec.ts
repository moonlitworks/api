import sinon from "sinon"
import { expect } from "chai"
import createProjectMongoRepository, { toProject } from "../../../src/services/repository/create-project-mongo-repository"
import * as createMongoRepository from "../../../src/services/repository/create-mongo-repository"

describe("createLinkMongoRepository", () => {
  let sandbox: sinon.SinonSandbox
  beforeEach(() => { sandbox = sinon.createSandbox() })
  afterEach(() => { sandbox.restore() })

  it("should call create mongo repository", () => {
    const stub = sandbox.stub(createMongoRepository, "default")
    createProjectMongoRepository({ db: true } as any)
    expect(stub.calledOnce).to.be.true
    expect(stub.firstCall?.firstArg).to.eql({ db: true })
  })
})

describe("toProject", () => {
  it("should parse full doc", () => {
    const doc = {
      _id: "test-id",
      active: true,
      title: "test-title",
      category: "test-category",
      series: "test-series",
      links: [
        {
          label: "test-link-label",
          url: "test-link-url"
        }
      ],
      tags: [
        "test-tag-1",
        "test-tag-2"
      ],
      members: [
        {
          name: "test-member-name",
          asset: "test-member-asset",
          link: "test-member-link"
        }
      ]
    }
    const expected = {
      id: "test-id",
      active: true,
      title: "test-title",
      category: "test-category",
      series: "test-series",
      links: [
        {
          label: "test-link-label",
          url: "test-link-url"
        }
      ],
      tags: [
        "test-tag-1",
        "test-tag-2"
      ],
      members: [
        {
          name: "test-member-name",
          asset: "test-member-asset",
          link: "test-member-link"
        }
      ]
    }
    expect(toProject(doc as any)).to.eql(expected)
  })

  it("should parse minimum doc", () => {
    const doc = {
      _id: "test-id",
      active: true,
      title: "test-title",
      category: "test-category",
    }
    const expected = {
      id: "test-id",
      active: true,
      title: "test-title",
      category: "test-category",
      series: null,
      links: [],
      tags: [],
      members: []
    }
    expect(toProject(doc as any)).to.eql(expected)
  })
})
