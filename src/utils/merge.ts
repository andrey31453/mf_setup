import { type_of, type_is, is_mergeable } from './type'
import { copy } from './copy'

type _mergeable = [] | {}

const get_last_believable_value = <T extends any, Return extends T | boolean>(
  ...values: T[]
): Return =>
  values.reduceRight(
    // @ts-ignore
    (believable_value, arg) => believable_value || arg,
    <Return>false
  ) as unknown as Return

const get_keys = <T extends _mergeable>(...args: T[]): string[] => {
  const keys = new Set()
  args.forEach((arg) => {
    Object.keys(arg).forEach(keys.add, keys)
  })
  return [...keys] as unknown as string[]
}

const get_init_result = <T extends _mergeable>(...args: T[]) =>
  type_is(args[0], 'object') ? {} : []

export const merge_values = <T extends any>(...values: T[]) => {
  const last_believable_value = get_last_believable_value(...values)

  // is not merged type
  if (!is_mergeable(last_believable_value)) return last_believable_value

  const filtered_values = values.filter(
    (v) => type_of(last_believable_value) === type_of(v)
  )

  // not any merged value
  // @ts-ignore
  if (filtered_values.length === 1) return copy(last_believable_value)

  // @ts-ignore
  return merge(...filtered_values)
}

//
//
//

export const merge = <T extends _mergeable>(...args: T[]): T => {
  return get_keys(...args).reduce(
    (result, key) => {
      const values = args.map((arg) => arg[<keyof T>key])

      // @ts-ignore
      result[key] = merge_values(...values)
      return result as unknown as T
    },
    get_init_result(...args)
  ) as unknown as T
}
