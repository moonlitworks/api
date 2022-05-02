import { expect } from "chai"
import cleanProject from "../../../src/services/projects/clean-project"

describe("cleanProject", () => {
  it("should return clean project", () => {
    const project = {
      id: "test-id",
      active: true,
      title: "test-title",
      category: "test-category",
      series: undefined,
      links: [],
      tags: [],
      members: []
    }
    expect(cleanProject(project)).to.eql({
      id: "test-id",
      title: "test-title",
      category: "test-category",
      series: undefined,
      links: [],
      tags: [],
      members: []
    })
  })
})