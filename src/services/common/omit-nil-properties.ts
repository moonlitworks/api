import isObject from "./is-object"
import isNil, { Nil } from "./is-nil"

type NonNilValue<U> = U extends Nil ? never : U
type NonNilObject<T> = Record<keyof T, NonNilValue<T[keyof T]>>

const omitNilProperties = <T>(obj: T) => {
  let cleanObj = {} as NonNilObject<T>
  Object.keys(obj).forEach((key: string) => {
    const value = obj[key as keyof T]
    if (isObject(value)) {
      cleanObj = {
        ...cleanObj,
        [key]: omitNilProperties(value)
      }
    } else if (!isNil(value)) {
      cleanObj = {
        ...cleanObj,
        [key]: value
      }
    }
  })
  return cleanObj
}

export default omitNilProperties