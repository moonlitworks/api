import { expect } from "chai"
import isObject from "../../../src/services/common/is-object"

describe("isObject", () => {
  it("should be true if value is object", () => {
    expect(isObject({})).to.be.true
  })
  
  it("should be false if value is empty array", () => {
    expect(isObject([])).to.be.false
  })
  
  it("should be false if value is not object", () => {
    expect(isObject("")).to.be.false
    expect(isObject(0)).to.be.false
  })
})