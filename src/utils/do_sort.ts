import { Nullable } from '~types'

//
//
//

type _sort_return_value = 1 | -1
interface _sort_values {
  more: _sort_return_value
  less: _sort_return_value
}

interface _methods {
  asc: _sort_values
  desc: _sort_values
}

export const do_sort__default_method = 'asc'
export type _do_sort__method_name = keyof _methods
export type _do_sort__target_key = Nullable<string>

//
//
//

const methods: _methods = {
  asc: { more: 1, less: -1 },
  desc: { more: -1, less: 1 },
}

const is_more = (a: any, b: any, key: _do_sort__target_key) => {
  if (!key) return a > b

  return a[key] > b[key]
}
const is_less = (a: any, b: any, key: _do_sort__target_key) => {
  if (!key) return a < b

  return a[key] < b[key]
}

export const do_sort = <T extends any[]>(
  target: T,
  key: _do_sort__target_key = null,
  method_name: _do_sort__method_name = do_sort__default_method
) => {
  if (!Object.keys(methods).includes(method_name)) {
    method_name = do_sort__default_method
  }

  return target.sort((a, b) => {
    if (is_more(a, b, key)) return methods[method_name].more
    if (is_less(a, b, key)) return methods[method_name].less

    return 0
  })
}
