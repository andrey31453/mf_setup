import { do_sort, _do_sort__target_key, _do_sort__method_name } from '~utils'

export const sort =
	(key: _do_sort__target_key = null, method: _do_sort__method_name = null) =>
	<T extends any[]>(val: T): T =>
		do_sort(val, key, method)
