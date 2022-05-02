import { expect } from "chai"
import cleanLink from "../../../src/services/links/clean-link"

describe("cleanLink", () => {
  it("should return clean link", () => {
    const link = {
      id: "test-id",
      active: true,
      label: "test-label",
      url: "test-url"
    }
    expect(cleanLink(link)).to.eql({
      label: "test-label",
      url: "test-url"
    })
  })
})