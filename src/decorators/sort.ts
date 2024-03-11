import {
  do_sort,
  do_sort__default_method,
  _do_sort__target_key,
  _do_sort__method_name,
} from '~utils'

export const sort =
  (
    key: _do_sort__target_key = null,
    method: _do_sort__method_name = do_sort__default_method
  ) =>
  <T extends any[]>(val: T): T =>
    do_sort(val, key, method)
