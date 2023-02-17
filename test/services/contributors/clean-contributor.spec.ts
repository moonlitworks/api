import { expect } from "chai"
import cleanContributor from "../../../src/services/contributors/clean-contributor"

describe("cleanContributor", () => {
  it("should return clean contributor", () => {
  const contributor = {
      id: "test-id",
      active: true,
      name: "test-name",
      contribution: "test-contribution",
      image: "test-image",
      links: [{
        label: "test-link-label",
        url: "test-link-url",
      }],
    }
    expect(cleanContributor(contributor)).to.eql({
      name: "test-name",
      contribution: "test-contribution",
      image: "test-image",
      links: [{
        label: "test-link-label",
        url: "test-link-url",
      }],
    })
  })
})