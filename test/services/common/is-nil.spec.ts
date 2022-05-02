import { expect } from "chai"
import isNil from "../../../src/services/common/is-nil"

describe("isNil", () => {
  it("should be true if value is null", () => {
    expect(isNil(null)).to.be.true
  })
  
  it("should be true if value is undefined", () => {
    expect(isNil(undefined)).to.be.true
  })
  
  it("should be false if value is empty string", () => {
    expect(isNil("")).to.be.false
  })
  
  it("should be false if value is 0", () => {
    expect(isNil(0)).to.be.false
  })
  
  it("should be false if value is empty array", () => {
    expect(isNil([])).to.be.false
  })
})