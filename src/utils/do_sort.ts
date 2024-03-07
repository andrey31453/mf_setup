import { Nullable } from '~types'

//
//
//

interface _sort_values {
	more: 1 | -1
	less: 1 | -1
}

interface _methods {
	asc: _sort_values
	desc: _sort_values
}

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
	method_name: _do_sort__method_name = 'asc'
) => {
	if (!Object.keys(methods).includes(method_name)) {
		method_name = 'asc'
	}

	return target.sort((a, b) => {
		if (is_more(a, b, key)) return methods[method_name].more
		if (is_less(a, b, key)) return methods[method_name].less

		return 0
	})
}
