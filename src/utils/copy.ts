import { is_array, is_null } from './type'

export const copy = <T extends [] | {}>(target: T): T => {
  // primitive and function
  if (typeof target !== 'object') {
    return target
  }

  // null
  if (is_null(target)) {
    return target
  }

  // array and object

  return Object.keys(target).reduce(
    (result, key) => {
      // @ts-ignore
      ;(<T>result)[<keyof T>key] = copy(target[<keyof T>key])
      return result
    },
    is_array(target) ? [] : {}
  ) as unknown as T
}
