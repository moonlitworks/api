import isObject from "./is-object"
import isNil from "./is-nil"

const omitNilProperties = <T>(obj: T): Partial<T> => {
  const cleanObj: Partial<T> = {}
  Object.keys(obj).map(key => {
    if (isObject(obj[key as keyof T])) {
      cleanObj[key as keyof T] = omitNilProperties(obj[key as keyof T]) as T[keyof T]
    } else if (!isNil(obj[key as keyof T])) {
      cleanObj[key as keyof T] = obj[key as keyof T]
    }
  })
  return cleanObj
}

export default omitNilProperties