import { i_parse_all, i_parse, i_value } from '~types'

//
//
//

class __Parse__<T> implements i_value<T> {
	readonly value

	constructor(data: string, keys: string[], parse: Function) {
		this.value = keys.reduce(
			(parse_data, key: string) => [...parse_data, parse(data, key)],
			[]
		) as unknown as T
	}
}

//
//
//

export class Parse implements i_value<i_parse> {
	readonly value

	constructor(data: string, keys: string[]) {
		this.value = new __Parse__<i_parse>(data, keys, this.parse).value
	}

	private parse = (data: string, key: string) => data.match(new RegExp(key))[1]
}

//
//
//

export class Parse_All implements i_value<i_parse_all> {
	readonly value

	constructor(data: string, keys: string[]) {
		this.value = new __Parse__<i_parse_all>(data, keys, this.parse).value
	}

	private parse = (data: string, key: string) => {
		const match_all = [...data.matchAll(new RegExp(key, 'gi'))]
		return match_all.map((m) => m[1])
	}
}
