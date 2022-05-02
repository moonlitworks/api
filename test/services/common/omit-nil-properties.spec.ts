import { expect } from "chai"
import omitNilProperties from "../../../src/services/common/omit-nil-properties"

describe("omitNilProperties", () => {
  it("should return identical object if no property is nil", () => {
    const obj = {
      test_prop_1: true,
      test_prop_2: "",
      test_prop_3: 0,
      test_prop_4: [],
    }
    expect(omitNilProperties(obj)).to.eql(obj)
  })

  it("should omit nil properties", () => {
    const obj = {
      test_prop_1: true,
      test_prop_2: "",
      test_prop_3: 0,
      test_prop_4: [],
      test_prop_5: undefined
    }
    const expected = {
      test_prop_1: true,
      test_prop_2: "",
      test_prop_3: 0,
      test_prop_4: []
    }
    expect(omitNilProperties(obj)).to.eql(expected)
  })
  
  it("should omit nil properties recursively", () => {
    const obj = {
      test_prop_1: true,
      test_prop_2: "",
      test_prop_3: 0,
      test_prop_4: [],
      test_prop_5: {
        test_subprop_1: "test",
        test_subprop_2: undefined
      }
    }
    const expected = {
      test_prop_1: true,
      test_prop_2: "",
      test_prop_3: 0,
      test_prop_4: [],
      test_prop_5: {
        test_subprop_1: "test"
      }
    }
    expect(omitNilProperties(obj)).to.eql(expected)
  })
})